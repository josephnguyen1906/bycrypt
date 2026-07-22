"use client";

import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography, Stack, Chip, Button } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { IHistoryOpen } from "@/shared/interfaces";
import { useRouter } from "next/navigation";
import { timeAgo } from "../historyContact/HistoryContact";

export default function BottomTabs({
  orderOpen,
  perpetualMode = false,
  perpPositions = [],
  perpHistory = [],
}: {
  orderOpen: IHistoryOpen[];
  perpetualMode?: boolean;
  perpPositions?: any[];
  perpHistory?: any[];
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

  const openOrdersForTab = perpetualMode ? perpHistory : orderOpen;
  const hasOpenOrders = openOrdersForTab && openOrdersForTab.length > 0;

  const renderPerpPosition = (item: any, index: number) => (
    <Box
      key={item.id ?? index}
      sx={{
        background: "#1c2735",
        borderRadius: "14px",
        padding: "16px 18px",
        marginBottom: "12px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>
            {String(item.symbol ?? "").replace("USDT", "/USDT")}
          </Typography>
          <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
            {t("TradePage.title13")}: {item.qty} · {item.leverage}x
          </Typography>
          <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
            {t("TradePage.title12")}: {Number(item.entry_price).toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography
            sx={{
              color: item.side === "long" ? "#4ade80" : "#ef4444",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {item.side === "long" ? t("TradePage.title6") : t("TradePage.title7")}
          </Typography>
          <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
            PnL: {Number(item.unrealized_pnl ?? 0).toFixed(2)} USDT
          </Typography>
          <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
            Liq: {Number(item.liq_price ?? 0).toLocaleString()}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );

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
          pb: "100px",
          pt: 3,
        }}
      >
        {tab === 0 && (
          <Stack spacing={2}>
            {perpetualMode ? (
              perpPositions.length > 0 ? (
                perpPositions.map(renderPerpPosition)
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
              )
            ) : !perpetualMode && orderOpen && orderOpen.length > 0 ? (
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
                width: "100%",
                pt: 2,
              }}
            >
              {hasOpenOrders ? (
                perpetualMode ? (
                  perpHistory.map((item: any, index: number) => (
                    <Box
                      key={item.id ?? index}
                      sx={{
                        width: "100%",
                        background: "#1c2735",
                        borderRadius: "14px",
                        padding: "16px 18px",
                        marginBottom: "12px",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Box>
                          <Typography sx={{ color: "#fff", fontSize: 14 }}>
                            {String(item.symbol ?? "").replace("USDT", "/USDT")}
                          </Typography>
                          <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                            {item.status === 3 ? "Liquidated" : "Closed"}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                          {Number(item.realized_pnl ?? 0).toFixed(2)} USDT
                        </Typography>
                      </Stack>
                    </Box>
                  ))
                ) : (
                orderOpen.map((item: IHistoryOpen, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
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
                        <Box sx={{ display: "flex", gap: "10px" }}>
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
                          <Button
                            sx={{
                              color: "#d1d5db",
                              background: "#374151",
                              fontWeight: 400,
                              height: "25px",
                              fontSize: "10px",
                              textTransform: "capitalize",
                            }}
                          >
                            {t("HistoryPage.title3")}
                          </Button>
                        </Box>
                        <Typography
                          sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                        >
                          {t("HistoryPage.title4")}
                        </Typography>

                        <Typography
                          sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                        >
                          {t("HistoryPage.price_buy")}
                        </Typography>

                        <Typography
                          sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                        >
                          {t("TradePage.title18")}
                        </Typography>
                      </Box>

                      {/* RIGHT */}
                      <Box sx={{ textAlign: "right" }}>
                        <Typography
                          sx={{
                            color: item.hyzd === 1 ? "#4ade80" : "#ef4444",
                            fontWeight: 500,
                            fontSize: 13,
                            marginBottom: "6px",
                          }}
                        >
                          {item.hyzd === 1
                            ? t("TradePage.title6")
                            : t("TradePage.title7")}
                        </Typography>
                        <Typography
                          sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                        >
                          {Number(item.num).toLocaleString()} USDT
                        </Typography>

                        <Typography
                          sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                        >
                          {Number(item.buyprice).toLocaleString()}
                        </Typography>

                        <Typography
                          sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                        >
                          {timeLeft[item.id] || 0}s
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))
                )
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    justifyContent: "center",
                    justifyItems: "center",
                    pt: "50px",
                  }}
                >
                  <Image
                    src={"/images/no-data-fc5efa8b.png"}
                    width={90}
                    height={90}
                    alt=""
                    style={{
                      width: "100%",
                      textAlign: "center",
                      objectFit: "contain",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "12px",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    {t("HistoryPage.title2")}
                  </Typography>
                </Box>
              )}
            </Box>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
