"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, Chip, Stack, Button } from "@mui/material";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  UTCTimestamp,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";

type Candle = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

interface ChartViewCustomProps {
  symbol: string;
  interval: string;
  setInterval: (percent: string) => void;
  changePrice: (percent: number) => void;
}

export default function ChartViewCustom({
  symbol,
  interval,
  setInterval,
  changePrice,
}: ChartViewCustomProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const priceLineRef = useRef<any>(null);
  const [openPrice, setOpenPrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  // ================= INIT CHART =================
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#111827" },
        textColor: "#A0AEC0",
      },
      grid: {
        vertLines: { color: "#1e2a3a" },
        horzLines: { color: "#1e2a3a" },
      },
      rightPriceScale: {
        borderColor: "#1e2a3a",
      },
      localization: {
        priceFormatter: (p: number) => p.toFixed(5),
      },
      timeScale: {
        borderColor: "#1e2a3a",
        timeVisible: true,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#00C853",
      downColor: "#FF3D00",
      borderUpColor: "#00C853",
      borderDownColor: "#FF3D00",
      wickUpColor: "#00C853",
      wickDownColor: "#FF3D00",
      priceLineVisible: false,
      lastValueVisible: false,
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    // Tạo price line 1 lần
    priceLineRef.current = candleSeries.createPriceLine({
      price: 0,
      color: "#FF3D00",
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
    });

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current!.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // ================= LOAD HISTORY =================
  useEffect(() => {
    async function loadHistory() {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=20`,
      );

      const data = await res.json();

      const candles: Candle[] = data.map((item: any) => ({
        time: (item[0] / 1000) as UTCTimestamp,
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
      }));

      candleSeriesRef.current?.setData(candles);
      chartRef.current?.timeScale().fitContent();

      // set giá hiện tại
      const last = candles[candles.length - 1];
      if (last) {
        setPrice(last.close);
        setPercent(((last.close - last.open) / last.open) * 100);
      }
    }

    loadHistory();
  }, [interval, symbol]);

  // ================= WEBSOCKET REALTIME =================
  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`,
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const k = message.k;

      const open = parseFloat(k.o);
      const close = parseFloat(k.c);
      const percentValue = ((close - open) / open) * 100;

      const candle: Candle = {
        time: (k.t / 1000) as UTCTimestamp,
        open,
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close,
      };

      candleSeriesRef.current?.update(candle);
      chartRef.current?.timeScale().scrollToRealTime();
      setOpenPrice(open);
      setPrice(close);
      setPercent(percentValue);
      changePrice(close);
      priceLineRef.current?.applyOptions({
        price: close,
        color: close >= open ? "#00C853" : "#FF3D00",
      });
    };

    return () => ws.close();
  }, [interval, symbol]);

  return (
    <Box
      sx={{
        maxWidth: "768px",
        margin: "auto",
        background: "#111827",
      }}
    >
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Box>
          <Typography
            fontSize={40}
            fontWeight="bold"
            color={percent >= 0 ? "#00C853" : "#FF3D00"}
          >
            {Number(price.toFixed(2)).toLocaleString()}
          </Typography>

          <Chip
            label={`${percent.toFixed(2)}%`}
            size="small"
            sx={{
              color: percent >= 0 ? "#00C853" : "#FF3D00",
            }}
            // icon={}
          />
        </Box>

        <Box textAlign="right">
          <Typography color="#aaa" fontSize={12} textAlign={"left"}>
            Realtime
          </Typography>

          <Typography color="white" fontSize={14} textAlign={"left"}>
            TF: {interval.toUpperCase()}
          </Typography>

          <Typography color="#00C853" fontSize={13} textAlign={"left"}>
            Open: {Number(openPrice.toFixed(2)).toLocaleString()}
          </Typography>

          <Typography color="#FF3D00" fontSize={13} textAlign={"left"}>
            Close: {Number(price.toFixed(2)).toLocaleString()}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} mb={2}>
        {["1m", "5m", "15m", "30m", "1h"].map((tf) => (
          <Button
            key={tf}
            size="small"
            onClick={() => setInterval(tf)}
            variant={tf === interval ? "contained" : "outlined"}
            sx={{
              color: "white",
              borderColor: "#2c3e50",
              background: tf === interval ? "#00C853" : "transparent",
            }}
          >
            {tf.toUpperCase()}
          </Button>
        ))}
      </Stack>

      <Box
        ref={chartContainerRef}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
        }}
      />
    </Box>
  );
}
