"use client";

import { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LoadingComponent from "@/components/Loading";
import { getLoanDetail, type LoanItem } from "@/services/Loan.service";

export default function LoanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = String(params?.id ?? "");
  const { t } = useTranslation();
  const [loan, setLoan] = useState<LoanItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await getLoanDetail(id);
        if (!cancelled) {
          setLoan(res.data.data);
          setError(null);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.response?.data?.message || e?.message || "Error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <LoadingComponent />;

  const row = (label: string, value: string) => (
    <Box
      key={label}
      sx={{
        minHeight: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        borderBottom: "1px solid #2D303A",
      }}
    >
      <Typography sx={{ color: "#9298A9", fontSize: 14 }}>{label}</Typography>
      <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 500, textAlign: "right" }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: "448px" },
        minHeight: "100vh",
        mx: "auto",
        bgcolor: "#0E0F18",
        color: "#fff",
        pb: 10,
      }}
    >
      <Box
        sx={{
          height: "54px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #20232E",
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "80px",
            height: "80px",
            color: "#fff",
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "23px" }} />
        </IconButton>
        <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 600 }}>
          {t("loan.history.detail")}
        </Typography>
      </Box>

      <Box sx={{ px: "14px", pt: "20px" }}>
        {error ? (
          <Typography sx={{ color: "#FF4B57", fontSize: 14 }}>{error}</Typography>
        ) : null}
        {loan ? (
          <>
            {row(t("loan.history.amount"), `+${loan.amount} ${loan.currency}`)}
            {row(t("loan.info.interest"), String(loan.interest_amount))}
            {row(t("loan.info.paymentCycle"), `${loan.duration_days} ${t("loan.values.days", { defaultValue: "ngày" })}`)}
            {row(t("loan.info.lender"), loan.lender_name)}
            {row(t("common.status", { defaultValue: "Status" }), loan.status)}
            {row(t("loan.history.note"), loan.note || "—")}
            {loan.due_at ? row(t("loan.history.dueAt", { defaultValue: "Due" }), loan.due_at) : null}
          </>
        ) : null}
      </Box>
    </Box>
  );
}
