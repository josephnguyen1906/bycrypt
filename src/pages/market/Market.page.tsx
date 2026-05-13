"use client";
import { Box } from "@mui/material";
import React from "react";
import TradeChart from "@/components/ChartView/TradeChart";
import MarketDataWidget from "@/components/ChartView/MarketDataWidget";
import TradingViewTickerTape from "@/components/ChartView/TradingViewTickerTape";
import MarketDataWidget2 from "@/components/ChartView/MarketDataWidget2";
export default function MarketPage() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#000",
        paddingTop: {
          xs: "0px",
          sm: "100px",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <TradingViewTickerTape />
          <MarketDataWidget2 height={700} theme="dark" />
        </Box>
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        >
          {/* <MarketDataWidget /> */}
          <TradingViewTickerTape />
          <MarketDataWidget2 height={700} theme="dark" />
        </Box>
      </Box>
    </Box>
  );
}
