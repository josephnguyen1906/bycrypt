"use client";

import { useEffect } from "react";
import { Button } from "@mui/material"; // hoặc button thường nếu không dùng MUI
import { useTranslation } from "react-i18next";

declare global {
  interface Window {
    AddToHomeScreen: any;
    AddToHomeScreenInstance: any;
  }
}

const AddToHomeScreenButton = () => {
  const { t } = useTranslation();
  useEffect(() => {
    // Load thư viện nếu chưa có
    const loadScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.2/dist/add-to-homescreen.min.js";
      script.async = true;
      script.onload = () => {
        window.AddToHomeScreenInstance = window.AddToHomeScreen({
          appName: "68BET",
          appNameDisplay: "standalone",
          appIconUrl: "/apple-touch-icon.png",
          assetUrl:
            "https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.2/dist/assets/img/",
          maxModalDisplayCount: -1,
          displayOptions: { showMobile: true, showDesktop: true },
          allowClose: true,
          showArrow: true,
        });
      };
      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  const handleClick = () => {
    if (window.AddToHomeScreenInstance) {
      window.AddToHomeScreenInstance.show("vn");
    }
  };

  return (
    <Button
      sx={{
        background: "#d7fe65",
        height: "20px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        color: "black",
        fontSize: "12px",
        textTransform: "capitalize",
        "&:hover": {
          background: "#d7fe65",
        },
      }}
      onClick={handleClick}
    >
      {t("Toast.file")}
      <img src="/images/download-icon.png" width={16} height={16} />
    </Button>
  );
};

export default AddToHomeScreenButton;
