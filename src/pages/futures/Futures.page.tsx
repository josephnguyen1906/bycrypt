"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useTranslation } from "react-i18next";
import CoinTicker from "@/components/CoinTicker/CoinTicker";
import { COINS, MONEYCOIN } from "@/datafake/home";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import HeaderMobile from "@/components/PrimaryLayout/HeaderMobile";
import { SquareIcon } from "@/shared/Svgs/Svg.component";
import CoinTickerVertical from "@/components/CoinTicker/CoinTickerVertical";

export default function FuturesPage() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [tab, setTab] = useState(0);
  const [searchText, setSearchText] = useState<string | null>(null);

  const coinList = useMemo(() => {
    return tab == 1 ? MONEYCOIN : COINS;
  }, [tab]);
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
      <HeaderMobile user={user} />
      <Box
        sx={{
          width: "95%",
          margin: "auto",
          mt: "20px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "160px",
            borderRadius: "10px",
          }}
        >
          <Image
            src={"/images/banner-futures-en-f3aacfda.png"}
            fill
            alt=""
            style={{
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "98%",
            margin: "auto",
            mt: "20px",
          }}
        >
          <CoinTickerVertical listCoin={COINS.slice(0, 4)} tab={tab} />
        </Box>

        <Box
          sx={{
            width: "100%",
            margin: "auto",
            mt: "20px",
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"} sx={{ mb: 2 }}>
            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
              <SquareIcon />
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                {t(`HomePage.title2`)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", mb: "20px" }}>
            <Button
              sx={{
                background: tab == 0 ? "#00A609" : "none",
                fontSize: 14,
                textTransform: "capitalize",
                color: "white",
                borderRadius: 20,
              }}
              onClick={() => setTab(0)}
            >
              {t(`HomePage.menu1`)}
            </Button>
            <Button
              sx={{
                background: tab == 1 ? "#00A609" : "none",
                fontSize: 14,
                textTransform: "capitalize",
                color: "white",
                borderRadius: 20,
              }}
              onClick={() => setTab(1)}
            >
              {t(`HomePage.menu2`)}
            </Button>
          </Box>

          <CoinTicker key={tab} listCoin={coinList} tab={tab} />

          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            justifyContent={"center"}
            mt={2}
          >
            <Image
              src={"/images/logo5-3b8c4676.png"}
              width={1000}
              height={200}
              alt=""
              style={{
                width: "100%",
                height: "183px",
                objectFit: "contain",
              }}
            />
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 500,
                color: "white",
                textAlign: "center",
                width: 300,
                margin: "auto",
              }}
            >
              {t("InvitationPage.title17")}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 400,
                color: "white",
                textAlign: "center",
                width: 300,
                margin: "auto",
              }}
            >
              {t("InvitationPage.title18")}
            </Typography>
            <Image
              src={"/images/logo6-6bc2d2cd.png"}
              width={1000}
              height={200}
              alt=""
              style={{
                width: "100%",
                height: "183px",
                objectFit: "contain",
              }}
            />
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 500,
                color: "white",
                textAlign: "center",
                width: 300,
                margin: "auto",
              }}
            >
              {t("InvitationPage.title19")}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 400,
                color: "white",
                textAlign: "center",
                width: 300,
                margin: "auto",
              }}
            >
              {t("InvitationPage.title20")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
