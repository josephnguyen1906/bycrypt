"use client";

import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";

import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Props {
  news: {
    id: number;
    avatar: string;
    image: string;
    likes: number;
    views: number;
    coins: {
      name: string;
      value: string;
    }[];
    users: string[];
  };
}

export default function NewsCard({ news }: any) {
  const { t } = useTranslation();
  if (!news) return null;
  return (
    <Box
      sx={{
        bgcolor: "#1A1B24",
        borderRadius: "8px",
        overflow: "hidden",
        color: "#fff",
        boxShadow: "0 0 2.66667vw rgba(0,0,0,.1)",
        transition: ".25s",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "#3b82f6",
        },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        pt={2}
      >
        <Stack direction="row" spacing={1.5}>
          <Avatar src={news.avatar} />

          <Box>
            <Typography fontWeight={700} fontSize={17}>
              {t(`News.items.${news.id}.author`)}
            </Typography>

            <Typography fontSize={13} color="#2A8DFF">
              {t(`News.items.${news.id}.time`)}
            </Typography>
          </Box>
        </Stack>

        <Button
          size="small"
          sx={{
            bgcolor: "#15C314",
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            px: 2,
            minWidth: 70,
            "&:hover": {
              bgcolor: "#11ad10",
            },
          }}
        >
          {t("News.follow")}
        </Button>
      </Stack>

      {/* Content */}
      <Box px={2} py={2}>
        <Typography fontWeight={700} fontSize={24} lineHeight={1.3} mb={1}>
          {t(`News.items.${news.id}.title`)}
        </Typography>

        <Typography
          color="#9EA3AF"
          fontSize={15}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {t(`News.items.${news.id}.description`)}
        </Typography>
      </Box>

      {/* Image */}
      <Box
        sx={{
          position: "relative",
          height: 260,
        }}
      >
        <Image
          src={news.image}
          alt={t(`News.items.${news.id}.title`)}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          px: 2,
          py: 1.8,
        }}
      >
        {/* Row 1 */}
        <Stack direction="row" alignItems="center" spacing={4} mb={1.5}>
          {/* Likes */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                bgcolor: "#4B4E56",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FavoriteIcon
                sx={{
                  fontSize: 13,
                  color: "#D7D7D7",
                }}
              />
            </Box>

            <Typography fontSize={15}>{news.likes}</Typography>
          </Stack>

          {/* Views */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                bgcolor: "#4B4E56",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <VisibilityIcon
                sx={{
                  fontSize: 13,
                  color: "#D7D7D7",
                }}
              />
            </Box>

            <Typography fontSize={15}>{news.views}</Typography>
          </Stack>

          {/* Share */}
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              bgcolor: "#4B4E56",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShareIcon
              sx={{
                fontSize: 14,
                color: "#D7D7D7",
              }}
            />
          </Box>
        </Stack>

        {/* Row 2 */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Avatar Group */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {news?.users?.map((avatar: string, index: number) => (
              <Avatar
                key={index}
                src={avatar}
                sx={{
                  width: 28,
                  height: 28,
                  ml: index === 0 ? 0 : -1.1,
                  border: "2px solid #1A1D26",
                }}
              />
            ))}
          </Box>

          {/* Coin */}
          <Stack direction="row" spacing={3}>
            {news?.coins?.map((coin: { name: string }) => (
              <Typography
                key={coin.name}
                sx={{
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: 15,
                }}
              >
                {coin.name}

                <Box
                  component="span"
                  sx={{
                    color: "#0ECB81",
                    ml: 0.3,
                    fontWeight: 600,
                  }}
                >
                  {t(`News.items.${news.id}.coins.${coin.name}`)}
                </Box>
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
