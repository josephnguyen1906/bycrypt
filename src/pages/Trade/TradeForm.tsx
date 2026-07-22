"use client";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  InputBase,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useCallback, useEffect, useMemo, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import LeverageDrawer from "./LeverageDrawer";
import {
  getPerpBalance,
  getPerpSettings,
  postPerpOrder,
} from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
import {
  getTradeLockMessage,
  isTradeLocked,
} from "@/utils/tradeLock";

const marks = [
  { value: 0, label: "0%" },
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "100%" },
];

function formatQty(value: number, digits = 8): string {
  if (!Number.isFinite(value) || value <= 0) return "0";
  const fixed = value.toFixed(digits);
  return fixed.replace(/\.?0+$/, "") || "0";
}

function symbolForApi(coinStream: string): string {
  const raw = coinStream.toLowerCase().replace(/usdt$/i, "");
  return `${raw.toUpperCase()}USDT`;
}

export default function TradeForm({
  coin: lastPrice,
  amount,
  setAmount,
  percent,
  setPercent,
  symbol,
  user,
  onSuccess,
}: {
  coin: number;
  amount: string;
  percent: number;
  setAmount: (e: string) => void;
  setPercent: (e: number) => void;
  symbol: string;
  user: IUser | null;
  onSuccess?: () => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [leverage, setLeverage] = useState(1);
  const [submitting, setSubmitting] = useState<"buy" | "sell" | null>(null);
  const [usdtAvailable, setUsdtAvailable] = useState(0);
  const [feeRate, setFeeRate] = useState(0.05);

  const apiSymbol = useMemo(() => symbolForApi(symbol), [symbol]);
  const coinLabel = apiSymbol.replace("USDT", "");

  const price = lastPrice > 0 ? lastPrice : 0;
  const qty = parseFloat(amount) || 0;
  const notional = qty * price;
  const margin = leverage > 0 ? notional / leverage : notional;
  const buyFeeUsdt = feeRate > 0 ? (notional * feeRate) / 100 : 0;
  const sellFeeUsdt = buyFeeUsdt;

  const costPerCoin =
    price > 0 ? price * (1 / leverage + feeRate / 100) : 0;
  const maxBuyQty = costPerCoin > 0 ? usdtAvailable / costPerCoin : 0;

  const loadWallet = useCallback(async () => {
    if (!user) {
      setUsdtAvailable(0);
      return;
    }
    try {
      const res: any = await getPerpBalance();
      if (res?.status === true) {
        setUsdtAvailable(parseFloat(res.data?.available_usdt ?? "0") || 0);
      }
    } catch {
      setUsdtAvailable(0);
    }
  }, [user]);

  useEffect(() => {
    getPerpSettings()
      .then((res: any) => {
        if (res?.status === true) {
          setFeeRate(Number(res.data?.fee_rate_percent ?? 0.05));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  const handleAmountChange = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) return;
    setAmount(value);
    const nextQty = parseFloat(value) || 0;
    const pct =
      maxBuyQty > 0 ? Math.min(100, Math.round((nextQty / maxBuyQty) * 100)) : 0;
    setPercent(pct);
  };

  const handlePercentChange = (_: Event, value: number | number[]) => {
    const pct = value as number;
    setPercent(pct);
    if (maxBuyQty <= 0) {
      setAmount("");
      return;
    }
    setAmount(formatQty((maxBuyQty * pct) / 100));
  };

  const handleSubmit = async (side: "buy" | "sell") => {
    if (!user) {
      toast.error(t("Toast.buysell1"));
      return;
    }
    if (isTradeLocked(user)) {
      toast.error(getTradeLockMessage(user));
      return;
    }
    if (user.rzstatus !== 2) {
      toast.error(t("Toast.buysell1"));
      return;
    }
    if (!qty || qty <= 0) {
      toast.error(t("Toast.buysell2"));
      return;
    }
    if (price <= 0) {
      toast.error(t("Toast.buysell4"));
      return;
    }

    setSubmitting(side);
    try {
      const res: any = await postPerpOrder({
        symbol: apiSymbol,
        side,
        qty: amount,
        leverage,
      });

      if (res?.status === true) {
        toast.success(res.message || t("Toast.buysell3"));
        setAmount("");
        setPercent(0);
        await loadWallet();
        onSuccess?.();
      } else {
        toast.error(res?.message || t("Toast.buysell4"));
      }
    } catch (err: any) {
      toast.error(err?.message || t("Toast.buysell4"));
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <Box sx={{ px: 2 }}>
      <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
        <Box sx={boxStyle}>
          <Typography fontSize={12} color="#fff" fontWeight={600}>
            {t("TradePage.title1")}
          </Typography>
        </Box>

        <Box sx={boxStyle}>
          <Stack
            direction="row"
            justifyContent="center"
            width="100%"
            alignItems="center"
            gap={1}
            onClick={() => setOpen(true)}
            sx={{ cursor: "pointer" }}
          >
            <Typography color="#fff" fontSize={12} fontWeight={700}>
              {leverage}x
            </Typography>
            <ArrowDropDownIcon sx={{ color: "#fff", fontSize: "16px" }} />
          </Stack>
        </Box>
      </Stack>

      <Box
        sx={{
          ...boxStyle,
          mt: 2,
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <InfoOutlinedIcon sx={{ color: "#08D27A", fontSize: "16px" }} />
        <Typography
          color="#fff"
          fontSize={12}
          sx={{ width: "70%", margin: "auto", textAlign: "center" }}
        >
          {t("TradePage.title2")}
        </Typography>
        <ArrowDropDownIcon sx={{ color: "#fff", fontSize: "16px" }} />
      </Box>

      <Box sx={{ ...inputStyle, mt: 2 }}>
        <Typography color="#fff" fontSize={14}>
          {price > 0 ? price.toFixed(2) : "—"}
        </Typography>
        <Typography color="#888" fontSize={14}>
          USDT
        </Typography>
      </Box>

      <Box sx={{ ...inputStyle, mt: 2 }}>
        <InputBase
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder={t("TradePage.title13")}
          sx={{
            flex: 1,
            color: "#fff",
            fontSize: 16,
            "& input::placeholder": { color: "#888", opacity: 1 },
          }}
        />
        <Typography color="#fff" fontSize={12} fontWeight={600}>
          {t("TradePage.title3")}
          {notional > 0 ? ` ${formatQty(notional, 2)} USDT` : ""}
        </Typography>
      </Box>

      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Typography color="#A8A8A8" fontSize={11}>
          {t("TradePage.title4")}
        </Typography>
        <Typography color="#fff" fontSize={11}>
          {usdtAvailable.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          USDT
        </Typography>
      </Stack>

      <Slider
        value={percent}
        onChange={handlePercentChange}
        step={null}
        marks={marks}
        min={0}
        max={100}
        sx={{
          color: "#08D27A",
          mt: 2,
          height: 4,
          "& .MuiSlider-thumb": { width: 20, height: 20, bgcolor: "#fff" },
          "& .MuiSlider-track": { bgcolor: "#08D27A" },
          "& .MuiSlider-rail": { bgcolor: "#2B2F3A" },
          "& .MuiSlider-mark": {
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "#2B2F3A",
          },
          "& .MuiSlider-markActive": { bgcolor: "#08D27A" },
          "& .MuiSlider-markLabel": { color: "#888", fontSize: 12 },
        }}
      />

      <Stack direction="row" justifyContent="space-between">
        {["0%", "25%", "50%", "75%", "100%"].map((item) => (
          <Typography key={item} color="#fff" fontSize={13}>
            {item}
          </Typography>
        ))}
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1} mt={2}>
        <Checkbox
          sx={{
            p: 0,
            color: "#666",
            "& .MuiSvgIcon-root": { fontSize: 20 },
            "&.Mui-checked": { color: "#A0A0A0" },
          }}
        />
        <Typography color="#CFCFCF" fontSize={11}>
          {t("TradePage.title5")}
        </Typography>
        <InfoOutlinedIcon sx={{ color: "#08D27A", fontSize: 16 }} />
      </Stack>

      <Button
        fullWidth
        disabled={submitting !== null}
        onClick={() => handleSubmit("buy")}
        sx={{
          mt: 2,
          height: 47,
          bgcolor: "#08D27A",
          color: "#fff",
          borderRadius: "30px",
          fontSize: 18,
          textTransform: "none",
          "&:hover": { bgcolor: "#08D27A" },
        }}
      >
        {submitting === "buy" ? (
          <CircularProgress size={22} sx={{ color: "#fff" }} />
        ) : (
          t("TradePage.title6")
        )}
      </Button>

      <Stack spacing={1.2} mt={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title8")}
          </Typography>
          <Typography color="#fff" fontSize={13} fontWeight={600}>
            {formatQty(maxBuyQty, 4)} {coinLabel} {t("TradePage.title9")}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title10")}
          </Typography>
          <Typography color="#fff" fontSize={13} fontWeight={600}>
            ≈ {margin.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
            USDT
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title11")}
          </Typography>
          <Typography color="#fff" fontSize={13} fontWeight={600}>
            {buyFeeUsdt.toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}{" "}
            USDT
          </Typography>
        </Stack>
      </Stack>

      <Button
        fullWidth
        disabled={submitting !== null}
        onClick={() => handleSubmit("sell")}
        sx={{
          mt: 3,
          height: 47,
          bgcolor: "#FF4B45",
          color: "#fff",
          borderRadius: "30px",
          fontSize: 18,
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { bgcolor: "#FF4B45" },
        }}
      >
        {submitting === "sell" ? (
          <CircularProgress size={22} sx={{ color: "#fff" }} />
        ) : (
          t("TradePage.title7")
        )}
      </Button>

      <Stack spacing={1.2} mt={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title8")}
          </Typography>
          <Typography color="#fff" fontSize={13} fontWeight={600}>
            {formatQty(maxBuyQty, 4)} {coinLabel} {t("TradePage.title9")}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title10")}
          </Typography>
          <Typography color="#fff" fontSize={13} fontWeight={600}>
            ≈ {margin.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
            USDT
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title11")}
          </Typography>
          <Typography color="#fff" fontSize={13} fontWeight={600}>
            {sellFeeUsdt.toLocaleString(undefined, {
              maximumFractionDigits: 4,
            })}{" "}
            USDT
          </Typography>
        </Stack>
      </Stack>

      <LeverageDrawer
        open={open}
        onClose={() => setOpen(false)}
        leverage={leverage}
        onChange={setLeverage}
        available={usdtAvailable}
      />
    </Box>
  );
}

const boxStyle = {
  flex: 1,
  height: 30,
  bgcolor: "#1A1D27",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const inputStyle = {
  height: 43,
  bgcolor: "#0A0A0F",
  border: "1px solid #1A1B24",
  borderRadius: "7px",
  px: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
