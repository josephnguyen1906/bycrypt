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
  created_at: Date;
  updated_at: Date;
}
export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<INews[]>([]);
  const router = useRouter();
  const { user, fetchUser, loading } = useUserStore();

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
        width: "100%",
        background: "#000",
        paddingTop: {
          xs: "0px",
          sm: "100px",
        },
      }}
    >
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          pb: "50px",
          pt: "30px",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", sm: "grid" },
            gridTemplateColumns: "1fr 1fr 1fr",
            width: "100%",
            gap: "10px",
          }}
        >
          {news.length > 0 &&
            news.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "10px",
                  textAlign: "center",
                }}
              >
                <Image
                  src={item.coverImage}
                  width={442}
                  height={300}
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  alt={item.title}
                />
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 600, color: "white" }}
                >
                  {item.title}
                </Typography>
                <Button
                  onClick={() => router.push("/news/" + item.id)}
                  sx={{
                    background: "none",
                    border: "none",
                    color: "white",
                    textTransform: "capitalize",
                    "&:hover": { background: "none" },
                  }}
                >
                  Xem chi tiết →
                </Button>
              </Box>
            ))}
        </Box>
        <Box
          sx={{
            display: { xs: "grid", sm: "none" },
            gridTemplateColumns: "1fr",
            width: "100%",
            gap: "10px",
            pb: "100px",
          }}
        >
          {news.length > 0 &&
            news.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Image
                  src={item.coverImage}
                  width={120}
                  height={80}
                  style={{
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  alt={item.title}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "white",
                      pl: "5px",

                      height: "50px",

                      overflow: "hidden",
                      textOverflow: "ellipsis",

                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Button
                    onClick={() => router.push("/news/" + item.id)}
                    sx={{
                      background: "none",
                      border: "none",
                      color: "white",
                      textTransform: "capitalize",
                      "&:hover": { background: "none" },
                    }}
                  >
                    Xem chi tiết →
                  </Button>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}
