"use client";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuCoin from "@/components/subMenu/MenuCoin";
import ChartViewCustom from "@/components/ChartView/ChartViewCustom";
import {
  DashboardIcon,
  DownIcon,
  FileIcon,
  HistoryIcon,
  InternetIcon,
  MenuIcon,
  UpIcon,
} from "@/shared/Svgs/Svg.component";
import CoinMenuMobile from "@/components/coins/CoinMenuMobile";
import { useTranslation } from "react-i18next";
import {
  getContractjc,
  getFinaceCoin,
  getListCoin,
  getOrderResult,
  getWebsiteConfig,
} from "@/services/User.service";
import { useUserStore } from "@/stores/useUserStore";
import TradePopup from "@/components/popup/TradePopup";
import CommandClose from "./CommandClose";
import CommandOpen from "./CommandOpen";
import { Icoin, IcoinFinace } from "@/interface/user.interface";
import { useRouter } from "next/navigation";
import { IHistoryOpen } from "@/shared/interfaces";

export default function ContactPage() {
  const [openTrade, setOpenTrade] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState("one");
  const [menu, setMenu] = useState("btcusdt");
  const [tab, setTab] = useState("BUY");
  const [percent, setPercent] = useState("");
  const [price, setPrice] = useState<number>();
  const { user, fetchUser } = useUserStore();
  const [interval, setInterval] = useState("1m");
  const [listCoin, setListCoin] = useState<IcoinFinace[]>([]);
  const router = useRouter();
  const [history, setHisstory] = useState<IHistoryOpen[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const open = Boolean(anchorEl);
  const handleClickLang = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    referral();
    historyOpen();
  }, []);

  const historyOpen = async () => {
    try {
      const his: any = await getContractjc();
      if (his.status === true) {
        setHisstory(his.data);
      }
    } catch (errors: any) {
      console.log(errors?.message);
    }
  };

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

  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "#111827",
        p: 2,
        pb: "130px",
      }}
    >
      <ChartViewCustom
        symbol={menu}
        changePrice={(c) => setPrice(c)}
        interval={interval}
        setInterval={setInterval}
      />
      {user ? (
        <Box sx={{ width: "100%", mt: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ color: "#9ca3af", fontWeight: 400, fontSize: "13px" }}
            >
              {t("BuySellPage.h2")}
            </Typography>
            <Typography
              sx={{ color: "#9ca3af", fontWeight: 400, fontSize: "13px" }}
            >
              {Number(user?.balance.usdt).toLocaleString()} USDT
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
            <Button
              sx={{
                width: "48%",
                height: "50px",
                background: "#2dd4bf",
                textTransform: "none",
                color: "black",
                "&:hover": { background: "#2dd4bf" },
              }}
              onClick={() => {
                setOpenTrade(true);
                setTab("BUY");
              }}
            >
              {t("BuySellPage.buy")}
            </Button>
            <Button
              sx={{
                width: "48%",
                height: "50px",
                background: "#ef4444",
                textTransform: "none",
                color: "white",
                "&:hover": { background: "#ef4444" },
              }}
              onClick={() => {
                setOpenTrade(true);
                setTab("SELL");
              }}
            >
              {t("BuySellPage.sell")}
            </Button>
          </Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            TabIndicatorProps={{
              sx: {
                backgroundColor: "#34d399",
                height: 2,
              },
            }}
            sx={{
              "& .MuiTab-root": {
                color: "#9ca3af",
                textTransform: "capitalize",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#34d399",
              },
            }}
          >
            <Tab value="one" label={t("BuySellPage.transaction")} wrapped />
            <Tab value="two" label={t("BuySellPage.Position")} />
          </Tabs>
          {value == "one" && (
            <CommandOpen
              user={user}
              history={history}
              onCLose={async (id: number) => {
                try {
                  if (id) await getOrderResult(id);
                } catch (e) {
                  // settlement may also be handled by cron; ignore errors
                }
                await fetchUser();
                historyOpen();
              }}
            />
          )}
          {value == "two" && <CommandClose user={user} />}
        </Box>
      ) : (
        <Box sx={{ width: "100%", mt: 3, mb: 3 }}>
          <Button
            sx={{
              width: "100%",
              background: "#2eb862ff",
              color: "white",
              height: "50px",
              textTransform: "none",
              "&:hover": {
                background: "#1d974cff",
              },
            }}
            onClick={() => router.push("/login")}
          >
            {t("Toast.btn_login")}
          </Button>
        </Box>
      )}
      {user && (
        <TradePopup
          open={openTrade}
          user={user}
          tab={tab}
          history={history}
          onLoadHitory={() => {
            historyOpen();
          }}
          onClose={() => {
            setOpenTrade(false);
            fetchUser();
            historyOpen();
          }}
          symbol={menu}
        />
      )}
    </Box>
  );
}
