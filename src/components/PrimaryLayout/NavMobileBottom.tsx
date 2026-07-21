"use client";

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  darken,
  Paper,
  useTheme,
} from "@mui/material";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import swal from "sweetalert";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CoinInsertIcon,
  TransferIcon,
  WalletMenuIcon,
} from "@/shared/Svgs/Svg.component";

export default function NavMobileBottom() {
  const { t, i18n } = useTranslation();
  const { user, fetchUser } = useUserStore();
  const [value, setValue] = useState<number>(0);
  const path = usePathname();
  const router = useRouter();

  return (
    <Paper
      elevation={10}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: "none",
        maxWidth: {
          xs: "100%",
          sm: "460px",
        },
        margin: "auto",
        // pb: "5px",
        zIndex: 100,
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        sx={{
          height: 60,
          backgroundColor: "#1a1b23",
          pb: "5px",
          border: "none",

          "& .MuiBottomNavigationAction-root": {
            minWidth: "20%",
            color: "background.paper",
            fontSize: "10px",
            paddingTop: "6px",
          },

          "& .Mui-selected": {
            color: "#00A609",
          },

          "& .MuiBottomNavigationAction-label": {
            fontSize: "10px",
            marginTop: "2px",

            "&.Mui-selected": {
              fontSize: "10px",
              fontWeight: 700,
            },
          },
        }}
      >
        <BottomNavigationAction
          label={t("NavMobile.menu1")}
          icon={
            <HomeFilledIcon
              sx={{ color: path == "/" ? "#00A609" : "#888888" }}
              width="20px"
              height="20px"
            />
          }
          onClick={() => router.push("/")}
        />

        <BottomNavigationAction
          label={t("NavMobile.menu2")}
          icon={
            <CandlestickChartIcon
              sx={{ color: path == "/market/" ? "#00A609" : "#888888" }}
              width="20px"
              height="20px"
            />
          }
          onClick={() => router.push("/market")}
        />
        <BottomNavigationAction
          label={t("NavMobile.menu3")}
          icon={
            <TransferIcon
              width="20px"
              height="20px"
              fill={path == "/trade/" ? "#00A609" : "#888888"}
            />
          }
          onClick={() => router.push("/trade")}
        />

        <BottomNavigationAction
          label={t("NavMobile.menu4")}
          icon={
            <CoinInsertIcon
              fill={path == "/news/" ? "#00A609" : "#888888"}
              width="20px"
              height="20px"
            />
          }
          onClick={() => router.push("/news")}
        />

        <BottomNavigationAction
          label={t("NavMobile.menu5")}
          icon={
            <WalletMenuIcon
              fill={path == "/account/" ? "#00A609" : "#888888"}
              width="20px"
              height="20px"
            />
          }
          onClick={() => {
            if (user) {
              router.push("/account");
            }
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}
