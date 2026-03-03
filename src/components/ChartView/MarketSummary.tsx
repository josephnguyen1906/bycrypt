"use client";

import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "tv-market-summary": any;
    }
  }
}

export default function MarketSummary() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://widgets.tradingview-widget.com/w/en/tv-market-summary.js";
    script.type = "module";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <tv-market-summary
        theme="dark"
        color-theme="dark"
        symbol-sectors={JSON.stringify([
          {
            sectionName: "USDT",
            symbols: [
              "BINANCE:BTCUSDT",
              "BINANCE:ETHUSDT",
              "BINANCE:BCHUSDT",
              "BINANCE:LTCUSDT",
              "BINANCE:UNIUSDT",
              "BINANCE:XAUUSDT.P",
              "BINANCE:DOTUSDT",
              "BINANCE:SOLUSDT",
              "BINANCE:TRBUSDT",
              "BINANCE:TRXUSDT",
              "BINANCE:XRPUSDT",
              "BINANCE:TRUMPUSDT",
            ],
          },
        ])}
        time-frame="LASTSESSION"
        show-time-range
        direction="horizontal"
        mode="custom"
      />
    </div>
  );
}
