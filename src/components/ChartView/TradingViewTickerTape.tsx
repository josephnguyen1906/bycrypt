"use client";

import React, { useEffect, useRef } from "react";

const TradingViewTickerTape: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { description: "Tesla", proName: "NASDAQ:TSLA" },
        { description: "Apple Inc", proName: "NASDAQ:AAPL" },
        { description: "Nvidia", proName: "NASDAQ:NVDA" },
        { description: "Microsoft", proName: "NASDAQ:MSFT" },
        { description: "Advanced Micro Devices", proName: "NASDAQ:AMD" },
        { description: "Meta", proName: "NASDAQ:META" },
        { description: "Netflix", proName: "NASDAQ:NFLX" },
      ],
      showSymbolLogo: true,
      colorTheme: "light",
      isTransparent: false,
      displayMode: "compact",
      locale: "en",
    });
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div
        ref={containerRef}
        className="tradingview-widget-container__widget"
      />
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default TradingViewTickerTape;
