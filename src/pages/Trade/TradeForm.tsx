"use client";

import {
  Box,
  Button,
  Checkbox,
  InputBase,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";
import LeverageDrawer from "./LeverageDrawer";
const marks = [
  { value: 0, label: "0%" },
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "100%" },
];

export default function TradeForm({
  coin,
  amount,
  setAmount,
  percent,
  setPercent,
}: {
  coin: Number;
  amount: string;
  percent: number;
  setAmount: (e: string) => void;
  setPercent: (e: number) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [leverage, setLeverage] = useState(1);
  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      {/* Top Tabs */}

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          mt: 3,
        }}
      >
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
              1x
            </Typography>

            <ArrowDropDownIcon sx={{ color: "#fff", fontSize: "16px" }} />
          </Stack>
        </Box>
      </Stack>

      {/* Order Type */}

      <Box
        sx={{
          ...boxStyle,
          mt: 2,
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <InfoOutlinedIcon
          sx={{
            color: "#08D27A",
            fontSize: "16px",
          }}
        />

        <Typography
          color="#fff"
          fontSize={12}
          sx={{ width: "70%", margin: "auto", textAlign: "center" }}
        >
          {t("TradePage.title2")}
        </Typography>
        <ArrowDropDownIcon sx={{ color: "#fff", fontSize: "16px" }} />
      </Box>

      {/* Price */}

      <Box
        sx={{
          ...inputStyle,
          mt: 2,
        }}
      >
        <Typography color="#fff" fontSize={14}>
          {Number(coin).toFixed(2)}
        </Typography>

        <Typography color="#888" fontSize={14}>
          USDT
        </Typography>
      </Box>

      {/* Amount */}
      <Box
        sx={{
          ...inputStyle,
          mt: 2,
        }}
      >
        <InputBase
          value={amount}
          onChange={(e) => {
            const value = e.target.value;

            // Chỉ cho nhập số và dấu .
            if (/^\d*\.?\d*$/.test(value)) {
              setAmount(value);
            }
          }}
          placeholder="Số"
          sx={{
            flex: 1,
            color: "#fff",
            fontSize: 16,
            "& input::placeholder": {
              color: "#888",
              opacity: 1,
            },
          }}
        />

        <Typography color="#fff" fontSize={12} fontWeight={600}>
          {t("TradePage.title3")}
        </Typography>
      </Box>

      {/* Balance */}

      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Typography color="#A8A8A8" fontSize={11}>
          {t("TradePage.title4")}
        </Typography>

        <Typography color="#fff" fontSize={11}>
          0 USDT
        </Typography>
      </Stack>

      {/* Slider */}

      <Slider
        value={percent}
        onChange={(_, value) => setPercent(value as number)}
        step={null} // Chỉ được dừng ở marks
        marks={marks}
        min={0}
        max={100}
        sx={{
          color: "#08D27A",
          mt: 2,
          height: 4,

          "& .MuiSlider-thumb": {
            width: 20,
            height: 20,
            bgcolor: "#fff",
          },

          "& .MuiSlider-track": {
            bgcolor: "#08D27A",
          },

          "& .MuiSlider-rail": {
            bgcolor: "#2B2F3A",
          },

          "& .MuiSlider-mark": {
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "#2B2F3A",
          },

          "& .MuiSlider-markActive": {
            bgcolor: "#08D27A",
          },

          "& .MuiSlider-markLabel": {
            color: "#888",
            fontSize: 12,
          },
        }}
      />

      <Stack direction="row" justifyContent="space-between">
        {["0%", "25%", "50%", "75%", "100%"].map((item) => (
          <Typography key={item} color="#fff" fontSize={13}>
            {item}
          </Typography>
        ))}
      </Stack>

      {/* TP SL */}

      <Stack direction="row" alignItems="center" spacing={1} mt={2}>
        <Checkbox
          sx={{
            p: 0,
            color: "#666",

            "& .MuiSvgIcon-root": {
              fontSize: 20,
            },

            "&.Mui-checked": {
              color: "#A0A0A0",
            },
          }}
        />

        <Typography color="#CFCFCF" fontSize={11}>
          {t("TradePage.title5")}
        </Typography>

        <InfoOutlinedIcon
          sx={{
            color: "#08D27A",
            fontSize: 16,
          }}
        />
      </Stack>

      {/* BUY */}

      <Button
        fullWidth
        sx={{
          mt: 2,
          height: 47,
          bgcolor: "#08D27A",
          color: "#fff",
          borderRadius: "30px",
          fontSize: 18,
          textTransform: "none",
          "&:hover": {
            bgcolor: "#08D27A",
          },
        }}
      >
        {t("TradePage.title6")}
      </Button>
      {/* BUY INFO */}

      <Stack spacing={1.2} mt={2.5}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title8")}
          </Typography>

          <Typography color="#fff" fontSize={13} fontWeight={600}>
            0 k{t("TradePage.title9")}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title10")}
          </Typography>

          <Typography color="#fff" fontSize={13} fontWeight={600}>
            ≈ 0 USDT
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title11")}
          </Typography>

          <Typography color="#fff" fontSize={13} fontWeight={600}>
            0 USDT
          </Typography>
        </Stack>
      </Stack>

      {/* SELL BUTTON */}

      <Button
        fullWidth
        sx={{
          mt: 3,
          height: 47,
          bgcolor: "#FF4B45",
          color: "#fff",
          borderRadius: "30px",
          fontSize: 18,
          fontWeight: 600,
          textTransform: "none",
          "&:hover": {
            bgcolor: "#FF4B45",
          },
        }}
      >
        {t("TradePage.title7")}
      </Button>

      {/* SELL INFO */}

      <Stack spacing={1.2} mt={2.5}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title8")}
          </Typography>

          <Typography color="#fff" fontSize={13} fontWeight={600}>
            0 {t("TradePage.title9")}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title10")}
          </Typography>

          <Typography color="#fff" fontSize={13} fontWeight={600}>
            ≈ 0 USDT
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="#A5A8B3" fontSize={13}>
            {t("TradePage.title11")}
          </Typography>

          <Typography color="#fff" fontSize={13} fontWeight={600}>
            0 USDT
          </Typography>
        </Stack>
      </Stack>

      <LeverageDrawer
        open={open}
        onClose={() => setOpen(false)}
        leverage={leverage}
        onChange={setLeverage}
        available={0}
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
