"use client";

import React, { useEffect, useRef, useState } from "react";

const TradingViewTickerTape: React.FC = () => {
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
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BINANCE:BTCUSDT", description: "BTC" },
        { proName: "BINANCE:ETHUSDT", description: "ETH" },
        { proName: "BINANCE:BCHUSDT", description: "BCH" },
        { proName: "BINANCE:LTCUSDT", description: "LTC" },
        { proName: "BINANCE:UNIUSDT", description: "UNI" },
        { proName: "BINANCE:XAUUSDT.P", description: "XAU" },
        { proName: "BINANCE:DOTUSDT", description: "DOT" },
        { proName: "BINANCE:SOLUSDT", description: "SOL" },
        { proName: "BINANCE:TRBUSDT", description: "TRB" },
        { proName: "BINANCE:TRXUSDT", description: "TRX" },
        { proName: "BINANCE:XRPUSDT", description: "XRP" },
        { proName: "BINANCE:TRUMPUSDT", description: "TRUMP" },
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: false,
      showChart: true,
      displayMode: "compact",
      width: "100%",
      height: 450,
      locale: `"${language}"`,
    });
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, [language]);

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
