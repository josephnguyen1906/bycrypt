"use client";
import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  getBills,
  getContractpc,
  getMyWallet,
  getWebsiteConfig,
  sellCoins,
  topUpCoins,
} from "@/services/User.service";
import { formatCurrency } from "@/utils/formatMoney";
import useAuth from "@/hook/useAuth";
import TradingViewTickerTape from "@/components/ChartView/TradingViewTickerTape";
import AssetChartView from "@/components/ChartView/AssetChartView";
import TablePagination from "@mui/material/TablePagination";

import { formatDateTime } from "@/utils/formatDateTime";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface CountryType {
  id: number;
  name: string;
  title: string;
  addresss: string;
  bank: number;
  suggested?: boolean;
}

const medthod = [
  {
    id: 1,
    name: "Bank Transfer",
  },
  {
    id: 2,
    name: "Transfer coins to the wallet",
  },
];
const medthodWallet = [
  {
    id: 2,
    name: "Transfer coins to the wallet",
  },
];

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AssetPage() {
  const [bill, setBill] = useState<any>(null);
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getContractpc();
        if (res.status === true) {
          setBill(res.data);
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    referral();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#000",
        paddingTop: {
          xs: "10px",
          sm: "80px",
        },
        paddingBottom: {
          xs: "50px",
          sm: "0px",
        },
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "80%",
          },
          display: {
            xs: "block",
            sm: "flex",
          },
          justifyContent: "center",
          margin: "0 auto",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "35%" },
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "20px",
                sm: "35px",
              },
              fontWeight: "600",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Buy crypto in a few steps
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "20px",
                sm: "20px",
              },
              fontWeight: "500",
              color: "#909090",
              textAlign: "center",
            }}
          >
            Bitcoin, Ethereum, Tether, Solana, and more popular crypto
          </Typography>
        </Box>
        {user ? (
          <Box
            sx={{
              width: { xs: "100%", sm: "55%" },
              border: {
                xs: "none",
                sm: "1px solid rgba(203, 203, 203, 0.46)",
              },

              boxShadow: {
                xs: "none",
                sm: "0px 0px 30px rgba(255, 255, 255, 0.42)",
              },
              padding: {
                xs: "0px",
                sm: "10px",
              },
              backgroundColor: "#000",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                padding: "5px 20px",
              }}
            >
              <Box sx={{ width: "100%", textAlign: "left" }}>
                <Typography sx={{ color: "#909090", padding: "5px 0" }}>
                  Estimated total value
                </Typography>
                <Box
                  sx={{
                    height: "30px",
                    display: "flex",
                    gap: "5px",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {user?.balance?.usdt
                      ? `${parseFloat(user.balance.usdt).toLocaleString()} USDT`
                      : "0 "}
                  </Typography>
                </Box>
                <Typography sx={{ color: "#909090", padding: "5px 0" }}>
                  PNL today $0.00(0.00%)
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-evenly",
                padding: "20px 0px",
              }}
            >
              <Button
                type="button"
                href="/deposit"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
              >
                <img
                  src="/images/deposit.png"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
                Deposit
              </Button>
              <Button
                href="/withdraw"
                type="button"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
              >
                <img
                  src="/images/withdraw.png"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
                Withdraw
              </Button>
              <Button
                href="/buysell"
                type="button"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
              >
                <img
                  src="/images/payment.png"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
                Transfer
              </Button>
              <Button
                href="/bill"
                type="button"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
              >
                <img
                  src="/images/history.png"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
                History
              </Button>
            </Box>
            <Box sx={{ width: "95%", margin: "auto" }}>
              <Typography
                sx={{ fontSize: "16px", color: "white", fontWeight: "600" }}
              >
                Asset
              </Typography>
              <Box
                sx={{
                  width: "90%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  margin: "auto",
                }}
              >
                <Typography sx={{ fontSize: "14px", color: "#909090" }}>
                  Name
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#909090",
                    textAlign: "right",
                  }}
                >
                  Quantity
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "90%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  margin: "auto",
                  paddingTop: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "Center",
                  }}
                >
                  <img
                    src="/images/4f8f27a4de61fca0faca95298f6714c81fcfc22929d68e1062e396c4026452f9_200.webp"
                    width={30}
                    height={30}
                  />
                  <Typography sx={{ fontSize: "14px", color: "white" }}>
                    Pi
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "white",
                    textAlign: "right",
                  }}
                >
                  {parseFloat(user.balance.pi).toLocaleString()} Pi
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "95%", margin: "auto", paddingTop: "20px" }}>
              <Typography
                sx={{ fontSize: "16px", color: "white", fontWeight: "600" }}
              >
                Recent history
              </Typography>
              {bill ? (
                <Box>
                  {bill
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item: any, index: number) => (
                      <Box key={index} sx={{ padding: "10px 0" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 600,
                              }}
                            >
                              {item.hyzd === 1 ? "Buy" : "Sell"} {item.coinname}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#909090",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {formatDateTime(item.buytime)}
                            </Typography>
                          </Box>
                          <Box>
                            {item.is_win === 1 ? (
                              <Typography
                                sx={{
                                  textAlign: "left",
                                  color: "green",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                }}
                              >
                                + {formatCurrency(item.ploss, "en", "USD")}
                              </Typography>
                            ) : (
                              <Typography
                                sx={{
                                  textAlign: "left",
                                  color: "red",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                }}
                              >
                                - {formatCurrency(item.ploss, "en", "USD")}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  <TablePagination
                    component="div"
                    count={bill.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    sx={{
                      width: "100%",
                      color: "white",
                      margin: "auto",
                    }}
                  />
                </Box>
              ) : (
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "25px",
                    fontWeight: 600,
                    textAlign: "Center",
                  }}
                >
                  No transactions have occurred yet.
                </Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: {
                xs: "90%",
                sm: "55%",
              },
              textAlign: "center",
              boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.24)",
              borderRadius: "15px",
              height: "400px",
              margin: "0 auto",
              display: "grid",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                You are not logged in
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "20px", fontWeight: 600 }}
              >
                Please log in to deposit / withdraw coins.
              </Typography>
              <Button
                type="button"
                href="/login"
                sx={{
                  background: "#fff",
                  color: "black",
                  width: "250px",
                  height: "45px",
                  borderRadius: "15px",
                  marginTop: "20px",
                  fontWeight: 600,
                  "&:hover": {
                    background: "#fff",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          paddingTop: "10px",
          paddingBottom: "80px",
        }}
      >
        {" "}
        <AssetChartView />
      </Box>
    </Box>
  );
}
