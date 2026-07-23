"use client";

import { ArrowBackIosNew, HourglassTop } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function DepositSuccessPage({ tab }: { tab: number }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString("vi-VN"));
  }, []);
  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pb: "100px",
        color: "#fff",
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2 }}>
        <IconButton sx={{ color: "#fff" }} onClick={() => router.back()}>
          <ArrowBackIosNew />
        </IconButton>
      </Box>

      <Stack
        alignItems="center"
        sx={{
          px: 3,
          flex: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            mt: 3,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              bgcolor: "#FFD84D",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HourglassTop
              sx={{
                fontSize: 70,
                color: "#0E0F18",
              }}
            />
          </Box>
        </Box>

        <Typography fontSize={22} fontWeight={700} mb={1}>
          {t("DepositWithdrawPage.title27")}
        </Typography>

        <Typography fontSize={16} color="#FFD84D" fontWeight={600} mb={6}>
          {t("DepositWithdrawPage.statusProcessing")}
        </Typography>

        <Box width="100%">
          <Typography fontSize={18} fontWeight={600}>
            {tab === 0
              ? t("AccountPage.menuTab1")
              : t("AccountPage.menuTab2")}
          </Typography>

          <Typography mt={1} color="#8A8FA8" fontSize={15}>
            {currentTime}
          </Typography>
        </Box>

        <Box width="100%" mt={7}>
          <Typography fontSize={18} fontWeight={600}>
            {t("DepositWithdrawPage.successHintTitle")}
          </Typography>

          <Typography mt={1} color="#8A8FA8">
            {t("DepositWithdrawPage.processingCskhHint")}{" "}
            <Typography
              component="span"
              onClick={() => router.push("/chat")}
              sx={{
                color: "#1E88FF",
                cursor: "pointer",
              }}
            >
              {t("DepositWithdrawPage.title29")}
            </Typography>
          </Typography>
        </Box>
      </Stack>

      {/* Bottom Button */}
      <Box
        sx={{
          p: 2,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={() =>
            router.push(tab == 0 ? "/deposit/history" : "/withdraw/history")
          }
          sx={{
            height: 50,
            bgcolor: "#08B300",
            borderRadius: "8px",
            fontSize: 18,
            mt: 5,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#079A00",
            },
          }}
        >
          {t("DepositWithdrawPage.title30")}
        </Button>
      </Box>
    </Box>
  );
}
