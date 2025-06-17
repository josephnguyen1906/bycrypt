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
import { getBuySellConfig, getListCoin } from "@/services/User.service";
import { toast } from "react-toastify";
import useAuth from "@/hook/useAuth";
import BuyComponent from "@/components/Trade/BuyComponent";
import SellComponent from "@/components/Trade/SellComponent";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import TradingViewSymbolInfo from "@/components/ChartView/SymbolDetail";

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
  const { user } = useAuth();
  const [listCoin, setListCoin] = useState<any>(null);
  const [coin, setCoin] = useState<any>("BTCUSDT");
  const [coinTitle, setCoinTitle] = useState<any>("BTC/USDT");
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getListCoin();
        const buySellConfig: any = await getBuySellConfig();
        if (res.status === true) {
          setListCoin(res.data);
        }
      } catch (errors: any) {
        // toast.error(errors?.message);
      }
    };
    referral();
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
            onChange={(e) => handleClick(e.target.value)}
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
            // padding: "10px 10px",
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
            <TradeChart height="400" symbols={coin} />
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
                  color: "#fff",
                  "& .MuiTab-root": {
                    textTransform: "none",
                    borderRadius: "999px",
                    minHeight: "30px",
                    minWidth: "80px",
                    px: 3,
                    fontWeight: 500,
                    color: "#fff",
                    backgroundColor: "transparent",
                    transition: "0.3s",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#00c853", // xanh lá
                    color: "#ffffff",
                    fontWeight: 600,
                  },
                  "& .MuiTabs-flexContainer": {
                    color: "#ffffff", // màu chữ của tab
                  },
                }}
              >
                <Tab label="Buy" {...a11yProps(0)} />
                <Tab label="Sell" {...a11yProps(1)} />
              </Tabs>
              <CustomTabPanel value={value} index={0}>
                <BuyComponent user={user} value={coin} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <SellComponent user={user} value={coin} />
              </CustomTabPanel>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: {
              xs: "flex",
              sm: "block",
            },
          }}
        >
          {/* <Box
            sx={{
              width: "40%",
              padding: "10px",
              display: {
                xs: "block",
                sm: "none",
              },
            }}
            aria-label="main mailbox folders"
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: "20px",
              }}
            >
              <Typography
                sx={{
                  color: "gray",
                  fontSize: {
                    xs: "12px",
                    sm: "16px",
                  },
                }}
              >
                Transaction
              </Typography>

              <Typography
                sx={{
                  color: "gray",
                  fontSize: {
                    xs: "12px",
                    sm: "16px",
                  },
                }}
              >
                Staus
              </Typography>
            </Box>
            <Divider sx={{ borderColor: "gray" }} />
            <Box
              sx={{
                height: {
                  xs: "380px",
                  sm: "500px",
                },
                overflowY: "scroll",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Chrome, Safari
                },
              }}
            >
              {listCoin &&
                listCoin.map((coin: any, index: number) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      alignItems: "center",
                    }}
                    key={index}
                    onClick={() => handleClick(coin.title)}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: {
                          xs: "10px",
                          sm: "16px",
                        },
                      }}
                    >
                      {coin.title}
                    </Typography>

                    <Button
                      sx={{
                        padding: {
                          xs: "3px 5px",
                          sm: "3px 10px",
                        },
                        backgroundColor:
                          coin.status === 1 ? "#25a74e" : "#c94064",
                        color: "white",
                        fontSize: {
                          xs: "10px",
                          sm: "16px",
                        },
                        textAlign: "center",
                      }}
                    >
                      {coin.status === 1 ? " Active" : "Inactive"}
                    </Button>
                  </Box>
                ))}
            </Box>
          </Box> */}
          <Box
            sx={{
              width: "90%",
              display: {
                xs: "block",
                sm: "none",
              },
              margin: "auto",
              paddingBottom: "100px",
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
                "& .MuiTab-root": {
                  textTransform: "none",
                  borderRadius: "999px",
                  minHeight: "30px",
                  minWidth: "80px",
                  px: 3,
                  fontWeight: 500,
                  color: "#ffffff",
                  backgroundColor: "transparent",
                  transition: "0.3s",
                },
                "& .Mui-selected": {
                  backgroundColor: "#00c853", // xanh lá
                  color: "#ffffff",
                  fontWeight: 600,
                },
                "& .MuiTabs-flexContainer": {
                  color: "#ffffff", // màu chữ của tab
                },
              }}
            >
              <Tab label="Buy" {...a11yProps(0)} />
              <Tab label="Sell" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <BuyComponent user={user} value={coin} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SellComponent user={user} value={coin} />
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
