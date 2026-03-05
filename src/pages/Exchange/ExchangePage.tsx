"use client";

import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TradePopup from "@/components/popup/TradePopup";
import CoinPopup from "@/components/popup/CoinPopup";
import { Icoin } from "@/interface/user.interface";
import { ExchangeIcon } from "@/shared/Svgs/Svg.component";
import { useUserStore } from "@/stores/useUserStore";

const coinList = [
  "BTC",
  "ETH",
  "BCH",
  "LTC",
  "UNI",
  "XAU",
  "FIG",
  "COMB",
  "EBUN",
  "KXSE",
  "ETF",
];

export default function ExchangePage() {
  const router = useRouter();
  const { user } = useUserStore();
  const [fromCoin, setFromCoin] = useState("btc");
  const [toCoin] = useState("USDT");

  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(0);
  const [expected, setExpected] = useState(0);

  const [openSelect, setOpenSelect] = useState(false);

  const available = 0;

  /*
  realtime price
  */

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${fromCoin.toLowerCase()}usdt@trade`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRate(parseFloat(data.p));
    };

    return () => ws.close();
  }, [fromCoin]);

  /*
  expected usdt
  */

  useEffect(() => {
    const value = Number(amount || 0) * rate;
    setExpected(value);
  }, [amount, rate]);

  const handleSelectCoin = (coin: Icoin) => {
    setFromCoin(coin.coinname);
    setOpenSelect(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#020617,#020617,#0f172a)",
        color: "white",
        p: 2,
      }}
    >
      {/* header */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <ArrowBackIosNewIcon
          sx={{ cursor: "pointer" }}
          onClick={() => router.back()}
        />

        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          Exchange
        </Typography>
      </Box>

      {/* coin select */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
          mb: 3,
        }}
      >
        <Button
          onClick={() => setOpenSelect(true)}
          sx={{
            background: "#1e293b",
            color: "white",
            width: "35%",
            height: "50px",
            borderRadius: "10px",
            "&:hover": {
              background: "#2b3546ff",
            },
          }}
        >
          {fromCoin}
        </Button>

        <Box
          sx={{
            width: 60,
            height: 35,
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#22c55e",
            fontSize: 22,
            boxShadow: "0 0 10px rgba(16,185,129,.6)",
          }}
        >
          <ExchangeIcon width="35px" height="35px" />
        </Box>

        <Button
          sx={{
            background: "#1e293b",
            color: "white",
            width: "35%",
            height: "50px",
            borderRadius: "10px",
            "&:hover": {
              background: "#2b3546ff",
            },
          }}
        >
          {toCoin}
        </Button>
      </Box>

      {/* title */}

      <Typography fontWeight={600} mb={1}>
        Exchange quantity
      </Typography>

      {/* input */}

      <Box
        sx={{
          borderBottom: "1px solid #1e293b",
          pb: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          variant="standard"
          placeholder="Please enter exchange"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            input: {
              color: "white",
              fontSize: 16,
            },
          }}
        />

        <Typography sx={{ fontSize: "12px", width: "35px" }}>
          {fromCoin.toUpperCase()}
        </Typography>
        <Box
          sx={{
            width: "2px",
            height: "25px",
            background: "#ffffff26",
            ml: "8px",
            mr: "8px",
          }}
        />
        <Typography
          sx={{
            color: "#22c55e",
            cursor: "pointer",
            fontSize: "12px",
            width: "30px",
          }}
          onClick={() => setAmount(String(available))}
        >
          All
        </Typography>
      </Box>

      {/* available */}

      <Typography mt={1} fontSize={12} color="#64748b">
        Available{fromCoin} {available}
      </Typography>

      {/* info */}
      <Box
        sx={{
          display: "flex",
          mt: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography color="#64748b" fontSize={10}>
            Current exchange rate
          </Typography>

          <Typography fontWeight={500} fontSize={11}>
            {rate ? rate.toLocaleString() : "--"}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: "center",
          }}
        >
          <Typography color="#64748b" fontSize={10}>
            Available {fromCoin.toUpperCase()}
          </Typography>

          <Typography fontWeight={500} fontSize={11}>
            {available}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: "right",
          }}
        >
          <Typography color="#64748b" fontSize={10}>
            Expected to be available USDT
          </Typography>

          <Typography fontWeight={500} fontSize={11}>
            {Number(expected.toFixed(6)).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* button */}

      <Button
        fullWidth
        disabled={amount == "" || !user}
        sx={{
          mt: 4,
          height: 50,
          borderRadius: "25px",
          background: "linear-gradient(90deg,#22c55e,#16a34a)",
          color: "white",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "0 10px 25px rgba(16,185,129,.35)",
          "&:disabled": {
            background: "#34d39980",
            color: "#111827b3",
          },
        }}
      >
        Exchange
      </Button>

      {/* record */}

      <Typography mt={5} mb={2}>
        Exchange record
      </Typography>

      <Typography color="#64748b" textAlign="center">
        No more
      </Typography>

      {/* popup select coin */}
      <CoinPopup
        onClose={() => setOpenSelect(false)}
        open={openSelect}
        coin={fromCoin}
        handleSelectCoin={handleSelectCoin}
      />
    </Box>
  );
}
