"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, Chip, Stack, Button, Skeleton } from "@mui/material";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  UTCTimestamp,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { DownIcon, UpIcon } from "@/shared/Svgs/Svg.component";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [high24h, setHigh24h] = useState(0);
  const [low24h, setLow24h] = useState(0);
  const [volume24h, setVolume24h] = useState(0);
  const timeframes = [
    { value: "1m", label: "1M" },
    { value: "5m", label: "5M" },
    { value: "15m", label: "15M" },
    { value: "30m", label: "30M" },
    { value: "1h", label: "1H" },
    { value: "1d", label: "1D" },
    { value: "1w", label: "1WEEK" },
    { value: "1M", label: "1MON" },
  ];

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
        autoScale: true,
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
      },

      timeScale: {
        borderColor: "#1e2a3a",
        timeVisible: true,
        fixLeftEdge: true,
        fixRightEdge: true,
      },

      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
      width: chartContainerRef.current.clientWidth,
      height: 450,
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#ef4444",
      borderUpColor: "#10b981",
      borderDownColor: "#ef4444",
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
      priceLineVisible: false,
      lastValueVisible: false,

      priceFormat: {
        type: "price",
        precision: 6,
        minMove: 0.01,
      },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    // Tạo price line 1 lần
    priceLineRef.current = candleSeries.createPriceLine({
      price: 0,
      color: "#ef4444",
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
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=25`,
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
        chartRef.current?.priceScale("right").applyOptions({
          autoScale: true,
        });

        // set giá hiện tại
        const last = candles[candles.length - 1];
        if (last) {
          setPrice(last.close);
          setPercent(((last.close - last.open) / last.open) * 100);
        }
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, [interval, symbol]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setPercent(Number(data.P));
      setHigh24h(parseFloat(data.h));
      setLow24h(parseFloat(data.l));
      setVolume24h(parseFloat(data.v));
    };

    return () => ws.close();
  }, [symbol]);
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
      chartRef.current?.priceScale("right").applyOptions({
        autoScale: true,
      });
      setOpenPrice(open);
      setPrice(close);
      // setPercent(percentValue);
      changePrice(close);
      priceLineRef.current?.applyOptions({
        price: close,
        color: close >= open ? "#10b981" : "#ef4444",
      });
    };

    return () => ws.close();
  }, [interval, symbol]);

  useEffect(() => {
    setPrice(0);
    setOpenPrice(0);
    setPercent(0);
  }, [symbol]);
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
          {loading ? (
            <>
              <Skeleton
                variant="text"
                width={120}
                height={40}
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                width={70}
                height={24}
                animation="wave"
              />
            </>
          ) : (
            <>
              <Typography
                fontSize={25}
                fontWeight="bold"
                color={percent >= 0 ? "#10b981" : "#ef4444"}
              >
                {Number(price).toLocaleString()}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <Typography
                  sx={{
                    color: percent >= 0 ? "#10b981" : "#ef4444",
                    fontSize: "14px",
                  }}
                >
                  {percent.toFixed(2)}%
                </Typography>

                {Number(percent) < 0 ? (
                  <DownIcon width="16px" height="16px" fill="#ef4444" />
                ) : (
                  <UpIcon width="16px" height="16px" fill="#22c55e" />
                )}
              </Box>
            </>
          )}
        </Box>

        <Box textAlign="right">
          {loading ? (
            <>
              <Skeleton
                variant="text"
                width={70}
                height={18}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={80}
                height={20}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={120}
                height={20}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={120}
                height={20}
                animation="wave"
              />
            </>
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="#9ca3af" fontSize={13} textAlign="left">
                  High
                </Typography>
                <Typography color="#ffffff" fontSize={13} textAlign="right">
                  {high24h.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="#9ca3af" fontSize={13} textAlign="left">
                  Low
                </Typography>

                <Typography color="#ffffff" fontSize={13} textAlign="left">
                  {Number(low24h).toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="#9ca3af" fontSize={13} textAlign="left">
                  24H quantity
                </Typography>
                <Typography color="#ffffff" fontSize={13} textAlign="left">
                  {Number(volume24h).toLocaleString()}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Stack>

      <Box
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          pb: 1,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            minWidth: "max-content",
          }}
        >
          {timeframes.map((tf) => {
            const active = tf.value === interval;

            return (
              <Button
                key={tf.value}
                onClick={() => setInterval(tf.value)}
                sx={{
                  minWidth: 55,
                  height: 25,
                  px: 1,
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 600,

                  color: active ? "white" : "#9ca3af",
                  backgroundColor: active ? "#22c55e" : "#1f2937",

                  "&:hover": {
                    backgroundColor: "#22c55e",
                    color: "white",
                  },
                }}
              >
                {tf.label}
              </Button>
            );
          })}
        </Stack>
      </Box>

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
