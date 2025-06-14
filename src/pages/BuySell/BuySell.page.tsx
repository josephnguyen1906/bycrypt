"use client";
import { Box } from "@mui/material";
import React from "react";
import TradeChart from "@/components/ChartView/TradeChart";
import MarketDataWidget from "@/components/ChartView/MarketDataWidget";
import TradingViewTickerTape from "@/components/ChartView/TradingViewTickerTape";
import TradingViewTechnicalAnalysis from "@/components/ChartView/TradingViewTechnicalAnalysis";
export default function BuySellPage() {
  return (
    <Box sx={{ background: "#000", paddingTop: { xs: "0px", sm: "70px" } }}>
      <Box
        sx={{
          height: "700px",
          // padding: "20px 0",
        }}
      >
        <TradeChart />
        <Box sx={{ display: { xs: "block", sm: "none" }, height: "500px" }}>
          <TradingViewTechnicalAnalysis />
        </Box>
      </Box>
    </Box>
  );
}
