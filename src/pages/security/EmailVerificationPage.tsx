"use client";

import React, { useEffect, useState } from "react";

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
import { toast } from "react-toastify";
import {
  getSecurityStatus,
  sendSecurityEmailCode,
  verifySecurityEmail,
} from "@/services/User.service";

export default function EmailVerificationPage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const [countdown, setCountdown] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    getSecurityStatus()
      .then((res: any) => {
        if (res?.status && res.data) {
          if (res.data.default_email) {
            setEmail(res.data.default_email);
          }
          setVerified(Boolean(res.data.security_email_verified));
        }
      })
      .catch(() => {
        /* ignore */
      });
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendCode = async () => {
    if (!email || countdown > 0 || sending) {
      return;
    }

    setSending(true);
    try {
      const res: any = await sendSecurityEmailCode(email.trim());
      if (res?.status) {
        toast.success(res.message || t("Toast.signup3"));
        setCountdown(60);
      } else {
        toast.error(res?.message || "Gửi mã thất bại");
      }
    } catch (err: any) {
      toast.error(err?.message || "Gửi mã thất bại");
    } finally {
      setSending(false);
    }
  };

  const handleConfirm = async () => {
    if (!email || !verificationCode || submitting) {
      return;
    }

    const code = verificationCode.replace(/\D/g, "").slice(0, 6);
    if (code.length !== 6) {
      toast.error(t("ChangePass.title10"));
      return;
    }

    setSubmitting(true);
    try {
      const res: any = await verifySecurityEmail(email.trim(), code);
      if (res?.status) {
        setVerified(true);
        toast.success(res.message || "Xác minh email thành công");
        router.push("/security");
      } else {
        toast.error(res?.message || "Xác minh thất bại");
      }
    } catch (err: any) {
      toast.error(err?.message || "Xác minh thất bại");
    } finally {
      setSubmitting(false);
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
          disabled={verified}
          InputProps={{
            endAdornment:
              email && !verified ? (
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
          onChange={(event) =>
            setVerificationCode(
              event.target.value.replace(/\D/g, "").slice(0, 6),
            )
          }
          placeholder={t("ChangePass.title10")}
          variant="outlined"
          disabled={verified}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleSendCode}
                  disabled={verified || !email || sending || countdown > 0}
                  sx={{
                    minWidth: "auto",
                    p: 0,
                    color: countdown > 0 ? "white" : "#00C853",
                    fontSize: "11px",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    ":disabled": {
                      color: countdown > 0 ? "white" : "#00C853",
                    },
                  }}
                >
                  {countdown > 0 ? `${countdown}s` : t("ChangePass.title11")}
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
              color: "#fff",
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
          disabled={
            verified || submitting || !email || verificationCode.length !== 6
          }
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
            "&:disabled": {
              bgcolor: "#3a4a63",
              color: "#bbb",
            },
          }}
        >
          {verified ? "Đã xác minh" : t("LoginPage.title16")}
        </Button>
      </Box>
    </Box>
  );
}
