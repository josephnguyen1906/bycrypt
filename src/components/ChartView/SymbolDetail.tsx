import React, { useEffect, useRef } from "react";

interface TechnicalAnalysisProps {
  symbol: string;
  width: string | null;
  height: string | null;
}

const TradingViewSymbolInfo: React.FC<TechnicalAnalysisProps> = ({
  symbol,
  width,
  height,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: "1m",
      width: width || "100%",
      height: height || "100%",
      isTransparent: false,
      symbol,
      showIntervalTabs: true,
      displayMode: "multiple",
      locale: "en",
      colorTheme: "dark",
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}></div>
  );
};

export default TradingViewSymbolInfo;
