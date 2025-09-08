import {
  getMyWallet,
  sellCoins,
  topUpCoins,
  updateBank,
} from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
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
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
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
  refetchUser: () => Promise<void>;
}

const wallets = [
  {
    id: "TRC20",
    name: "TRC20",
  },
  {
    id: "BEP20",
    name: "BEP20",
  },
];

const walletTypes = [
  {
    id: "TRUST",
    name: "TRUST",
  },
  {
    id: "NORMAL",
    name: "NORMAL",
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
  withdraw_fee: number;
  suggested?: boolean;
}
export default function Withdraw({ wallet, user, refetchUser }: props) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [amountReceive, setAmountReceive] = useState<string>("");
  const [coin, setCoin] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);
  const [bank, setbank] = useState(0);
  const [withdrawFee, setWithdrawFee] = useState(0);
  const [method, setMethod] = useState(0);
  const [withdrawMin, setWithdrawMin] = useState(0);
  const [withdrawMax, setWithdrawMax] = useState(0);
  const [walletNetwork, setWalletNetwork] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [password, setPassword] = useState("");
  const frontFileInput = useRef<HTMLInputElement>(null);
  const [frontImage, setFrontImage] = useState<File>();
  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
    }
  };
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const formatNumber = (value: number) => {
    return value.toLocaleString("vi-VN");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[,.]/g, "");

    const num = parseFloat(rawValue);

    if (!isNaN(num)) {
      const fee = num * withdrawFee; // withdrawFee = 0.05 => 5%
      const receive = num - fee;
      setAmount(num); // state lưu số
      setDisplayValue(formatNumber(num));
      setAmountReceive(formatNumber(receive));
    } else {
      setAmount(null);
      setDisplayValue("");
    }
  };

  useEffect(() => {
    const storedAmount = window.localStorage.getItem("amountSell");
    if (storedAmount) {
      setAmount(Number(storedAmount));
      setDisplayValue(formatNumber(Number(storedAmount)));
    }
  }, []);
  const handleSubmitSell = async () => {
    if (!amount || !method || !coin || !password) {
      toast.warning(t("Toast.Desposit5"));
      return;
    }

    if (coin == "2" && Number(user?.balance.usdt) < Number(amount)) {
      toast.warning(t("Toast.Desposit8"));
      return;
    }
    if (coin == "1" && Number(user?.balance.vnd) < Number(amount)) {
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
        formData.append("amount", String(amount));
        formData.append("method", method.toString());
        formData.append("paypassword", password);
        if (walletNetwork) formData.append("wallet", walletNetwork);
        if (method == 2 && walletType)
          formData.append("wallet_type", walletType);
        if (frontImage && method == 2) {
          const formDatas = new FormData();
          if (walletNetwork) formDatas.append("wallet_type", walletNetwork);
          if (frontImage) formDatas.append("wallet_qr", frontImage);
          await updateBank(formDatas)
            .then((response: any) => {
              if (response.status === true) {
                toast.success(t("Toast.change_pass10"));
              } else {
                toast.error(t("Toast.change_pass11"));
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        }
        if (frontImage && method == 1) {
          const formDatas = new FormData();
          if (frontImage) formDatas.append("bank_qr", frontImage);
          await updateBank(formDatas)
            .then((response: any) => {
              if (response.status === true) {
                toast.success(t("Toast.change_pass10"));
              } else {
                toast.error(t("Toast.change_pass11"));
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        }
        await sellCoins(formData);
        toast.success(t("Toast.Desposit6"));

        await refetchUser();
        setAmount(null);
        setDisplayValue("");
        setPassword("");
        setCoin(null);
        setMethod(0);
        setSelectedWallet(null);
        setAmountReceive("");
        window.localStorage.removeItem("amountSell");
      } catch (error: any) {
        toast.error(error.message || t("Toast.Desposit7"));
      }
  };
  return (
    <>
      {user && user.wdstatus === 1 ? (
        <Box sx={{ width: { xs: "100%", sm: "80%" }, margin: "0 auto" }}>
          <FormControl fullWidth variant="standard" sx={{ color: "white" }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{
                width: "120px",
                height: "30px",
                color: "white",
                mt: "10px",
                ml: "10px",
                background: "#000",
                zIndex: "1",
                "&.Mui-focused": {
                  color: "white",
                },
              }}
            >
              {t("DepositWithdrawPage.currency")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
              sx={{
                color: "white",
                width: "100%",
                height: "50px",
                borderRadius: "5px",
                border: "1px solid white",
                background: "#000",
                // Bỏ border-bottom xanh khi focus
                "&.MuiInputBase-root": {
                  "&:before, &:after": {
                    borderBottom: "none !important",
                  },
                },

                "& .MuiSvgIcon-root": {
                  color: "white",
                },
                "& .MuiSelect-select": {
                  color: "white",
                },
              }}
            >
              {wallet &&
                wallet.map((coin: any, index: number) => (
                  <MenuItem
                    key={index}
                    value={coin.title}
                    sx={{ color: "black" }}
                    onClick={() => {
                      setSelectedWallet(coin.name);
                      setCoin(coin?.id?.toString() || "2");
                      setWithdrawFee(coin?.withdraw_fee || 0);
                      setWithdrawMin(coin?.withdraw_min || 0);
                      setWithdrawMax(coin?.withdraw_max || 0);
                      if (amount && amount > 0) {
                        const fee = amount * Number(coin?.withdraw_fee || 0);
                        const receive = amount - fee;
                        setAmountReceive(formatNumber(receive));
                      }
                      if (coin?.id == 1) {
                        setMethod(1);
                      } else {
                        setMethod(2);
                      }
                    }}
                  >
                    <Box
                      key={coin.id}
                      component="li"
                      sx={{
                        "& > img": { mr: 2, flexShrink: 0 },
                        display: "flex",
                        alignItems: "center",
                        pl: "10px",
                      }}
                    >
                      {coin.name === "vnd" ? (
                        <img
                          loading="lazy"
                          width="20"
                          srcSet={`/images/vietnam.png`}
                          src="/images/vietnam.png"
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
                      {coin.title}
                    </Box>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {method && method === 1 && user.bank_acc_no ? (
            <TextField
              id="outlined-basic"
              label={t("DepositWithdrawPage.back_acc")}
              variant="outlined"
              value={user.bank_acc_no}
              disabled={true}
              sx={{
                width: "100%",
                mt: "20px",
                "& .MuiInputBase-input": {
                  color: "white",
                },
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

          {/* Check show chọn mạng */}
          {method && method === 2 ? (
            <FormControl fullWidth variant="standard" sx={{ color: "white" }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{
                  width: "120px",
                  height: "30px",
                  color: "white",
                  mt: "10px",
                  ml: "10px",
                  background: "#000",
                  zIndex: "1",
                  "&.Mui-focused": {
                    color: "white",
                  },
                }}
              >
                {t("ProfilePage.change_label9")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={walletNetwork} // Lưu id
                onChange={(e) => setWalletNetwork(e.target.value)} // Cập nhật id
                sx={{
                  color: "white",
                  width: "100%",
                  height: "50px",
                  borderRadius: "5px",
                  border: "1px solid white",
                  background: "#000",
                  "&.MuiInputBase-root": {
                    "&:before, &:after": {
                      borderBottom: "none !important",
                    },
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  "& .MuiSelect-select": {
                    color: "white",
                  },
                }}
              >
                {wallets &&
                  wallets.map((item: any) => (
                    <MenuItem
                      key={item.id}
                      value={item.id} // <-- FIX: đồng bộ value với id
                      sx={{ color: "black" }}
                    >
                      <Box
                        key={item.id}
                        component="li"
                        sx={{
                          "& > img": { mr: 2, flexShrink: 0 },
                          display: "flex",
                          alignItems: "center",
                          pl: "10px",
                        }}
                      >
                        {t("ProfilePage.lan") + " " + item.name}
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          ) : (
            ""
          )}
          {method && method === 2 && walletNetwork && (
            <FormControl fullWidth variant="standard" sx={{ color: "white" }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{
                  width: "100px",
                  height: "30px",
                  color: "white",
                  mt: "10px",
                  ml: "10px",
                  background: "#000",
                  zIndex: "1",
                  "&.Mui-focused": {
                    color: "white",
                  },
                }}
              >
                {t("ProfilePage.type_wallet")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={walletType} // Lưu id
                onChange={(e) => setWalletType(e.target.value)} // Cập nhật id
                sx={{
                  color: "white",
                  width: "100%",
                  height: "50px",
                  borderRadius: "5px",
                  border: "1px solid white",
                  background: "#000",
                  "&.MuiInputBase-root": {
                    "&:before, &:after": {
                      borderBottom: "none !important",
                    },
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  "& .MuiSelect-select": {
                    color: "white",
                  },
                }}
              >
                {walletTypes &&
                  walletTypes.map((item: any) => (
                    <MenuItem
                      key={item.id}
                      value={item.id} // <-- FIX: đồng bộ value với id
                      sx={{ color: "black" }}
                    >
                      <Box
                        key={item.id}
                        component="li"
                        sx={{
                          "& > img": { mr: 2, flexShrink: 0 },
                          display: "flex",
                          alignItems: "center",
                          pl: "10px",
                        }}
                      >
                        {t("ProfilePage." + item.name)}
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
          {/*  show địa chỉ Ví */}
          {method &&
          method === 2 &&
          walletNetwork == "TRC20" &&
          user?.[walletNetwork]?.wallet ? (
            <>
              <TextField
                id="outlined-basic"
                label={t("ProfilePage.change_label7")}
                variant="outlined"
                value={user?.TRC20?.wallet || ""}
                disabled={true} // hoặc condition
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                sx={{
                  width: "100%",
                  mt: "20px",
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
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
              <Typography sx={{ fontSize: "10px", color: "white", p: "5px" }}>
                {t("DepositWithdrawPage.note_wallet")}
              </Typography>
            </>
          ) : (
            ""
          )}

          {method &&
          method === 2 &&
          walletNetwork == "BEP20" &&
          user?.[walletNetwork]?.wallet ? (
            <>
              <TextField
                id="outlined-basic"
                label={t("ProfilePage.change_label7")}
                variant="outlined"
                value={user?.BEP20?.wallet || ""}
                disabled={true} // hoặc condition
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                sx={{
                  width: "100%",
                  mt: "20px",
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
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
              <Typography sx={{ fontSize: "10px", color: "white", p: "5px" }}>
                {t("DepositWithdrawPage.note_wallet")}
              </Typography>
            </>
          ) : (
            ""
          )}

          {/* Check show các field rút tiền */}
          {walletNetwork && user?.[walletNetwork]?.wallet && (
            <>
              <TextField
                id="outlined-basic"
                label={t("DepositWithdrawPage.amount_name")}
                variant="outlined"
                value={displayValue}
                onChange={handleChange}
                helperText={
                  withdrawMin != 0 ? t("Toast.Desposit9") + withdrawMin : ""
                }
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  width: "100%",
                  mt: "20px",
                  "& .MuiInputBase-input": {
                    color: "white",
                    background: "transparent",
                    // Fix autofill background
                    "&:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px black inset", // chỉnh màu nền
                      WebkitTextFillColor: "white",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
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
                label={t("DepositWithdrawPage.amount_receive")}
                variant="outlined"
                value={amountReceive}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    color: "white",
                    background: "transparent",
                    // Fix autofill background
                    "&:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px black inset", // chỉnh màu nền
                      WebkitTextFillColor: "white",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
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
                    background: "transparent",
                    // Fix autofill background
                    "&:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px black inset", // chỉnh màu nền
                      WebkitTextFillColor: "white",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
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
            </>
          )}

          {method === 1 &&
            !walletNetwork &&
            user.bank_acc_no &&
            user.bank_acc_no !== "" && (
              <>
                <TextField
                  id="outlined-basic"
                  label={t("DepositWithdrawPage.amount_name")}
                  variant="outlined"
                  value={displayValue}
                  onChange={handleChange}
                  helperText={
                    withdrawMin != 0 ? t("Toast.Desposit9") + withdrawMin : ""
                  }
                  FormHelperTextProps={{
                    sx: { color: "#fff" }, // HelperText màu trắng
                  }}
                  sx={{
                    width: "100%",
                    mt: "20px",
                    "& .MuiInputBase-input": {
                      color: "white",
                      background: "transparent",
                      // Fix autofill background
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 1000px black inset", // chỉnh màu nền
                        WebkitTextFillColor: "white",
                        transition: "background-color 5000s ease-in-out 0s",
                      },
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
                  label={t("DepositWithdrawPage.amount_receive")}
                  variant="outlined"
                  value={amountReceive}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      color: "white",
                      background: "transparent",
                      // Fix autofill background
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 1000px black inset", // chỉnh màu nền
                        WebkitTextFillColor: "white",
                        transition: "background-color 5000s ease-in-out 0s",
                      },
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
                      background: "transparent",
                      // Fix autofill background
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 1000px black inset", // chỉnh màu nền
                        WebkitTextFillColor: "white",
                        transition: "background-color 5000s ease-in-out 0s",
                      },
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
              </>
            )}

          {/* Check show Upload Hình */}
          {method === 1 &&
            !walletNetwork &&
            user.bank_acc_no &&
            (user.bank_qr == "" || user.bank_qr == null) && (
              <Box>
                {" "}
                <Typography
                  sx={{
                    color: "white",
                    marginTop: "10px",
                    marginBottom: "10px",
                    textAlign: "left",
                  }}
                >
                  {t("ProfilePage.change_label10")}
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="file"
                  ref={frontFileInput}
                  onChange={handleFrontChange}
                  InputProps={{
                    sx: {
                      color: "#fff", // Chữ nhập vào màu trắng
                      "& .MuiInputBase-input::placeholder": {
                        color: "#fff", // Placeholder màu trắng
                        opacity: 1,
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: { color: "#fff" }, // HelperText màu trắng
                  }}
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
              </Box>
            )}

          {walletNetwork &&
            user?.[walletNetwork]?.wallet &&
            (user?.[walletNetwork]?.wallet_qr == "" ||
              user?.[walletNetwork]?.wallet_qr == null) && (
              <Box>
                {" "}
                <Typography
                  sx={{
                    color: "white",
                    marginTop: "10px",
                    marginBottom: "10px",
                    textAlign: "left",
                  }}
                >
                  {t("ProfilePage.change_label10")}
                </Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="file"
                  ref={frontFileInput}
                  onChange={handleFrontChange}
                  InputProps={{
                    sx: {
                      color: "#fff", // Chữ nhập vào màu trắng
                      "& .MuiInputBase-input::placeholder": {
                        color: "#fff", // Placeholder màu trắng
                        opacity: 1,
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: { color: "#fff" }, // HelperText màu trắng
                  }}
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
              </Box>
            )}
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {method === 1 || method === 2 ? (
              (method === 1 && user.bank_acc_no) ||
              (method === 2 &&
                walletNetwork &&
                user?.[walletNetwork] &&
                user?.[walletNetwork].wallet) ? (
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
