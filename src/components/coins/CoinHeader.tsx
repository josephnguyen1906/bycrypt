"use client";

import { useTicker } from "@/hook/useTicker";
import StarIcon from "@mui/icons-material/Star";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CoinMenuMobile from "./CoinMenuMobile";
import { IcoinFinace } from "@/interface/user.interface";
import {
  getDataChart,
  getFinaceCoin,
  getListCoin,
} from "@/services/User.service";
import { iconMap } from "./CoinPage";
import { getTickerBySymbol } from "@/services/binance";
import { t } from "i18next";

export default function CoinHeader({ coin, time, setMenuCoin }: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [listCoin, setListCoin] = useState<any[]>([]);

  const [menu, setMenu] = useState("XAUUSD");

  const [ticker, setTicker] = useState<any>(null);

  const fetchingRef = useRef(false);
  const SPECIAL_SYMBOLS: Record<string, string> = {
    XAUUSD: "XAUUSD",
    XAGUSD: "XAGUSD",
    GBPUSD: "GBPUSD",
    USDJPY: "USDJPY",
    EURUSD: "EURUSD",
  };
  /**
   * NORMALIZE
   */
  const normalizeSymbol = (value: string) => {
    return value.replace("-", "").replace("/", "").toUpperCase();
  };

  /**
   * FETCH TICKER
   */
  const fetchTicker = async () => {
    if (fetchingRef.current) return;

    fetchingRef.current = true;

    try {
      if (SPECIAL_SYMBOLS[menu]) {
        const apiSymbol = SPECIAL_SYMBOLS[menu];

        const res: any = await getDataChart(apiSymbol);

        const result = res?.data;

        if (result) {
          setTicker({
            close: Number(result.close),
            open: Number(result.open),
            high: Number(result.high),
            low: Number(result.low),
            volume: Number(result.volume || 0),
            change: Number(result.change_percent),
          });
        }

        return;
      } else {
        /**
         * BINANCE MARKET
         */
        const res = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${menu}`,
        );

        const data = await res.json();

        if (!data?.lastPrice) return;

        setTicker({
          close: Number(data.lastPrice),
          open: Number(data.openPrice),
          high: Number(data.highPrice),
          low: Number(data.lowPrice),
          volume: Number(data.volume),
          change: Number(data.priceChangePercent),
        });
      }
    } catch (error) {
      // console.log("FETCH TICKER ERROR:", error);
    } finally {
      fetchingRef.current = false;
    }
  };

  /**
   * LOAD COIN LIST
   */
  const referral = async () => {
    try {
      const listCoin: any = await getListCoin();

      if (listCoin.status === true) {
        setListCoin(listCoin.data);
      }
    } catch (errors: any) {
      // console.log(errors?.message);
    }
  };

  /**
   * FIRST LOAD
   */
  useEffect(() => {
    referral();
  }, []);

  /**
   * UPDATE MENU FROM COIN
   */
  useEffect(() => {
    if (!coin?.name) return;

    setMenu(coin.symbol);
  }, [coin]);

  useEffect(() => {
    fetchTicker();

    const interval = setInterval(() => {
      fetchTicker();
    }, 60000);

    return () => clearInterval(interval);
  }, [menu, time]);

  const isUp = Number(ticker?.change || 0) >= 0;

  const formatNumber = (value: number) => {
    if (!value) return "--";

    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  };

  const handleClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box
      sx={{
        background: "#0E1316",
        borderBottom: "1px solid #161b26",
        px: 1.5,
        py: 1,
      }}
    >
      {/* ================= DESKTOP ================= */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={4}
        sx={{
          width: "100%",
          display: {
            xs: "none",
            md: "flex",
          },
          overflow: "hidden",
          height: 52,
        }}
      >
        {/* SYMBOL */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            src={
              iconMap[coin.symbol] ||
              `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin?.coinname?.toLowerCase()}.png`
            }
            sx={{
              width: 26,
              height: 26,
            }}
          />

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {coin?.title}
          </Typography>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: "#2a3040",
            }}
          />

          <StarIcon
            sx={{
              fontSize: 16,
              color: "#8a8f98",
            }}
          />
        </Stack>

        {/* PRICE */}
        <Box>
          <Typography
            sx={{
              color: isUp ? "#00e676" : "#ff5252",
              fontWeight: 700,
              fontSize: 24,
              lineHeight: 1,
            }}
          >
            {formatNumber(ticker?.close ?? 0)}
          </Typography>

          <Typography
            sx={{
              color: "#9aa4af",
              fontSize: 12,
              mt: 0.3,
            }}
          >
            {formatNumber(ticker?.close ?? 0)}
          </Typography>
        </Box>

        {/* CHANGE */}
        <InfoItem
          label={t("HomePage.trade6")}
          value={ticker?.change ? `${ticker.change.toFixed(2)}%` : "--"}
          color={isUp ? "#00e676" : "#ff5252"}
        />

        {/* HIGH */}
        <InfoItem
          label={t("HomePage.trade7")}
          value={formatNumber(ticker?.high ?? 0)}
          color="#00e676"
        />

        {/* LOW */}
        <InfoItem
          label={t("HomePage.trade8")}
          value={formatNumber(ticker?.low ?? 0)}
          color="#ff5252"
        />

        {/* VOLUME */}
        {/* <InfoItem
          label="24H Khối lượng"
          value={ticker?.volume ? Number(ticker.volume).toLocaleString() : "--"}
          color="#fff"
        /> */}
      </Stack>

      {/* ================= MOBILE ================= */}
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        {/* TOP ROW */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{
                color: "#fff",
                p: 0.5,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Avatar
              src={
                iconMap[coin.symbol] ||
                `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin?.coinname?.toLowerCase()}.png`
              }
              sx={{ width: 28, height: 28 }}
            >
              {coin.symbol.charAt(0)}
            </Avatar>

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {coin?.title}
            </Typography>
          </Stack>
        </Stack>

        {/* BOTTOM ROW */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            mt: 1,
          }}
        >
          <MobileItem
            label={t("HomePage.trade1")}
            value={formatNumber(ticker?.close ?? 0)}
          />

          <MobileItem
            label={t("HomePage.trade2")}
            value={formatNumber(ticker?.high ?? 0)}
          />

          <MobileItem
            label={t("HomePage.trade3")}
            value={formatNumber(ticker?.low ?? 0)}
          />

          <MobileItem
            label={t("HomePage.trade4")}
            value={
              ticker?.change ? Number(ticker.change).toFixed(2) + "%" : "--"
            }
          />
        </Stack>

        <Stack
          direction="row"
          alignItems={"center"}
          gap={"10px"}
          sx={{
            mt: 1,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: 30,
            }}
          >
            ${formatNumber(ticker?.close ?? 0)}
          </Typography>

          <Typography
            sx={{
              color: isUp ? "#00e676" : "#ff5252",
              fontWeight: 500,
              fontSize: 14,
              background: isUp ? "#21965333" : "#ff525233",
              p: "5px 10px",
              borderRadius: "8px",
            }}
          >
            {ticker?.change ? `${ticker.change.toFixed(2)}%` : "--"}
          </Typography>
        </Stack>
      </Box>

      {/* DRAWER */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: "70%",
            background: "#111827",
            border: "none",

            position: "fixed",

            left: {
              xs: 0,
              sm: "calc(50% - 224px)",
            },

            height: "100%",
            maxWidth: "448px",
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
          menu,
          listCoin,
          interval: time,

          changePercent: () => {},
          handleDrawerClose: () => handleDrawerClose(),
          setMenu: (v: string) => {
            setMenu(v.toUpperCase());

            setMenuCoin(v);

            handleDrawerClose();
          },
        })}
      </Drawer>
    </Box>
  );
}

function InfoItem({
  label,
  value,
  color,
}: {
  label: string;
  value: any;
  color: string;
}) {
  return (
    <Box>
      <Typography
        sx={{
          color: "#7d8592",
          fontSize: 12,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          color,
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function MobileItem({ label, value }: { label: string; value: any }) {
  return (
    <Box>
      <Typography
        sx={{
          color: "#7d8592",
          fontSize: 11,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          mt: 0.3,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
