"use client";
import React, { useEffect, useRef, memo } from "react";

function TradeWidget() {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;

    // Clear old widget if it exists
    currentContainer.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "backgroundColor": "rgba(0, 0, 0, 1)",
          "gridColor": "rgba(0, 0, 0, 0.06)",
          "withdateranges": true,
          "range": "ALL",
          "allow_symbol_change": true,
          "watchlist": [
            "CMCMARKETS:EURUSD",
            "FX:EURUSD",
            "OANDA:EURUSD",
            "FX:GBPUSD",
            "OANDA:GBPUSD",
            "FX:USDJPY",
            "OANDA:GBPJPY",
            "OANDA:USDJPY",
            "FOREXCOM:EURUSD",
            "OANDA:AUDUSD",
            "OANDA:USDCAD",
            "FOREXCOM:GBPUSD"
          ],
          "compareSymbols": [
            {
              "symbol": "FOREXCOM:EURUSD",
              "position": "SameScale"
            }
          ],
          "details": true,
          "studies": [
            "STD;24h%Volume"
          ],
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "support_host": "https://www.tradingview.com"
        }`;
    currentContainer.appendChild(script);
    return () => {
      currentContainer.innerHTML = ""; // Cleanup script when component unmounts
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
      <div className="tradingview-widget-copyright">
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
}

export default memo(TradeWidget);
