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
import { LineChart, Line, YAxis } from "recharts";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
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
export const logos: Record<string, string> = {
  BTCUSDT: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040",
  ETHUSDT: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040",
  SOLUSDT: "https://cryptologos.cc/logos/solana-sol-logo.png?v=040",
  DOTUSDT: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=040",
  XAUTUSDT: "https://cryptologos.cc/logos/tether-gold-xaut-logo.png?v=040",
  XTZUSDT: "https://cryptologos.cc/logos/tezos-xtz-logo.png?v=040",
  ADAUSDT: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=040",
  MLNUSDT: "https://cryptologos.cc/logos/enzyme-mln-logo.png?v=040",
  YFIUSDT: "https://cryptologos.cc/logos/yearn-finance-yfi-logo.png?v=040",
  DAIUSDT:
    "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=040",
  ETCUSDT: "https://cryptologos.cc/logos/ethereum-classic-etc-logo.png?v=040",
  XRPUSDT: "https://cryptologos.cc/logos/xrp-xrp-logo.png?v=040",
  LTCUSDT: "https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=040",
  USDCUSDT: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040",
  KNCUSDT:
    "https://cryptologos.cc/logos/kyber-network-crystal-v2-knc-logo.png?v=040",
  DOGEUSDT: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=040",
};
export default function CoinPage() {
  const [coins, setCoins] = useState<Record<string, Coin>>({});

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
    <Box sx={{ minHeight: "100vh", background: "#0f172a", p: 2 }}>
      <CoinTickerList coins={coins} />
      <Stack spacing={3} mt={4}>
        {Object.values(coins).map((coin) => (
          <CoinCard key={coin.symbol} coin={coin} />
        ))}
      </Stack>
    </Box>
  );
}
const iconMapMobile: Record<string, string> = {
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
        background: "linear-gradient(135deg,#1e293b,#111827)",
        borderRadius: 4,
        p: 2,
        color: "#fff",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "0 !important",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={iconMapMobile[baseSymbol] || ""}
            sx={{ width: 50, height: 50 }}
          >
            {baseSymbol.charAt(0)}
          </Avatar>
          <Box>
            <Typography fontWeight="bold" fontSize={18}>
              {coin.symbol.replace("USDT", "")}
            </Typography>
            <Typography fontSize={13} color="gray">
              {coin.symbol.replace("USDT", "/USDT")}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Box textAlign="right">
            <Typography fontWeight="bold" fontSize={18}>
              {coin.price.toLocaleString()}
            </Typography>
            <Typography
              fontSize={14}
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
          <LineChart width={64} height={24} data={chartData}>
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
        </Stack>
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
              minWidth: 150,
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
                src={iconMapMobile[baseSymbol] || ""}
                sx={{ width: 24, height: 24 }}
              >
                {baseSymbol.charAt(0)}
              </Avatar>
              <Typography fontSize={11} fontWeight={600}>
                {coin.symbol}
              </Typography>
            </Box>

            <Box sx={{ my: 1 }}>
              <MiniSparkline history={coin.history} isDown={isDown} />
            </Box>

            <Typography fontWeight={600} fontSize={10}>
              {coin.price.toLocaleString()}
            </Typography>

            <Typography
              fontSize={9}
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
    <LineChart width={100} height={30} data={data}>
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
