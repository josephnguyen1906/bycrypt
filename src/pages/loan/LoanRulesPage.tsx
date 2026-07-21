"use client";

import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function LoanRulesPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const rules = Array.from({ length: 12 }, (_, index) => ({
    title: t(`LoanRulesPage.rules.rule${index + 1}.title`),
    content: t(`LoanRulesPage.rules.rule${index + 1}.content`),
  }));

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
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          height: "55px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          px: "14px",
        }}
      >
        {/* Back */}
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: "absolute",
            left: "8px",
            color: "#fff",
            width: "42px",
            height: "42px",
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              fontSize: "22px",
            }}
          />
        </IconButton>

        {/* Title */}
        <Typography
          sx={{
            color: "#fff",
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          {t("LoanRulesPage.title")}
        </Typography>
      </Box>

      {/* ================= RULES ================= */}
      <Box
        sx={{
          px: "16px",
          mt: "30px",
        }}
      >
        {rules.map((rule, index) => (
          <Box
            key={index}
            sx={{
              color: "#fff",
              mb: "32px",
            }}
          >
            {/* Rule title */}
            <Typography
              sx={{
                color: "#fff",
                fontSize: "15px",
                lineHeight: "24px",
                fontWeight: 400,
                mb: "18px",
              }}
            >
              {rule.title}
            </Typography>

            {/* Rule content */}
            <Typography
              sx={{
                color: "#B5B7C0",
                fontSize: "14px",
                lineHeight: "24px",
                whiteSpace: "pre-line",
                mb: "0",
              }}
            >
              {rule.content}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
