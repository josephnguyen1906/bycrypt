"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect, useLayoutEffect } from "react";
import {
  closeSaleSmartlyChat,
  openSaleSmartlyWhenReady,
  preInitSaleSmartly,
  resetSaleSmartlyReadyBinding,
} from "@/utils/saleSmartly";

const SALESMARTLY_SCRIPT =
  "https://plugin-code.salesmartly.com/js/project_783639_810552_1784725341.js";

export default function LiveChatPage() {
  const { t } = useTranslation();
  const router = useRouter();

  useLayoutEffect(() => {
    preInitSaleSmartly();
    document.body.dataset.bycryptSsHidden = "false";
  }, []);

  useEffect(() => {
    let cancelled = false;
    let armed = false;

    const armOpen = () => {
      if (cancelled || armed) return false;
      if (!openSaleSmartlyWhenReady()) return false;
      armed = true;
      return true;
    };

    const wait = window.setInterval(() => {
      if (armOpen()) window.clearInterval(wait);
    }, 200);

    return () => {
      cancelled = true;
      window.clearInterval(wait);
      closeSaleSmartlyChat();
      resetSaleSmartlyReadyBinding();
      document.body.dataset.bycryptSsHidden = "true";
    };
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "#111827",
        pb: "130px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={3}
        gap="10px"
        justifyContent="space-between"
        p={2}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{ background: "#232932" }}
          aria-label="back"
        >
          <ArrowBackIosNewIcon
            sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
          />
        </IconButton>

        <Typography fontSize={20} fontWeight={600} color="white">
          {t("ChatPage.title")}
        </Typography>

        <IconButton sx={{ visibility: "hidden" }} aria-hidden />
      </Box>

      <Script id="salesmartly-pre" strategy="beforeInteractive">
        {`window.__ssc=window.__ssc||{};window.__ssc.license=window.__ssc.license||'g1vfb1b';`}
      </Script>

      <Script
        id="salesmartly-chat"
        src={SALESMARTLY_SCRIPT}
        strategy="afterInteractive"
        onLoad={() => {
          resetSaleSmartlyReadyBinding();
          openSaleSmartlyWhenReady();
        }}
      />

      <Box
        sx={{
          minHeight: "calc(100vh - 80px)",
          background: "#111827",
          color: "#9ca3af",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          textAlign: "center",
          fontSize: 14,
        }}
      >
        {t("ChatPage.hint")}
      </Box>
    </Box>
  );
}
