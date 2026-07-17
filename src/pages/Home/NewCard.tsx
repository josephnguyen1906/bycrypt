"use client";

import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";

import Image from "next/image";

interface Props {
  news: any;
}

export default function NewsCard({ news }: Props) {
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
              {news.author}
            </Typography>

            <Typography fontSize={13} color="#2A8DFF">
              {news.time}
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
          Follow
        </Button>
      </Stack>

      {/* Content */}

      <Box px={2} py={2}>
        <Typography fontWeight={700} fontSize={24} lineHeight={1.3} mb={1}>
          {news.title}
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
          {news.description}
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
          alt=""
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
              <FavoriteIcon sx={{ fontSize: 13, color: "#D7D7D7" }} />
            </Box>

            <Typography fontSize={15}>{news.likes}</Typography>
          </Stack>

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
              <VisibilityIcon sx={{ fontSize: 13, color: "#D7D7D7" }} />
            </Box>

            <Typography fontSize={15}>{news.views}</Typography>
          </Stack>

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
            <ShareIcon sx={{ fontSize: 14, color: "#D7D7D7" }} />
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
            {news.users.map((avatar: string, index: number) => (
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
            {news.coins.map((coin: any) => (
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
                  {coin.value}
                </Box>
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
