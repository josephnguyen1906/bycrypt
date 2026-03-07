"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Divider,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  getFinaceBalance,
  getTranferHistory,
  postTranfer,
} from "@/services/User.service";
import { IFinaceBalace, ITranferHistory } from "@/shared/interfaces";
import { formatDateTime } from "@/utils/formatDateTime";
import CoinTranferPopup from "@/components/popup/CoinTranferPopup";
import LoadingComponent from "@/components/Loading";
import { toast } from "react-toastify";

export default function TransferPage() {
  const [from, setFrom] = useState("Coins Account");
  const [to, setTo] = useState("Contract Account");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState<ITranferHistory[]>([]);
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [method, setMethod] = useState<IFinaceBalace>();
  const [listMethod, setListMethod] = useState<IFinaceBalace[]>([]);
  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const historyTranfer = async () => {
    const res = await getTranferHistory();
    if (res.status) {
      setHistory(res.data);
    }
  };

  const referral = async () => {
    try {
      setLoading(true);
      const data = await getFinaceBalance();

      if (data.status) {
        setListMethod(data.data);
        setMethod(data.data[0]);
      }
      setLoading(false);
    } catch (errors: any) {
      console.log(errors?.message);
    }
  };
  useEffect(() => {
    historyTranfer();
    referral();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  const submit = async () => {
    try {
      if (method) {
        if (amount.length == 0) {
          toast.warning(t("DepositWithdrawPage.transferInput"));
        }
        const res = await postTranfer(method.id, amount, from, to);

        if (res.status) {
          setAmount("");
          toast.success(t("DepositWithdrawPage.transferSuccess"));
          historyTranfer();
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Box
      sx={{
        maxWidth: "768px",
        margin: "auto",
        minHeight: "100vh",
        background: "#1f252b",
        pb: "130px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={"10px"}
        justifyContent={"space-between"}
        sx={{ background: "#1a1f24", p: 2 }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{ background: "#232932" }}
        >
          <ArrowBackIosNewIcon
            sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
          />
        </IconButton>

        <Typography fontSize={20} fontWeight={600} color={"white"}>
          {t("DepositWithdrawPage.method1")}
        </Typography>

        <IconButton></IconButton>
      </Box>
      <Box p={2}>
        {/* Transfer card */}
        <Card
          sx={{
            background: "#22272d",
            borderRadius: "14px",
            p: 2.5,
            color: "white",
            border: "1px solid #ffffff1a",
            position: "relative",
            boxShadow: "0 10px 20px rgba(0,0,0,.6)",
          }}
        >
          {/* From */}
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#34d399",
                mr: 1,
              }}
            />
            <Box>
              <Typography fontSize={13} color="#9ca3af">
                {t("DepositWithdrawPage.from")}
              </Typography>
              <Typography fontSize={16}>{from}</Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#263241", my: 2 }} />

          {/* To */}
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#fb7185",
                mr: 1,
              }}
            />
            <Box>
              <Typography fontSize={13} color="#9ca3af">
                {t("DepositWithdrawPage.to")}
              </Typography>
              <Typography fontSize={16}>{to}</Typography>
            </Box>
          </Box>

          {/* Swap button */}
          <IconButton
            onClick={handleSwap}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              background: "#133a35",
              border: "2px solid #1f6f63",
              color: "#34d399",
              width: 50,
              height: 50,
            }}
          >
            <SwapHorizIcon />
          </IconButton>
        </Card>

        {/* Transfer quantity */}
        <Box mt={4}>
          <Typography fontSize={18} color="white" mb={2}>
            {t("DepositWithdrawPage.TransferLabel")}
          </Typography>

          <TextField
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            variant="standard"
            placeholder={t("DepositWithdrawPage.transferInput")}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    sx={{ background: "none", color: "white" }}
                    onClick={() => setOpen(true)}
                  >
                    {method?.title}
                  </Button>
                  <Box
                    sx={{
                      width: "2px",
                      height: "25px",
                      background: "#ffffff26",
                      mr: "5px",
                    }}
                  ></Box>
                  <Typography
                    sx={{
                      color: "#22c55e",
                      cursor: "pointer",
                    }}
                  >
                    {t("DepositWithdrawPage.all")}
                  </Typography>
                </InputAdornment>
              ),
            }}
            sx={{
              mt: 1,
              input: {
                color: "white",
              },
              background: "none",
              borderBottom: "1px solid #ffffff1a",
              p: 1,
            }}
          />

          <Typography color="#6b7280" fontSize={13} mt={1}>
            {t("DepositWithdrawPage.message")}: {method?.balance.available}
            {method?.title}
          </Typography>
        </Box>

        {/* Transfer Button */}
        <Button
          fullWidth
          disabled={amount.length == 0}
          sx={{
            mt: 3,
            height: 50,
            borderRadius: "14px",
            background: "linear-gradient(90deg,#1f5f56,#1e7c6b)",
            color: "white",
            fontWeight: 600,
            fontSize: 16,
            textTransform: "capitalize",
          }}
          onClick={submit}
        >
          {t("DepositWithdrawPage.method1")}
        </Button>

        {/* Transfer Record */}
        <Box mt={5}>
          <Typography fontSize={18} color="white" mb={2}>
            {t("DepositWithdrawPage.TransferLabel1")}
          </Typography>
          {history.length > 0 ? (
            history.map((item, index) => (
              <Card
                key={index}
                sx={{
                  background: "#22272d",
                  borderRadius: "12px",
                  p: 2,
                  border: "1px solid #ffffff1a",
                }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight={600} color="white">
                    {item.amount} {item.coinname.toUpperCase()}
                  </Typography>

                  <Typography fontSize={12} color="#9ca3af">
                    {formatDateTime(item.addtime)}
                  </Typography>
                </Box>

                <Typography fontSize={14} color="#9ca3af" mt={1}>
                  {item.from} → {item.to}
                </Typography>
              </Card>
            ))
          ) : (
            <Typography color="#6b7280" mt={2} textAlign="center">
              {t("AssetPage.no_tran")}
            </Typography>
          )}
        </Box>
      </Box>
      <CoinTranferPopup
        coin={method}
        data={listMethod}
        open={open}
        onClose={() => setOpen(false)}
        handleSelectCoin={(e) => setMethod(e)}
      />
    </Box>
  );
}
