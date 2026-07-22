"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/Loading";
import {
  calcLoanPreview,
  getLoanConfig,
  submitLoan,
  type LoanConfig,
} from "@/services/Loan.service";

export default function LoanSupportPage() {
  const [frontImage, setFrontImage] = useState<File>();
  const [backImage, setBackImage] = useState<File>();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<LoanConfig | null>(null);
  const [amount, setAmount] = useState("");
  const frontFileInput = useRef<HTMLInputElement>(null);
  const backFileInput = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res: any = await getLoanConfig();
        if (cancelled) return;
        const data = res.data;
        setConfig(data);
        setAmount(data.max_amount);
      } catch (error: any) {
        if (!cancelled) {
          toast.error(
            error?.response?.data?.message || t("Toast.update_error"),
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [t]);

  const preview = useMemo(() => {
    if (!config) return { interest: 0, repay: 0 };
    const num = Number(amount);
    if (!Number.isFinite(num) || num <= 0) return { interest: 0, repay: 0 };
    return calcLoanPreview(
      num,
      Number(config.daily_interest_rate),
      config.duration_days,
    );
  }, [amount, config]);

  const previewSrc = frontImage ? URL.createObjectURL(frontImage) : null;
  const previewBackSrc = backImage ? URL.createObjectURL(backImage) : null;

  const handleSubmit = async () => {
    if (!config) return;

    if (!config.can_apply) {
      toast.warning(config.cannot_apply_reason || t("loan.warning"));
      return;
    }

    const num = Number(amount);
    const min = Number(config.min_amount);
    const max = Number(config.max_amount);
    if (!Number.isFinite(num) || num < min || num > max) {
      toast.warning(
        t("loan.form.amountRange", {
          defaultValue: `Amount must be between ${min} and ${max}`,
          min,
          max,
        }),
      );
      return;
    }

    if (!frontImage || !backImage) {
      toast.warning(t("Toast.uploadFIle"));
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("amount", String(num));
      formData.append("img_front", frontImage);
      formData.append("img_back", backImage);
      await submitLoan(formData);
      toast.success(t("Toast.update_succ"));
      router.push("/loan/history");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          t(error?.message || "Toast.update_error"),
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

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
      <Box
        sx={{
          height: "55px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#fff",
            width: "40px",
            height: "40px",
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "22px" }} />
        </IconButton>

        <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>
          {t("loan.title")}
        </Typography>

        <Box
          sx={{
            position: "absolute",
            right: "10px",
            display: "flex",
            gap: "8px",
          }}
        >
          <IconButton
            sx={{
              width: "25px",
              height: "25px",
              bgcolor: "#EDF2FF",
              color: "#095CE5",
              "&:hover": { bgcolor: "#EDF2FF" },
            }}
            onClick={() => router.push("/loan/rule")}
          >
            <InfoOutlinedIcon sx={{ fontSize: "22px" }} />
          </IconButton>

          <IconButton
            sx={{
              width: "25px",
              height: "25px",
              bgcolor: "#EDF2FF",
              color: "#095CE5",
              "&:hover": { bgcolor: "#EDF2FF" },
            }}
            onClick={() => router.push("/loan/history")}
          >
            <DescriptionOutlinedIcon sx={{ fontSize: "22px" }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ px: "14px" }}>
        <Typography
          sx={{
            color: "#FF4B57",
            fontSize: 14,
            lineHeight: "27px",
            mt: "40px",
            mb: "35px",
          }}
        >
          {config?.cannot_apply_reason || t("loan.warning")}
        </Typography>

        <Box>
          <Box
            sx={{
              minHeight: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2D303A",
              gap: "12px",
            }}
          >
            <Typography sx={{ color: "#9298A9", fontSize: 14 }}>
              {t("loan.info.expectedAmount")}
            </Typography>
            <Box
              component="input"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAmount(e.target.value.replace(/[^\d.]/g, ""))
              }
              inputMode="decimal"
              sx={{
                width: "140px",
                border: "none",
                outline: "none",
                bgcolor: "transparent",
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                textAlign: "right",
              }}
            />
          </Box>

          <Box
            sx={{
              minHeight: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography sx={{ color: "#9298A9", fontSize: 14 }}>
              {t("loan.info.paymentCycle")}
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>
              {config
                ? `${config.duration_days} ${t("loan.values.days", { defaultValue: "ngày" })}`
                : "—"}
            </Typography>
          </Box>

          <Box
            sx={{
              minHeight: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography sx={{ color: "#9298A9", fontSize: 14 }}>
              {t("loan.info.dailyInterestRate")}
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>
              {config?.daily_interest_rate_percent ?? "—"}
            </Typography>
          </Box>

          <Box
            sx={{
              minHeight: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "15px",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography sx={{ color: "#9298A9", fontSize: 14 }}>
              {t("loan.info.paymentMethod")}
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                textAlign: "right",
              }}
            >
              {t("loan.info.paymentMethodValue")}
            </Typography>
          </Box>

          <Box
            sx={{
              minHeight: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography sx={{ color: "#9298A9", fontSize: 14 }}>
              {t("loan.info.interest")}
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>
              {preview.interest}
            </Typography>
          </Box>

          <Box
            sx={{
              minHeight: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography sx={{ color: "#9298A9", fontSize: 14 }}>
              {t("loan.info.lender")}
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>
              {config?.lender_name ?? "—"}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            color: "#fff",
            fontSize: 14,
            lineHeight: "27px",
            mt: "40px",
            mb: "25px",
          }}
        >
          {t("loan.upload.title")} {t("loan.upload.description")}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              onClick={() => frontFileInput.current?.click()}
              sx={{
                width: "100%",
                maxWidth: "100%",
                height: "154px",
                bgcolor: "#4B506A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: "5px",
              }}
            >
              {previewSrc ? (
                <Box
                  component="img"
                  src={previewSrc}
                  alt={t("loan.upload.documentAlt")}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <CameraAltIcon sx={{ color: "#E8EAF0", fontSize: "45px" }} />
              )}
            </Box>
            <Typography
              sx={{
                color: "#9295A3",
                fontSize: "14px",
                mt: "15px",
                textAlign: "center",
              }}
            >
              {t("VerifiedPage.label6")}
            </Typography>
            <input
              ref={frontFileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFrontImage(file);
              }}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              onClick={() => backFileInput.current?.click()}
              sx={{
                width: "100%",
                maxWidth: "100%",
                height: "154px",
                bgcolor: "#4B506A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: "5px",
              }}
            >
              {previewBackSrc ? (
                <Box
                  component="img"
                  src={previewBackSrc}
                  alt={t("loan.upload.documentAlt")}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <CameraAltIcon sx={{ color: "#E8EAF0", fontSize: "45px" }} />
              )}
            </Box>
            <Typography
              sx={{
                color: "#9295A3",
                fontSize: "14px",
                mt: "15px",
                textAlign: "center",
              }}
            >
              {t("VerifiedPage.label7")}
            </Typography>
            <input
              ref={backFileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setBackImage(file);
              }}
            />
          </Box>
        </Box>

        <Button
          fullWidth
          onClick={handleSubmit}
          disabled={submitting || !config?.can_apply}
          sx={{
            height: "55px",
            mt: "45px",
            bgcolor: "#00B900",
            color: "#fff",
            borderRadius: "5px",
            fontSize: 14,
            fontWeight: 500,
            textTransform: "none",
            "&:hover": { bgcolor: "#00B900" },
            "&.Mui-disabled": { bgcolor: "#087F08", color: "#aaa" },
          }}
        >
          {submitting ? t("loan.form.processing") : t("loan.form.confirm")}
        </Button>
      </Box>
    </Box>
  );
}
