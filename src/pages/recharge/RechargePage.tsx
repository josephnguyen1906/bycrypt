"use client";

import { NextIcon } from "@/shared/Svgs/Svg.component";
import { Box, Typography, Avatar, Divider, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getDepositMethod, getWebsiteConfig } from "@/services/User.service";
import { useEffect, useState } from "react";
import { IDepositMethod } from "@/shared/interfaces";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";
const networks = [
  {
    name: "USDC-ERC20",
    icon: "U",
    coin: "usdc",
    wallet: "usdc",
    bg: "#2775ca",
  },
  {
    name: "USDT-TRC20",
    icon: "U",
    coin: "usdt",
    wallet: "TRC20",
    bg: "#26a17b",
  },
  {
    name: "USDT-ERC20",
    icon: "U",
    coin: "usdt",
    wallet: "ERC20",
    bg: "#26a17b",
  },
  { name: "ETH-ERC20", icon: "E", coin: "eth", wallet: "ERC20", bg: "#627eea" },
  {
    name: "BTC-Bitcoin",
    icon: "B",
    coin: "btc",
    wallet: "Bitcoin",
    bg: "#f7931a",
  },
];

export default function RechargePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listMethod, setListMethod] = useState<IDepositMethod[]>([]);
  const [configs, setConfigs] = useState<any>();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const data = await getDepositMethod();
    const config: any = await getWebsiteConfig();

    if (config.status === true) {
      setConfigs(config.data);
    }
    if (data.status) {
      setListMethod(data.data);
    }
    setLoading(false);
  };
  console.log(listMethod);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Box
          sx={{
            background: "#0b1727",
            maxWidth: "448px",
            margin: "auto",
            minHeight: "100vh",
            p: 2,
            color: "white",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            mb={3}
            gap={"10px"}
            justifyContent={"space-between"}
          >
            <IconButton
              onClick={() => router.back()}
              sx={{ background: "#232932" }}
            >
              <ArrowBackIosNewIcon
                sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
              />
            </IconButton>

            <Typography fontSize={20} fontWeight={600}>
              {t("AssetPage.menu2")}
            </Typography>
            <IconButton></IconButton>
          </Box>

          <Box
            sx={{
              background: "#1f2a3a",
              borderRadius: "16px",
              p: 2,
            }}
          >
            <Typography fontSize={14} mb={2}>
              {t("AssetPage.Network")}
            </Typography>

            {listMethod.map((item, index) => (
              <Box key={index}>
                <Box
                  onClick={() =>
                    router.push(`/recharge/${item.coin + item.wallet}`)
                  }
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1.5,
                    cursor: "pointer",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor:
                          networks.find(
                            (e) => e.coin + e.wallet == item.coin + item.wallet,
                          )?.bg ?? "#111827",
                        fontSize: 14,
                        border: "4px solid #111827",
                      }}
                    >
                      {
                        networks.find(
                          (e) => e.coin + e.wallet == item.coin + item.wallet,
                        )?.icon
                      }
                    </Avatar>

                    <Typography fontSize={14}>
                      {" "}
                      {item.name}-{item.wallet}
                    </Typography>
                  </Box>

                  <NextIcon width="12px" height="12px" fill="#9ca3af" />
                </Box>

                {index !== listMethod.length - 1 && (
                  <Divider sx={{ borderColor: "#ffffff1a" }} />
                )}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              background: "#1f2a3a",
              borderRadius: "16px",
              p: 2,
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => {
              // if (configs?.telegram) {
              //   window.open(configs.telegram, "_blank");
              // }
              router.push("/chat");
            }}
          >
            <Typography>Bank Card Recharge</Typography>
            <NextIcon width="12px" height="12px" fill="#9ca3af" />
          </Box>
        </Box>
      )}
    </>
  );
}
