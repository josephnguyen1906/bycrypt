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
import { formatCurrency } from "@/utils/formatMoney";

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
  const [history, setHisstory] = useState<IHistoryOpen[]>([]);
  const [result, setResult] = useState<any>(null);
  const [progressContract, setProgressContract] = useState<any>(null);
  const [trade, setTrade] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [tradeYn, setTradeYn] = useState(false);
  const [time, setTime] = useState("1");
  const [timeValue, setTimeValue] = useState("1m");
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const tradeIdRef = useRef<number | null>(null);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const fetchData = async () => {
      const resCoin: any = await getListCoin();

      if (resCoin.data) {
        setListCoin(resCoin.data);
        setSelectedCoin(resCoin.data[0]);
      }
    };
    fetchData();
    historyOpen();
  }, []);

  const historyOpen = async () => {
    // try {
    const his: any = await getContractjc();
    if (his.status === true) {
      setHisstory(his.data);
      if (his?.data?.length > 0) {
        setTradeYn(true);
      }
    }
    // } catch (errors: any) {
    //   console.log(errors?.message);
    // }
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
      return;
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

      console.log("CREATE ORDER:", res);

      if (res.status) {
        try {
          tradeIdRef.current = res.data?.id;
          setProgressContract(res.data);

          await fetchUser();
          historyOpen();
          setTradeYn(true);
          toast.success(t("Toast.buysell3"));
        } catch (innerErr) {
          console.log("INNER ERROR:", innerErr);
        }

        return;
      }
    } catch (error) {
      console.log("MAIN ERROR:", error);
      toast.error(t("Toast.buysell4"));
    }
  };
  const fetchResult = async () => {
    try {
      const tradeId = tradeIdRef.current;
      console.log("tradeId", tradeId);

      if (!tradeId) {
        console.log("NO TRADE ID");
        return;
      }

      const res = await getOrderResult(Number(tradeId));

      setResult(res.data);

      setTrade(null);

      await preloadImage("/images/thongbao.png");

      setShowPopup(true);

      tradeIdRef.current = null;
    } catch (error) {
      console.log("FETCH RESULT ERROR:", error);
      toast.error(t("Toast.buysell"));
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(false); // Ẩn popup sau 5 giây
        setResult(null); // Reset kết quả nếu cần
        historyOpen();
        setTradeYn(false);
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

                  <TradingChart symbol={selectedCoin?.symbol} interval={time} />
                </Box>
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  <TradeForm
                    onSubmit={handleSubmit}
                    user={user}
                    tradeYn={tradeYn}
                  />
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
                      {t("HistoryPage.tab1")} ({history.length})
                    </Typography>
                    <Button
                      onClick={() => {
                        if (user) router.push("/contact/history");
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
                    onCLose={() => {
                      fetchResult();
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    background: "#0E1316",
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
      {showPopup && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(53, 53, 53, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "90%",
              maxWidth: "300px",
              borderRadius: "10px",
              marginTop: "-20%",
            }}
          >
            {/* Ảnh nền */}
            <Box
              component="img"
              src="/images/thongbao.png"
              alt="Thông báo"
              onLoad={() => setImageLoaded(true)}
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "10px",
              }}
            />
            {imageLoaded && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  width: "100%",
                  px: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "35px",
                    fontWeight: "bold",
                    color: result?.is_win === 1 ? "#00c853" : "red",
                  }}
                >
                  {result?.is_win === 1 ? "+" : "-"}
                  {result
                    ? formatCurrency(Number(result?.ploss), "en", "USD")
                    : 0}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
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
          symbol={selectedCoin.symbol}
        />
      )}
    </Box>
  );
}
