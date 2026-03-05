"use client";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuCoin from "@/components/subMenu/MenuCoin";
import ChartViewCustom from "@/components/ChartView/ChartViewCustom";
import {
  DashboardIcon,
  DownIcon,
  MenuIcon,
  UpIcon,
} from "@/shared/Svgs/Svg.component";
import CoinMenuMobile from "@/components/coins/CoinMenuMobile";
import { useTranslation } from "react-i18next";
import { getListCoin, getWebsiteConfig } from "@/services/User.service";
import { useUserStore } from "@/stores/useUserStore";
import TradePopup from "@/components/popup/TradePopup";
import CommandClose from "./CommandClose";
import CommandOpen from "./CommandOpen";
import { Icoin } from "@/interface/user.interface";
import { useRouter } from "next/navigation";

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
  const [listCoin, setListCoin] = useState<Icoin[]>([]);
  const router = useRouter();

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
    const referral = async () => {
      try {
        const listCoin: any = await getListCoin();

        if (listCoin.status === true) {
          setListCoin(listCoin.data);
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    referral();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "768px",
        margin: "auto",
        minHeight: "100vh",
        background: "#111827",
        p: 2,
        pb: "130px",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <React.Fragment>
          <Box
            sx={{
              width: "100%",
              margin: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
              background: "#111827",
              boxShadow: "0px -2px 5px rgba(37, 37, 37, 0.1)",
            }}
          >
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={drawerOpen ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={drawerOpen ? "true" : undefined}
            >
              <MenuIcon fill="#fff" width="20px" height="20px" />
            </IconButton>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Typography fontWeight="500" fontSize={18} color="#fff">
                {menu.toUpperCase().replace("USDT", "/USDT")}
              </Typography>
              <Typography
                fontWeight="400"
                fontSize={18}
                sx={{
                  color: Number(percent) >= 0 ? "#00C853" : "#FF3D00",
                }}
              >
                {Number(percent).toFixed(2)}
                {Number(percent) < 0 ? (
                  <DownIcon width="16px" height="16px" fill="#ef4444" />
                ) : (
                  <UpIcon width="16px" height="16px" fill="#22c55e" />
                )}
              </Typography>
            </Box>
            <IconButton size="small" aria-haspopup="true">
              <DashboardIcon fill="#fff" width="20px" height="20px" />
            </IconButton>
          </Box>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerClose}
            sx={{
              zIndex: 9,
              padding: 0,
              "& .MuiDrawer-paper": {
                width: "60%",
                background: "#111827",
                border: "none",
                borderRadius: 0,
                p: 0,
                pb: "200px",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              },
            }}
          >
            {CoinMenuMobile({
              menu: menu,
              listCoin,
              interval,
              changePercent: (v) => {
                setPercent(v);
              },
              setMenu: (v) => {
                setMenu(v);
                handleDrawerClose();
              },
            })}
          </Drawer>
        </React.Fragment>
      </Box>
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
              Micro account funds
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
              Buy up
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
              Buy down
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
            <Tab value="one" label="In transaction" wrapped />
            <Tab value="two" label="Position closed" />
          </Tabs>
          {value == "one" && <CommandOpen user={user} />}
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
            Go to login
          </Button>
        </Box>
      )}
      {user && (
        <TradePopup
          open={openTrade}
          user={user}
          tab={tab}
          onClose={() => {
            setOpenTrade(false);
            fetchUser();
          }}
          symbol={menu}
          price={price ?? 0}
        />
      )}
    </Box>
  );
}
