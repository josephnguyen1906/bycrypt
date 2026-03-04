"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Tab,
  Divider,
} from "@mui/material";
import { DownIcon, UpIcon } from "@/shared/Svgs/Svg.component";
type Coin = {
  symbol: string;
  price: number;
  changePercent: number;
  history: number[];
};

const symbols = [
  "btcusdt",
  "ethusdt",
  "bchusdt",
  "ltcusdt",
  "uniusdt",
  //   "XAUUSDT",
  "dotusdt",
  "solusdt",
  "trbusdt",
  "trxusdt",
  "xrpusdt",
  "trumpusdt",
];

interface props {
  menu: string;
  setMenu: (string: string) => void;
  changePercent: (s: string) => void;
  interval: string;
}

export default function CoinMenuMobile({
  menu,
  setMenu,
  interval,
  changePercent,
}: props) {
  const [coins, setCoins] = useState<Record<string, Coin>>({});
  useEffect(() => {
    fetch(
      "https://api.binance.com/api/v3/ticker/24hr?symbols=" +
        JSON.stringify(symbols.map((s) => s.toUpperCase())),
    )
      .then((res) => res.json())
      .then((data) => {
        const initial: Record<string, Coin> = {};
        data.forEach((item: any) => {
          const base = parseFloat(item.lastPrice);
          initial[item.symbol.toLowerCase()] = {
            symbol: item.symbol,
            price: parseFloat(item.lastPrice),
            changePercent: Number(item.priceChangePercent) || 0,
            history: Array.from(
              { length: 20 },
              (_, i) => base * (1 + (Math.random() - 0.5) * 0.002),
            ),
          };
        });
        setCoins(initial);
      });
  }, []);

  // WebSocket realtime
  useEffect(() => {
    const streams = symbols.map((s) => `${s}@kline_${interval}`).join("/");

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`,
    );

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const k = msg?.data?.k;

      if (!k?.s || !k?.o || !k?.c) return;

      setCoins((prev) => {
        const symbol = k.s.toLowerCase();
        if (!prev[symbol]) return prev;

        const open = Number(k.o);
        const close = Number(k.c);

        const newChange = open > 0 ? ((close - open) / open) * 100 : 0;

        const updatedHistory = [...prev[symbol].history.slice(-19), close];
        if (symbol === menu) {
          changePercent?.(newChange.toFixed(2));
        }
        return {
          ...prev,
          [symbol]: {
            ...prev[symbol],
            price: close,
            changePercent: newChange,
            history: updatedHistory,
          },
        };
      });
    };

    return () => ws.close();
  }, [interval]);

  return (
    <Box sx={{ minHeight: "100vh", background: "#111827" }}>
      <Box sx={{ width: "80px", mb: "10px", p: 2 }}>
        <Typography sx={{ color: "#22c55e", fontSize: "16px" }}>
          USDT
        </Typography>
        <Divider
          sx={{
            width: 40,
            height: "2px",
            backgroundColor: "#22c55e",
            alignSelf: "center", // nếu đang trong flex column
          }}
        />
      </Box>
      {Object.values(coins).map((coin) => (
        <CoinCard key={coin.symbol} coin={coin} menu={menu} setMenu={setMenu} />
      ))}
    </Box>
  );
}

function CoinCard({
  coin,
  setMenu,
  menu,
}: {
  coin: Coin;
  menu: string;
  setMenu: (string: string) => void;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        background: menu === coin.symbol.toLowerCase() ? "#374151" : "#111827",
        alignItems: "center",
        cursor: "pointer",
        p: 2,
      }}
      onClick={() => {
        setMenu(coin.symbol.toLowerCase());
      }}
    >
      <Typography fontWeight="bold" sx={{ fontSize: "12px", color: "white" }}>
        {coin.symbol}
      </Typography>
      <Box textAlign="right">
        <Typography fontWeight="bold" sx={{ fontSize: "12px", color: "white" }}>
          {coin.price.toLocaleString()}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: coin.changePercent < 0 ? "#ef4444" : "#22c55e",
          }}
        >
          {coin.changePercent < 0 ? (
            <DownIcon width="16px" height="16px" fill="#ef4444" />
          ) : (
            <UpIcon width="16px" height="16px" fill="#22c55e" />
          )}
          {coin.changePercent.toFixed(2)}%
        </Typography>
      </Box>
    </Box>
  );
}
