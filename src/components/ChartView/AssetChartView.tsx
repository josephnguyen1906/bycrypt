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
        { description: "", proName: "OKX:BTCUSDT" },
        { description: "", proName: "OKX:ETHUSDT" },
        { description: "", proName: "OKX:PIUSDT" },
        { description: "", proName: "OKX:SOLUSDT" },
        { description: "", proName: "OKX:DOGEUSDT" },
        { description: "", proName: "OKX:OKBUSDT" },
        { description: "", proName: "OKX:SPKUSDT.P" },
        { description: "", proName: "OKX:PEPEUSDT" },
        { description: "", proName: "OKX:IPUSDT" },
        { description: "", proName: "OKX:TRUMPUSDT" },
        { description: "", proName: "OKX:XRPUSDT" },
        { description: "", proName: "OKX:RESOLVUSDT" },
        { description: "", proName: "OKX:TUSDT" },
        { description: "", proName: "OKX:XUSDT" },
        { description: "", proName: "OKX:MAGICUSDT" },
        { description: "", proName: "OKX:HUMAUSDT" },
        { description: "", proName: "OKX:BCHUSDT" },
        { description: "", proName: "OKX:SUIUSDT" },
        { description: "", proName: "OKX:UNIUSDT" },
        { description: "", proName: "OKX:PNUTUSDT" },
        { description: "", proName: "OKX:RAYUSDT" },
        { description: "", proName: "OKX:SNTUSDT" },
        { description: "", proName: "OKX:MOODENGUSDT" },
        { description: "", proName: "OKX:ADAUSDT" },
        { description: "", proName: "OKX:WCTUSDT" },
        { description: "", proName: "OKX:TONUSDT" },
        { description: "", proName: "OKX:AERGOUSDT" },
        { description: "", proName: "OKX:AAVEUSDT" },
        { description: "", proName: "OKX:FILUSDT" },
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
