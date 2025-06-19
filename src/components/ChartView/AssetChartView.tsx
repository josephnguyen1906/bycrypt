// import React, { useEffect, useRef } from "react";

// const TradingViewTickersWidget = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
//     script.async = true;
//     script.innerHTML = JSON.stringify({
//       symbols: [
//         { description: "", proName: "CRYPTOCAP:USDT" },
//         { description: "", proName: "OKX:PIUSDT" },
//         { description: "", proName: "CRYPTOCAP:USDC.D" },
//         { description: "", proName: "COINBASE:ETHUSD" },
//         { description: "", proName: "CRYPTOCAP:BTC.D" },
//       ],
//       isTransparent: false,
//       showSymbolLogo: true,
//       colorTheme: "dark",
//       locale: "en"
//     });

//     if (containerRef.current) {
//       containerRef.current.innerHTML = ""; // clear if rerender
//       containerRef.current.appendChild(script);
//     }
//   }, []);

//   return (
//     <div
//       className="tradingview-widget-container"
//       ref={containerRef}
//       style={{ width: "100%", border: "none" }}
//     />
//   );
// };

// export default TradingViewTickersWidget;
"use client";

import React, { useEffect, useRef, useState } from "react";

const AssetChartView: React.FC = () => {
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
        { description: "", proName: "CRYPTOCAP:USDT" },
        { description: "", proName: "OKX:PIUSDT" },
        { description: "", proName: "CRYPTOCAP:USDC.D" },
        { description: "", proName: "COINBASE:ETHUSD" },
        { description: "", proName: "CRYPTOCAP:BTC.D" },
        { description: "Tesla", proName: "NASDAQ:TSLA" },
        { description: "Apple Inc", proName: "NASDAQ:AAPL" },
        { description: "Nvidia", proName: "NASDAQ:NVDA" },
        { description: "Microsoft", proName: "NASDAQ:MSFT" },
        { description: "Advanced Micro Devices", proName: "NASDAQ:AMD" },
        { description: "Meta", proName: "NASDAQ:META" },
        { description: "Netflix", proName: "NASDAQ:NFLX" },
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      //   isTransparent: false,
      locale: `"${language}"`,
      width: "100%",
      height: "300px",
      displayMode: "compact",
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

export default AssetChartView;
