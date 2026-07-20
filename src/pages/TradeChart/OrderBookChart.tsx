"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "next/image";
import { useTranslation } from "react-i18next";
interface DepthItem {
  price: number;
  quantity: number;
}
interface Iprops {
  asks: DepthItem[];
  bids: DepthItem[];
  priceColor: string;
  lastPrice: number;
  symbol: string;
}

export default function OrderBookChart({
  asks,
  bids,
  priceColor,
  lastPrice,
  symbol,
}: Iprops) {
  const { t } = useTranslation();
  const maxQty = useMemo(() => {
    const askList = Array.isArray(asks) ? asks : [];
    const bidList = Array.isArray(bids) ? bids : [];

    const all = [...askList, ...bidList];

    if (!all.length) return 1;

    return Math.max(...all.map((i) => i.quantity));
  }, [asks, bids]);

  const Row = ({ item, color }: { item: DepthItem; color: string }) => {
    const percent = Math.min((item.quantity / maxQty) * 100, 100);

    return (
      <Box
        sx={{
          position: "relative",
          height: 24,
          display: "flex",
          alignItems: "center",
          px: 1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 2,
            bottom: 2,
            width: `${percent}%`,
            bgcolor: color,
            opacity: 0.13,
            transition: ".15s",
          }}
        />

        <Typography
          sx={{
            width: "65%",
            color,
            fontSize: 13,
            zIndex: 2,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Number(item.price || 0)?.toFixed(2)}
        </Typography>

        <Typography
          sx={{
            width: "35%",
            textAlign: "right",
            color: "#fff",
            fontSize: 13,
            zIndex: 2,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Number(item.quantity || 0).toFixed(4)}
        </Typography>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        zIndex: 1,
        pb: "100px",
      }}
    >
      {" "}
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 1,
            pb: 1,
          }}
        >
          <Typography
            sx={{
              width: "65%",
              color: "#6E7685",
              fontSize: 12,
            }}
          >
            {t("TradePage.title12")} (USDT)
          </Typography>

          <Typography
            sx={{
              width: "35%",
              textAlign: "right",
              color: "#6E7685",
              fontSize: 12,
            }}
          >
            {t("TradePage.title13")}{" "}
            <span
              style={{
                textTransform: "uppercase",
              }}
            >
              ({symbol?.replace("usdt", "")})
            </span>
          </Typography>
        </Box>
        <Stack spacing={0}>
          {bids?.map((item) => (
            <Row key={item.price} item={item} color="#0ECB81" />
          ))}
        </Stack>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 1,
            pb: 1,
          }}
        >
          <Typography
            sx={{
              width: "65%",
              color: "#6E7685",
              fontSize: 12,
            }}
          >
            {t("TradePage.title12")} (USDT)
          </Typography>

          <Typography
            sx={{
              width: "35%",
              textAlign: "right",
              color: "#6E7685",
              fontSize: 12,
            }}
          >
            {t("TradePage.title13")}{" "}
            <span
              style={{
                textTransform: "uppercase",
              }}
            >
              ({symbol?.replace("usdt", "")})
            </span>
          </Typography>
        </Box>
        <Stack spacing={0}>
          {asks?.map((item) => (
            <Row key={item.price} item={item} color="#F6465D" />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
