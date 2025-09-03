import { sellCoins, topUpCoins } from "@/services/User.service";
import { formatCurrency } from "@/utils/formatMoney";
import {
  CopyAllOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export interface props {
  user: any | null;
  wallet: CountryType[];
}

const medthod = [
  {
    id: 1,
    name: "method1",
  },
];
const medthodWallet = [
  {
    id: 2,
    name: "method2",
  },
];

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
export default function Withdraw({ wallet, user }: props) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const [depositMin, setDepositMin] = useState(0);
  const [coin, setCoin] = useState<string | null>(null);
  const [bank, setbank] = useState(0);
  const [method, setMethod] = useState(0);
  const [withdrawMin, setWithdrawMin] = useState(0);
  const [withdrawMax, setWithdrawMax] = useState(0);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const sanitizedValue = inputValue.replace(/,/g, "");

    const newAmount = Number(sanitizedValue);

    if (!isNaN(newAmount)) {
      setAmount(String(newAmount));
    }
  };

  useEffect(() => {
    const storedAmount = window.localStorage.getItem("amountSell");
    if (storedAmount) {
      setAmount(storedAmount);
    }
  }, []);
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
    if (coin == "2" && Number(user?.balance.usdt) < Number(amount)) {
      toast.warning(t("Toast.Desposit8"));
      return;
    }
    if (coin == "1" && Number(user?.balance.pi) < Number(amount)) {
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
        setAmount("");
        setPassword("");
        setCoin(null);
        setMethod(0);
        window.localStorage.removeItem("amountSell");
      } catch (error: any) {
        toast.error(error.message || t("Toast.Desposit7"));
      }
  };
  return (
    <>
      {user && user.wdstatus === 1 ? (
        <Box sx={{ width: { xs: "100%", sm: "80%" }, margin: "0 auto" }}>
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
              console.log("newValue", newValue);
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
          {coin == "1" ? (
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
            value={Number(amount).toLocaleString()}
            onChange={handleAmountChange}
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
        <Box sx={{ width: "100%", margin: "auto", textAlign: "center" }}>
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
    </>
  );
}
