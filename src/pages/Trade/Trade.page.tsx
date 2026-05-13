"use client";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  createOrder,
  getBuySellConfig,
  getContractjc,
  getListCoin,
  getOrderResult,
  getProgressContract,
} from "@/services/User.service";
import { toast } from "react-toastify";
import useAuth from "@/hook/useAuth";
import { useTranslation } from "react-i18next";
import CoinSidebar from "@/components/coins/CoinSidebar";
import CoinHeader from "@/components/coins/CoinHeader";
import TradingChart from "@/components/coins/TradingChart";
import TradeForm, { ITypeTrade } from "@/components/coins/TradeForm";
import CommandOpen from "../Contact/CommandOpen";
import { useUserStore } from "@/stores/useUserStore";
import { IHistoryOpen } from "@/shared/interfaces";
import TradePopup from "@/components/popup/TradePopup";
import { NextIcon, PreviousIcon } from "@/shared/Svgs/Svg.component";
import { useRouter } from "next/navigation";

export interface Icoin {
  coinname: string;
  id: number;
  name: string;
  sort: number;
  status: number;
  symbol: string;
  title: string;
}
const TIMEFRAMES = [
  {
    label: "1m",
    value: "1",
    min: 10,
    max: 100,
    percent: 5,
  },
  {
    label: "5m",
    value: "5",
    min: 30,
    max: 300,
    percent: 8,
  },
  {
    label: "15m",
    value: "15",
    min: 50,
    max: 500,
    percent: 12,
  },
  {
    label: "1h",
    value: "60",
    min: 100,
    max: 1000,
    percent: 18,
  },
  {
    label: "4h",
    value: "240",
    min: 200,
    max: 2000,
    percent: 25,
  },
  {
    label: "1d",
    value: "D",
    min: 500,
    max: 5000,
    percent: 40,
  },
  {
    label: "1w",
    value: "W",
    min: 1000,
    max: 10000,
    percent: 60,
  },
];

