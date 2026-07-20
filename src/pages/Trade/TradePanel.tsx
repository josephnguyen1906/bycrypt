"use client";

import { useState } from "react";
import { Box, Button, Grid, InputBase, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const optionTimes = [
  { time: "60s", profit: "9~9%" },
  { time: "90s", profit: "19~19%" },
  { time: "120s", profit: "28~28%" },
  { time: "180s", profit: "100~100%" },
];

export default function TradePanel() {
  const [selected, setSelected] = useState(0);
  const [amount, setAmount] = useState("");
  const { t } = useTranslation();

  return (
    <Box>
      {/* Đi qua */}
      <Button
        fullWidth
        sx={{
          mb: 3,
          height: 42,
          bgcolor: "#1B1F2A",
          color: "#fff",
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,

          "&:hover": {
            bgcolor: "#232837",
          },
        }}
      >
        {t("TradePage.title17")}
      </Button>

      {/* Option Time */}
      <Typography
        sx={{
          color: "#8C92A4",
          fontSize: 13,
          mb: 1,
        }}
      >
        {t("TradePage.title18")}
      </Typography>

      <Grid container spacing={1}>
        {optionTimes.map((item, index) => (
          <Grid size={6} key={index}>
            <Box
              onClick={() => setSelected(index)}
              sx={{
                cursor: "pointer",
                display: "flex",
                overflow: "hidden",
                borderRadius: "2px",
              }}
            >
              <Box
                sx={{
                  width: "42%",
                  py: 1,
                  bgcolor: selected === index ? "#6E5BFF" : "#23283B",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {item.time}
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  py: 1,
                  bgcolor: selected === index ? "#7756F6" : "#353B56",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {item.profit}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Input */}
      <Box
        sx={{
          mt: 3,
          height: 48,
          borderRadius: "10px",
          border: "1px solid #232837",
          bgcolor: "#0B0D15",
          display: "flex",
          alignItems: "center",
          px: 2,
        }}
      >
        <InputBase
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={t("TradePage.title19") + "50"}
          sx={{
            flex: 1,

            "& input": {
              color: "#fff",
              fontSize: 16,
              textAlign: "center",
            },

            "& input::placeholder": {
              color: "#fff",
              opacity: 1,
            },
          }}
        />

        <Typography
          sx={{
            color: "#B5BAC8",
            fontSize: 14,
          }}
        >
          USDT
        </Typography>
      </Box>

      {/* Buy */}
      <Button
        fullWidth
        sx={{
          mt: 2,
          height: 54,
          borderRadius: "28px",
          bgcolor: "#09D57A",
          color: "#fff",
          fontSize: 28,
          fontWeight: 500,
          textTransform: "none",

          "&:hover": {
            bgcolor: "#09D57A",
          },
        }}
      >
        {t("TradePage.title6")}
      </Button>

      <Stack mt={1} spacing={0.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#B2B6C3" fontSize={14}>
            {t("TradePage.title4")}
          </Typography>

          <Typography color="#fff" fontWeight={600}>
            0 USDT
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography color="#B2B6C3" fontSize={14}>
            {t("TradePage.title11")}
          </Typography>

          <Typography color="#fff" fontWeight={600}>
            0.00 USDT
          </Typography>
        </Stack>
      </Stack>

      {/* Sell */}
      <Button
        fullWidth
        sx={{
          mt: 3,
          height: 54,
          borderRadius: "28px",
          bgcolor: "#FF4B3A",
          color: "#fff",
          fontSize: 28,
          fontWeight: 500,
          textTransform: "none",

          "&:hover": {
            bgcolor: "#FF4B3A",
          },
        }}
      >
        {t("TradePage.title7")}
      </Button>

      <Stack mt={1} spacing={0.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#B2B6C3" fontSize={14}>
            {t("TradePage.title4")}
          </Typography>

          <Typography color="#fff" fontWeight={600}>
            0 USDT
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography color="#B2B6C3" fontSize={14}>
            {t("TradePage.title11")}
          </Typography>

          <Typography color="#fff" fontWeight={600}>
            0.00 USDT
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
