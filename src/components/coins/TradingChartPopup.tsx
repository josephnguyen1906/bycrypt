"use client";

import { Drawer, Box, IconButton, Typography, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useMemo, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTranslation } from "react-i18next";

interface TradingChartProps {
  open: boolean;
  onClose: () => void;
  symbol: string;
}

export default function TradingChartPopup({
  open,
  onClose,
  symbol,
}: TradingChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState("1");
  const [timeValue, setTimeValue] = useState("1m");
  const { t } = useTranslation();
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setReady(true);
      }, 350); // chờ animation Drawer

      return () => clearTimeout(timer);
    }

    setReady(false);
  }, [open]);

  const tvSymbol = useMemo(() => {
    const s = symbol;

    switch (s) {
      case "XAUUSD":
        return "OANDA:XAUUSD";
      case "XAGUSD":
        return "OANDA:XAGUSD";
      case "GBPUSD":
        return "FX:GBPUSD";
      case "USDJPY":
        return "FX:USDJPY";
      case "EURUSD":
        return "OANDA:EURUSD";
      case "AAPL":
        return "NASDAQ:AAPL";
      default:
        return `BINANCE:${s}`;
    }
  }, [symbol, open]);

  useEffect(() => {
    if (!ready || !container.current) return;

    container.current.innerHTML = "";

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.width = "100%";
    widget.style.height = "100%";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: tvSymbol,
      interval: time,
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "vi",
      hide_top_toolbar: true,
      hide_legend: true,
      hide_side_toolbar: true,
      allow_symbol_change: false,
      save_image: false,
      support_host: "https://www.tradingview.com",
    });

    container.current.appendChild(widget);
    container.current.appendChild(script);
  }, [ready, tvSymbol, time]);
  const TIMEFRAMES = [
    {
      label: "1 " + t("TradePage.title21"),
      value: "1",
      min: 10,
      max: 100,
      percent: 5,
    },
    {
      label: "5 " + t("TradePage.title21"),
      value: "5",
      min: 30,
      max: 300,
      percent: 8,
    },
    {
      label: "15 " + t("TradePage.title21"),
      value: "15",
      min: 50,
      max: 500,
      percent: 12,
    },
    {
      label: "1 " + t("TradePage.title22"),
      value: "60",
      min: 100,
      max: 1000,
      percent: 18,
    },
    {
      label: "4 " + t("TradePage.title22"),
      value: "240",
      min: 200,
      max: 2000,
      percent: 25,
    },
    {
      label: "1 " + t("TradePage.title23"),
      value: "D",
      min: 500,
      max: 5000,
      percent: 40,
    },
    {
      label: "1 " + t("TradePage.title24"),
      value: "W",
      min: 1000,
      max: 10000,
      percent: 60,
    },
  ];
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          width: {
            xs: "100%",
            sm: 448,
          },
          left: {
            xs: 0,
            sm: "35%",
          },

          right: "auto",
          bottom: 0,
          height: "70vh",
          bgcolor: "#0E0F18",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
    >
      <Box
        sx={{
          height: 56,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          flexShrink: 0,
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        <Box display="flex" gap={1} alignItems="center">
          <Typography
            sx={{
              fontSize: 18,
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            {symbol.replace("USDT", "/USDT")}
          </Typography>

          <Typography sx={{ fontSize: 18, color: "#fff" }}>
            {t("TradePage.title16")}
          </Typography>
        </Box>

        <KeyboardArrowUpIcon sx={{ color: "#fff", fontSize: 25 }} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", padding: "15px" }}>
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
            {TIMEFRAMES.map((item) => {
              const active = time === item.value;

              return (
                <Box
                  key={item.value}
                  onClick={() => {
                    setTime(item.value);
                    setTimeValue(item.label);
                  }}
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
                  {item.label}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box
        ref={container}
        className="tradingview-widget-container"
        sx={{
          flex: 1,
          minHeight: 0,
          width: "100%",
        }}
      />
    </Drawer>
  );
}
