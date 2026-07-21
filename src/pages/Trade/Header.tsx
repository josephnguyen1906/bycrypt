"use client";

import { Box, Typography, IconButton, Stack, Button } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

interface HeaderProps {
  symbol?: string;
  percent?: number;
  onBack?: () => void;
  onIndicator?: () => void;
  onSetting?: () => void;
}

export default function Header({
  symbol,
  percent,
  onBack,
  onIndicator,
  onSetting,
}: HeaderProps) {
  const isUp = Number(percent || 0) >= 0;
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Box
      sx={{
        height: 72,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#0D1018",
        borderBottom: "1px solid rgba(255,255,255,.05)",
      }}
    >
      {/* Left */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={onBack}
          sx={{
            color: "#fff",
          }}
        >
          <ArrowBackIosNewRoundedIcon fontSize="small" />
        </IconButton>

        <Box
          sx={{
            width: "70%",
            margin: "auto",
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={onIndicator}
            sx={{ width: 22, background: "none" }}
          >
            <Image
              src={"/images/arrowicon.png"}
              width={22}
              height={22}
              alt=""
            />
          </IconButton>

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            {symbol?.replace("USDT", "")}
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 11,
            }}
          >
            {t("TradePage.title14")}
          </Typography>

          <Typography
            sx={{
              color: isUp ? "#00D67E" : "#FF4D4F",
              fontWeight: 700,
              fontSize: 11,
            }}
          >
            {isUp ? "+" : ""}
            {Number(percent || 0).toFixed(3)}%
          </Typography>
        </Box>

        <IconButton
          sx={{
            color: "#9CA3AF",
            bgcolor: "none",
            "&:hover": {
              bgcolor: "none",
            },
          }}
          // href="/trade-chart"
          onClick={() => router.push("/trade-chart")}
        >
          <CandlestickChartRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
