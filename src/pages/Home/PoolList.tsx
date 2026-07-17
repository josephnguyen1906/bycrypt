"use client";
import MiniChart from "@/components/chart/MiniChart.tsx";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PoolItem {
  id: number;
  title: string;
  imgs: string;
  dayoutnum: string;
  pricenum: string;
  cycle: number;
  allnum: number;
  ycnum: number;
}

export default function PoolList({ pools }: { pools: PoolItem[] }) {
  const { t, i18n } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        pb: 1,
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {(pools ?? []).map((item) => {
        const remain = item.allnum - item.ycnum;
        const roi = (Number(item.dayoutnum) / Number(item.pricenum)) * 100;

        return (
          <Box
            key={item.id}
            sx={{
              minWidth: 190,
              bgcolor: "#1B1C25",
              borderRadius: 3,
              p: 2,
              flexShrink: 0,
            }}
          >
            {/* title */}

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              {item.title}
            </Typography>

            <Typography
              sx={{
                color: "#9A9BA3",
                mt: 0.3,
                fontSize: 14,
              }}
            >
              Hạn chế:
              <Box
                component="span"
                sx={{
                  color: "#C7C7C7",
                  ml: 0.5,
                  fontWeight: 600,
                }}
              >
                {remain}-{item.allnum}
              </Box>
            </Typography>

            {/* image */}

            <Box
              sx={{
                my: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MiniChart id={item.id} />
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                sx={{
                  color: "#03D56D",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Lợi tức
              </Typography>

              <Box
                sx={{
                  bgcolor: "#F44336",
                  color: "#fff",
                  px: 1,
                  borderRadius: 1,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Chu kỳ: {item.cycle} ngày
              </Box>
            </Stack>

            <Typography
              sx={{
                color: "#fff",
                fontSize: 18,
                fontWeight: 700,
                mt: 1,
              }}
            >
              {roi.toFixed(2)}%/ngày
            </Typography>

            <Button
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "#12C41F",
                color: "#fff",
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 700,
                py: 1,

                "&:hover": {
                  bgcolor: "#10AF1C",
                },
              }}
            >
              Participate in usage
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}
