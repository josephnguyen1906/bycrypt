"use client";

import MenuCoin from "@/components/subMenu/MenuCoin";
import { IcoinFinace } from "@/interface/user.interface";
import { postTradeMarket } from "@/services/User.service";
import { DownIcon } from "@/shared/Svgs/Svg.component";
import { useUserStore } from "@/stores/useUserStore";
import { ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Typography,
  Stack,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Slider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type Order = {
  price: number;
  qty: number;
};

export default function TradePage() {
  const [symbol, setSymbol] = useState("btcusdt");
  const [price, setPrice] = useState(0);
  const [percent, setPercent] = useState(0);
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [quantity, setQuantity] = useState("0.00");
  const [sliderValue, setSliderValue] = useState(0);
  const [coin, setCoin] = useState<IcoinFinace>();
  const { user, fetchUser } = useUserStore();
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [limitPrice, setLimitPrice] = useState("");
  const [inputSource, setInputSource] = useState<"slider" | "input">("slider");
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ===== REALTIME PRICE =====
  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@ticker`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const last = parseFloat(data.c);
      const open = parseFloat(data.o);

      setPrice(last);
      setPercent(((last - open) / open) * 100);
    };

    return () => ws.close();
  }, [symbol]);

  useEffect(() => {
    if (!user || !price) return;
    if (inputSource !== "slider") return;

    const balance = Number(user.balance.usdt_total || 0);

    const usdtAmount = (balance * sliderValue) / 100;
    const coinAmount = usdtAmount / price;

    setQuantity(coinAmount.toFixed(6));
  }, [sliderValue, user, price, inputSource]);

  const handleQuantityChange = (value: string) => {
    setInputSource("input");
    setQuantity(value);

    if (!user || !price) return;

    const balance = Number(user.balance.usdt_total || 0);
    const qty = Number(value);

    if (!qty) {
      setSliderValue(0);
      return;
    }

    const usdtUsed = qty * price;
    const percent = (usdtUsed / balance) * 100;

    setSliderValue(Math.min(100, Math.max(0, Number(percent.toFixed(2)))));
  };

  const handleSliderChange = (value: number) => {
    setInputSource("slider");
    setSliderValue(value);
  };
  // ===== BINANCE ORDER BOOK WS =====
  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@depth20@100ms`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const bidsData = data.bids || data.b || [];
      const asksData = data.asks || data.a || [];

      setBids(
        bidsData.slice(0, 8).map((b: any) => ({
          price: parseFloat(b[0]),
          qty: parseFloat(b[1]),
        })),
      );

      setAsks(
        asksData.slice(0, 8).map((a: any) => ({
          price: parseFloat(a[0]),
          qty: parseFloat(a[1]),
        })),
      );
    };

    return () => ws.close();
  }, [symbol]);

  // ===== MAX VOLUME FOR DEPTH BAR =====
  const maxQty = useMemo(() => {
    const all = [...bids.map((b) => b.qty), ...asks.map((a) => a.qty)];
    return Math.max(...all, 1);
  }, [bids, asks]);

  const formatPrice = (p: number) => p.toLocaleString();
  const formatQty = (q: number) => q.toFixed(5);

  const onSubmit = async () => {
    console.log("coin", coin);

    try {
      if (coin) {
        if (orderType == "market") {
          const res = await postTradeMarket(
            coin.id,
            side,
            "market",
            null,
            quantity,
          );
          if (res.status) {
            toast.success(t("Toast.buysell3"));
            setQuantity("");
            setLimitPrice("");
          }
        } else {
          const res = await postTradeMarket(
            coin.id,
            side,
            "limit",
            limitPrice,
            quantity,
          );
          if (res.status) {
            toast.success(t("Toast.buysell3"));
            setQuantity("");
            setLimitPrice("");
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message);
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
      <MenuCoin
        changeCoin={(v) => setCoin(v)}
        data={(v) => {
          setSymbol(v);
        }}
      />
      <Box mt={7}>
        <Typography
          fontSize={25}
          fontWeight="bold"
          color={percent >= 0 ? "#00C853" : "#FF3D00"}
          mt={1}
          sx={{ borderBottom: "1px solid rgb(55 65 81)" }}
        >
          {price.toLocaleString()}
        </Typography>

        {/* ORDER BOOK */}
        <Box mt={3}>
          {/* HEADER */}
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography fontSize={12} color="#9ca3af" width="25%">
              {t("Toast.price")}
            </Typography>

            <Typography fontSize={12} color="#9ca3af" textAlign="center">
              {t("AssetPage.quantity")}
            </Typography>

            <Typography
              fontSize={12}
              color="#9ca3af"
              width="25%"
              textAlign="right"
            >
              {t("Toast.price")}
            </Typography>
          </Stack>

          {Array.from({ length: 5 }).map((_, i) => {
            const ask = asks[4 - i];
            const bid = bids[i];

            const askDepth = ask ? (ask.qty / maxQty) * 100 : 0;
            const bidDepth = bid ? (bid.qty / maxQty) * 100 : 0;

            return (
              <Box
                key={i}
                sx={{
                  position: "relative",
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* RED DEPTH */}
                {ask && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      height: "100%",
                      width: `${askDepth * 0.375}%`,
                      background: "rgba(239,68,68,0.25)",
                      pointerEvents: "none",
                      transition: "width 0.2s ease",
                    }}
                  />
                )}

                {/* GREEN DEPTH */}
                {bid && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: 0,
                      height: "100%",
                      width: `${bidDepth * 0.375}%`,
                      background: "rgba(34,197,94,0.25)",
                      pointerEvents: "none",
                      transition: "width 0.2s ease",
                    }}
                  />
                )}

                <Box
                  width="100%"
                  fontSize={13}
                  sx={{
                    zIndex: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {/* ASK PRICE */}
                  <Box width="25%" color="#ef4444">
                    {ask ? formatPrice(ask.price) : "-"}
                  </Box>

                  <Box sx={{ display: "flex", gap: "20px" }}>
                    {/* ASK QTY */}
                    <Box width="25%" textAlign="right" color="white">
                      {ask ? formatQty(ask.qty) : "-"}
                    </Box>

                    {/* BID QTY */}
                    <Box width="25%" textAlign="left" color="white" ml={"10px"}>
                      {bid ? formatQty(bid.qty) : "-"}
                    </Box>
                  </Box>

                  {/* BID PRICE */}
                  <Box width="25%" textAlign="right" color="#22c55e">
                    {bid ? formatPrice(bid.price) : "-"}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Stack direction="row" spacing={1} mt={3} alignItems="center">
          {/* BUY */}
          <Button
            onClick={() => setSide("buy")}
            sx={{
              px: 1,
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 600,
              background: side === "buy" ? "#34d399" : "#1e293b",
              color: side === "buy" ? "#0f172a" : "white",
              "&:hover": {
                background: side === "buy" ? "#34d399" : "#273549",
              },
            }}
          >
            {t("HistoryPage.Purchase")}
          </Button>

          {/* SELL */}
          <Button
            onClick={() => setSide("sell")}
            sx={{
              px: 1,
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 600,
              background: side === "sell" ? "#ef4444" : "#1e293b",
              color: "white",
              "&:hover": {
                background: side === "sell" ? "#ef4444" : "#273549",
              },
            }}
          >
            {t("BuySellPage.sell1")}
          </Button>

          <Box
            onClick={() =>
              setOrderType((prev) => (prev === "market" ? "limit" : "market"))
            }
            sx={{
              flex: 1,
              background: "#1e293b",
              borderRadius: 999,
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              userSelect: "none",
              gap: "3px",
            }}
          >
            <ErrorOutline sx={{ fontSize: "16px", color: "white" }} />
            <Typography fontSize={13} color="white">
              {orderType === "market"
                ? t("StakingPage.Market")
                : t("StakingPage.Limit")}{" "}
            </Typography>
            <DownIcon width="20px" height="20px" fill="white" />
          </Box>
        </Stack>

        {/* FORM */}
        <Box mt={3} p={2} bgcolor="#1e293b" borderRadius={3}>
          <Typography fontSize={12} color="#9ca3af">
            {t("Toast.price")}
          </Typography>

          {orderType === "market" ? (
            <Typography
              fontSize={14}
              color="#9ca3af"
              sx={{ mt: 1, borderBottom: "1px solid rgb(55 65 81)", p: "5px" }}
            >
              {t("Toast.Coin_title")}
            </Typography>
          ) : (
            <TextField
              fullWidth
              variant="standard"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              placeholder={Number(price).toLocaleString()}
              type="number"
              InputProps={{
                disableUnderline: true,
                style: { color: "white" },
              }}
              sx={{
                mt: 1,
                background: "#1e293b",
                borderBottom: "1px solid rgb(55 65 81)",
                px: 1,
                py: 0.5,
              }}
            />
          )}

          <Box
            sx={{ display: "flex", justifyContent: "space-between", pb: "5px" }}
          >
            <Typography fontSize={12} color="#9ca3af" mt={2}>
              {t("AssetPage.quantity")}
            </Typography>
            <Typography fontSize={12} color="#ef4444" mt={2}>
              {t("StakingPage.Handling")}: 0.001%
            </Typography>
          </Box>

          <TextField
            fullWidth
            variant="standard"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            placeholder={t("StakingPage.input_quantity")}
            type="number"
            InputProps={{
              disableUnderline: true,
              style: { color: "white", background: "#1e293b" },
            }}
            sx={{
              "& .MuiInput-input": {
                background: "#1e293b",
                borderBottom: "1px solid rgb(55 65 81)",
              },
            }}
          />

          <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Typography
              sx={{
                width: "50px",
                color: "#9ca3af",
                fontSize: "12px",
                pt: "10px",
              }}
            >
              {sliderValue}%
            </Typography>
            <Slider
              value={sliderValue}
              // onChange={(e, v) => handleSliderChange(v as number)}
              sx={{
                mt: 2,
                color: sliderValue ? "#34d399" : "rgb(55 65 81)",

                // Ẩn nút tròn
                "& .MuiSlider-thumb": {
                  display: "none",
                },

                // Giữ chiều cao đẹp hơn
                "& .MuiSlider-track": {
                  height: 6,
                },
                "& .MuiSlider-rail": {
                  height: 6,
                  opacity: 0.3,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              gap: "5px",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {[0, 25, 50, 75, 100].map((v) => (
              <Button
                key={v}
                size="small"
                onClick={() => handleSliderChange(v)}
                sx={{
                  fontSize: 11,
                  color: "white",
                  background: "#334155",
                  borderRadius: "20px",
                  "&:hover": {
                    background: "#3f4957ff",
                  },
                }}
              >
                {v}%
              </Button>
            ))}
          </Box>
        </Box>

        {/* FOOTER */}
        {user ? (
          <Box mt={3}>
            <Stack direction="row" justifyContent="space-between" fontSize={12}>
              <Typography sx={{ color: "#9ca3af", fontSize: "12px" }}>
                {t("DepositWithdrawPage.message")}
              </Typography>
              <Typography sx={{ color: "white", fontSize: "12px" }}>
                {Number(user?.balance.usdt_total).toLocaleString()} USDT
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              fontSize={12}
              mt={1}
            >
              <Typography sx={{ color: "#9ca3af", fontSize: "12px" }}>
                {t("DepositWithdrawPage.transa_v")}
              </Typography>
              <Typography sx={{ color: "white", fontSize: "12px" }}>
                {orderType == "market"
                  ? (Number(price) * Number(quantity)).toLocaleString()
                  : (
                      Number(limitPrice) * Number(quantity)
                    ).toLocaleString()}{" "}
                USDT
              </Typography>
            </Stack>

            <Button
              fullWidth
              disabled={quantity.length == 0}
              onClick={onSubmit}
              sx={{
                mt: 3,
                background: "#34d399",
                color: "black",
                fontWeight: "bold",
                borderRadius: 3,
                p: 1.5,
                textTransform: "capitalize",
                "&:hover": {
                  background: "#2cad7eff",
                },
              }}
            >
              {t("DepositWithdrawPage.tab4")}
            </Button>
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
      </Box>
    </Box>
  );
}
