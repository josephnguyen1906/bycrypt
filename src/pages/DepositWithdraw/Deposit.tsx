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
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export interface props {
  configs: any | null;
  wallet: CountryType;
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
  const [amount, setAmount] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [coin, setCoin] = useState<string>("1");
  const [bank, setbank] = useState<boolean>(false);
  const [method, setMethod] = useState(1);
  const [depositMin, setDepositMin] = useState(0);
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
      setAmount(Number(storedAmount));
      setDisplayValue(formatNumber(Number(storedAmount)));
    }
  }, []);
  const formatNumber = (value: number) => {
    return value.toLocaleString("vi-VN");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[,.]/g, "");

    const num = parseFloat(rawValue);

    if (!isNaN(num)) {
      setAmount(num); // state lưu số
      setDisplayValue(formatNumber(num)); // state hiển thị chuỗi có dấu phẩy
    } else {
      setAmount(null);
      setDisplayValue("");
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
      formData.append("amount", String(amount));
      formData.append("payimg", frontImage);
      formData.append("method", method.toString());

      await topUpCoins(formData);
      setAmount(0);
      setDisplayValue("");
      setbank(false);
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
        mt: "-25px",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "45%" } }}>
        {bank == false && (
          <>
            <TextField
              id="outlined-basic"
              placeholder={t("DepositWithdrawPage.amount_name")}
              variant="outlined"
              value={displayValue}
              onChange={handleChange}
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
                  color: "white",
                  background: "transparent",
                  // Fix autofill background
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px black inset", // chỉnh màu nền
                    WebkitTextFillColor: "white",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
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
                onClick={() => {
                  setbank(true);
                  window.localStorage.removeItem("amountBuy");
                }}
              >
                {t("DepositWithdrawPage.tab1")}
              </Button>
            </Box>
          </>
        )}
        {bank == true && (
          <>
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
                mt: "20px",
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
              {amount && amount > 0 && (
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
                  <Box
                    sx={{
                      width: "100%",
                      margin: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={configs.bankqr}
                      height={100}
                      width={50}
                      alt="bank-qr"
                      style={{
                        width: "80%",
                        height: "280px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
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
                {t("DepositWithdrawPage.tab4")}
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Box
        sx={{
          width: { xs: "50%", sm: "53%" },
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

        {bank && amount && amount > 0 && (
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
            <Box
              sx={{
                width: "100%",
                margin: "auto",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Image
                src={configs.bankqr}
                height={100}
                width={50}
                alt="bank-qr"
                style={{ width: "80%", height: "280px", objectFit: "contain" }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
