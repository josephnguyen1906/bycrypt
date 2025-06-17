import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
type TradeChartProps = {
  symbols?: string;
  height?: string;
  width?: string;
};
const TradeChart = (props: TradeChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: props.width || "100%",
      height: props.height || "100%",
      symbol: `COINBASE:${props.symbols || "BTCUSD"}`,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      support_host: "https://www.tradingview.com",
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Xóa trước khi append mới
      containerRef.current.appendChild(script);
    }
  }, [props.symbols]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        border: "none",
        overflow: "hidden",
      }}
      className="tradingview-widget-container"
    />
  );
};
export default TradeChart;
