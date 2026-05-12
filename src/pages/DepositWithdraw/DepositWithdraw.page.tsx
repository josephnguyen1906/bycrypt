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
  InputBase,
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
import GuidePopup from "@/components/popup/GuidePopup";
import { NextIcon, PreviousIcon } from "@/shared/Svgs/Svg.component";
import Image from "next/image";
import { useUserStore } from "@/stores/useUserStore";

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

export default function DepositWithdrawPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number | null>(null);
  const [configs, setConfigs] = useState<any>();
  const router = useRouter();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const referral = async () => {
      try {
        const config: any = await getWebsiteConfig();

        if (config.status === true) {
          setConfigs(config.data);
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

        background: "#141A1F",
        paddingTop: {
          xs: "10px",
          sm: "80px",
        },
        marginTop: {
          xs: "0",
          sm: "50px",
        },
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "500px" },
          backgroundColor: "#202630",
          margin: "auto",
          height: { xs: "100vh", sm: "500px" },
          borderRadius: {
            xs: 0,
            sm: "10px",
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            textAlign: "center",
            borderBottom: "1px solid hsla(0,0%,100%,.050980392156862744)",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => router.back()}>
            <PreviousIcon width="25px" height="20px" />
          </IconButton>
          <Typography variant="h5" color={"white"}>
            {t("AssetPage.menu2")}
          </Typography>
          <Button
            sx={{
              "&:hover": {
                background: "#202630",
              },
            }}
          >
            <Image
              src="/images/history-deposit.png"
              width={50}
              height={50}
              alt=""
              style={{ height: "50px", objectFit: "contain" }}
            />
          </Button>
        </Box>
        <Box sx={{ width: "100%" }} padding={2}>
          <Box sx={{ background: "#2B313B", borderRadius: "10px", p: 2 }}>
            <Typography
              sx={{ color: "white", fontSize: "14px", fontWeight: 600 }}
            >
              {t("StakingPage.input_quantity")} (USD)
            </Typography>
            <InputBase
              type="string"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
              sx={{
                width: "100%",
                mt: "5px",
                mb: "10px",
                "& input": {
                  border: "1px solid rgb(220, 223, 230)",
                  borderRadius: "10px",
                  height: "40px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 700,
                  pl: "10px",
                },
              }}
            />
            <Typography
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {Number(amount).toLocaleString()} USDT
            </Typography>
          </Box>
          <Box
            sx={{
              mt: "10px",
              display: "flex",
              justifyContent: "space-between",
              pb: "100px",
            }}
          >
            <Typography
              sx={{
                color: "grey",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {t("AssetPage.Deposit_a")}
            </Typography>{" "}
            <Typography
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {Number(amount).toLocaleString()} USDT
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              textAlign: "center",
              position: {
                xs: "fixed",
                sm: "relative",
              },
              bottom: {
                xs: 80,
                sm: 0,
              },
              left: {
                xs: 0,
                sm: 0,
              },
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {t("AssetPage.noti")}
            </Typography>
            <Button
              onClick={() => {
                if (user) {
                  const newWindow = window.open(
                    configs.telegram,
                    "_blank",
                    "noopener,noreferrer",
                  );
                  if (newWindow) {
                    newWindow.opener = null;
                  }
                } else {
                  toast.error(t("BuySellPage.title"));
                }
              }}
              sx={{
                width: "100%",
                background: "linear-gradient(90deg,#41efa6,#02c173)",
                borderRadius: "20px",
                height: "40px",
                color: "white",
                textTransform: "capitalize",
                mb: 3,
                mt: 2,
              }}
            >
              {t("SignupPage.button3")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
