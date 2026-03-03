"use client";
import { Box } from "@mui/material";
import React from "react";
import TradeChart from "@/components/ChartView/TradeChart";
import MarketDataWidget from "@/components/ChartView/MarketDataWidget";
import TradingViewTickerTape from "@/components/ChartView/TradingViewTickerTape";
import MarketDataWidget2 from "@/components/ChartView/MarketDataWidget2";
import MenuCoin from "@/components/subMenu/MenuCoin";
export default function TradePage() {
  return (
    <div className="home">
      <div className="home-mobile">
        <MenuCoin
          data={(v) => {
            console.log("v", v);
          }}
        />
      </div>
    </div>
  );
}
