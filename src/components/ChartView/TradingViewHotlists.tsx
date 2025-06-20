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
              s: "OKX:BTCUSDT",
            },
            {
              s: "OKX:ETHUSDT",
            },
            {
              s: "OKX:PIUSDT",
            },
            {
              s: "OKX:SOLUSDT",
            },
            {
              s: "OKX:DOGEUSDT",
            },
            {
              s: "OKX:OKBUSDT",
            },
            {
              s: "OKX:SPKUSDT.P",
            },
            {
              s: "OKX:PEPEUSDT",
            },
            {
              s: "OKX:IPUSDT",
            },
            {
              s: "OKX:TRUMPUSDT",
            },
            {
              s: "OKX:XRPUSDT",
            },
            {
              s: "OKX:RESOLVUSDT",
            },
            {
              s: "OKX:TUSDT",
            },
            {
              s: "OKX:XUSDT",
            },
            {
              s: "OKX:MAGICUSDT",
            },
            {
              s: "OKX:HUMAUSDT",
            },
            {
              s: "OKX:BCHUSDT",
            },
            {
              s: "OKX:SUIUSDT",
            },
            {
              s: "OKX:UNIUSDT",
            },
            {
              s: "OKX:PNUTUSDT",
            },
            {
              s: "OKX:RAYUSDT",
            },
            {
              s: "OKX:SNTUSDT",
            },
            {
              s: "OKX:MOODENGUSDT",
            },
            {
              s: "OKX:ADAUSDT",
            },
            {
              s: "OKX:WCTUSDT",
            },
            {
              s: "OKX:TONUSDT",
            },
            {
              s: "OKX:AERGOUSDT",
            },
            {
              s: "OKX:AAVEUSDT",
            },
            {
              s: "OKX:FILUSDT",
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
