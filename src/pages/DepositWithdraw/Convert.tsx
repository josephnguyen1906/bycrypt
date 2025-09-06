import { useDebounce } from "@/hook/useDebounce";
import { ConvertUSDT, getMyWallet, topUpCoins } from "@/services/User.service";
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

export default function Convert() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [wallet, setWallet] = useState<any>();

  useEffect(() => {
    const referral = async () => {
      const res: any = await getMyWallet();
      if (res.status === true) {
        const data = res.data.find((item: any) => item.name === "usdt");

        setWallet(data);
      }
    };
    referral();
  }, []);

  const submit = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error(t("Toast.convert1"));
      return;
    }
    const formData = new FormData();
    formData.append("amount", String(amount));
    ConvertUSDT(formData)
      .then((res: any) => {
        if (res.status === true) {
          toast.success(t("Toast.convert2"));
          setAmount(0);
          setDisplayValue("");
          setPrice("");
        } else {
          toast.error(res.message);
        }
      })
      .catch((err: any) => {
        toast.error(err?.message || t("Toast.convert3"));
      });
  };
  const formatNumber = (value: number) => {
    return value.toLocaleString("vi-VN");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[,.]/g, "");

    const num = parseFloat(rawValue);

    if (!isNaN(num)) {
      const price = num / Number(wallet?.bank || 0);
      setAmount(num); // state lưu số
      setDisplayValue(formatNumber(num));
      setPrice(formatNumber(price));
    } else {
      setAmount(null);
      setPrice("");
      setDisplayValue("");
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
        width: {
          xs: "100%",
          sm: "70%",
        },
        margin: "0 auto",
      }}
    >
      <TextField
        id="outlined-basic"
        label={t("DepositWithdrawPage.convert_name")}
        value={price}
        sx={{
          width: "100%",
          "& .MuiInputLabel-root": {
            color: "white", // màu chữ label
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white", // màu khi focus
          },
          "& .MuiOutlinedInput-root": {
            color: "white",
            mb: "20px",
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
            padding: "0 14px",
            display: "flex",
            alignItems: "center",
            height: "90%",
            boxSizing: "border-box",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
            fontSize: "16px",
            opacity: 1,
          },
        }}
      />

      <TextField
        id="outlined-basic"
        label={t("DepositWithdrawPage.amount_name")}
        value={displayValue}
        onChange={handleChange}
        sx={{
          width: "100%",
          "& .MuiInputLabel-root": {
            color: "white", // màu chữ label
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white", // màu khi focus
          },
          "& .MuiOutlinedInput-root": {
            color: "white",
            mb: "20px",
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
            padding: "0 14px",
            display: "flex",
            alignItems: "center",
            height: "90%",
            boxSizing: "border-box",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
            fontSize: "16px",
            opacity: 1,
          },
        }}
      />
      <Button
        type="button"
        sx={{
          width: "100%",
          height: "40px",
          background: "#fcd534",
          color: "black",
          borderRadius: "10px",
          fontSize: "14px",
          mt: "15px",
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: "#fcd534",
          },
        }}
        onClick={submit}
      >
        {t("DepositWithdrawPage.convert")}
      </Button>
    </Box>
  );
}
