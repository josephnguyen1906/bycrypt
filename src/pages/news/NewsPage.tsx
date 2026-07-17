"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";
import { PreviousIcon } from "@/shared/Svgs/Svg.component";
import Image from "next/image";
import { getListNew } from "@/services/User.service";

interface INews {
  id: number;
  content: string;
  title: string;
  coverImage: string;
  status: number;
  created_at: string;
  updated_at: string;
}
export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<INews[]>([]);
  const router = useRouter();

  const fetchNewList = async () => {
    const res: any = await getListNew();
    if (res.status) {
      setNews(res.data.items);
    }
  };

  useEffect(() => {
    fetchNewList();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: {
          xs: "100%",
          sm: "448px",
        },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pb: "100px",
        pt: 3,
      }}
    >
      <Typography
        sx={{ fontSize: 20, color: "white", fontWeight: 700, padding: "10px" }}
      >
        {t("HomePage.menu4")}
      </Typography>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          position: "relative",
          pl: 5,
          mt: 3,
        }}
      >
        {/* Line */}
        <Box
          sx={{
            position: "absolute",
            left: 18,
            top: 3,
            bottom: 0,
            width: "1px",
            bgcolor: "#1F5EFF",
          }}
        />

        {news.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              position: "relative",
              pb: 3,
              borderTop: index !== 0 ? "1px solid #1D2234" : "none",
            }}
          >
            {/* Dot */}
            <Box
              sx={{
                position: "absolute",
                left: -24,
                top: 4,
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#2E6CFF",
                boxShadow: "0 0 0 4px rgba(46,108,255,.15)",
              }}
            />

            {/* Time */}
            <Typography
              sx={{
                color: "#8B8FA4",
                fontSize: 14,
                mb: 1,
                // pt: "10px",
              }}
            >
              {new Date(item.created_at).toLocaleString("vi")}
            </Typography>

            {/* Title */}
            <Typography
              sx={{
                color: "#FFF",
                fontWeight: 700,
                fontSize: 18,
                lineHeight: 1.5,
                cursor: "pointer",
                "&:hover": {
                  color: "#4E8FFF",
                },
              }}
              onClick={() => router.push(`/news/${item.id}`)}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
