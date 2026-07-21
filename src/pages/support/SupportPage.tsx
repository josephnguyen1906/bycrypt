"use client";

import React, { useState } from "react";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface SupportItem {
  id: number;
  title: string;
  content: string;
}

const supportData: SupportItem[] = [
  {
    id: 1,
    title: "SupportPage.fee.title",
    content: "SupportPage.fee.content",
  },
  {
    id: 2,
    title: "SupportPage.futures.title",
    content: "SupportPage.futures.content",
  },
  {
    id: 3,
    title: "SupportPage.limitMarket.title",
    content: "SupportPage.limitMarket.content",
  },
  {
    id: 4,
    title: "SupportPage.contract.title",
    content: "SupportPage.contract.content",
  },
];

export default function SupportPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
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
      {/* Header */}
      <Box
        sx={{
          height: "48px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: "14px",
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "30px",
            height: "30px",
            p: 0,
            color: "#fff",
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              fontSize: "21px",
            }}
          />
        </IconButton>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          {t("SupportPage.title")}
        </Typography>
      </Box>

      {/* Support List */}
      <Box
        sx={{
          width: "100%",
          px: "14px",
          pt: "8px",
        }}
      >
        {supportData.map((item) => {
          const isOpen = openId === item.id;

          return (
            <Box
              key={item.id}
              sx={{
                width: "100%",
                borderBottom: isOpen
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
              }}
            >
              {/* Question */}
              <Box
                onClick={() => handleToggle(item.id)}
                sx={{
                  minHeight: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    pr: "15px",
                  }}
                >
                  {t(item.title)}
                </Typography>

                <KeyboardArrowRightIcon
                  sx={{
                    flexShrink: 0,
                    color: "#9B9DA7",
                    fontSize: "23px",
                    transition: "transform 0.25s ease",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                />
              </Box>

              {/* Answer */}
              <Collapse in={isOpen} timeout={250} unmountOnExit>
                <Box
                  sx={{
                    pb: "18px",
                    pr: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#9B9DA7",
                      fontSize: "13px",
                      lineHeight: "20px",
                    }}
                  >
                    {t(item.content)}
                  </Typography>
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
