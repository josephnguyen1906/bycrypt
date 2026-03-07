"use client";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function LanguagePage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
    setLang(language);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#020617,#020617,#0f172a)",
        color: "white",
        p: 2,
        pb: "110px",
      }}
    >
      {/* header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{ background: "#232932" }}
        >
          <ArrowBackIosNewIcon
            sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
          />
        </IconButton>

        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          {t("HomePage.Language")}
        </Typography>
      </Box>

      {/* language list */}
      <Box
        sx={{
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* English */}
        <Box
          sx={{
            height: "50px",
            cursor: "pointer",
            padding: "10px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            color: lang === "en" ? "#4ade80" : "white",
            background: "#1f2937",
            borderRadius: "15px",
            border: lang === "en" ? "1px solid #4ade80" : "none",
          }}
          onClick={() => changeLanguage("en")}
        >
          <Image
            src="https://flagcdn.com/us.svg"
            width={30}
            height={30}
            style={{ height: "20px", objectFit: "contain" }}
            alt="us"
          />
          English
        </Box>

        {/* Vietnamese */}
        <Box
          sx={{
            height: "50px",
            cursor: "pointer",
            padding: "10px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            color: lang === "vi" ? "#4ade80" : "white",
            background: "#1f2937",
            borderRadius: "15px",
            border: lang === "vi" ? "1px solid #4ade80" : "none",
          }}
          onClick={() => changeLanguage("vi")}
        >
          <Image
            src="https://flagcdn.com/vn.svg"
            width={30}
            height={30}
            style={{ height: "20px", objectFit: "contain" }}
            alt="vn"
          />
          Việt Nam
        </Box>

        {/* Japanese */}
        <Box
          sx={{
            height: "50px",
            cursor: "pointer",
            padding: "10px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            color: lang === "ja" ? "#4ade80" : "white",
            background: "#1f2937",
            borderRadius: "15px",
            border: lang === "ja" ? "1px solid #4ade80" : "none",
          }}
          onClick={() => changeLanguage("ja")}
        >
          <Image
            src="https://flagcdn.com/jp.svg"
            width={30}
            height={30}
            style={{ height: "20px", objectFit: "contain" }}
            alt="jp"
          />
          日本語
        </Box>
      </Box>
    </Box>
  );
}
