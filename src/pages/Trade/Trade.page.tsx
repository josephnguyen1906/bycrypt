"use client";

import MenuCoin from "@/components/subMenu/MenuCoin";
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
import { useEffect, useState } from "react";

interface Order {
  price: string;
  qty: string;
}

export default function TradePage() {
  const [symbol, setSymbol] = useState("btcusdt");
  const [price, setPrice] = useState(0);
  const [percent, setPercent] = useState(0);
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);
  const [side, setSide] = useState("buy");
  const [quantity, setQuantity] = useState("0.00");
  const [sliderValue, setSliderValue] = useState(0);
  const { user, fetchUser } = useUserStore();
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [limitPrice, setLimitPrice] = useState("");

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

  // ===== ORDER BOOK =====
  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@depth20@100ms`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const bidsData = data.bids || data.b || [];
      const asksData = data.asks || data.a || [];

      setBids(
        bidsData.slice(0, 3).map((b: any) => ({
          price: b[0],
          qty: b[1],
        })),
      );

      setAsks(
        asksData.slice(0, 3).map((a: any) => ({
          price: a[0],
          qty: a[1],
        })),
      );
    };
    return () => ws.close();
  }, [symbol]);

  return (
    <Box
      sx={{
        maxWidth: 420,
        margin: "auto",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        p: 2,
        pb: "120px",
      }}
    >
      <MenuCoin
        data={(v) => {
          setSymbol(v);
        }}
      />
      <Box mt={5}>
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
          <Stack direction="row" justifyContent="space-between">
            <Typography fontSize={12} color="#9ca3af">
              Price
            </Typography>
            <Typography fontSize={12} color="#9ca3af">
              Quantity
            </Typography>
            <Typography fontSize={12} color="#9ca3af">
              Price
            </Typography>
          </Stack>

          {asks.map((a, i) => (
            <Stack
              key={i}
              direction="row"
              justifyContent="space-between"
              fontSize={13}
              sx={{ color: "#FF3D00" }}
            >
              <span style={{ color: "#FF3D00" }}>{a.price}</span>
              <span style={{ color: "white" }}>{a.qty}</span>
              <span style={{ color: "#00C853" }}>{a.price}</span>
            </Stack>
          ))}

          {bids.map((b, i) => (
            <Stack
              key={i}
              direction="row"
              justifyContent="space-between"
              fontSize={13}
              sx={{ color: "#00C853" }}
            >
              <span style={{ color: "#FF3D00" }}>{b.price}</span>
              <span style={{ color: "white" }}>{b.qty}</span>
              <span style={{ color: "#00C853" }}>{b.price}</span>
            </Stack>
          ))}
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
            Purchase
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
            Sell
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
            <ErrorOutline sx={{ fontSize: "16px" }} />
            <Typography fontSize={13} color="white">
              {orderType === "market" ? "Market price" : "Limit price"}{" "}
            </Typography>
            <DownIcon width="20px" height="20px" fill="white" />
          </Box>
        </Stack>

        {/* FORM */}
        <Box mt={3} p={2} bgcolor="#1e293b" borderRadius={3}>
          <Typography fontSize={12} color="#9ca3af">
            Price
          </Typography>

          {orderType === "market" ? (
            <Typography
              fontSize={14}
              color="#9ca3af"
              sx={{ mt: 1, borderBottom: "1px solid rgb(55 65 81)", p: "5px" }}
            >
              Trade at the current best price
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

          <Typography fontSize={12} color="#9ca3af" mt={2}>
            Quantity
          </Typography>

          <TextField
            fullWidth
            variant="standard"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Please enter quantity"
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

          <Slider
            value={sliderValue}
            onChange={(e, v) => setSliderValue(v as number)}
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {[0, 25, 50, 75, 100].map((v) => (
              <Button
                key={v}
                size="small"
                onClick={() => setSliderValue(v)}
                sx={{
                  fontSize: 11,
                  color: "white",
                  background: "#334155",
                  borderRadius: "20px",
                }}
              >
                {v}%
              </Button>
            ))}
          </Box>
        </Box>

        {/* FOOTER */}
        <Box mt={3}>
          <Stack direction="row" justifyContent="space-between" fontSize={12}>
            <span>Available</span>
            <span>
              {Number(user?.balance.usdt_total).toLocaleString()} USDT
            </span>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            fontSize={12}
            mt={1}
          >
            <span>Transaction volume</span>
            <span>{Number(user?.balance.usdt).toLocaleString()} USDT</span>
          </Stack>

          <Button
            fullWidth
            sx={{
              mt: 3,
              background: "#34d399",
              color: "black",
              fontWeight: "bold",
              borderRadius: 3,
              p: 1.5,
              textTransform: "capitalize",
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
