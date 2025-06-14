"use client";

import React, { useEffect, useRef } from "react";

const TradingViewHotlists: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "12M",
      showChart: false,
      locale: "en",
      width: "100%",
      height: "600",
      largeChartUrl: "",
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      tabs: [
        {
          title: "Indices",
          symbols: [
            { s: "INDEX:BTCUSD", d: "BTCUSD" },
            { s: "CRYPTOCAP:BTC.D" },
            { s: "CRYPTOCAP:USDT.D" },
            { s: "OANDA:SPX500USD" },
            { s: "CRYPTOCAP:TOTAL3" },
            { s: "NSE:INDIAVIX" },
            { s: "NSE:BANKNIFTY" },
            { s: "CAPITALCOM:US500" },
          ],
          originalTitle: "Indices",
        },
        {
          title: "Forex",
          symbols: [
            { s: "FOREXCOM:EURUSD" },
            { s: "FOREXCOM:GBPUSD" },
            { s: "FOREXCOM:USDJPY" },
            { s: "FOREXCOM:GBPJPY" },
            { s: "FOREXCOM:USDCAD" },
            { s: "FOREXCOM:AUDUSD" },
            { s: "FOREXCOM:USDCHF" },
            { s: "FOREXCOM:EURJPY" },
            { s: "FOREXCOM:NZDUSD" },
            { s: "FOREXCOM:AUDJPY" },
            { s: "FOREXCOM:GBPAUD" },
            { s: "FOREXCOM:GBPCAD" },
          ],
          originalTitle: "Forex",
        },
        {
          title: "Futures",
          symbols: [
            { s: "CME_MINI:NQ1!" },
            { s: "CME_MINI:ES1!" },
            { s: "CME_MINI:MNQ1!" },
            { s: "CME_MINI:MES1!" },
            { s: "COMEX:GC1!" },
            { s: "CBOT_MINI:YM1!" },
            { s: "NYMEX:CL1!" },
            { s: "COMEX_MINI:MGC1!" },
            { s: "CME:BTC1!" },
            { s: "CME_MINI:RTY1!" },
            { s: "MCX:CRUDEOIL1!" },
            { s: "CME:6E1!" },
          ],
          originalTitle: "Futures",
        },
        {
          title: "Bonds",
          symbols: [
            { s: "TVC:US10Y" },
            { s: "TVC:US30Y" },
            { s: "TVC:US02Y" },
            { s: "TVC:US20Y" },
            { s: "TVC:US05Y" },
            { s: "TVC:JP10Y" },
            { s: "TVC:DE10Y" },
            { s: "TVC:US01Y" },
            { s: "TVC:GB10Y" },
            { s: "TVC:US10" },
            { s: "TVC:US03MY" },
            { s: "TVC:CA10Y" },
            { s: "TVC:AU10Y" },
            { s: "TVC:NZ10Y" },
            { s: "TVC:JP30Y" },
          ],
          originalTitle: "Bonds",
        },
      ],
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      style={{ border: "none", width: "100%", height: "100%" }}
    >
      <div
        ref={containerRef}
        className="tradingview-widget-container__widget"
      />
      <div className="tradingview-widget-copyright" style={{ display: "none" }}>
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewHotlists;
