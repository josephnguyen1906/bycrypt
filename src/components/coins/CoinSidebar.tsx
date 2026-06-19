"use client";

import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { iconMap } from "./CoinPage";
import { getDataChartSiderbar } from "@/services/User.service";
import { isCryptoCoinSymbol } from "@/utils/specialCoins";

export default function CoinSidebar({ coins, selectedCoin, onSelect }: any) {
  const [marketData, setMarketData] = useState<any>({});
  const fetchingRef = useRef(false);

  const fetchCryptoPrices = async (cryptoCoins: any[]) => {
    const responses = await Promise.all(
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
        } catch {
          return null;
        }
      }),
    );

    return responses.filter(Boolean);
  };

  const fetchSpecialPrices = async () => {
    const res: any = await getDataChartSiderbar();
    const result: any[] = res?.data ?? [];

    return result.map((item: any) => ({
      symbol: item.symbol,
      close: Number(item.data.close),
      change: Number(item.data.change_percent),
      high: Number(item.data.high),
      low: Number(item.data.low),
    }));
  };

  const fetchTicker = async () => {
    if (fetchingRef.current || !coins?.length) return;

    fetchingRef.current = true;

    try {
      const cryptoCoins = coins.filter((coin: { symbol: string }) =>
        isCryptoCoinSymbol(coin.symbol),
      );

      const [cryptoResponses, specialResponses] = await Promise.all([
        fetchCryptoPrices(cryptoCoins),
        fetchSpecialPrices(),
      ]);

      const formatted: any = {};

      [...cryptoResponses, ...specialResponses].forEach((item: any) => {
        if (!item) return;
        formatted[item.symbol] = item;
      });

      setMarketData(formatted);
    } catch (error) {
      // console.log("FETCH TICKER ERROR:", error);
    } finally {
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    if (!coins?.length) return;

    fetchTicker();
    const interval = setInterval(fetchTicker, 8000);

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
        const symbol = coin.symbol;
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
