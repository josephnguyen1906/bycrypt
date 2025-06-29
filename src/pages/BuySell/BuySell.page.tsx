"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TradeChart from "@/components/ChartView/TradeChart";
import {
  getBuySellConfig,
  getListCoin,
  getOrderResult,
  getProgressContract,
} from "@/services/User.service";
import { toast } from "react-toastify";
import useAuth from "@/hook/useAuth";
import BuyComponent from "@/components/Trade/BuyComponent";
import SellComponent from "@/components/Trade/SellComponent";
import {
  ArrowDropDownCircleOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import TradingViewSymbolInfo from "@/components/ChartView/SymbolDetail";
import { formatCurrency } from "@/utils/formatMoney";
import {
  ArrowTrendDownIcon,
  ArrowTrendUpIcon,
  HistoryIcon,
} from "@/shared/Svgs/Svg.component";
import { useTranslation } from "react-i18next";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function BuySellPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [listCoin, setListCoin] = useState<any>(null);
  const [coin, setCoin] = useState<any>("BTCUSDT");
  const [symbol, setSymbol] = useState<any>("btc-usdt");
  const [coinTitle, setCoinTitle] = useState<any>("BTC/USDT");
  const [value, setValue] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [progressContract, setProgressContract] = useState<any>(null);
  const [trade, setTrade] = useState<any>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      const resCoin: any = await getListCoin();

      // Xử lý danh sách coin
      if (resCoin.data) {
        setListCoin(resCoin.data);
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
            "Z"
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
  const handleClick = (coin: any) => {
    if (coin) {
      setCoinTitle(coin);
      const [base, quote] = coin.split("/");
      setCoin(base + quote);
    }
  };
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

  const fetchResult = async () => {
    try {
      const tradeId = window.localStorage.getItem("tradeId");

      if (!tradeId || !progressContract?.id) {
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

  const fetchProgressContract = async () => {
    try {
      const res: any = await getProgressContract();
      if (res.data) {
        const fixedSellTimeStr = res.data.selltime.replace(/\.\d{6}Z$/, "Z");
        const sellTime = new Date(fixedSellTimeStr).getTime();
        const now = Date.now();
        const remainingSeconds = Math.floor((sellTime - now) / 1000);

        if (remainingSeconds > 0) {
          setProgressContract(res.data);
          setCountdown(remainingSeconds);
        } else {
          setProgressContract(null);
          setCountdown(null);
        }
      } else {
        setProgressContract(null);
        setCountdown(null);
      }
    } catch (error) {
      console.error("Error fetching progress contract:", error);
      setProgressContract(null);
    }
  };
  return (
    <Box sx={{ background: "#000", paddingTop: { xs: "0px", sm: "70px" } }}>
      <Box
        sx={{
          height: "900px",
        }}
      >
        <FormControl
          variant="standard"
          sx={{
            m: 1,
            minWidth: 120,
            color: "white",
            "& .MuiInput-underline:before": { borderBottom: "none" }, // bỏ border mặc định
            "& .MuiInput-underline:after": { borderBottom: "none" }, // bỏ border khi focus
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "none", // hover cũng không có border
            },
          }}
        >
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={coinTitle}
            onChange={(e) => {
              handleClick(e.target.value);
            }}
            IconComponent={ArrowDropDownCircleOutlined}
            disableUnderline
            sx={{
              color: "white",
              "& .MuiSelect-icon": {
                color: "white", // màu icon
              },
            }}
          >
            {listCoin &&
              listCoin.map((coin: any, index: number) => (
                <MenuItem
                  key={index}
                  value={coin.title}
                  onClick={() => setSymbol(coin.symbol)}
                  sx={{ color: "black" }}
                >
                  {coin.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
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
              display: {
                xs: "none",
                sm: "block",
              },
              width: "70%",
            }}
          >
            <TradeChart height="800" symbols={coin} />
          </Box>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
              width: "100%",
            }}
          >
            <TradeChart height="350" symbols={coin} />
          </Box>
          <Box
            width="30%"
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box sx={{ width: "100%", padding: "10px" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{ style: { display: "none" } }}
                sx={{
                  backgroundColor: "#2c2c2c",
                  borderRadius: "999px", // bo tròn toàn bộ khung
                  minHeight: "30px",
                  width: "fit-content",
                  margin: "auto",
                  display: "flex",
                  color: "#ffffff",
                  "& .MuiButtonBase-root-MuiTab-root": {
                    "& .Mui-selected": {
                      color: "white",
                    },
                  },
                  "& .MuiTab-root": {
                    textTransform: "none",
                    borderRadius: "999px",
                    minHeight: "30px",
                    minWidth: "80px",
                    px: 3,
                    fontWeight: 500,
                    color: "white",
                    backgroundColor: "transparent",
                    transition: "0.3s",
                  },
                  "& .Mui-selected": {
                    backgroundColor: value === 1 ? "red" : "#00c853", // xanh lá
                    color: "white",
                    fontWeight: 600,
                  },
                  "& .MuiTabs-flexContainer": {
                    color: "white", // màu chữ của tab
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    // paddingBottom: 2,
                  }}
                >
                  <Button
                    onClick={() => setValue(0)}
                    sx={{
                      backgroundColor: value === 0 ? "#00c853" : "#909090",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "12px",
                      padding: "8px 15px",
                      minWidth: "75px",
                      textTransform: "capitalize",
                      border:
                        value === 0
                          ? "2px solid #00c853"
                          : "2px solid transparent",
                      "&:hover": {
                        backgroundColor: "#00c853",
                      },
                    }}
                  >
                    {t("BuySellPage.buy")} <ArrowTrendUpIcon fill="white" />
                  </Button>

                  {countdown ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#909090",
                          textAlign: "center",
                          fontSize: "10px",
                        }}
                      >
                        {t("BuySellPage.result")}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          textAlign: "center",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {countdown}s
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        color: "white",
                        textAlign: "center",
                        fontSize: "10px",
                      }}
                    >
                      {t("BuySellPage.trade")}
                    </Typography>
                  )}
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ background: "gray" }}
                  />
                  <Button
                    type="button"
                    sx={{
                      width: "80px",
                      height: "35px",
                      background: "none",
                      color: "white",
                      display: "flex",
                      gap: "5px",
                      justifyContent: "center",
                      textAlign: "center",
                      fontSize: "10px",
                      textTransform: "capitalize",
                      "&:hover": {
                        background: "none",
                      },
                    }}
                    href="/asset"
                  >
                    <HistoryIcon fill="white" />
                    {t("BuySellPage.history")}
                  </Button>
                  <Button
                    onClick={() => setValue(1)}
                    sx={{
                      backgroundColor: value === 1 ? "#ff3b30" : "#909090",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "12px",
                      padding: "8px 15px",
                      minWidth: "75px",
                      textTransform: "capitalize",
                      border:
                        value === 1
                          ? "2px solid #ff3b30"
                          : "2px solid transparent",
                      "&:hover": {
                        backgroundColor: "#ff3b30",
                      },
                    }}
                  >
                    {t("BuySellPage.sell")} <ArrowTrendDownIcon fill="white" />
                  </Button>
                </Box>
              </Tabs>

              <CustomTabPanel value={value} index={0}>
                <BuyComponent
                  user={user}
                  value={symbol}
                  dataProcess={progressContract}
                  onSuccess={async (orderData) => {
                    if (orderData) {
                      setTrade(orderData);
                      window.localStorage.setItem("tradeId", orderData.id);
                      setCountdown(orderData.time);
                      await fetchProgressContract();
                      // setCountdown(30);
                    }
                  }}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <SellComponent
                  user={user}
                  value={symbol}
                  dataProcess={progressContract}
                  onSuccess={async (orderData) => {
                    if (orderData) {
                      setTrade(orderData);
                      window.localStorage.setItem("tradeId", orderData.id);
                      setCountdown(orderData.time);
                      await fetchProgressContract();
                      // setCountdown(30);
                    }
                  }}
                />
              </CustomTabPanel>
            </Box>
            <Box
              sx={{
                padding: "10px",
                height: "360px",
              }}
              aria-label="main mailbox folders"
            >
              <TradingViewSymbolInfo
                width="100%"
                height={"360"}
                symbol={coin}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: {
              xs: "flex",
              sm: "block",
            },
            paddingBottom: "100px",
          }}
        >
          <Box
            sx={{
              width: "90%",
              display: {
                xs: "block",
                sm: "none",
              },
              margin: "auto",
              paddingTop: "10px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{ style: { display: "none" } }} // ẩn gạch dưới
              sx={{
                backgroundColor: "#2c2c2c",
                borderRadius: "999px", // bo tròn toàn bộ khung
                minHeight: "30px",
                width: "fit-content",
                margin: "auto",
                display: "flex",
                color: "#ffffff",
                "& .MuiButtonBase-root-MuiTab-root": {
                  "& .Mui-selected": {
                    color: "white",
                  },
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  borderRadius: "999px",
                  minHeight: "30px",
                  minWidth: "80px",
                  px: 3,
                  fontWeight: 500,
                  color: "white",
                  backgroundColor: "transparent",
                  transition: "0.3s",
                },

                "& .Mui-selected": {
                  backgroundColor: value === 1 ? "red" : "#00c853", // xanh lá
                  color: "white",
                  fontWeight: 600,
                },
                "& .MuiTabs-flexContainer": {
                  color: "white", // màu chữ của tab
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  // paddingBottom: 2,
                }}
              >
                <Button
                  onClick={() => setValue(0)}
                  sx={{
                    backgroundColor: value === 0 ? "#00c853" : "#909090",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "12px",
                    padding: "8px 15px",
                    minWidth: "75px",
                    textTransform: "capitalize",
                    border:
                      value === 0
                        ? "2px solid #00c853"
                        : "2px solid transparent",
                    "&:hover": {
                      backgroundColor: "#00c853",
                    },
                  }}
                >
                  {t("BuySellPage.buy")} <ArrowTrendUpIcon fill="white" />
                </Button>
                {countdown ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#909090",
                        textAlign: "center",
                        fontSize: "10px",
                      }}
                    >
                      {t("BuySellPage.result")}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {countdown}s
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      color: "white",
                      textAlign: "center",
                      fontSize: "10px",
                    }}
                  >
                    {t("BuySellPage.trade")}
                  </Typography>
                )}
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ background: "gray" }}
                />
                <Button
                  type="button"
                  sx={{
                    width: "80px",
                    height: "35px",
                    background: "none",
                    color: "white",
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: "10px",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "none",
                    },
                  }}
                  href="/asset"
                >
                  <HistoryIcon fill="white" />
                  {t("BuySellPage.history")}
                </Button>
                <Button
                  onClick={() => setValue(1)}
                  sx={{
                    backgroundColor: value === 1 ? "#ff3b30" : "#909090",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "12px",
                    padding: "8px 15px",
                    minWidth: "75px",
                    textTransform: "capitalize",
                    border:
                      value === 1
                        ? "2px solid #ff3b30"
                        : "2px solid transparent",
                    "&:hover": {
                      backgroundColor: "#ff3b30",
                    },
                  }}
                >
                  {t("BuySellPage.sell")} <ArrowTrendDownIcon fill="white" />
                </Button>
              </Box>
            </Tabs>

            <CustomTabPanel value={value} index={0}>
              <BuyComponent
                user={user}
                value={symbol}
                dataProcess={progressContract}
                onSuccess={async (orderData) => {
                  if (orderData) {
                    setTrade(orderData);
                    window.localStorage.setItem("tradeId", orderData.id);
                    setCountdown(orderData.time);
                    await fetchProgressContract();
                    // setCountdown(30);
                  }
                }}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SellComponent
                user={user}
                value={symbol}
                dataProcess={progressContract}
                onSuccess={async (orderData) => {
                  if (orderData) {
                    setTrade(orderData);
                    window.localStorage.setItem("tradeId", orderData.id);
                    setCountdown(orderData.time);
                    await fetchProgressContract();
                    // setCountdown(30);
                  }
                }}
              />
            </CustomTabPanel>
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
        </Box>
      </Box>
    </Box>
  );
}
