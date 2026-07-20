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
import { t } from "i18next";

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
  const [quoteVolume24h, setQuoteVolume24h] = useState(0);
  const timeframes = [
    { label: "1 " + t("TradePage.title21"), value: "1m" },
    { label: "5 " + t("TradePage.title21"), value: "5m" },
    { label: "15 " + t("TradePage.title21"), value: "15m" },
    { label: "30 " + t("TradePage.title21"), value: "30m" },
    { label: "1 " + t("TradePage.title22"), value: "1h" },
    { label: "1 " + t("TradePage.title23"), value: "1d" },
    { label: "1 " + t("TradePage.title24"), value: "1w" },
    { label: "1 " + t("TradePage.title25"), value: "1M" },
  ];

  // ================= INIT CHART =================
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0E0F18" },
        textColor: "#A0AEC0",
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      rightPriceScale: {
        borderColor: "#0E0F18",
        autoScale: true,
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
      },

      timeScale: {
        borderColor: "#0E0F18",
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
      height: 380,
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
      setQuoteVolume24h(parseFloat(data.q));
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
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        background: "#0E0F18",
        position: "relative",
        pb: "50px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={3}
        mb={1}
      >
        {/* LEFT */}
        <Box>
          <Typography
            sx={{
              fontSize: 36,
              lineHeight: 1,
              fontWeight: 700,
              color: percent >= 0 ? "#0ECB81" : "#F6465D",
            }}
          >
            {Number(price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mt: 1,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              ≈ $
              {Number(price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>

            <Typography
              sx={{
                color: percent >= 0 ? "#0ECB81" : "#F6465D",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {percent >= 0 ? "+" : ""}
              {percent.toFixed(3)}%
            </Typography>
          </Box>

          <Typography
            sx={{
              mt: 0.5,
              color: "#8B93A6",
              fontSize: 13,
            }}
          >
            {t("TradePage.title26")}
            <Box
              component="span"
              sx={{
                color: "#fff",
                pl: "10px",
              }}
            >
              {Number(openPrice).toLocaleString()}
            </Box>
          </Typography>
        </Box>

        {/* RIGHT */}
        <Stack spacing={0.8} sx={{ minWidth: 165 }}>
          {[
            {
              label: t("TradePage.title27"),
              value: high24h,
            },
            {
              label: t("TradePage.title28"),
              value: low24h,
            },
            {
              label: t("TradePage.title29"),
              value: volume24h,
            },
            {
              label: t("TradePage.title30"),
              value: quoteVolume24h,
            },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  color: "#8B93A6",
                  fontSize: 13,
                }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {Number(item.value).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Box sx={{ display: "flex", alignItems: "center", py: "10px" }}>
        <Typography sx={{ color: "white", fontSize: 12, width: 130 }}>
          {t("TradePage.title20")}:
        </Typography>
        <Box
          sx={{
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none", // Firefox
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "nowrap", // Không xuống dòng
              width: "max-content",

              py: 1,
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
                  <Box
                    key={tf.value}
                    onClick={() => setInterval(tf.value)}
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      flexShrink: 0, // Không bị co lại
                      fontSize: 13,
                      fontWeight: active ? 700 : 500,
                      color: active ? "#fff" : "rgba(255,255,255,0.55)",
                      transition: "0.2s",
                      userSelect: "none",

                      "&:hover": {
                        color: "#fff",
                      },

                      "&::after": active
                        ? {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            bottom: -10,
                            width: "100%",
                            height: "2px",
                            background: "#1976d2",
                            borderRadius: 999,
                          }
                        : {},
                    }}
                  >
                    {tf.label}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box
        ref={chartContainerRef}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          zIndex: 1,
        }}
      />
    </Box>
  );
}
