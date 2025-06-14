"use client";

import React, { useEffect, useRef } from "react";

const TradingViewTechnicalAnalysis: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      interval: "1m",
      width: "100%",
      height: "200px",
      isTransparent: true, // giúp nền trong suốt, không viền
      symbol: "NASDAQ:AAPL",
      showIntervalTabs: true,
      displayMode: "single",
      locale: "en",
      colorTheme: "dark",
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      style={{ width: "100%", height: "200px", border: "none" }}
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

export default TradingViewTechnicalAnalysis;
