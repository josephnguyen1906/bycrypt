"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect, useLayoutEffect, useState } from "react";
import { getWebsiteConfig } from "@/services/User.service";
import {
  closeSaleSmartlyChat,
  openSaleSmartlyWhenReady,
  preInitSaleSmartly,
  resetSaleSmartlyReadyBinding,
} from "@/utils/saleSmartly";
import { injectChatScripts, resolveChatScript } from "@/utils/chatScript";

export default function LiveChatPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [chatScript, setChatScript] = useState<string | null>(null);

  useLayoutEffect(() => {
    preInitSaleSmartly();
    document.body.dataset.bycryptSsHidden = "false";
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const config: any = await getWebsiteConfig();
        if (cancelled) return;
        setChatScript(resolveChatScript(config?.data?.chat_script));
      } catch {
        if (!cancelled) setChatScript(resolveChatScript(null));
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!chatScript) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;
    let armed = false;
    let wait: number | undefined;

    const armOpen = () => {
      if (cancelled || armed) return false;
      if (!openSaleSmartlyWhenReady()) return false;
      armed = true;
      return true;
    };

    void injectChatScripts(chatScript).then((cleanup) => {
      if (cancelled) {
        cleanup();
        return;
      }
      dispose = cleanup;
      resetSaleSmartlyReadyBinding();
      wait = window.setInterval(() => {
        if (armOpen() && wait !== undefined) window.clearInterval(wait);
      }, 200);
    });

    return () => {
      cancelled = true;
      if (wait !== undefined) window.clearInterval(wait);
      closeSaleSmartlyChat();
      resetSaleSmartlyReadyBinding();
      dispose?.();
      document.body.dataset.bycryptSsHidden = "true";
    };
  }, [chatScript]);

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
