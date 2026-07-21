"use client";

import { ConvertUSDT, getMyWallet } from "@/services/User.service";
import {
  ArrowBackIosNew,
  AccessTimeOutlined,
  KeyboardArrowDown,
  SwapVert,
} from "@mui/icons-material";
import { Box, Button, IconButton, InputBase, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function ConvertPage() {
  const { t } = useTranslation();

  const [amount, setAmount] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState("");
  const [price, setPrice] = useState("");
  const [wallet, setWallet] = useState<any>();
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const rate = Number(wallet?.bank || 0);
  const [fromCoin, setFromCoin] = useState("USDT");
  const [toCoin, setToCoin] = useState("SOL");

  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getMyWallet();

        if (res.status === true) {
          const data = res.data.find(
            (item: any) => item.name?.toLowerCase() === "usdt",
          );

          setWallet(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    referral();
  }, []);

  const formatNumber = (value: number) => {
    return value.toLocaleString("vi-VN");
  };

  const handleSwap = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
  };
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Chỉ cho nhập số và dấu .
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setFromAmount(value);

    const num = Number(value);

    if (!value || isNaN(num) || rate <= 0) {
      setToAmount("");
      return;
    }

    const result = num / rate;

    setToAmount(result.toFixed(5));
  };
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
          setAmount(null);
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

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "448px",
        },
        minHeight: "100vh",
        mx: "auto",
        bgcolor: "#0E0F18",
        color: "#fff",
        pb: 10,
      }}
    >
      <Box
        sx={{
          height: 55,
          px: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Back */}

        <IconButton
          onClick={() => window.history.back()}
          sx={{
            color: "#fff",
            p: 0.5,
          }}
        >
          <ArrowBackIosNew
            sx={{
              fontSize: 18,
            }}
          />
        </IconButton>

        {/* Title */}

        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {t("AccountPage.menuTab4")}
          <Typography
            component="span"
            sx={{
              color: "#00C896",
              fontSize: 12,
              ml: 0.5,
            }}
          >
            0 {t("DepositWithdrawPage.label15")}
          </Typography>
        </Typography>

        {/* History */}

        <IconButton
          sx={{
            color: "#fff",
            p: 0.5,
          }}
        >
          <AccessTimeOutlined
            sx={{
              fontSize: 22,
            }}
          />
        </IconButton>
      </Box>

      <Box
        sx={{
          px: 1.5,
          pt: 5,
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            mb: 1.5,
          }}
        >
          {t("DepositWithdrawPage.label16")}
        </Typography>

        <Box
          sx={{
            height: 42,
            bgcolor: "#1A1B24",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            px: 1,
            gap: 1,
          }}
        >
          {/* Coin */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: 120,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                mr: 1,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={`/images/coin/${fromCoin.toLowerCase()}.png`}
                alt={fromCoin}
                width={32}
                height={32}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {fromCoin}
            </Typography>

            <KeyboardArrowDown
              sx={{
                color: "#9CA0B2",
                fontSize: 22,
              }}
            />
          </Box>

          {/* Input */}

          <InputBase
            value={fromAmount}
            onChange={handleFromAmountChange}
            placeholder="0"
            inputProps={{
              inputMode: "decimal",
            }}
            sx={{
              flex: 1,
              color: "#fff",
              fontSize: 14,

              "& input": {
                padding: 0,
              },

              "& input::placeholder": {
                color: "#fff",
                opacity: 1,
              },
            }}
          />

          {/* Max */}

          <Typography
            onClick={() => {
              const balance = Number(wallet?.bank || 0);

              if (balance > 0) {
                setFromAmount(balance.toString());

                if (rate > 0) {
                  setToAmount((balance / rate).toFixed(5));
                }
              }
            }}
            sx={{
              color: "#1687FF",
              fontSize: 14,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {t("DepositWithdrawPage.label18")}
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#8A8FA8",
            fontSize: 13,
            mt: 1,
          }}
        >
          {t("DepositWithdrawPage.label12")}:{" "}
          <Typography
            component="span"
            sx={{
              color: "#fff",
              fontSize: 13,
            }}
          >
            {wallet?.bank ? Number(wallet.bank).toLocaleString("vi-VN") : 0}{" "}
            USDT
          </Typography>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 1,
          }}
        >
          <IconButton
            onClick={handleSwap}
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#151B2B",
              color: "#8A8FA8",
              "&:hover": {
                bgcolor: "#1B2438",
              },
            }}
          >
            <SwapVert
              sx={{
                fontSize: 20,
              }}
            />
          </IconButton>
        </Box>

        <Typography
          sx={{
            fontSize: 14,
            mb: 1.5,
          }}
        >
          {t("DepositWithdrawPage.label17")}
        </Typography>

        <Box
          sx={{
            height: 42,
            bgcolor: "#1A1B24",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            px: 1,
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: 120,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                mr: 1,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={`/images/coin/${toCoin.toLowerCase()}.png`}
                alt={toCoin}
                width={32}
                height={32}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {toCoin}
            </Typography>

            <KeyboardArrowDown
              sx={{
                color: "#9CA0B2",
                fontSize: 22,
              }}
            />
          </Box>

          <InputBase
            value={toAmount}
            readOnly
            placeholder="0.00000"
            sx={{
              flex: 1,
              color: "#fff",
              fontSize: 14,

              "& input": {
                padding: 0,
              },

              "& input::placeholder": {
                color: "#fff",
                opacity: 1,
              },
            }}
          />
        </Box>

        <Button
          fullWidth
          onClick={submit}
          sx={{
            mt: 8,
            height: 48,
            borderRadius: "5px",
            background: "linear-gradient(90deg, #2864D7, #36A9E1)",
            color: "#fff",
            fontSize: 17,
            fontWeight: 700,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(90deg, #2864D7, #36A9E1)",
            },
          }}
        >
          {t("DepositWithdrawPage.label19")}
        </Button>
      </Box>
    </Box>
  );
}
