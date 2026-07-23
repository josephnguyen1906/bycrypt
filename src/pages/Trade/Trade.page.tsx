"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header from "./Header";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import OrderBook from "./OrderBook";
import TradeForm from "./TradeForm";
import BottomTabs from "@/components/Trade/BottomTabs";
import { useTranslation } from "react-i18next";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TradePanel from "./TradePanel";
import {
  getContractjc,
  getPerpHistory,
  getPerpPositions,
} from "@/services/User.service";
import { useUserStore } from "@/stores/useUserStore";
import { IHistoryOpen } from "@/shared/interfaces";
import TradingChartPopup from "@/components/coins/TradingChartPopup";
import { IcoinFinace } from "@/interface/user.interface";
import CoinMenuMobile from "@/components/coins/CoinMenuMobile";
import { COINS } from "@/datafake/home";
import { useRouter } from "next/navigation";
import { normalizeList } from "@/utils/tradeLists";
export interface IcoinType {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}
interface DepthItem {
  price: number;
  quantity: number;
}

export default function TradePage() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [amount, setAmount] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [percent, setPercent] = useState(0);
  const [ticker, setTicker] = useState<any>();
  const [coin, setCoin] = useState("btcusdt");
  const [openChart, setOpenChart] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const [orderOpen, setOderOpen] = useState<IHistoryOpen[]>([]);
  const [asks, setAsks] = useState<DepthItem[]>([]);
  const [bids, setBids] = useState<DepthItem[]>([]);
  const [perpPositions, setPerpPositions] = useState<any[]>([]);
  const [perpHistory, setPerpHistory] = useState<any[]>([]);
  const [listTab, setListTab] = useState(0);
  const [lastPrice, setLastPrice] = useState(0);
  const [priceColor, setPriceColor] = useState("#fff");
  const lastPriceRef = useRef(0);
  const router = useRouter();

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

  const fetchContractOrders = useCallback(async () => {
    try {
      const his: any = await getContractjc();
      if (his?.status) {
        setOderOpen(normalizeList(his.data));
      }
    } catch (errors: any) {
      console.log(errors?.message);
    }
  }, []);

  const fetchPerpData = useCallback(async () => {
    const currentUser = useUserStore.getState().user;
    if (!currentUser) {
      setPerpPositions([]);
      setPerpHistory([]);
      return;
    }
    try {
      const [posRes, histRes]: any[] = await Promise.all([
        getPerpPositions(),
        getPerpHistory(20),
      ]);
      if (posRes?.status) {
        setPerpPositions(normalizeList(posRes.data));
      }
      if (histRes?.status) {
        setPerpHistory(normalizeList(histRes.data));
      }
    } catch (errors: any) {
      console.log(errors?.message);
    }
  }, []);

  // Keep both lists warm so switching Vĩnh viễn / Hợp đồng doesn't wipe UI.
  useEffect(() => {
    if (!user?.id) {
      setPerpPositions([]);
      setPerpHistory([]);
      setOderOpen([]);
      return;
    }
    void fetchPerpData();
    void fetchContractOrders();
  }, [user?.id, fetchPerpData, fetchContractOrders]);

  const handlePerpSuccess = useCallback(async () => {
    setListTab(0);
    await fetchPerpData();
  }, [fetchPerpData]);

  const handleContractSuccess = useCallback(async () => {
    setListTab(0);
    await fetchContractOrders();
  }, [fetchContractOrders]);
  // realCoin menu
  // const referral = async () => {
  //   try {
  //     const listCoin: any = await getListCoin();

  //     if (listCoin.status === true) {
  //       setListCoin(listCoin.data);
  //     }
  //   } catch (errors: any) {
  //     // console.log(errors?.message);
  //   }
  // };

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
        minHeight: "100vh",
        background: "#0E0F18",
        position: "relative",
      }}
    >
      <Header
        symbol={ticker?.s}
        percent={Number(Number(ticker?.P || 0).toFixed(3))}
        onIndicator={() => setDrawerOpen(true)}
        onBack={() => router.back()}
      />
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
            onClick={() => {
              setTab(0);
              setListTab(0);
            }}
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
            onClick={() => {
              setTab(1);
              setListTab(0);
            }}
          >
            {t("TradePage.title15")}
          </Button>
        </Stack>
        <Grid container spacing={1}>
          <Grid size={{ xs: 5 }}>
            <OrderBook
              asks={asks}
              bids={bids}
              lastPrice={lastPrice}
              priceColor={priceColor}
              symbol={coin}
            />
          </Grid>

          <Grid size={{ xs: 7 }}>
            {tab == 0 ? (
              <TradeForm
                coin={lastPrice}
                amount={amount}
                setAmount={setAmount}
                percent={percent}
                setPercent={setPercent}
                symbol={coin}
                user={user}
                onSuccess={handlePerpSuccess}
              />
            ) : (
              <TradePanel
                symbol={coin}
                user={user}
                onSuccess={handleContractSuccess}
              />
            )}
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            mt: 2,
          }}
        >
          <BottomTabs
            orderOpen={orderOpen}
            perpetualMode={tab === 0}
            perpPositions={perpPositions}
            perpHistory={perpHistory}
            onPerpChanged={fetchPerpData}
            listTab={listTab}
            onListTabChange={setListTab}
          />
        </Box>
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
          onClick={() => setOpenChart(true)}
        >
          <Box display="flex" gap={1} alignItems="center">
            <Typography
              sx={{
                fontSize: 18,
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              {coin.replace("usdt", "/usdt")}
            </Typography>

            <Typography sx={{ fontSize: 18, color: "#fff" }}>
              {t("TradePage.title16")}
            </Typography>
          </Box>

          <KeyboardArrowUpIcon sx={{ color: "#fff", fontSize: 25 }} />
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "448px",
            },
          }}
        >
          <TradingChartPopup
            open={openChart}
            onClose={() => setOpenChart(false)}
            symbol={coin.toUpperCase()}
          />
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
