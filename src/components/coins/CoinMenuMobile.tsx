"use client";

import { useEffect, useRef, useState } from "react";

import {
  Box,
  Typography,
  Divider,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";

import { DownIcon, UpIcon } from "@/shared/Svgs/Svg.component";

import { IcoinFinace } from "@/interface/user.interface";

import { iconMap } from "./CoinPage";

import { getDataChartSiderbar } from "@/services/User.service";
import { CloseOutlined } from "@mui/icons-material";
import { isCryptoCoinSymbol } from "@/utils/specialCoins";

type Coin = {
  symbol: string;
  name: string;
  title: string;
  price: number;
  changePercent: number;
};

interface Props {
  menu: string;
  listCoin: Array<IcoinFinace & { symbol: string; coinname?: string }>;
  setMenu: (v: string) => void;
  changePercent: (s: string) => void;
  handleDrawerClose: () => void;
  interval: string;
}

export default function CoinMenuMobile({
  menu,
  listCoin,
  setMenu,
  handleDrawerClose,
}: Props) {
  const [marketData, setMarketData] = useState<any>({});

  const fetchingRef = useRef(false);

  const fetchTicker = async () => {
    if (fetchingRef.current || !listCoin?.length) return;

    fetchingRef.current = true;

    try {
      const cryptoCoins = listCoin.filter((coin) =>
        isCryptoCoinSymbol(coin.symbol),
      );

      const [cryptoResponses, specialRes] = await Promise.all([
        Promise.all(
          cryptoCoins.map(async (coin: any) => {
            try {
              const symbol = coin.symbol;
              const res = await fetch(
                `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
              );
              const data = await res.json();

              if (!data?.lastPrice) return null;

              return {
                symbol,
                close: Number(data.lastPrice),
                change: Number(data.priceChangePercent),
              };
            } catch (error) {
              // console.log("BINANCE ERROR:", error);
              return null;
            }
          }),
        ),
        getDataChartSiderbar(),
      ]);

      const specialResponses = (specialRes?.data ?? []).map((item: any) => ({
        symbol: item.symbol,
        close: Number(item.data.close),
        change: Number(item.data.change_percent),
      }));

      const formatted: any = {};

      [...cryptoResponses, ...specialResponses].forEach((item: any) => {
        if (!item) return;
        formatted[item.symbol] = item;
      });

      setMarketData(formatted);
    } catch (error) {
      // console.log("FETCH ERROR:", error);
    } finally {
      fetchingRef.current = false;
    }
  };

  /**
   * INIT
   */
  useEffect(() => {
    if (!listCoin?.length) return;

    fetchTicker();

    /**
     * UPDATE 60s
     */
    const interval = setInterval(() => {
      fetchTicker();
    }, 60000);

    return () => clearInterval(interval);
  }, [listCoin]);

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
      {/* HEADER */}
      <Box
        sx={{
          width: "80px",

          mb: "10px",

          p: 2,
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          <CloseOutlined
            sx={{ color: "white", width: "20px", height: "20px" }}
          />
        </IconButton>
      </Box>

      {/* LIST */}
      {listCoin?.map((coin: any) => {
        const symbol = coin.symbol;

        const data = marketData[symbol];

        const active = menu?.toUpperCase() === symbol;

        return (
          <Box
            key={coin.id}
            onClick={() => setMenu(symbol)}
            sx={{
              width: "100%",

              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              cursor: "pointer",

              p: 2,

              background: active ? "#374151" : "#111827",

              transition: "0.2s",

              "&:hover": {
                background: "#1f2937",
              },
            }}
          >
            {/* LEFT */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                src={
                  iconMap[coin.symbol] ||
                  `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin?.coinname?.toLowerCase()}.png`
                }
                sx={{
                  width: 30,
                  height: 30,
                }}
              >
                {coin.symbol.charAt(0)}
              </Avatar>

              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: 12,

                  color: "white",
                }}
              >
                {coin.title}
              </Typography>
            </Stack>

            {/* RIGHT */}
            <Box textAlign="right">
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: 12,

                  color: "white",
                }}
              >
                {data?.close ? Number(data.close).toLocaleString() : "--"}
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "flex-end",

                  gap: 0.5,

                  color: Number(data?.change) < 0 ? "#ef4444" : "#22c55e",
                }}
              >
                {Number(data?.change) < 0 ? (
                  <DownIcon width="16px" height="16px" fill="#ef4444" />
                ) : (
                  <UpIcon width="16px" height="16px" fill="#22c55e" />
                )}

                {data?.change !== undefined
                  ? `${Number(data.change).toFixed(2)}%`
                  : "--"}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
