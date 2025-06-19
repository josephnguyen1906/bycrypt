"use client";

import React, { useEffect, useRef, useState } from "react";

const TradingViewStockHeatmap: React.FC = () => {
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
      "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      exchanges: [],
      dataSource: "SPX500",
      grouping: "sector",
      blockSize: "market_cap_basic",
      blockColor: "change",
      locale: `"${language}"`,
      symbolUrl: "",
      colorTheme: "dark",
      hasTopBar: false,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: "90%",
      height: "300px",
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, [language]);

  return (
    <div
      className="tradingview-widget-container"
      style={{ width: "100%", height: "100%", border: "none" }}
    >
      <div
        ref={containerRef}
        className="tradingview-widget-container__widget"
        style={{ border: "none" }}
      />
      {/* Ẩn copyright nếu không muốn hiển thị */}
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

export default TradingViewStockHeatmap;
