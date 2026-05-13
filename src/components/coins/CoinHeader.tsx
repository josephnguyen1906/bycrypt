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
import { useEffect, useState } from "react";
import CoinMenuMobile from "./CoinMenuMobile";
import { IcoinFinace } from "@/interface/user.interface";
import { getFinaceCoin, getListCoin } from "@/services/User.service";
import { iconMap } from "./CoinPage";
import { getTickerBySymbol } from "@/services/binance";

export default function CoinHeader({ coin, time, setMenuCoin }: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [percent, setPercent] = useState("");
  const [listCoin, setListCoin] = useState<IcoinFinace[]>([]);
  const [menu, setMenu] = useState("btcusdt");
  const [ticker, setTicker] = useState<any>(null);
  useEffect(() => {
    console.log("menu", menu);

    const fetchTicker = async () => {
      const data = await getTickerBySymbol(menu, time);

      if (data) {
        setTicker(data);
      }
    };

    fetchTicker();
  }, [menu, time]);
  const isUp = Number(ticker?.change || 0) >= 0;
  const formatNumber = (value: number) => {
    if (!value) return "--";

    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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
  useEffect(() => {
    referral();
  }, []);

  const baseSymbol = coin.title.replace("/USDT", "");
  return (
    <Box
      sx={{
        background: "#0b1020",
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
            src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin?.coinname?.toLowerCase()}.png`}
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
          label="24H Biến đổi"
          value={ticker?.change ? `${ticker.change.toFixed(2)}%` : "--"}
          color={isUp ? "#00e676" : "#ff5252"}
        />

        {/* HIGH */}
        <InfoItem
          label="24H Giá cao nhất"
          value={formatNumber(ticker?.high ?? 0)}
          color="#00e676"
        />

        {/* LOW */}
        <InfoItem
          label="24H Giá thấp nhất"
          value={formatNumber(ticker?.low ?? 0)}
          color="#ff5252"
        />

        {/* VOLUME */}
        <InfoItem
          label="24H Khối lượng"
          value={ticker?.volume ? Number(ticker.volume).toLocaleString() : "--"}
          color="#fff"
        />
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
              aria-controls={drawerOpen ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={drawerOpen ? "true" : undefined}
              sx={{
                color: "#fff",
                p: 0.5,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Avatar
              src={iconMap[baseSymbol] || ""}
              sx={{ width: 28, height: 28 }}
            >
              {baseSymbol.charAt(0)}
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
          <MobileItem label="Open" value={formatNumber(ticker?.open ?? 0)} />

          <MobileItem label="Close" value={formatNumber(ticker?.close ?? 0)} />

          <MobileItem label="Low" value={formatNumber(ticker?.low ?? 0)} />

          <MobileItem
            label="Volume"
            value={
              ticker?.volume ? Number(ticker.volume).toLocaleString() : "--"
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
              background: isUp ? "#21965333" : "#21965333",
              p: "5px 10px",
              borderRadius: "8px",
            }}
          >
            {ticker?.change ? `${ticker.change.toFixed(2)}%` : "--"}
          </Typography>
        </Stack>
      </Box>
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
          menu: menu,
          listCoin,
          interval: time,
          changePercent: (v) => {
            setPercent(v);
          },
          setMenu: (v) => {
            setMenu(v);
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
