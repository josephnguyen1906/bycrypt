import useAuth from "@/hook/useAuth";
import {
  createOrder,
  getBuySellConfig,
  getOrderResult,
  getProgressContract,
} from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
import { formatCurrency } from "@/utils/formatMoney";
import { CloseOutlined } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CircleCountdown } from "../CountdownCircle/CountdownCircle";
import { useTranslation } from "react-i18next";
interface TabProps {
  user: IUser | null;
  value: string;
  dataProcess: any;
  onSuccess?: (orderData: any) => void;
}

export default function SellComponent(progs: TabProps) {
  const { t } = useTranslation();
  const [valueAmount, setValueAmount] = useState<any>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState<string>("");
  const router = useRouter();
  const [buySellConfig, setBuySellConfig] = useState<any>([
    500000, 1000000, 5000000, 10000000, 50000000,
  ]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const submit = () => {
    window.localStorage.setItem("amountSell", String(amount));
    router.push("/withdraw");
  };
  const formatNumber = (value: number) => {
    return value.toLocaleString("vi-VN");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/./g, ""); // bỏ dấu phẩy
    const num = parseFloat(rawValue);

    if (!isNaN(num)) {
      setAmount(num); // state lưu số
      setDisplayValue(formatNumber(num)); // state hiển thị chuỗi có dấu phẩy
    } else {
      setAmount(null);
      setDisplayValue("");
    }
  };
  return (
    <div>
      {progs.user ? (
        <Box
          sx={{
            width: "90%",
            height: "100%",
            overflowY: "auto",
            margin: "0 auto",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "14px", sm: "14px" },
              marginTop: "10px",
            }}
          >
            {t("BuySellPage.amount")}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "5px",
              overflowX: "auto",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
            }}
          >
            {buySellConfig &&
              buySellConfig.map((item: string, index: number) => (
                <Button
                  key={index}
                  type="button"
                  ref={(el) => (buttonRefs.current[index] = el)}
                  sx={{
                    background: valueAmount === index ? "#fff" : "#909090",
                    color: "black",
                    minWidth: "80px",
                    height: "30px",
                    borderRadius: "15px",
                    fontWeight: 600,
                    fontSize: { xs: "12px", sm: "16px" },
                    "&:hover": {
                      background: valueAmount === index ? "#fff" : "#909090",
                    },
                  }}
                  onClick={() => {
                    setValueAmount(index);
                    setAmount(Number(item));
                    setDisplayValue(formatNumber(Number(item)));
                  }}
                >
                  {Number(item).toLocaleString()}
                </Button>
              ))}
          </Box>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "14px", sm: "14px" },
              padding: "10px 0",
            }}
          >
            {t("BuySellPage.cust_amount")}
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={displayValue}
            onChange={handleChange}
            placeholder={t("BuySellPage.cust_amount")}
            sx={{
              width: "100%",
              background: "#5e5e5e",
              borderRadius: "10px",
              outline: "none",
              "& .MuiInputBase-input": {
                color: "white",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                height: "100%",
                boxSizing: "border-box",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                height: {
                  xs: "52px",
                  sm: "45px",
                },

                fontSize: { xs: "16px", sm: "14px" },
                "& fieldset": {
                  color: "white",
                  outline: "none",
                },
                "&:hover fieldset": {
                  // borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  // borderColor: "white",
                  border: "none",
                },
              },

              "& .MuiInputBase-input::placeholder": {
                color: "white",
                fontSize: { xs: "12px", sm: "14px" },
                opacity: 1, // để không bị mờ
              },
            }}
          />

          <Button
            type="button"
            onClick={() => submit()}
            sx={{
              background: "#fff",
              color: "black",
              width: "100%",
              height: "40px",
              mt: "10px",
              borderRadius: "15px",
              fontSize: { xs: "14px", sm: "14px" },
              textTransform: "capitalize",
              fontWeight: "bold",
              "&:hover": {
                background: "#fff",
              },
              "&:disabled": {
                background: "gray",
                color: "white",
              },
            }}
          >
            {t("BuySellPage.sell")}
          </Button>
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
              sx={{
                color: "white",
                fontSize: { xs: "16px", sm: "24px" },
                fontWeight: 600,
              }}
            >
              {t("BuySellPage.title")}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "14px", sm: "20px" },
                fontWeight: 600,
              }}
            >
              {t("BuySellPage.decription")}
            </Typography>
            <Button
              type="button"
              href="/login"
              sx={{
                background: "#fff",
                color: "black",
                width: "150px",
                height: "35px",
                borderRadius: "15px",
                marginTop: "20px",
                fontSize: { xs: "14px", sm: "20px" },
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
    </div>
  );
}
