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
  getMyWallet,
  getWebsiteConfig,
  sellCoins,
  topUpCoins,
} from "@/services/User.service";
import { formatCurrency } from "@/utils/formatMoney";
import useAuth from "@/hook/useAuth";
import TradingViewTickerTape from "@/components/ChartView/TradingViewTickerTape";
import AssetChartView from "@/components/ChartView/AssetChartView";
import {
  CopyAllOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Deposit from "./Deposit";
import Convert from "./Convert";
import Withdraw from "./Withdraw";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
type TabProps = {
  value: number;
};
interface CountryType {
  id: number;
  name: string;
  title: string;
  addresss: string;
  bank: number;
  deposit_min: number;
  withdraw_min: number;
  withdraw_max: number;
  withdraw_fee: number;
  suggested?: boolean;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DepositWithdrawPage(props: TabProps) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [coin, setCoin] = useState<string>();
  const [bank, setbank] = useState(0);
  const [method, setMethod] = useState(0);
  const [value, setValue] = useState(props.value || 0);
  const [wallet, setWallet] = useState<CountryType[] | []>([]);
  const [walletBuy, setWalletBuy] = useState<CountryType>();
  const [configs, setConfigs] = useState<any>();
  const { user, refetchUser } = useAuth();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setAddress("");
    setAmount("");
    setCoin("");
    setMethod(0);
    setbank(0);
  };

  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getMyWallet();
        const config: any = await getWebsiteConfig();
        if (res.status === true) {
          const findVND = res.data.find((res: any) => res.name == "vnd");
          setWalletBuy(findVND);
          setWallet(res.data);
        }
        if (config.status === true) {
          setConfigs(config.data);
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    referral();
  }, []);
  console.log("walletBuy", walletBuy);

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
            width: { xs: "100%", sm: "23%" },
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
            {t("DepositWithdrawPage.title")}
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
            {t("DepositWithdrawPage.decription")}
          </Typography>
        </Box>
        {user ? (
          <Box
            sx={{
              width: { xs: "100%", sm: "70%" },
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
            <Box sx={{ borderBottom: 1 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{ style: { display: "none" } }}
                sx={{
                  backgroundColor: "#2c2c2c",
                  borderRadius: "999px",
                  minHeight: "30px",
                  width: "fit-content",
                  margin: "auto",
                  display: "flex",
                  "& .MuiTab-root": {
                    textTransform: "none",
                    borderRadius: "999px",
                    minHeight: "30px",
                    minWidth: "80px",
                    px: 3,
                    fontWeight: 500,
                    color: "#ffffff", // màu chữ mặc định
                    backgroundColor: "transparent",
                    transition: "0.3s",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#00c853", // màu nền khi selected
                    color: "#ffffff", // màu chữ khi selected
                    fontWeight: 600,
                  },
                  "& .MuiTabs-flexContainer": {
                    color: "#ffffff", // có thể bỏ nếu không cầnn
                  },
                }}
              >
                <Tab
                  label={t("DepositWithdrawPage.tab1")}
                  {...a11yProps(0)}
                  sx={{
                    color: "white",
                    "&.Mui-selected": {
                      backgroundColor: "#00c853",
                      color: "white",
                      fontWeight: 600,
                    },
                  }}
                />
                <Tab
                  label={t("DepositWithdrawPage.tab3")}
                  {...a11yProps(1)}
                  sx={{
                    color: "white",
                    "&.Mui-selected": {
                      backgroundColor: "#fcd534",
                      color: "black",
                      fontWeight: 600,
                    },
                  }}
                />
                <Tab
                  label={t("DepositWithdrawPage.tab2")}
                  {...a11yProps(2)}
                  sx={{
                    color: "white",
                    "&.Mui-selected": {
                      backgroundColor: "red",
                      color: "white",
                      fontWeight: 600,
                    },
                  }}
                />
              </Tabs>
            </Box>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "90%",
                },
                display: "grid",
                gridTemplateColumns: "1fr",
                margin: "0 auto",
                paddingTop: "10px",
                gap: "5px",
                p: {
                  xs: "15px 0px",
                  sm: "15px 0px",
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  alignItems: "Center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "Center",
                    justifyContent: "center",
                  }}
                >
                  <img src="/images/vietnam.png" width={30} height={30} />
                  <Typography sx={{ fontSize: "14px", color: "white" }}>
                    {t("Toast.Wallet")} VND
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "Center",
                    justifyContent: "center",
                  }}
                >
                  <img src="/images/usdt.png" width={30} height={30} />
                  <Typography sx={{ fontSize: "14px", color: "white" }}>
                    {t("Toast.Wallet")} USDT
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  alignItems: "Center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "Center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "#fcd534",
                      fontWeight: "bold",
                    }}
                  >
                    {parseFloat(user.balance.vnd).toLocaleString()} VND
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "Center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "#fcd534",
                      fontWeight: "bold",
                    }}
                  >
                    {parseFloat(user.balance.usdt).toLocaleString()} USDT
                  </Typography>
                </Box>
              </Box>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {walletBuy && <Deposit configs={configs} wallet={walletBuy} />}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Convert />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Withdraw user={user} wallet={wallet} refetchUser={refetchUser} />
            </CustomTabPanel>
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
                {t("DepositWithdrawPage.log_title")}
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "20px", fontWeight: 600 }}
              >
                {t("DepositWithdrawPage.log_note")}
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
                {t("HomePage.mobile_login")}
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
