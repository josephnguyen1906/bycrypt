"use client";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HistoryIcon from "@mui/icons-material/History";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { getFinaceCoin, getWebsiteConfig } from "@/services/User.service";
import { IcoinFinace } from "@/interface/user.interface";
import Image from "next/image";
import { IconCoin } from "@/datafake/home";

const listDeposit = [
  {
    id: 1,
    link: "https://www.kraken.com/",
    title: "DepositWithdrawPage.title4",
    icon: "/images/kraken-f9e29d51.ico",
  },
  {
    id: 2,
    link: "https://www.binance.com/",
    title: "DepositWithdrawPage.title5",
    icon: "/images/binance-icon.png",
  },
  {
    id: 3,
    link: "https://www.coinbase.com/",
    title: "DepositWithdrawPage.title6",
    icon: "/images/coinbase-ae084b4c.png",
  },
  {
    id: 4,
    link: "https://crypto.com/",
    title: "DepositWithdrawPage.title7",
    icon: "/images/crypto-67a5e63a.png",
  },
];
export default function Deposit() {
  const router = useRouter();
  const { t } = useTranslation();
  const [listCoin, setListCoin] = useState<IcoinFinace[]>([]);
  const [configs, setConfigs] = useState<any>();

  const referral = async () => {
    try {
      const listCoin: any = await getFinaceCoin();

      if (listCoin.status === true) {
        setListCoin(listCoin.data);
      }
    } catch (errors: any) {
      console.log(errors?.message);
    }
  };

  useEffect(() => {
    const res = async () => {
      try {
        const config: any = await getWebsiteConfig();

        if (config.status === true) {
          setConfigs(config.data);
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    res();
    referral();
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
            // href="/trade-chart"
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
            justifyContent: "center",
          }}
        >
          {listCoin.map((item) => (
            <Box
              key={item.id}
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
              }}
              onClick={() => {
                window.open(configs?.telegram, "_blank", "noopener,noreferrer");
              }}
            >
              <Image
                src={IconCoin[item.title]}
                width={50}
                height={50}
                alt={item.title}
              />
              <Typography
                sx={{
                  color: "#868c9a",
                  fontWeight: 400,
                  fontSize: 13,
                }}
              >
                {t("DepositWithdrawPage.title3")} {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            pt: 8,
          }}
        >
          {listDeposit.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                borderBottom: "1px solid #393E49",
                padding: "5px",
              }}
              onClick={() => {
                window.open(item.link, "_blank", "noopener,noreferrer");
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  gap: "10px",
                }}
              >
                <Image
                  src={item.icon}
                  width={23}
                  height={23}
                  alt={item.title}
                  style={{ objectFit: "cover" }}
                />
                <Typography
                  sx={{
                    color: "#868c9a",
                    fontWeight: 400,
                    fontSize: 13,
                  }}
                >
                  {t(item.title)}
                </Typography>
              </Box>
              <ArrowForwardIosIcon sx={{ color: "#868D9A", fontSize: 14 }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
