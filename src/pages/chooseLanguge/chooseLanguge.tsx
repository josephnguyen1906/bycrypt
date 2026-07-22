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

  const [lang, setLang] = useState<string>("vi");

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
    router.push("/");
  };

  const listLanguage = [
    {
      id: 0,
      code: "en",
      title: "English",
      img: "https://flagcdn.com/us.svg",
    },
    {
      id: 1,
      code: "vi",
      title: "Tiếng Việt",
      img: "https://flagcdn.com/vn.svg",
    },
    {
      id: 2,
      code: "ja",
      title: "日本語",
      img: "https://flagcdn.com/jp.svg",
    },
    {
      id: 3,
      code: "id",
      title: "Bahasa Indonesia",
      img: "https://flagcdn.com/id.svg",
    },
    {
      id: 4,
      code: "de",
      title: "Deutsch",
      img: "https://flagcdn.com/de.svg",
    },
    {
      id: 5,
      code: "es",
      title: "Español",
      img: "https://flagcdn.com/es.svg",
    },
    {
      id: 6,
      code: "po",
      title: "Portugal",
      img: "https://flagcdn.com/pt.svg",
    },
    {
      id: 7,
      code: "fr",
      title: "Français",
      img: "https://flagcdn.com/fr.svg",
    },
    {
      id: 8,
      code: "it",
      title: "Italiano",
      img: "https://flagcdn.com/it.svg",
    },
    {
      id: 9,
      code: "ko",
      title: "한국인",
      img: "https://flagcdn.com/kr.svg",
    },
    {
      id: 10,
      code: "th",
      title: "ไทย",
      img: "https://flagcdn.com/th.svg",
    },
    {
      id: 11,
      code: "gr",
      title: "Ελληνικά",
      img: "https://flagcdn.com/gr.svg",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#0E0F18",
        paddingTop: {
          xs: "0px",
          sm: "80px",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "500px" },
          backgroundColor: "#0E0F18",
          margin: "auto",
          minHeight: { xs: "100vh", sm: "700px" },
          borderRadius: {
            xs: 0,
            sm: "16px",
          },
          padding: "16px",
          position: "relative",
          pb: {
            xs: "120px",
            sm: 0,
          },
        }}
      >
        {/* header */}
        <Box
          sx={{
            width: "100%",
            position: "relative",
            mb: 3,
          }}
        >
          <IconButton
            onClick={() => router.back()}
            sx={{
              background: "none",
              position: "absolute",
              top: "0",
              left: "10px",
            }}
          >
            <ArrowBackIosNewIcon
              sx={{ cursor: "pointer", color: "white", fontSize: "20px" }}
            />
          </IconButton>

          <Typography
            sx={{
              flex: 1,
              textAlign: "center",
              fontWeight: 600,
              fontSize: 20,
              color: "white",
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
            gap: "15px",
          }}
        >
          {listLanguage.map((item) => (
            <Box
              key={item.id}
              sx={{
                height: "50px",
                cursor: "pointer",
                padding: "10px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                color: lang === item.code ? "#4ade80" : "white",
                background: "#1f2937",
                borderRadius: "15px",
                border: lang === item.code ? "1px solid #4ade80" : "none",
              }}
              onClick={() => changeLanguage(item.code)}
            >
              <Image
                src={item.img}
                width={30}
                height={30}
                style={{ height: "20px", objectFit: "contain" }}
                alt={item.code}
              />
              {item.title}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
