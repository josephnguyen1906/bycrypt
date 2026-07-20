"use client";

import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography, Stack, Chip, Button } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { IHistoryOpen } from "@/shared/interfaces";
import { useRouter } from "next/navigation";

export default function BottomTabs({
  orderOpen,
}: {
  orderOpen: IHistoryOpen[];
}) {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [historyId, setHisstoryId] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: number }>({});
  const router = useRouter();
  useEffect(() => {
    if (!orderOpen) return;

    const initial: any = {};

    orderOpen.forEach((item) => {
      initial[item.id] = getTimeLeft(item.selltime);
    });
    if (orderOpen.length > 0) {
      setHisstoryId(orderOpen[0].id);
    }
    setTimeLeft(initial);
  }, [orderOpen]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const updated: any = {};

        Object.keys(prev).forEach((id) => {
          const numId = Number(id);

          const newTime = prev[numId] > 0 ? prev[numId] - 1 : 0;

          updated[numId] = newTime;
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeLeft = (selltime: Date) => {
    const end = new Date(selltime).getTime();
    const now = Date.now();
    return Math.max(Math.floor((end - now) / 1000), 0);
  };
  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          variant="fullWidth"
          sx={{
            bgcolor: "#1A1D27",
            p: "4px",
            borderRadius: "8px",

            "& .MuiTabs-indicator": {
              display: "none",
            },

            "& .MuiTab-root": {
              color: "#8D93A6",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "6px",
              minHeight: 32,
              width: 120,
            },

            "& .MuiTab-root.Mui-selected": {
              bgcolor: "#00A609",
              color: "#fff",
            },
          }}
        >
          <Tab label={t("TradePage.tab1")} />
          <Tab label={t("TradePage.tab2")} />
        </Tabs>
        <Button sx={{ width: 39 }} onClick={() => router.push("/history")}>
          <Image
            src={"/images/icon-history.png"}
            width={39}
            height={22}
            alt=""
            style={{ objectFit: "contain" }}
          />
        </Button>
      </Box>
      <Box
        sx={{
          minHeight: 180,
          p: 2,
        }}
      >
        {tab === 0 && (
          <Stack spacing={2}>
            {orderOpen && orderOpen.length > 0 ? (
              orderOpen.map((item: IHistoryOpen, index: number) => (
                <Box
                  key={index}
                  sx={{
                    background: "#1c2735",
                    borderRadius: "14px",
                    padding: "16px 18px",
                    marginBottom: "12px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* LEFT */}
                    <Box>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: 500,
                          marginBottom: "6px",
                        }}
                      >
                        {item.coinname?.replace("-", "/")}
                      </Typography>

                      <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                        {t("StakingPage.amount")}:{" "}
                        {Number(item.num).toLocaleString()}
                      </Typography>

                      <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                        {t("BuySellPage.price_buy")}:{" "}
                        {Number(item.buyprice).toLocaleString()}
                      </Typography>
                    </Box>

                    {/* RIGHT */}
                    <Box sx={{ textAlign: "right" }}>
                      <Typography
                        sx={{
                          color: item.hyzd === 1 ? "#4ade80" : "#ef4444",
                          fontWeight: 600,
                          fontSize: 15,
                          marginBottom: "6px",
                        }}
                      >
                        {item.hyzd === 1 ? "Mua lên" : "Mua xuống"}
                      </Typography>

                      <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                        {t("BuySellPage.profit")}: {item.hybl}%
                      </Typography>

                      <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                        {t("BuySellPage.time")}: {timeLeft[item.id] || 0}s
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  height: 120,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <Typography color="#666">{t("TradePage.noti1")}</Typography>
              </Box>
            )}
          </Stack>
        )}

        {tab === 1 && (
          <Stack spacing={2}>
            <Box
              sx={{
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <Typography color="#666">{t("TradePage.noti2")}</Typography>
            </Box>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
