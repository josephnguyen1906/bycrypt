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
            {
              s: "CRYPTOCAP:BTC",
            },
            {
              s: "CRYPTOCAP:ETH",
            },
            {
              s: "OKX:PIUSD",
            },
            {
              s: "CRYPTOCAP:SOL",
            },
            {
              s: "CAPITALCOM:DOGEUSD",
            },
            {
              s: "OKX:OKBUSDT",
            },
            {
              s: "BINANCE:SPKUSDT.P",
            },
            {
              s: "CRYPTOCAP:PEPE",
            },
            {
              s: "OKX:RADARUSD",
            },
            {
              s: "BINANCE:TRUMPUSDT",
            },
            {
              s: "BITMEX:BXT",
            },
            {
              s: "NASDAQ:RAY",
            },
            {
              s: "CRYPTOCAP:XRP",
            },
            {
              s: "TSXV:OLV",
            },
            {
              s: "NASDAQ:HUMA",
            },
            {
              s: "CRYPTOCAP:SUI",
            },
            {
              s: "CSE:IP",
            },
            {
              s: "BME:UNI",
            },
            {
              s: "CRYPTOCAP:BCH",
            },
            {
              s: "BITMEX:BKAITOT",
            },
            {
              s: "CBOE:WLDR",
            },
            {
              s: "GEMINI:JTOUSD",
            },
            {
              s: "CRYPTOCAP:ADA",
            },
            {
              s: "CRYPTOCAP:TON",
            },
            {
              s: "OMXTSE:MAGIC",
            },
            {
              s: "CRYPTO:ZKJUSD",
            },
            {
              s: "NASDAQ:WCT",
            },
            {
              s: "BX:AAVE",
            },
            {
              s: "CRYPTOCAP:FIL",
            },
          ],
          originalTitle: "Favorite",
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
