"use client";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
  getWebsiteConfig,
} from "@/services/User.service";
import { useUserStore } from "@/stores/useUserStore";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Icoin, IcoinFinace } from "@/interface/user.interface";
import { useRouter } from "next/navigation";
import { IHistoryOpen } from "@/shared/interfaces";
import Image from "next/image";
import OrderBookChart from "./OrderBookChart";
import { COINS } from "@/datafake/home";

interface DepthItem {
  price: number;
  quantity: number;
}

export default function TradeChartPage() {
  const { t, i18n } = useTranslation();
  const [coin, setCoin] = useState("btcusdt");
  const [amount, setAmount] = useState("");
  const [tab, setTab] = useState(0);
  const [percent, setPercent] = useState(0);
  const [ticker, setTicker] = useState<any>();
  const [price, setPrice] = useState<number>();
  const { user, fetchUser } = useUserStore();
  const [interval, setInterval] = useState("1m");
  const [listCoin, setListCoin] = useState<IcoinFinace[]>([]);
  const router = useRouter();
  const [history, setHisstory] = useState<IHistoryOpen[]>([]);
  const [asks, setAsks] = useState<DepthItem[]>([]);
  const [bids, setBids] = useState<DepthItem[]>([]);
  const [lastPrice, setLastPrice] = useState(0);
  const [priceColor, setPriceColor] = useState("#fff");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const lastPriceRef = useRef(0);

  useEffect(() => {
    const WS_URL = `wss://stream.binance.com:9443/stream?streams=${coin}@depth20@100ms/${coin}@ticker`;
    ws.current = new WebSocket(WS_URL);

    ws.current.onmessage = (event) => {
      const json = JSON.parse(event.data);
      const { stream, data } = json;

      // Trade
      if (stream === `${coin}@ticker`) {
        setTicker(data);
        const price = Number(data.c);
        if (price > lastPriceRef.current) {
          setPriceColor("#0ECB81");
        } else if (price < lastPriceRef.current) {
          setPriceColor("#F6465D");
        }

        lastPriceRef.current = price;
        setLastPrice(price);

        return;
      }

      // Depth
      if (
        stream === `${coin}@depth20@100ms` &&
        Array.isArray(data.asks) &&
        Array.isArray(data.bids)
      ) {
        const askData = data.asks
          .slice(0, 11)
          .map((x: string[]) => ({
            price: Number(x[0]),
            quantity: Number(x[1]),
          }))
          .sort(
            (a: { price: number }, b: { price: number }) => b.price - a.price,
          );

        const bidData = data.bids
          .slice(0, 11)
          .map((x: string[]) => ({
            price: Number(x[0]),
            quantity: Number(x[1]),
          }))
          .sort(
            (a: { price: number }, b: { price: number }) => b.price - a.price,
          );

        setAsks(askData);
        setBids(bidData);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [coin]);
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

  // fake coin Menu
  const coinList = useMemo(
    () =>
      COINS.map(
        (symbol, index) =>
          ({
            id: index + 1,
            symbol: symbol,
            coinname: symbol.replace("USDT", ""),
            title: symbol.replace("USDT", ""),
          }) as IcoinFinace & { symbol: string; coinname?: string },
      ),
    [],
  );
  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        background: "#0E0F18",
        position: "relative",
      }}
    >
      {" "}
      <Box
        sx={{
          height: 72,
          px: 2,
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
            gap: "50px",
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
              display: "flex",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <IconButton
              sx={{ width: 22, background: "none" }}
              onClick={() => setDrawerOpen(true)}
            >
              <Image
                src={"/images/arrowicon.png"}
                width={22}
                height={22}
                alt=""
              />
            </IconButton>

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 12,
                textTransform: "uppercase",
              }}
            >
              {coin?.replace("usdt", "/usdt")}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "95%", margin: "auto" }}>
        <Stack direction="row" spacing={2} mb={1}>
          <Button
            fullWidth
            sx={{
              bgcolor: tab == 0 ? "#08D27A" : "transparent",
              color: "#fff",
              borderRadius: "8px",
              height: 34,
              fontSize: 12,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#08D27A",
              },
            }}
            onClick={() => setTab(0)}
          >
            {t("TradePage.title14")}
          </Button>

          <Button
            fullWidth
            sx={{
              bgcolor: tab == 1 ? "#08D27A" : "transparent",
              color: "#fff",
              borderRadius: "8px",
              height: 34,
              fontSize: 12,
              fontWeight: 700,
              textTransform: "none",
            }}
            onClick={() => setTab(1)}
          >
            {t("TradePage.title15")}
          </Button>
        </Stack>
        <ChartViewCustom
          symbol={coin}
          changePrice={(c) => setPrice(c)}
          interval={interval}
          setInterval={setInterval}
        />
        <OrderBookChart
          asks={asks}
          bids={bids}
          lastPrice={lastPrice}
          priceColor={priceColor}
          symbol={coin}
        />
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: {
              xs: 0,
              sm: "50%",
            },
            transform: {
              xs: "none",
              sm: "translateX(-50%)",
            },
            width: {
              xs: "100%",
              sm: "448px",
            },
            height: 52,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#0E0F18",
            px: 4,
            cursor: "pointer",
            zIndex: 1200,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Button
              fullWidth
              sx={{
                width: "100%",
                height: 40,
                bgcolor: "#08D27A",
                color: "#fff",
                borderRadius: "9px",
                fontSize: 18,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#08D27A",
                },
              }}
              onClick={() => router.push("/trade")}
            >
              {t("TradePage.title6")}
            </Button>
            <Button
              fullWidth
              sx={{
                width: "100%",
                height: 40,
                bgcolor: "#FF4B45",
                color: "#fff",
                borderRadius: "9px",
                fontSize: 18,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#FF4B45",
                },
              }}
              onClick={() => router.push("/trade")}
            >
              {t("TradePage.title7")}
            </Button>
          </Box>
        </Box>
        <CoinMenuMobile
          menu={coin}
          listCoin={coinList}
          interval={"1d"}
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          setMenu={(v: string) => setCoin(v)}
          changePercent={(v: string) => {
            setPercent(Number(v));
          }}
        />
      </Box>
    </Box>
  );
}
