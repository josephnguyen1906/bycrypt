import { topUpCoins } from "@/services/User.service";
import { formatCurrency } from "@/utils/formatMoney";
import { CopyAllOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export interface props {
  configs: any | null;
  wallet: CountryType[];
}

const medthod = [
  {
    id: 1,
    name: "method1",
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
export default function Deposit({ configs, wallet }: props) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [coin, setCoin] = useState<string>();
  const [bank, setbank] = useState(0);
  const [method, setMethod] = useState(0);
  const [depositMin, setDepositMin] = useState(0);
  const [withdrawMin, setWithdrawMin] = useState(0);
  const [withdrawMax, setWithdrawMax] = useState(0);
  const frontFileInput = useRef<HTMLInputElement>(null);
  const [frontImage, setFrontImage] = useState<File>();
  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
    }
  };
  useEffect(() => {
    const storedAmount = window.localStorage.getItem("amountBuy");
    if (storedAmount) {
      setAmount(storedAmount);
    }
  }, []);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const sanitizedValue = inputValue.replace(/,/g, "");

    const newAmount = Number(sanitizedValue);

    if (!isNaN(newAmount)) {
      setAmount(String(newAmount));
    }
  };
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
      window.localStorage.removeItem("amountBuy");
      toast.success(t("Toast.Desposit3"));
    } catch (error: any) {
      toast.error(t("Toast.Desposit4"));
    }
  };
  return (
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
                      navigator.clipboard.writeText(configs.bank_acc_no || "");
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
                {formatCurrency(Number(amount))}{" "}
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
                {t("DepositWithdrawPage.wallet")} (TRC20):
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
                    Việt Nam Đồng
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

        <Autocomplete
          id="country-select-demo"
          sx={{ padding: "20px 0px" }}
          options={medthod}
          autoHighlight
          getOptionLabel={(option) => t("DepositWithdrawPage." + option.name)}
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

        <TextField
          id="outlined-basic"
          placeholder={t("DepositWithdrawPage.amount_name")}
          variant="outlined"
          value={Number(amount).toLocaleString()}
          onChange={handleAmountChange}
          helperText={depositMin != 0 ? t("Toast.Desposit11") + depositMin : ""}
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
                      navigator.clipboard.writeText(configs.bank_acc_no || "");
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
                {t("DepositWithdrawPage.wallet")} (TRC20):
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
  );
}
