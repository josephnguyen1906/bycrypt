"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import { DownIcon, UpIcon } from "@/shared/Svgs/Svg.component";
import { IcoinFinace } from "@/interface/user.interface";
import { iconMap } from "./CoinPage";

type Coin = {
  symbol: string;
  name: string;
  title: string;
  price: number;
  changePercent: number;
  history: number[];
};

interface Props {
  menu: string;
  listCoin: IcoinFinace[];
  setMenu: (v: string) => void;
  changePercent: (s: string) => void;
  interval: string;
}

export default function CoinMenuMobile({
  menu,
  listCoin,
  setMenu,
  interval,
  changePercent,
}: Props) {
  const [coins, setCoins] = useState<Record<string, Coin>>({});

  /**
   * INIT COINS
   */
  useEffect(() => {
    if (!listCoin.length) return;

    const initial: Record<string, Coin> = {};

    listCoin.forEach((s) => {
      const symbol = s.name.toLowerCase();
      const name = s.title;

      initial[symbol] = {
        symbol: symbol.toUpperCase(),
        name: name,
        title: s.title,
        price: 0,
        changePercent: 0,
        history: [],
      };
    });

    setCoins(initial);
  }, [listCoin]);
  useEffect(() => {
    console.log("CREATE WS");

    const streams = listCoin
      .map((s) => `${s.name.toLowerCase()}usdt@kline_${interval}`)
      .join("/");

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`,
    );

    ws.onopen = () => {
      console.log("WS Connected");
    };

    ws.onclose = (e) => {
      console.log("WS Closed", e.code, e.reason);
    };

    return () => {
      console.log("CLEANUP");
      ws.close();
    };
  }, [interval]);
  useEffect(() => {
    if (!listCoin.length) return;

    const streams = listCoin
      .filter((s) => s.name !== "TRUMP")
      .map((s) => `${s.name.toLowerCase()}@kline_${interval}`)
      .join("/");

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`,
    );

    ws.onopen = () => {
      console.log("WS Connected");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      const k = msg?.data?.k;

      if (!k?.s) return;

      const symbol = k.s.toLowerCase();

      const open = Number(k.o);
      const close = Number(k.c);

      const percent = ((close - open) / open) * 100;

      setCoins((prev) => {
        if (!prev[symbol]) return prev;

        return {
          ...prev,
          [symbol]: {
            ...prev[symbol],
            price: close,
            changePercent: percent,
          },
        };
      });
    };

    ws.onerror = (err) => {
      console.log("WS Error", err);
    };

    ws.onclose = () => {
      console.log("WS Closed");
    };

    return () => {
      ws.close();
    };
  }, [listCoin, interval]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#111827",
        pb: "100px",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box sx={{ width: "80px", mb: "10px", p: 2 }}>
        <Typography sx={{ color: "#22c55e", fontSize: "16px" }}>
          USDT
        </Typography>

        <Divider
          sx={{
            width: 40,
            height: "2px",
            backgroundColor: "#22c55e",
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
  setMenu: (v: string) => void;
}) {
  const baseSymbol = coin.title.replace("/USDT", "");

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
      onClick={() => setMenu(coin.symbol.toLowerCase())}
    >
      <Box sx={{ display: "flex", gap: "5px" }}>
        <Avatar src={iconMap[baseSymbol] || ""} sx={{ width: 30, height: 30 }}>
          {baseSymbol.charAt(0)}
        </Avatar>
        <Typography fontWeight="bold" sx={{ fontSize: 12, color: "white" }}>
          {coin.name}
        </Typography>
      </Box>

      <Box textAlign="right">
        <Typography fontWeight="bold" sx={{ fontSize: 12, color: "white" }}>
          {coin.price ? coin.price.toLocaleString() : "-"}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
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