export default function TradePage() {
  const { t } = useTranslation();
  const { user, fetchUser } = useUserStore();
  const [selectedCoin, setSelectedCoin] = useState<Icoin>({
    coinname: "btc",
    id: 1,
    name: "btcusdt",
    sort: 1,
    status: 1,
    symbol: "btc-usdt",
    title: "BTC/USDT",
  });

  const [tab, setTab] = useState("BUY");
  const [openTrade, setOpenTrade] = useState(false);
  const [listCoin, setListCoin] = useState<Icoin[] | null>(null);
  const [symbol, setSymbol] = useState<any>("btc-usdt");
  const [history, setHisstory] = useState<IHistoryOpen[]>([]);
  const [result, setResult] = useState<any>(null);
  const [progressContract, setProgressContract] = useState<any>(null);
  const [trade, setTrade] = useState<any>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [time, setTime] = useState("1");
  const [timeValue, setTimeValue] = useState("1m");
  const router = useRouter();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const fetchData = async () => {
      const resCoin: any = await getListCoin();

      // Xử lý danh sách coin
      if (resCoin.data) {
        setListCoin(resCoin.data);
        setSelectedCoin(resCoin.data[0]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API lấy danh sách coin và cấu hình mua bán
        const [buySellConfig, result] = await Promise.all([
          getBuySellConfig(),
          getProgressContract(),
        ]);

        // Xử lý progress contract
        if (result && result.data) {
          const fixedSellTimeStr = result.data.selltime.replace(
            /\.\d{6}Z$/,
            "Z",
          );
          const sellTime = new Date(fixedSellTimeStr).getTime();
          const now = Date.now();
          const remainingSeconds = Math.floor((sellTime - now) / 1000);

          if (remainingSeconds > 0) {
            setProgressContract(result.data);
            setCountdown(remainingSeconds);
          } else {
            setProgressContract(null);
            setCountdown(null);
          }
        } else {
          setProgressContract(null);
          setCountdown(null);
        }
      } catch (error: any) {
        // console.error("Error fetching data:", error);
        // toast.error(error?.message || "Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev && prev <= 1) {
          clearInterval(interval);
          setProgressContract(null);

          setTimeout(() => {
            fetchResult();
          }, 4000);

          return 0;
        }
        return (prev ?? 0) - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const historyOpen = async () => {
    try {
      const his: any = await getContractjc();
      if (his.status === true) {
        setHisstory(his.data);
      }
    } catch (errors: any) {
      console.log(errors?.message);
    }
  };

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => {
        resolve(); // Tiếp tục thực thi thay vì reject
      };
    });
  };

  const handleSubmit = async (data: ITypeTrade) => {
    if (!user) {
      toast.error(t("BuySellPage.title"));
    }
    if (user?.rzstatus !== 2) {
      toast.error(t("Toast.buysell5"));
      return;
    }

    if (!data.hytime || !data.price) {
      toast.error(t("Toast.buysell1"));
      return;
    }

    try {
      const formData = new FormData();
      formData.append("ctime", data.hytime);
      formData.append("amount", String(data.price));
      formData.append("coinname", selectedCoin.symbol);
      formData.append("method", data.method);
      formData.append("uprate", data.hyykbl);

      const res = await createOrder(formData);
      console.log("res", res);
      if (res.status) {
        setProgressContract(res.data);
        await fetchResult();
        fetchUser();
        historyOpen();
        toast.success(t("Toast.buysell3"));
        return;
      }

      // onClose();
      // toast.success(t("Toast.buysell3"));
    } catch (error) {
      toast.error(t("Toast.buysell4"));
    }
  };

  const fetchResult = async () => {
    try {
      if (!progressContract?.id) {
        throw new Error("Missing trade ID or progress contract ID");
      }

      const res = await getOrderResult(progressContract.id);

      setResult(res.data);
      setCountdown(null);
      setTrade(null);
      await preloadImage("/images/thongbao.png");
      setShowPopup(true);
    } catch (error: any) {
      toast.error(t("Toast.buysell"));
    }
  };
  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(false); // Ẩn popup sau 5 giây
        setResult(null); // Reset kết quả nếu cần
      }, 5000);

      return () => clearTimeout(timeout); // Clear khi component unmount hoặc showPopup thay đổi
    }
  }, [showPopup]);

  return (
    <Box sx={{ background: "#000", paddingTop: { xs: "0px", sm: "70px" } }}>
      <Box
        sx={{
          pt: 1,
        }}
      >
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        >
          <IconButton onClick={() => router.back()}>
            <PreviousIcon width="20px" height="20px" />
          </IconButton>
        </Box>
        <CoinHeader
          coin={selectedCoin}
          time={timeValue}
          setMenuCoin={(e: any) => {
            const data = listCoin?.find((i) => i.name == e);
            if (data) setSelectedCoin(data);
          }}
        />
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "flex",
            },
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "280px 1fr",
                },
                background: "#000",
              }}
            >
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <CoinSidebar
                  time={timeValue}
                  coins={listCoin}
                  selectedCoin={selectedCoin}
                  onSelect={setSelectedCoin}
                />
              </Box>

              {/* RIGHT */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: "1px solid #111",
                  overflowY: "auto",
                  background: "#0E1316",
                }}
              >
                <Box sx={{ minHeight: { sm: "550px", xs: "400px" } }}>
                  <Box
                    sx={{
                      px: 2,
                      height: 42,
                      display: "flex",
                      alignItems: "center",

                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",

                      background: "#111",

                      overflowX: "auto",

                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={3}
                      sx={{
                        minWidth: "max-content",
                      }}
                    >
                      {TIMEFRAMES.map((item) => {
                        const active = time === item.value;

                        return (
                          <Box
                            key={item.value}
                            onClick={() => {
                              setTime(item.value);
                              setTimeValue(item.label);
                            }}
                            sx={{
                              position: "relative",

                              cursor: "pointer",

                              fontSize: 13,
                              fontWeight: active ? 700 : 500,

                              color: active ? "#fff" : "rgba(255,255,255,0.55)",

                              transition: "0.2s",

                              userSelect: "none",

                              "&:hover": {
                                color: "#fff",
                              },

                              "&::after": active
                                ? {
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    bottom: -10,
                                    width: "100%",
                                    height: "2px",
                                    background: "#1976d2",
                                    borderRadius: 999,
                                  }
                                : {},
                            }}
                          >
                            {item.label}
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>

                  <TradingChart symbol={selectedCoin?.name} interval={time} />
                </Box>
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  <TradeForm onSubmit={handleSubmit} user={user} />
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: {
                        xs: "20px 10px",
                        sm: "20px 40px",
                      },
                      mt: {
                        xs: "40px",
                        sm: 0,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        borderBottom: "2px solid white",
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 600,
                        p: 1,
                      }}
                    >
                      {t("HistoryPage.tab1")} (0)
                    </Typography>
                    <Button
                      onClick={() => {
                        router.push("/contact/history");
                      }}
                      sx={{
                        display: "flex",
                        gap: "5px",
                        background: "#ffffff0d",
                        color: "white",
                        borderRadius: "8px",
                        padding: "8px 20px",
                        textTransform: "capitalize",
                      }}
                    >
                      <img
                        src={"/images/history-icon.png"}
                        width={20}
                        height={20}
                        alt=""
                      />
                      {t("BuySellPage.history")}
                    </Button>
                  </Box>

                  <CommandOpen
                    user={user}
                    history={history}
                    onCLose={async () => {
                      await historyOpen();
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    p: 2,
                    display: {
                      xs: "block",
                      sm: "none",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mt: 2,
                    }}
                  >
                    <Button
                      disabled={!user}
                      sx={{
                        width: "48%",
                        height: "40px",
                        background: "#2dd4bf",
                        textTransform: "none",
                        color: "black",
                        "&:hover": { background: "#2dd4bf" },
                        "&:disabled": {
                          background: "gray",
                        },
                      }}
                      onClick={() => {
                        setOpenTrade(true);
                        setTab("BUY");
                      }}
                    >
                      {t("BuySellPage.buy")}
                    </Button>
                    <Button
                      disabled={!user}
                      sx={{
                        width: "48%",
                        height: "40px",
                        background: "#ef4444",
                        textTransform: "none",
                        color: "white",
                        "&:hover": { background: "#ef4444" },
                        "&:disabled": {
                          background: "gray",
                        },
                      }}
                      onClick={() => {
                        setOpenTrade(true);
                        setTab("SELL");
                      }}
                    >
                      {t("BuySellPage.sell")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {user && (
        <TradePopup
          open={openTrade}
          user={user}
          tab={tab}
          history={history}
          onLoadHitory={() => {
            historyOpen();
          }}
          onClose={() => {
            setOpenTrade(false);
            fetchUser();
            historyOpen();
          }}
          symbol={selectedCoin.name}
        />
      )}
    </Box>
  );
}
