import { useEffect, useRef, useState } from "react";
type MarketDataWidgetProps = {
  width?: number;
  height?: number;
  theme?: "light" | "dark";
};

const MarketDataWidget2 = (progs: MarketDataWidgetProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<string>("en");

  // Get language from localStorage on first mount
  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";
    setLanguage(storedLang);
  }, []);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Xóa widget cũ trước khi render mới
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: progs.width || "100%",
      height: progs.height,
      symbolsGroups: [
        {
          name: "Indices",
          originalName: "Indices",
          symbols: [
            { name: "BINANCE:BTCUSDT", displayName: "BTC" },
            { name: "BINANCE:ETHUSDT", displayName: "ETH" },
            { name: "BINANCE:BCHUSDT", displayName: "BCH" },
            { name: "BINANCE:LTCUSDT", displayName: "LTC" },
            { name: "BINANCE:UNIUSDT", displayName: "UNI" },
            { name: "BINANCE:XAUUSDT.P", displayName: "XAU" },
            { name: "BINANCE:DOTUSDT", displayName: "DOT" },
            { name: "BINANCE:SOLUSDT", displayName: "SOL" },
            { name: "BINANCE:TRBUSDT", displayName: "TRB" },
            { name: "BINANCE:TRXUSDT", displayName: "TRX" },
            { name: "BINANCE:XRPUSDT", displayName: "XRP" },
            { name: "BINANCE:TRUMPUSDT", displayName: "TRUMP" },
          ],
        },
        {
          name: "Forex",
          originalName: "Forex",
          symbols: [
            { name: "FX:EURUSD", displayName: "EUR to USD" },
            { name: "FX:GBPUSD", displayName: "GBP to USD" },
            { name: "FX:USDJPY", displayName: "USD to JPY" },
            { name: "FX:USDCHF", displayName: "USD to CHF" },
            { name: "FX:AUDUSD", displayName: "AUD to USD" },
            { name: "FX:USDCAD", displayName: "USD to CAD" },
          ],
        },
        {
          name: "Futures",
          originalName: "Futures",
          symbols: [
            { name: "BMFBOVESPA:ISP1!", displayName: "S&P 500 Index Futures" },
            { name: "BMFBOVESPA:EUR1!", displayName: "Euro Futures" },
            { name: "PYTH:WTI3!", displayName: "WTI CRUDE OIL" },
            { name: "BMFBOVESPA:ETH1!", displayName: "Hydrous ethanol" },
            { name: "BMFBOVESPA:CCM1!", displayName: "Corn" },
          ],
        },
        {
          name: "Bonds",
          originalName: "Bonds",
          symbols: [
            { name: "EUREX:FGBL1!", displayName: "Euro Bund" },
            { name: "EUREX:FBTP1!", displayName: "Euro BTP" },
            { name: "EUREX:FGBM1!", displayName: "Euro BOBL" },
          ],
        },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      colorTheme: "dark",
      locale: `"${language}"`,
      backgroundColor: "#131722",
    });

    container.appendChild(script);

    return () => {
      container.innerHTML = ""; // Cleanup on unmount
    };
  }, [progs.width, progs.height, language]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget" />
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
};

export default MarketDataWidget2;
