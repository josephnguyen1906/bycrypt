"use client";

import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import SparklineCanvas from "./SparklineCanvas";
import { useTranslation } from "react-i18next";

interface CoinData {
  symbol: string;
  price: number;
  percent: number;
  history: number[];
}

interface Props {
  data: CoinData;
  followed?: boolean;
  onFollow?: (symbol: string) => void;
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

export default function CoinRowVertical({
  data,
  followed = false,
  onFollow,
}: Props) {
  const symbol = data.symbol.replace("USDT", "");
  const { t } = useTranslation();
  const percent = Number.isFinite(data.percent) ? data.percent : 0;

  const positive = percent >= 0;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#11151D",
        px: 1,
        py: 1,
        borderRadius: "8px",
        "&:hover": {
          bgcolor: "#181E27",
        },
      }}
    >
      {/* ================= TOP ================= */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
        }}
      >
        {/* Logo + Name + Percent */}
        <Stack
          direction="row"
          spacing={1.2}
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          {/* Logo */}
          <Avatar
            src={logos[data.symbol]}
            sx={{
              width: 38,
              height: 38,
            }}
          />

          {/* Coin Info */}
          <Box>
            <Typography
              sx={{
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {symbol}
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                color: positive ? "#17C964" : "#F31260",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {positive ? "+" : ""}
              {percent.toFixed(2)}%
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* ================= CHART ================= */}
      <Box
        sx={{
          width: "100%",
          height: 65,
          mt: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SparklineCanvas
            width={190}
            data={data.history}
            positive={positive}
          />
        </Box>
      </Box>

      {/* ================= FOLLOW ================= */}
      <Button
        fullWidth
        variant="outlined"
        onClick={() => onFollow?.(data.symbol)}
        sx={{
          width: "100%",
          height: 38,
          mt: 1.5,
          borderRadius: "6px",
          borderColor: followed ? "#17C964" : "rgba(255,255,255,.2)",
          color: followed ? "#17C964" : "#fff",
          fontSize: 13,
          fontWeight: 600,
          textTransform: "none",

          "&:hover": {
            borderColor: "#17C964",
            bgcolor: "rgba(23,201,100,.08)",
          },
        }}
      >
        {followed ? t("InvitationPage.followed") : t("InvitationPage.follow")}
      </Button>
    </Box>
  );
}
