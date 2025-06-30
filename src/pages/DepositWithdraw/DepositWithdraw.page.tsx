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
  suggested?: boolean;
}

const medthod = [
  {
    id: 1,
    name: "method1",
  },
  {
    id: 2,
    name: "method2",
  },
];
const medthodWallet = [
  {
    id: 2,
    name: "method2",
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

export default function DepositWithdrawPage(props: TabProps) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [coin, setCoin] = useState<string>();
  const [bank, setbank] = useState(0);
  const [method, setMethod] = useState(0);
  const [depositMin, setDepositMin] = useState(0);
  const [withdrawMin, setWithdrawMin] = useState(0);
  const [withdrawMax, setWithdrawMax] = useState(0);
  const [value, setValue] = useState(props.value || 0);
  const [wallet, setWallet] = useState<CountryType[] | []>([]);
  const [configs, setConfigs] = useState<any>();
  const frontFileInput = useRef<HTMLInputElement>(null);
  const [frontImage, setFrontImage] = useState<File>();
  const { user } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
    }
  };
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

  const handleSubmit = async () => {
    if (!frontImage) {
      toast.warning(t("Toast.Desposit1"));
      return;
    }
    if (!amount || !method || !coin) {
      toast.warning(t("Toast.Desposit2"));
      return;
    }
    if (Number(amount) < depositMin) {
      toast.warning(t("Toast.Desposit11") + depositMin);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("cid", coin);
      formData.append("amount", amount);
      formData.append("payimg", frontImage);
      formData.append("method", method.toString());

      await topUpCoins(formData);
      toast.success(t("Toast.Desposit3"));
    } catch (error: any) {
      toast.error(t("Toast.Desposit4"));
    }
  };

  const handleSubmitSell = async () => {
    if (!amount || !method || !coin || !password) {
      toast.warning(t("Toast.Desposit5"));
      return;
    }
    if (
      method === 1 &&
      (user?.bank_acc_no === undefined ||
        user.bank_acc_no === null ||
        user.bank_acc_no == "")
    ) {
      router.push("/addbank");
      return;
    }
    if (
      method === 2 &&
      (user?.wallet === undefined || user.wallet === null || user.wallet == "")
    ) {
      router.push("/addwallet");
      return;
    }
    if (method === 1 && Number(user?.balance.usdt) < Number(amount)) {
      toast.warning(t("Toast.Desposit8"));
      return;
    }
    if (method === 2 && Number(user?.balance.pi) < Number(amount)) {
      toast.warning(t("Toast.Desposit8"));
      return;
    }
    if (Number(amount) < withdrawMin) {
      toast.warning(t("Toast.Desposit9") + withdrawMin);
      return;
    }
    if (Number(amount) > withdrawMax) {
      toast.warning(t("Toast.Desposit10") + withdrawMax);
      return;
    }
    if (wallet[0])
      try {
        const formData = new FormData();
        formData.append("cid", coin);
        formData.append("amount", amount);
        formData.append("method", method.toString());
        formData.append("paypassword", password);

        await sellCoins(formData);
        toast.success(t("Toast.Desposit6"));
      } catch (error: any) {
        toast.error(error.message || t("Toast.Desposit7"));
      }
  };
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
                  label={t("DepositWithdrawPage.tab2")}
                  {...a11yProps(1)}
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
            <CustomTabPanel value={value} index={0}>
              <Box
                sx={{
                  display: {
                    xs: "block",
                    sm: "flex",
                  },
                  flexWrap: "wrap",
                  gap: 1,
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", sm: "45%" },
                    boxShadow: {
                      xs: "0px 0px 30px rgba(255, 255, 255, 0.31)",
                      sm: "0px 0px 30px rgba(255, 255, 255, 0.24)",
                    },
                    padding: {
                      xs: "10px",
                      sm: "15px",
                    },

                    borderRadius: "10px",
                    display: {
                      xs: "flex",
                      sm: "none",
                    },
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: {
                        xs: "16px",
                        sm: "25px",
                      },
                      fontWeight: "bold",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    {t("DepositWithdrawPage.h2")}
                  </Typography>

                  {method === 1 && (
                    <Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.bank_name")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {configs.bank_name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.back_acc")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {configs.bank_acc_no}

                          <Tooltip title="Copy">
                            <IconButton
                              size="small"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  configs.bank_acc_no || ""
                                );
                                toast.success(t("DepositWithdrawPage.copy"));
                              }}
                              sx={{ color: "white" }}
                            >
                              <CopyAllOutlined
                                sx={{
                                  fontSize: {
                                    xs: "14px",
                                    sm: "24px",
                                  },
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.acc_name")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {configs.bank_acc_name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.amount")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {formatCurrency(bank * Number(amount))}{" "}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          color: "red",
                          fontSize: { xs: "10px", sm: "14px" },
                          marginTop: "10px",
                        }}
                      >
                        {t("DepositWithdrawPage.note")}
                      </Typography>
                    </Box>
                  )}
                  {method === 2 && (
                    <Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: { xs: "10px", sm: "14px" },
                          marginTop: "10px",
                        }}
                      >
                        {t("DepositWithdrawPage.transfer")}
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "40% 60%",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.wallet")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {address}
                          <Tooltip title="Copy">
                            <IconButton
                              size="small"
                              onClick={() => {
                                navigator.clipboard.writeText(address || "");
                                toast.success(t("DepositWithdrawPage.copy"));
                              }}
                              sx={{ color: "white" }}
                            >
                              <CopyAllOutlined
                                sx={{
                                  fontSize: {
                                    xs: "14px",
                                    sm: "24px",
                                  },
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.type_code")}:
                        </Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {coin === "1" ? (
                            <>
                              <img
                                loading="lazy"
                                width="30"
                                src="/images/4f8f27a4de61fca0faca95298f6714c81fcfc22929d68e1062e396c4026452f9_200.webp"
                                alt=""
                              />{" "}
                              PI Nework
                            </>
                          ) : (
                            <>
                              <img
                                loading="lazy"
                                width="30"
                                srcSet={`/images/usdt.png`}
                                src="/images/usdt.png"
                                alt=""
                              />{" "}
                              USDT
                            </>
                          )}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.coins")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {amount}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: "red",
                          fontSize: {
                            xs: "10px",
                            sm: "14px",
                          },
                          marginTop: "10px",
                        }}
                      >
                        {t("DepositWithdrawPage.note")}
                      </Typography>
                    </Box>
                  )}
                  {method === 0 && (
                    <Box>
                      <img
                        src="/images/credit-card.png"
                        height={40}
                        style={{ margin: "30px 0" }}
                      />
                    </Box>
                  )}
                </Box>
                <Box sx={{ width: { xs: "100%", sm: "45%" } }}>
                  <Autocomplete
                    id="country-select-demo"
                    sx={{
                      padding: {
                        xs: "0px 0px",
                        sm: "20px 0px",
                      },
                    }}
                    options={wallet}
                    autoHighlight
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => {
                      setCoin(newValue?.id?.toString() || "2");
                      setbank(newValue?.bank || 0);
                      setAddress(newValue?.addresss || "");
                      setWithdrawMin(newValue?.withdraw_min || 0);
                      setWithdrawMax(newValue?.withdraw_max || 0);
                      setDepositMin(newValue?.deposit_min || 0);
                    }}
                    renderOption={(props, option) => {
                      const { ...optionProps } = props;
                      return (
                        <Box
                          key={option.id}
                          component="li"
                          sx={{
                            "& > img": { mr: 2, flexShrink: 0 },
                          }}
                          {...optionProps}
                        >
                          {option.name === "pi" ? (
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={`/images/4f8f27a4de61fca0faca95298f6714c81fcfc22929d68e1062e396c4026452f9_200.webp`}
                              src="/images/4f8f27a4de61fca0faca95298f6714c81fcfc22929d68e1062e396c4026452f9_200.webp"
                              alt=""
                            />
                          ) : (
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={`/images/usdt.png`}
                              src="/images/usdt.png"
                              alt=""
                            />
                          )}
                          {option.title}
                        </Box>
                      );
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        placeholder={t("DepositWithdrawPage.currency")}
                        variant="outlined"
                        InputLabelProps={{ style: { color: "white" } }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: "white",

                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white",
                            },
                          },
                          "& .MuiInputBase-input": {
                            padding: "0 14px", // chỉnh padding trái phải
                            display: "flex",
                            alignItems: "center", // quan trọng để căn giữa
                            height: "90%", // full chiều cao TextField
                            boxSizing: "border-box",
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "white",

                            opacity: 1, // để không bị mờ
                          },
                        }}
                        slotProps={{
                          htmlInput: {
                            ...params.inputProps,
                            autoComplete: "new-password",
                          },
                        }}
                      />
                    )}
                  />
                  {bank > 0 ? (
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ padding: "20px 0px" }}
                      options={medthod}
                      autoHighlight
                      getOptionLabel={(option) =>
                        t("DepositWithdrawPage." + option.name)
                      }
                      onChange={(event, newValue) => {
                        setMethod(newValue?.id || 2);
                      }}
                      renderOption={(props, option) => {
                        const { ...optionProps } = props;
                        return (
                          <Box
                            key={option.id}
                            component="li"
                            sx={{
                              "& > img": { mr: 2, flexShrink: 0 },
                            }}
                            {...optionProps}
                          >
                            {option.id === 1 ? (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/bank.png`}
                                src="/images/bank.png"
                                alt=""
                              />
                            ) : (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/wallet.png`}
                                src="/images/wallet.png"
                                alt=""
                              />
                            )}
                            {t("DepositWithdrawPage." + option.name)}
                          </Box>
                        );
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          placeholder={t("DepositWithdrawPage.method")}
                          variant="outlined"
                          InputLabelProps={{ style: { color: "white" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",

                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },
                            "& .MuiInputBase-input": {
                              padding: "0 14px", // chỉnh padding trái phải
                              display: "flex",
                              alignItems: "center", // quan trọng để căn giữa
                              height: "90%", // full chiều cao TextField
                              boxSizing: "border-box",
                            },
                            "& .MuiInputBase-input::placeholder": {
                              color: "white",

                              opacity: 1, // để không bị mờ
                            },
                          }}
                          slotProps={{
                            htmlInput: {
                              ...params.inputProps,
                              autoComplete: "new-password",
                            },
                          }}
                        />
                      )}
                    />
                  ) : (
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ padding: "20px 0px" }}
                      options={medthodWallet}
                      autoHighlight
                      getOptionLabel={(option) =>
                        t("DepositWithdrawPage." + option.name)
                      }
                      onChange={(event, newValue) => {
                        setMethod(newValue?.id || 2);
                      }}
                      renderOption={(props, option) => {
                        const { ...optionProps } = props;
                        return (
                          <Box
                            key={option.id}
                            component="li"
                            sx={{
                              fontSize: { xs: "10px", sm: "14px" },
                              "& > img": { mr: 2, flexShrink: 0 },
                            }}
                            {...optionProps}
                          >
                            {option.id === 1 ? (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/bank.png`}
                                src="/images/bank.png"
                                alt=""
                              />
                            ) : (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/wallet.png`}
                                src="/images/wallet.png"
                                alt=""
                              />
                            )}
                            {t("DepositWithdrawPage." + option.name)}
                          </Box>
                        );
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          placeholder={t("DepositWithdrawPage.method")}
                          variant="outlined"
                          InputLabelProps={{ style: { color: "white" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },
                            "& .MuiInputBase-input": {
                              padding: "0 14px", // chỉnh padding trái phải
                              display: "flex",
                              alignItems: "center", // quan trọng để căn giữa
                              height: "90%", // full chiều cao TextField
                              boxSizing: "border-box",
                            },
                            "& .MuiInputBase-input::placeholder": {
                              color: "white",
                              opacity: 1, // để không bị mờ
                            },
                          }}
                          slotProps={{
                            htmlInput: {
                              ...params.inputProps,
                              autoComplete: "new-password",
                            },
                          }}
                        />
                      )}
                    />
                  )}
                  <TextField
                    id="outlined-basic"
                    placeholder={t("DepositWithdrawPage.amount_name")}
                    variant="outlined"
                    onChange={(e) => setAmount(e.target.value)}
                    helperText={
                      depositMin != 0 ? t("Toast.Desposit11") + depositMin : ""
                    }
                    FormHelperTextProps={{
                      sx: { color: "#fff" }, // HelperText màu trắng
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        height: {
                          xs: "52px",
                          sm: "45px",
                        },
                        fontSize: "16px",
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputBase-input": {
                        width: "100%",
                        padding: "0 14px", // chỉnh padding trái phải
                        display: "flex",
                        alignItems: "center", // quan trọng để căn giữa
                        height: "90%", // full chiều cao TextField
                        boxSizing: "border-box",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        fontSize: "16px",
                        opacity: 1, // để không bị mờ
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "white",
                      marginTop: "20px",
                      marginBottom: "10px",
                      textAlign: "left",
                    }}
                  >
                    {t("DepositWithdrawPage.upload")}
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="file"
                    ref={frontFileInput}
                    onChange={handleFrontChange}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        width: "100%",
                        height: {
                          xs: "52px",
                          sm: "45px",
                        },
                        fontSize: { xs: "16px", sm: "14px" },
                        lineHeight: {
                          xs: "35px",
                          sm: "45px",
                        },
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: "0 14px", // chỉnh padding trái phải
                        display: "flex",
                        alignItems: "center", // quan trọng để căn giữa
                        height: "90%", // full chiều cao TextField
                        boxSizing: "border-box",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 1, // để không bị mờ
                      },
                    }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      type="button"
                      sx={{
                        background: "#fff",
                        color: "black",
                        width: "80%",
                        height: "35px",
                        borderRadius: "15px",
                        fontSize: { xs: "10px", sm: "14px" },
                        fontWeight: "bold",
                        "&:hover": {
                          background: "#fff",
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      {t("DepositWithdrawPage.tab1")}
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { xs: "50%", sm: "45%" },
                    boxShadow: {
                      xs: "0px 0px 30px rgba(255, 255, 255, 0.31)",
                      sm: "0px 0px 30px rgba(255, 255, 255, 0.24)",
                    },
                    padding: {
                      xs: "10px",
                      sm: "15px",
                    },

                    borderRadius: "10px",
                    display: {
                      xs: "none",
                      sm: "flex",
                    },
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: {
                        xs: "16px",
                        sm: "25px",
                      },
                      fontWeight: "bold",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    {t("DepositWithdrawPage.h2")}
                  </Typography>

                  {method === 1 && (
                    <Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.bank_name")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {configs.bank_name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.back_acc")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {configs.bank_acc_no}

                          <Tooltip title="Copy">
                            <IconButton
                              size="small"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  configs.bank_acc_no || ""
                                );
                                toast.success(t("DepositWithdrawPage.copy"));
                              }}
                              sx={{ color: "white" }}
                            >
                              <CopyAllOutlined
                                sx={{
                                  fontSize: {
                                    xs: "14px",
                                    sm: "24px",
                                  },
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.acc_name")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {configs.bank_acc_name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.amount")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {formatCurrency(bank * Number(amount))}{" "}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          color: "red",
                          fontSize: { xs: "10px", sm: "14px" },
                          marginTop: "10px",
                        }}
                      >
                        {t("DepositWithdrawPage.note")}:
                      </Typography>
                    </Box>
                  )}
                  {method === 2 && (
                    <Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: { xs: "10px", sm: "14px" },
                          marginTop: "10px",
                        }}
                      >
                        {t("DepositWithdrawPage.transfer")}:
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "40% 60%",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.wallet")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {address}
                          <Tooltip title="Copy">
                            <IconButton
                              size="small"
                              onClick={() => {
                                navigator.clipboard.writeText(address || "");
                                toast.success(t("DepositWithdrawPage.copy"));
                              }}
                              sx={{ color: "white" }}
                            >
                              <CopyAllOutlined
                                sx={{
                                  fontSize: {
                                    xs: "14px",
                                    sm: "24px",
                                  },
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.type_code")}:
                        </Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {coin === "1" ? (
                            <>
                              <img
                                loading="lazy"
                                width="30"
                                src="/images/4f8f27a4de61fca0faca95298f6714c81fcfc22929d68e1062e396c4026452f9_200.webp"
                                alt=""
                              />{" "}
                              PI Nework
                            </>
                          ) : (
                            <>
                              <img
                                loading="lazy"
                                width="30"
                                srcSet={`/images/usdt.png`}
                                src="/images/usdt.png"
                                alt=""
                              />{" "}
                              USDT
                            </>
                          )}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {t("DepositWithdrawPage.coins")}:
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: { xs: "10px", sm: "14px" },
                            marginTop: "10px",
                          }}
                        >
                          {amount}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: "red",
                          fontSize: {
                            xs: "10px",
                            sm: "14px",
                          },
                          marginTop: "10px",
                        }}
                      >
                        {t("DepositWithdrawPage.note")}
                      </Typography>
                    </Box>
                  )}
                  {method === 0 && (
                    <Box>
                      <img
                        src="/images/credit-card.png"
                        height={40}
                        style={{ margin: "30px 0" }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {user && user.wdstatus === 1 ? (
                <Box
                  sx={{ width: { xs: "100%", sm: "80%" }, margin: "0 auto" }}
                >
                  <Autocomplete
                    id="country-select-demo"
                    sx={{
                      padding: {
                        xs: "0px 0px",
                        sm: "20px 0px",
                      },
                    }}
                    options={wallet}
                    autoHighlight
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => {
                      setCoin(newValue?.id?.toString() || "2");
                      setbank(newValue?.bank || 0);
                      setAddress(newValue?.addresss || "");
                      setWithdrawMin(newValue?.withdraw_min || 0);
                      setWithdrawMax(newValue?.withdraw_max || 0);
                      setDepositMin(newValue?.deposit_min || 0);
                    }}
                    renderOption={(props, option) => {
                      const { ...optionProps } = props;
                      return (
                        <Box
                          key={option.id}
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...optionProps}
                        >
                          {option.name === "pi" ? (
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={`/images/4f8f27a4de61fca0faca95298f6714c81fcfc22929d68e1062e396c4026452f9_200.webp`}
                              src="/images/4f8f27a4de61fca0faca95298f6714c81fcfc22929d68e1062e396c4026452f9_200.webp"
                              alt=""
                            />
                          ) : (
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={`/images/usdt.png`}
                              src="/images/usdt.png"
                              alt=""
                            />
                          )}
                          {option.title}
                        </Box>
                      );
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label={t("DepositWithdrawPage.currency")}
                        variant="outlined"
                        InputLabelProps={{ style: { color: "white" } }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white",
                            },
                          },

                          "& .MuiInputLabel-root": {
                            color: "white",
                          },
                        }}
                        slotProps={{
                          htmlInput: {
                            ...params.inputProps,
                            autoComplete: "new-password",
                          },
                        }}
                      />
                    )}
                  />
                  {bank > 0 ? (
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ padding: "20px 0px" }}
                      options={medthod}
                      autoHighlight
                      getOptionLabel={(option) =>
                        t("DepositWithdrawPage." + option.name)
                      }
                      onChange={(event, newValue) => {
                        setMethod(newValue?.id || 2);
                      }}
                      renderOption={(props, option) => {
                        const { ...optionProps } = props;
                        return (
                          <Box
                            key={option.id}
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...optionProps}
                          >
                            {option.id === 1 ? (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/bank.png`}
                                src="/images/bank.png"
                                alt=""
                              />
                            ) : (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/wallet.png`}
                                src="/images/wallet.png"
                                alt=""
                              />
                            )}
                            {t("DepositWithdrawPage." + option.name)}
                          </Box>
                        );
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label={t("DepositWithdrawPage.method")}
                          variant="outlined"
                          InputLabelProps={{ style: { color: "white" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },

                            "& .MuiInputLabel-root": {
                              color: "white",
                            },
                          }}
                          slotProps={{
                            htmlInput: {
                              ...params.inputProps,
                              autoComplete: "new-password",
                            },
                          }}
                        />
                      )}
                    />
                  ) : (
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ padding: "20px 0px" }}
                      options={medthodWallet}
                      autoHighlight
                      getOptionLabel={(option) =>
                        t("DepositWithdrawPage." + option.name)
                      }
                      onChange={(event, newValue) => {
                        setMethod(newValue?.id || 2);
                      }}
                      renderOption={(props, option) => {
                        const { ...optionProps } = props;
                        return (
                          <Box
                            key={option.id}
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...optionProps}
                          >
                            {option.id === 1 ? (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/bank.png`}
                                src="/images/bank.png"
                                alt=""
                              />
                            ) : (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/wallet.png`}
                                src="/images/wallet.png"
                                alt=""
                              />
                            )}
                            {t("DepositWithdrawPage." + option.name)}
                          </Box>
                        );
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label={t("DepositWithdrawPage.method")}
                          variant="outlined"
                          InputLabelProps={{ style: { color: "white" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },

                            "& .MuiInputLabel-root": {
                              color: "white",
                            },
                          }}
                          slotProps={{
                            htmlInput: {
                              ...params.inputProps,
                              autoComplete: "new-password",
                            },
                          }}
                        />
                      )}
                    />
                  )}
                  {method && method === 1 && user.bank_acc_no ? (
                    <TextField
                      id="outlined-basic"
                      label={t("DepositWithdrawPage.back_acc")}
                      variant="outlined"
                      value={user.bank_acc_no}
                      disabled={true}
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                        marginBottom: "20px",
                        "& .MuiInputBase-input.Mui-disabled": {
                          color: "gray",
                          WebkitTextFillColor: "gray",
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-disabled": {
                          color: "gray",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-disabled fieldset": {
                            borderColor: "gray",
                          },
                        },
                      }}
                    />
                  ) : (
                    ""
                  )}
                  {method && method === 2 && user.wallet ? (
                    <TextField
                      id="outlined-basic"
                      label={t("ProfilePage.change_label7")}
                      variant="outlined"
                      value={user.wallet}
                      disabled={true} // hoặc condition
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                        marginBottom: "20px",
                        "& .MuiInputBase-input.Mui-disabled": {
                          color: "gray",
                          WebkitTextFillColor: "gray",
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-disabled": {
                          color: "gray",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-disabled fieldset": {
                            borderColor: "gray",
                          },
                        },
                      }}
                    />
                  ) : (
                    ""
                  )}
                  <TextField
                    id="outlined-basic"
                    label={t("DepositWithdrawPage.amount_name")}
                    variant="outlined"
                    onChange={(e) => setAmount(e.target.value)}
                    helperText={
                      withdrawMin != 0 ? t("Toast.Desposit9") + withdrawMin : ""
                    }
                    FormHelperTextProps={{
                      sx: { color: "#fff" }, // HelperText màu trắng
                    }}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      marginBottom: "20px",
                      "& .MuiInputBase-input.Mui-disabled": {
                        color: "white",
                        WebkitTextFillColor: "white", // fix Chrome override
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-disabled": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-disabled fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    label={t("DepositWithdrawPage.Password")}
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                      marginBottom: "20px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: "white" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    {method === 1 || method === 2 ? (
                      (method === 1 && user.bank_acc_no) ||
                      (method === 2 && user.wallet) ? (
                        <Button
                          type="button"
                          sx={{
                            background: "#fff",
                            color: "black",
                            width: "80%",
                            height: "45px",
                            borderRadius: "15px",
                            fontSize: { xs: "10px", sm: "14px" },
                            fontWeight: "bold",
                            "&:hover": {
                              background: "#fff",
                            },
                          }}
                          onClick={handleSubmitSell}
                        >
                          {t("DepositWithdrawPage.tab2")}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          href={method === 1 ? "/addbank" : "/addwallet"}
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
                          {method === 1
                            ? t("DepositWithdrawPage.bank_link")
                            : t("DepositWithdrawPage.wallet_link")}
                        </Button>
                      )
                    ) : (
                      <Button
                        type="button"
                        disabled
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
                          "&:disabled": {
                            background: "gray",
                            color: "black",
                          },
                        }}
                      >
                        {t("DepositWithdrawPage.tab2")}
                      </Button>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{ width: "100%", margin: "auto", textAlign: "center" }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "30px",
                      textAlign: "center",
                    }}
                  >
                    {t("DepositWithdrawPage.log_is")}
                  </Typography>

                  <Button
                    type="button"
                    href="/securitypayment"
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
                    {t("DepositWithdrawPage.add_pass")}
                  </Button>
                </Box>
              )}
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
