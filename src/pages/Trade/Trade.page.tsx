"use client";
import { Box } from "@mui/material";
import React from "react";
import TradeChart from "@/components/ChartView/TradeChart";
import MarketDataWidget from "@/components/ChartView/MarketDataWidget";
import TradingViewTickerTape from "@/components/ChartView/TradingViewTickerTape";
export default function TradePage() {
  return (
    <Box sx={{ background: "#fff", paddingTop: "70px" }}>
      <Box
        sx={{
          height: "800px",
          // padding: "20px 0",
        }}
      >
        <TradingViewTickerTape />
        <MarketDataWidget height={700} theme="light" />
      </Box>
    </Box>
  );
}
