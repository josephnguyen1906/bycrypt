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
  refetchUser: () => Promise<void>;
}

const walletType = [
  {
    id: "TRC20",
    name: "TRC20",
  },
  {
    id: "BEP20",
    name: "BEP20",
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
  const [address, setAddress] = useState("");
  const [depositMin, setDepositMin] = useState(0);
  const [coin, setCoin] = useState<string | null>(null);
  const [bank, setbank] = useState(0);
  const [withdrawFee, setWithdrawFee] = useState(0);
  const [method, setMethod] = useState(0);
  const [withdrawMin, setWithdrawMin] = useState(0);
  const [withdrawMax, setWithdrawMax] = useState(0);
  const [walletNetwork, setWalletNetwork] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
              setWithdrawFee(newValue?.withdraw_fee || 0);
              setbank(newValue?.bank || 0);
              setAddress(newValue?.addresss || "");
              setWithdrawMin(newValue?.withdraw_min || 0);
              setWithdrawMax(newValue?.withdraw_max || 0);
              setDepositMin(newValue?.deposit_min || 0);
              if (amount && amount > 0) {
                const fee = amount * Number(newValue?.withdraw_fee || 0); // withdrawFee = 0.05 => 5%
                const receive = amount - fee;
                setAmountReceive(formatNumber(receive));
              }
              if (newValue?.id == 1) {
                setMethod(1);
              } else {
                setMethod(2);
              }
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
                  {option.name === "vnd" ? (
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
          {method && method === 2 ? (
            <Autocomplete
              id="country-select-demo"
              sx={{ mt: "20px" }}
              options={walletType}
              autoHighlight
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setWalletNetwork(newValue?.name || "TRC20");
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
                    {t("ProfilePage.lan") + " " + option.name}
                  </Box>
                );
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label={t("ProfilePage.change_label9")}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "white" },
                  }}
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
            ""
          )}
          {method && method === 2 && walletNetwork == "TRC20" ? (
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
          ) : (
            ""
          )}

          {method && method === 2 && walletNetwork == "BEP20" ? (
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
          ) : (
            ""
          )}
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
          {(user.bank_qr == "" || user.bank_qr == null) && (
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
            (user?.[walletNetwork].wallet_qr == "" ||
              user?.[walletNetwork].wallet_qr == null) && (
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
