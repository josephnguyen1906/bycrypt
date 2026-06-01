"use client";

import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { iconMap } from "./CoinPage";
import { getDataChart, getDataChartSiderbar } from "@/services/User.service";

export default function CoinSidebar({ coins, selectedCoin, onSelect }: any) {
  const [marketData, setMarketData] = useState<any>({});

  /**
   * PREVENT DUPLICATE REQUEST
   */
  const fetchingRef = useRef(false);

  /**
   * SPECIAL SYMBOLS
   * -> CALL getDataChart()
   */
  const SPECIAL_SYMBOLS: any = {
    XAUUSDT: "XAUUSD",
    XAGUSDT: "XAGUSD",
    GBPUSDT: "GBPUSD",
    USDJPY: "USDJPY",
    EURUSDT: "EURUSD",
    AAPL: "AAPL",
  };

  /**
   * NORMALIZE SYMBOL
   */
  const normalizeSymbol = (coin: any) => {
    return coin.symbol;
  };

  const normalizeSymbolCheck = (coin: any) => {
    return coin.name.replace("-", "").toUpperCase();
  };

  /**
   * FETCH ALL MARKET
   */
  const fetchTicker = async () => {
    /**
     * AVOID MULTIPLE CALL
     */
    if (fetchingRef.current) return;

    fetchingRef.current = true;

    try {
      /**
       * BINANCE COINS
       */
      const cryptoCoins = coins.filter((coin: any) => {
        const symbol = normalizeSymbolCheck(coin);

        return !SPECIAL_SYMBOLS[symbol];
      });

      /**
       * =========================
       * FETCH BINANCE
       * =========================
       */
      const cryptoResponses = await Promise.all(
        cryptoCoins.map(async (coin: any) => {
          try {
            const symbol = normalizeSymbol(coin);

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
      );

      /**
       * =========================
       * FETCH SPECIAL
       * =========================
       *
       * FETCH SEQUENTIAL
       * tránh spam API
       */
      const specialResponses: any[] = [];

      const res: any = await getDataChartSiderbar();
      const result: any[] = res?.data;
      result.map((result: any) => {
        specialResponses.push({
          symbol: result.symbol,
          close: Number(result.data.close),
          change: Number(result.data.change_percent),
          high: Number(result.data.high),
          low: Number(result.data.low),
        });
      });
      /**
       * =========================
       * MERGE
       * =========================
       */
      const formatted: any = {};

      [...cryptoResponses, ...specialResponses].forEach((item: any) => {
        if (!item) return;

        formatted[item.symbol] = item;
      });

      setMarketData(formatted);
    } catch (error) {
      console.log("FETCH TICKER ERROR:", error);
    } finally {
      fetchingRef.current = false;
    }
  };

  /**
   * INIT
   */
  useEffect(() => {
    if (!coins?.length) return;
    fetchTicker();
    const interval = setInterval(() => {
      fetchTicker();
    }, 5000);

    return () => clearInterval(interval);
  }, [coins]);

  return (
    <Box
      sx={{
        background: "#061018",
        overflowY: "auto",
        height: "100%",
      }}
    >
      {coins?.map((coin: any) => {
        const symbol = normalizeSymbol(coin);
        const data = marketData[symbol];
        const active = selectedCoin?.symbol === coin.symbol;

        return (
          <Box
            key={coin.id}
            onClick={() => onSelect(coin)}
            sx={{
              cursor: "pointer",
              px: 2,
              py: 1.5,
              borderBottom: "1px solid #111",
              background: active ? "#0c1b29" : "transparent",
              transition: "0.2s",

              "&:hover": {
                background: "#0c1b29",
              },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* LEFT */}
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src={
                    iconMap[coin.symbol] ||
                    `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin?.coinname?.toLowerCase()}.png`
                  }
                  sx={{
                    width: 28,
                    height: 28,
                  }}
                >
                  {coin.symbol.charAt(0)}
                </Avatar>

                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {coin.title}
                </Typography>
              </Stack>

              {/* RIGHT */}
              <Box textAlign="right">
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {data?.close ? Number(data.close).toLocaleString() : "--"}
                </Typography>

                <Typography
                  sx={{
                    color: Number(data?.change) >= 0 ? "#00c853" : "#ff5252",

                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {data?.change !== undefined
                    ? `${Number(data.change).toFixed(2)}%`
                    : "--"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}
