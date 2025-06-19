"use client";

import React, { useEffect, useRef, useState } from "react";

const TradingViewHotlists: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<string>("en");

  // Get language from localStorage on first mount
  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";
    setLanguage(storedLang);
  }, []);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12M",
      showChart: false,
      locale: `"${language}"`,
      width: "100%",
      height: "600",
      largeChartUrl: "",
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      tabs: [
        {
          title: "Favorite",
          symbols: [
            { s: "OKX:PIUSDT", d: "PIUSDT" },
            { s: "CRYPTOCAP:USDT.D" },
            { s: "INDEX:BTCUSD" },
            { s: "CRYPTOCAP:BTC.D" },
            { s: "OANDA:SPX500USD" },
            { s: "CRYPTOCAP:TOTAL3" },
            { s: "FOREXCOM:EURUSD" },
            { s: "FOREXCOM:GBPUSD" },
            { s: "FOREXCOM:USDJPY" },
            { s: "CAPITALCOM:US500" },
          ],
          originalTitle: "Favorite",
        },
        {
          title: "Popular",
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
          originalTitle: "Popular",
        },
        {
          title: "Latest",
          symbols: [
            { s: "OKX:PIUSDT", d: "PIUSDT" },
            { s: "CRYPTOCAP:USDT.D" },
            { s: "CRYPTOCAP:TOTAL3" },
            { s: "CAPITALCOM:US500" },
            { s: "FOREXCOM:NZDUSD" },
            { s: "FOREXCOM:AUDJPY" },
            { s: "FOREXCOM:GBPAUD" },
            { s: "FOREXCOM:GBPCAD" },
            { s: "FOREXCOM:EURUSD" },
            { s: "FOREXCOM:GBPUSD" },
            { s: "FOREXCOM:USDJPY" },
          ],
          originalTitle: "Latest",
        },
      ],
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, [language]);

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
