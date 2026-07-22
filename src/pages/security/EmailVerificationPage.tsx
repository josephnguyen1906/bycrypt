"use client";

import React, { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";
export default function EmailVerificationPage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();
  const [countdown, setCountdown] = useState(0);
  const { t } = useTranslation();
  const handleSendCode = () => {
    if (!email || countdown > 0) {
      return;
    }

    // TODO:
    // Call API gửi mã xác minh email

    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handleConfirm = () => {
    if (!email || !verificationCode) {
      return;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "448px",
        },
        minHeight: "100vh",
        mx: "auto",
        bgcolor: "#0E0F18",
        color: "#fff",
        pb: 10,
      }}
    >
      <Box sx={{ width: "90%", margin: "auto", pt: 2 }}>
        <IconButton
          onClick={() => router.back()}
          sx={{
            transform: "translateY(-50%)",

            padding: 0,
            pt: 2,

            color: "#fff",

            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 700,
            mb: "18px",
          }}
        >
          {t("ChangePass.title8")}
        </Typography>

        {/* Email label */}
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#fff",
            mb: "8px",
          }}
        >
          email
        </Typography>

        {/* Email input */}
        <TextField
          fullWidth
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("SignupPage.placeholder1")}
          variant="outlined"
          InputProps={{
            endAdornment: email ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setEmail("")}
                  sx={{
                    color: "#9A9EAB",
                    p: 0,
                  }}
                >
                  <CancelIcon sx={{ fontSize: 13 }} />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          }}
          sx={{
            mb: "26px",

            "& .MuiOutlinedInput-root": {
              height: "40px",
              bgcolor: "#191B26",
              borderRadius: "3px",

              "& fieldset": {
                border: "none",
              },
            },

            "& input": {
              color: "#fff",
              fontSize: "12px",
              px: "20px",

              "&::placeholder": {
                color: "#85899A",
                opacity: 1,
              },
            },
          }}
        />

        {/* Verification Code */}
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#fff",
            mb: "8px",
          }}
        >
          {t("LoginPage.title19")}
        </Typography>

        <TextField
          fullWidth
          value={verificationCode}
          onChange={(event) => setVerificationCode(event.target.value)}
          placeholder={t("ChangePass.title10")}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleSendCode}
                  disabled={countdown > 0}
                  sx={{
                    minWidth: "auto",
                    p: 0,
                    color: countdown > 0 ? "#777" : "#00C853",
                    fontSize: "11px",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {countdown > 0 ? `${countdown}s` : "Gửi mã xác minh"}
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{
            mb: "10px",

            "& .MuiOutlinedInput-root": {
              height: "40px",
              bgcolor: "#191B26",
              borderRadius: "3px",

              "& fieldset": {
                border: "none",
              },
            },

            "& input": {
              color: "#fff",
              fontSize: "12px",
              px: "10px",

              "&::placeholder": {
                color: "#85899A",
                opacity: 1,
              },
            },
          }}
        />

        {/* Confirm */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirm}
          sx={{
            height: "41px",
            bgcolor: "#218AF3",
            color: "#fff",
            fontSize: "13px",
            textTransform: "none",
            borderRadius: "4px",

            "&:hover": {
              bgcolor: "#218AF3",
            },
          }}
        >
          {t("LoginPage.title16")}
        </Button>
      </Box>{" "}
    </Box>
  );
}
