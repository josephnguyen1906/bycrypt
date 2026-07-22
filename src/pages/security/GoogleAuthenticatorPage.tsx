"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import QRCode from "react-qr-code";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  enableGoogleAuth,
  getGoogleAuthSetup,
} from "@/services/User.service";

export default function GoogleAuthenticatorPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [secretKey, setSecretKey] = useState("");
  const [otpauthUrl, setOtpauthUrl] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { t } = useTranslation();

  const loadSetup = async () => {
    setLoading(true);
    try {
      const res: any = await getGoogleAuthSetup();
      if (res?.status) {
        setEnabled(Boolean(res.data?.enabled));
        setSecretKey(res.data?.secret || "");
        setOtpauthUrl(res.data?.otpauth_url || "");
        if (res.data?.enabled) {
          toast.info(res.message || "Google Authenticator đã được bật");
        }
      } else {
        toast.error(res?.message || "Không tải được khóa xác thực");
      }
    } catch (err: any) {
      toast.error(err?.message || "Không tải được khóa xác thực");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSetup();
  }, []);

  const handleChange = (index: number, value: string) => {
    const newValue = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = newValue;
    setCode(newCode);

    if (newValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6 || submitting || enabled) {
      return;
    }

    setSubmitting(true);
    try {
      const res: any = await enableGoogleAuth(verificationCode);
      if (res?.status) {
        setEnabled(true);
        toast.success(res.message || "Bật Google Authenticator thành công");
        router.push("/security");
      } else {
        toast.error(res?.message || "Mã xác minh không hợp lệ");
      }
    } catch (err: any) {
      toast.error(err?.message || "Mã xác minh không hợp lệ");
    } finally {
      setSubmitting(false);
    }
  };

  const copySecret = async () => {
    if (!secretKey) return;
    await navigator.clipboard.writeText(secretKey);
    toast.success(t("Toast.copy"));
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
            mb: "13px",
          }}
        >
          Google Authenticator
        </Typography>

        {/* QR */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: "19px",
          }}
        >
          <Box
            sx={{
              p: "5px",
              bgcolor: "#fff",
              border: "1px solid #A4A6B2",
              display: "flex",
              minWidth: 160,
              minHeight: 160,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {otpauthUrl ? (
              <QRCode
                value={otpauthUrl}
                size={150}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            ) : (
              <Typography sx={{ color: "#333", fontSize: 12 }}>
                {loading ? "..." : enabled ? "ON" : "—"}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Secret key */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            mb: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#fff",
              wordBreak: "break-all",
            }}
          >
            {secretKey || (enabled ? "********" : "—")}
          </Typography>

          {!enabled && (
            <IconButton
              onClick={loadSetup}
              disabled={loading}
              sx={{
                p: 0,
                color: "#8D93A4",
              }}
            >
              <RefreshIcon sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            color: "#9295A3",
            fontSize: "11px",
            mb: "16px",
          }}
        >
          ({t("LoginPage.title9")})
        </Typography>

        {/* Copy */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: "11px",
          }}
        >
          <Button
            onClick={copySecret}
            disabled={!secretKey}
            variant="outlined"
            sx={{
              width: "122px",
              height: "38px",
              borderColor: "#8B8F9E",
              color: "#fff",
              fontSize: "12px",
              textTransform: "none",
              borderRadius: "4px",
            }}
          >
            {t("LoginPage.title10")}
          </Button>
        </Box>

        {/* Code label */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "7px",
          }}
        >
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            {t("LoginPage.title11")}
          </Typography>

          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#00C853",
            }}
          >
            {t("LoginPage.title12")}
          </Typography>
        </Box>

        {/* OTP */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "14px",
            justifyContent: "center",
            width: "95%",
            margin: "auto",
            mb: "10px",
          }}
        >
          {code.map((item, index) => (
            <TextField
              key={index}
              value={item}
              disabled={enabled}
              inputRef={(element) => {
                inputRefs.current[index] = element;
              }}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              inputProps={{
                maxLength: 1,
                inputMode: "numeric",
              }}
              sx={{
                width: "50px",

                "& .MuiOutlinedInput-root": {
                  height: "50px",
                  bgcolor: "#191B26",
                  borderRadius: 0,

                  "& fieldset": {
                    border: "none",
                  },
                },

                "& input": {
                  p: 0,
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: 600,
                },
              }}
            />
          ))}
        </Box>

        {/* Help */}
        <Box
          sx={{
            bgcolor: "#191B26",
            px: "14px",
            py: "18px",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              mb: "12px",
            }}
          >
            {t("LoginPage.title13")}
          </Typography>

          <Typography
            sx={{
              fontSize: "11px",
              lineHeight: 1.6,
              fontWeight: 600,
              mb: "7px",
            }}
          >
            {t("LoginPage.title14")}
          </Typography>

          <Typography
            sx={{
              fontSize: "11px",
              lineHeight: 1.6,
              fontWeight: 600,
            }}
          >
            {t("LoginPage.title15")}
          </Typography>
        </Box>

        {/* Confirm */}
        <Button
          fullWidth
          onClick={handleConfirm}
          disabled={enabled || submitting || code.join("").length !== 6}
          variant="contained"
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
          {enabled ? "Đã bật" : t("LoginPage.title16")}
        </Button>
      </Box>
    </Box>
  );
}
