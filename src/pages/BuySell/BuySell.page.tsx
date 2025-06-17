"use client";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
  const [coin, setCoin] = useState<any>(null);
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
      const [base, quote] = coin.split("/");
      setCoin(base + quote);
    }
  };

  return (
    <Box sx={{ background: "#000", paddingTop: { xs: "0px", sm: "70px" } }}>
      <Box
        sx={{
          height: "700px",
        }}
      >
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "flex",
            },
            gap: "10px",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
            aria-label="main mailbox folders"
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    sx={{
                      color: "gray",
                      fontSize: {
                        xs: "10px",
                        sm: "16px",
                      },
                    }}
                  >
                    Transaction
                  </ListItemText>
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    sx={{
                      color: "gray",
                      fontSize: {
                        xs: "10px",
                        sm: "16px",
                      },
                    }}
                  >
                    Staus
                  </ListItemText>
                </ListItemButton>
              </ListItem>{" "}
              <Divider sx={{ borderColor: "gray" }} />
            </List>
            <List
              sx={{
                height: {
                  xs: "350px",
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
                  <ListItem key={index} onClick={() => handleClick(coin.title)}>
                    <ListItemButton>
                      <ListItemText
                        sx={{
                          color: "white",
                          fontSize: {
                            xs: "10px",
                            sm: "16px",
                          },
                        }}
                      >
                        {coin.title}
                      </ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText
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
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Box>
          <Box sx={{ width: "100%" }}>
            <TradeChart height="400" symbols={coin} />
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                marginTop: "10px",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  width: {
                    xs: "100%",
                    sm: "80%",
                  },
                  padding: "0px 10px",
                  "& .MuiTab-root": {
                    color: "#909090",
                    fontSize: {
                      xs: "14px",
                      sm: "18px",
                    },
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    "&:hover": { color: "#fff" },
                    "&.Mui-selected": {
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: {
                        xs: "14px",
                        sm: "18px",
                      },
                      borderBottom: "2px solid #fff",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#000",
                  },
                }}
              >
                <Tab label="Buy" {...a11yProps(0)} />
                <Tab label="Sell" {...a11yProps(1)} />
              </Tabs>
              <CustomTabPanel value={value} index={0}></CustomTabPanel>
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
          <Box
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
          </Box>
          <Box
            sx={{
              width: "60%",
              display: {
                xs: "block",
                sm: "none",
              },
              paddingBottom: "100px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                width: {
                  xs: "100%",
                  sm: "80%",
                },
                padding: "0px 5px",
                "& .MuiTab-root": {
                  color: "#909090",
                  fontSize: {
                    xs: "14px",
                    sm: "18px",
                  },

                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  "&:hover": { color: "#fff" },
                  "&.Mui-selected": {
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: {
                      xs: "14px",
                      sm: "18px",
                    },
                    borderBottom: "2px solid #fff",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#000",
                },
              }}
            >
              <Tab label="Buy" {...a11yProps(0)} />
              <Tab label="Sell" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <BuyComponent user={user} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SellComponent user={user} />
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
