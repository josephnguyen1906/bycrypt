"use client";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
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
import { getWebsiteConfig } from "@/services/User.service";
import { useUserStore } from "@/stores/useUserStore";
import TradePopup from "@/components/popup/TradePopup";

export default function ContactPage() {
  const [openTrade, setOpenTrade] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [menu, setMenu] = useState("btcusdt");
  const [tab, setTab] = useState("BUY");
  const [percent, setPercent] = useState("");
  const [price, setPrice] = useState<number>();
  const { user, fetchUser } = useUserStore();
  const [interval, setInterval] = useState("1m");
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
      <Box mb={10}>
        <React.Fragment>
          <Box
            sx={{
              maxWidth: "768px",
              width: "100%",
              margin: "auto",
              left: 0,
              right: 0,
              position: "fixed",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              top: 0,
              textAlign: "center",
              padding: "0px 20px",
              background: "#111827",
              boxShadow: "0px -2px 5px rgba(37, 37, 37, 0.1)",
              p: 2,
            }}
          >
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={drawerOpen ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={drawerOpen ? "true" : undefined}
            >
              <MenuIcon fill="#fff" width="25px" height="25px" />
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
                {percent}
                {Number(percent) < 0 ? (
                  <DownIcon width="16px" height="16px" fill="#ef4444" />
                ) : (
                  <UpIcon width="16px" height="16px" fill="#22c55e" />
                )}
              </Typography>
            </Box>
            <IconButton size="small" aria-haspopup="true">
              <DashboardIcon fill="#fff" width="25px" height="25px" />
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
            href="/login"
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
