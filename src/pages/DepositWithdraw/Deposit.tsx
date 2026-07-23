"use client";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import HistoryIcon from "@mui/icons-material/History";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getDepositMethod, getFinaceCoin } from "@/services/User.service";
import Image from "next/image";
import { getCoinIcon } from "@/datafake/home";

type DepositChannel = {
  coinId: number;
  symbol: string;
  title: string;
};

export default function Deposit() {
  const router = useRouter();
  const { t } = useTranslation();
  const [channels, setChannels] = useState<DepositChannel[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [methodRes, coinRes]: any[] = await Promise.all([
          getDepositMethod(),
          getFinaceCoin(),
        ]);

        const methods: Array<{ coin?: string; name?: string }> = Array.isArray(
          methodRes?.data,
        )
          ? methodRes.data
          : Array.isArray(methodRes)
            ? methodRes
            : [];
        const coins: Array<{ id: number; name?: string; title?: string }> =
          Array.isArray(coinRes?.data)
            ? coinRes.data
            : Array.isArray(coinRes)
              ? coinRes
              : [];

        const seen = new Set<string>();
        const next: DepositChannel[] = [];

        for (const method of methods) {
          const symbol = String(method.coin || method.name || "")
            .trim()
            .toLowerCase();
          if (!symbol || seen.has(symbol)) continue;
          seen.add(symbol);

          const coin = coins.find(
            (c) => String(c.name || "").toLowerCase() === symbol,
          );
          if (!coin?.id) continue;

          next.push({
            coinId: coin.id,
            symbol: symbol.toUpperCase(),
            title: coin.title || symbol.toUpperCase(),
          });
        }

        setChannels(next);
      } catch (errors: any) {
        console.log(errors?.message);
        setChannels([]);
      }
    };
    load();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pb: "100px",
      }}
    >
      <Box
        sx={{
          height: 60,
          px: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#0D1018",
          borderBottom: "1px solid rgba(255,255,255,.05)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => router.back()}
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
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 500,
                fontSize: 19,
              }}
            >
              {t("DepositWithdrawPage.title1")}
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
            onClick={() => router.push("/deposit/history")}
          >
            <HistoryIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ width: "90%", margin: "auto", pt: 4 }}>
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 400,
            fontSize: 19,
          }}
        >
          {t("DepositWithdrawPage.title2")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            pt: 3,
            justifyContent: channels.length ? "center" : "flex-start",
          }}
        >
          {channels.length === 0 ? (
            <Typography sx={{ color: "#868c9a", fontSize: 14, pt: 2 }}>
              {t("HistoryPage.title2")}
            </Typography>
          ) : (
            channels.map((item) => (
              <Box
                key={item.coinId}
                sx={{
                  padding: "10px",
                  py: 2,
                  border: "2px solid #212C4E",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 120,
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/deposit/${item.coinId}`)}
              >
                <Image
                  src={getCoinIcon(item.symbol)}
                  width={50}
                  height={50}
                  alt={item.symbol}
                  unoptimized
                />
                <Typography
                  sx={{
                    color: "#868c9a",
                    fontWeight: 400,
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  {t("DepositWithdrawPage.title3")} {item.symbol}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
