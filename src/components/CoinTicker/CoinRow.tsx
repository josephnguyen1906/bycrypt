"use client";

import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import SparklineCanvas from "./SparklineCanvas";

interface CoinData {
  symbol: string;
  price: number;
  percent: number;
  history: number[];
}

interface Props {
  data: CoinData;
  tab: number;
}

const logos: Record<string, string> = {
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

export default function CoinRow({ data, tab }: Props) {
  const symbol = data.symbol.replace("USDT", "");
  const percent = Number.isFinite(data.percent) ? data.percent : 0;
  const price = Number.isFinite(data.price) ? data.price : 0;
  const positive = percent >= 0;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        px: 2,
        py: 1.2,
        borderBottom: "1px solid rgba(255,255,255,.06)",
        bgcolor: "#11151D",

        "&:hover": {
          bgcolor: "#181E27",
        },
      }}
    >
      {/* Left */}
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{ width: 95 }}
      >
        {tab !== 1 && (
          <Avatar
            src={logos[data.symbol]}
            sx={{
              width: 34,
              height: 34,
            }}
          />
        )}

        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1.2,
            }}
          >
            {tab == 1 ? data.symbol : symbol}
          </Typography>
          {tab !== 1 && (
            <Typography
              sx={{
                color: "#8A94A6",
                fontSize: 12,
              }}
            >
              USDT
            </Typography>
          )}
        </Box>
      </Stack>

      {/* Chart */}
      <Box
        sx={{
          width: 120,
          height: 55,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SparklineCanvas data={data.history} positive={positive} />
      </Box>

      {/* Price */}
      <Stack alignItems="flex-end" spacing={0.5} sx={{ width: 85 }}>
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          {price > 1000
            ? price.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : price.toFixed(4).replace(/\.?0+$/, "")}
        </Typography>

        <Chip
          label={`${positive ? "+" : ""}${percent.toFixed(2)}%`}
          size="small"
          sx={{
            minWidth: 62,
            height: 24,
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
            borderRadius: "5px",
            bgcolor: positive ? "#17C964" : "#F31260",
          }}
        />
      </Stack>
    </Stack>
  );
}
