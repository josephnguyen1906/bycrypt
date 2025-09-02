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
  TransferIcon,
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
  const handleClick = (coin: any) => {
    if (coin) {
      setCoinTitle(coin);
      const [base, quote] = coin.split("/");
      setCoin(base + quote);
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
            <TradeChart height="320" symbols={coin} />
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
                      fontWeight: "500",
                      borderRadius: "12px",
                      padding: "8px 15px",
                      minWidth: "75px",
                      textTransform: "capitalize",
                      fontSize: "10px",
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

                  <Button
                    sx={{
                      color: "white",
                      textAlign: "center",
                      fontSize: "10px",
                      background: "none",
                      border: "none",
                    }}
                  >
                    <TransferIcon width="18px" height="18px" />
                    {t("BuySellPage.trade")}
                  </Button>

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
                      fontWeight: "500",
                      borderRadius: "12px",
                      padding: "8px 15px",
                      minWidth: "75px",
                      textTransform: "capitalize",
                      fontSize: "10px",
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
                height={"300"}
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
              width: "100%",
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
                    fontWeight: "500",
                    borderRadius: "12px",
                    padding: "8px 15px",
                    minWidth: "75px",
                    textTransform: "capitalize",
                    fontSize: "10px",
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

                <Button
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "10px",
                    background: "none",
                    border: "none",
                    textTransform: "capitalize",
                    padding: 0,
                  }}
                >
                  <TransferIcon width="18px" height="18px" fill="white" />
                  {t("BuySellPage.trade")}
                </Button>
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
                    fontWeight: "500",
                    borderRadius: "12px",
                    padding: "8px 15px",
                    fontSize: "10px",
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
                    // setCountdown(30);
                  }
                }}
              />
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
