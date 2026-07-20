"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import OrderBook from "./OrderBook";
import TradeForm from "./TradeForm";
import BottomTabs from "./BottomTabs";
import { useTranslation } from "react-i18next";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TradePanel from "./TradePanel";
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
  const [amount, setAmount] = useState("");
  const [tab, setTab] = useState(0);
  const [percent, setPercent] = useState(0);
  const [ticker, setTicker] = useState<any>();
  const [coin, setCoin] = useState("btcusdt");
  const ws = useRef<WebSocket | null>(null);
  const [asks, setAsks] = useState<DepthItem[]>([]);
  const [bids, setBids] = useState<DepthItem[]>([]);
  const [lastPrice, setLastPrice] = useState(0);
  const [priceColor, setPriceColor] = useState("#fff");
  const lastPriceRef = useRef(0);
  const WS_URL =
    "wss://stream.binance.com:9443/stream?streams=btcusdt@depth20@100ms/btcusdt@ticker";

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onmessage = (event) => {
      const json = JSON.parse(event.data);
      const { stream, data } = json;

      // Trade
      if (stream === "btcusdt@ticker") {
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
        stream === "btcusdt@depth20@100ms" &&
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
  }, []);

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
      }}
    >
      <Header
        symbol={ticker?.s}
        percent={Number(Number(ticker?.P || 0).toFixed(3))}
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
        <Grid container spacing={2}>
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
              />
            ) : (
              <TradePanel />
            )}
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            mt: 2,
          }}
        >
          <BottomTabs />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 52,
            position: "fixed",
            bottom: 0,
            left: 0,
            display: "flex",
            justifyContent: "space-between",
            background: "#0E0F18",
            alignItems: "center",
            px: 4,
            cursor: "pointer",
          }}
        >
          <Box display={"flex"} gap={1} height={52} alignItems={"center"}>
            <Typography
              sx={{ fontSize: 18, textTransform: "uppercase", color: "white" }}
            >
              {coin.replace("usdt", "/usdt")}
            </Typography>
            <Typography sx={{ fontSize: 18, color: "white" }}>
              {t("TradePage.title16")}
            </Typography>
          </Box>
          <KeyboardArrowUpIcon sx={{ color: "white", fontSize: 25 }} />
        </Box>
      </Box>
    </Box>
  );
}
