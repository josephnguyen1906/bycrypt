"use client";

import { NextIcon } from "@/shared/Svgs/Svg.component";
import { Box, Typography, Avatar, Divider, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getDepositMethod, getFinaceBalance } from "@/services/User.service";
import { useEffect, useState } from "react";
import { IDepositMethod, IFinaceBalace } from "@/shared/interfaces";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";
const networks = [
  {
    coin: "usdt",
    img: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
  },
  {
    coin: "btc",
    img: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  },
  {
    coin: "eth",
    img: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
  },
  {
    coin: "ltc",
    img: "https://coin-images.coingecko.com/coins/images/2/large/litecoin.png?1696501400",
  },
  {
    coin: "sol",
    img: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
  },
  {
    coin: "xrp",
    img: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
  },
  {
    coin: "usdc",
    img: "https://coin-images.coingecko.com/coins/images/6319/large/USDC.png?1769615602",
  },
  {
    coin: "bnb",
    img: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
  },
];

export default function WithdrawPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listMethod, setListMethod] = useState<IFinaceBalace[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const data = await getFinaceBalance();
    if (data.status) {
      setListMethod(data.data);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Box
          sx={{
            background: "#0b1727",
            minHeight: "100vh",
            p: 2,
            color: "white",
            pb: "180px",
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
              {t("StakingPage.tab3")}
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
            {listMethod.map((item, index) => (
              <Box key={index}>
                <Box
                  onClick={() => router.push(`/withdraw/${item.name}`)}
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
                        bgcolor: "#111827",
                        fontSize: 14,
                      }}
                      src={networks.find((e) => e.coin == item.name)?.img}
                    ></Avatar>

                    <Typography fontSize={14}>
                      {item.name.toUpperCase()} {t("StakingPage.tab3")}
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
        </Box>
      )}
    </>
  );
}
