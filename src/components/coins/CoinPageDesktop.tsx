"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { LineChart, Line, YAxis, ReferenceLine, Area, Tooltip } from "recharts";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslation } from "react-i18next";
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
  "paxgusdt",
  "dotusdt",
  "solusdt",
  "trbusdt",
  "trxusdt",
  "xrpusdt",
  "trumpusdt",
  "dogeusdt",
  "taousdt",
  "linkusdt",
  "aptusdt",
  "bnbusdt",
  "usdcusdt",
];
const iconMap: Record<string, string> = {
  BTC: "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/bitcoin/small.png",
  ETH: "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/ethereum/small.png",
  BCH: "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/bitcoin-cash/small.png",
  LTC: "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/litecoin/small.png",
  UNI: "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/uniswap/small.png",
  DOT: "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/polkadot/small.png",
  SOL: "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/solana/small.png",
  TRB: "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/tellor/small.png",
  TRX: "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/tron/small.png",
  XRP: "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/ripple/small.png",
  PAXG: "/images/18a638a4-aed3-4306-9e18-ad35e03d442a.png",
  TRUMP:
    "https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images/maga/small.png",
  DOGE: "/images/22ef2baf-b210-4882-afd9-1317bb7a3603.png",
  TAO: "/images/e46210b3-26dd-4eeb-976c-c209a90c3613.png",
  LINK: "/images/1eda1f7f-585a-4f16-abd7-a7104221414a.png",
  APT: "/images/f3dff438-2cc0-4d32-b419-935ab660b3ea.png",
  BNB: "/images/94863af2-c980-42cf-a139-7b9f462a36c2.png",
  USDC: "/images/4cf7d633-92fb-4d37-80ed-458c7d1ea410.png",
};

export default function CoinPageDesktop() {
  const [coins, setCoins] = useState<Record<string, Coin>>({});
  const { t, i18n } = useTranslation();

  // Fetch initial price
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
    const streams = symbols.map((s) => `${s}@miniTicker`).join("/");
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`,
    );

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const data = msg.data;

      if (!data?.s || !data?.c || !data?.o) return;

      setCoins((prev) => {
        const symbol = data.s.toLowerCase();
        if (!prev[symbol]) return prev;

        const last = Number(data.c);
        const open = Number(data.o);

        const newChange = open > 0 ? ((last - open) / open) * 100 : 0;

        const updatedHistory = [...prev[symbol].history.slice(-19), last];

        return {
          ...prev,
          [symbol]: {
            ...prev[symbol],
            price: last,
            changePercent: newChange,
            history: updatedHistory,
          },
        };
      });
    };

    return () => ws.close();
  }, []);

  return (
    <Box
      sx={{ minHeight: "100vh", background: "#141A1F", p: 2, width: "100%" }}
    >
      <Box sx={{ width: "70%", margin: "auto" }}>
        <Box
          sx={{
            p: 3,
            borderRadius: "10px",
            border: "1px solid #23262f",
            background: "#131011",
          }}
        >
          <Typography variant="h6" sx={{ color: "white", pb: 3 }}>
            {t("HomePage.title3")}
          </Typography>
          <CoinTickerList coins={coins} />
        </Box>
        <Stack spacing={3} mt={4}>
          {Object.values(coins).map((coin) => (
            <CoinCard key={coin.symbol} coin={coin} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

function CoinCard({ coin }: { coin: Coin }) {
  const isDown = coin.changePercent < 0;
  const baseSymbol = coin.symbol.replace("USDT", "");

  const chartData = coin.history.map((p, i) => ({
    value: p,
    index: i,
  }));

  return (
    <Card
      sx={{
        background: "transparent",
        boxShadow: "none",
        borderRadius: 0,
        color: "#fff",
        py: 1,
      }}
    >
      <CardContent
        sx={{
          p: "0 !important",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "320px 220px 320px 120px",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          {/* LEFT */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={iconMap[baseSymbol] || ""}
              sx={{
                width: 42,
                height: 42,
                bgcolor: "#1e1e1e",
              }}
            >
              {baseSymbol.charAt(0)}
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                {coin.symbol.replace("USDT", "/USDT")}
              </Typography>
            </Box>
          </Stack>

          {/* PRICE */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
              color: "#fff",
            }}
          >
            {coin.price.toLocaleString()}
          </Typography>

          {/* CHART */}
          <Box>
            <LineChart width={260} height={70} data={chartData}>
              <defs>
                <linearGradient
                  id={`gradient-${coin.symbol}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={isDown ? "#ff2e2e" : "#00d26a"}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor={isDown ? "#ff2e2e" : "#00d26a"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <YAxis hide domain={["dataMin", "dataMax"]} />
              <Tooltip contentStyle={{ display: "none" }} cursor={false} />

              {/* dotted line */}
              <ReferenceLine
                y={chartData[0]?.value}
                stroke={isDown ? "#ff2e2e" : "#00d26a"}
                strokeDasharray="3 3"
                opacity={0.5}
              />

              {/* area */}
              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill={`url(#gradient-${coin.symbol})`}
              />

              {/* line */}
              <Line
                type="monotone"
                dataKey="value"
                stroke={isDown ? "#ff2e2e" : "#00d26a"}
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </Box>

          {/* CHANGE */}
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >
            {isDown ? (
              <ArrowDownwardIcon
                sx={{
                  fontSize: 16,
                  color: "#ff4d4f",
                }}
              />
            ) : (
              <ArrowUpwardIcon
                sx={{
                  fontSize: 16,
                  color: "#52c41a",
                }}
              />
            )}

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                color: isDown ? "#ff4d4f" : "#52c41a",
              }}
            >
              {coin.changePercent.toFixed(2)}%
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

function CoinTickerList({ coins }: { coins: Record<string, Coin> }) {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 1,
        pb: 1,
        "&::-webkit-scrollbar": { display: "none" },
        cursor: "pointer",
      }}
    >
      {Object.values(coins).map((coin) => {
        const isDown = coin.changePercent < 0;
        const baseSymbol = coin.symbol.replace("USDT", "");
        return (
          <Box
            key={coin.symbol}
            sx={{
              minWidth: 300,
              background: "#166534",
              borderRadius: 3,
              p: 2,
              color: "#fff",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <Avatar
                src={
                  iconMap[baseSymbol] ||
                  `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${baseSymbol.toLowerCase()}.png`
                }
                sx={{ width: 24, height: 24 }}
              >
                {baseSymbol.charAt(0)}
              </Avatar>
              <Typography fontSize={16} fontWeight={600}>
                {coin.symbol.replace("USDT", "/USDT")}
              </Typography>
            </Box>

            <Box sx={{ my: 1 }}>
              <MiniSparkline history={coin.history} isDown={isDown} />
            </Box>

            <Typography fontWeight={600} fontSize={16}>
              {coin.price.toLocaleString()}
            </Typography>

            <Typography
              fontSize={15}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: coin.changePercent < 0 ? "#ef4444" : "#22c55e",
              }}
            >
              {coin.changePercent < 0 ? (
                <ArrowDownwardIcon sx={{ fontSize: 16 }} />
              ) : (
                <ArrowUpwardIcon sx={{ fontSize: 16 }} />
              )}
              {coin.changePercent.toFixed(2)}%
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

function MiniSparkline({
  history,
  isDown,
}: {
  history: number[];
  isDown: boolean;
}) {
  const data = history.map((p, i) => ({
    value: p,
    index: i,
  }));

  return (
    <LineChart width={200} height={30} data={data}>
      <YAxis hide domain={["dataMin", "dataMax"]} />
      <Line
        type="monotone"
        dataKey="value"
        stroke={isDown ? "#ef4444" : "#22c55e"}
        strokeWidth={2}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
}
