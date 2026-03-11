"use client";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
  Pagination,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TradePopup from "@/components/popup/TradePopup";
import CoinPopup from "@/components/popup/CoinPopup";
import { Icoin } from "@/interface/user.interface";
import { ExchangeIcon, Next2Icon, NextIcon } from "@/shared/Svgs/Svg.component";
import { useUserStore } from "@/stores/useUserStore";
import { apiExchange, getHistoryExchange } from "@/services/User.service";
import { error } from "console";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { IHistoryExchange } from "@/shared/interfaces";
import { formatDateTime } from "@/utils/formatDateTime";
import LoadingComponent from "@/components/Loading";

const coinList = [
  "BTC",
  "ETH",
  "BCH",
  "LTC",
  "UNI",
  "XAU",
  "FIG",
  "COMB",
  "EBUN",
  "KXSE",
  "ETF",
];

export default function ExchangePage() {
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
  const [coin, setCoin] = useState("btc");
  const [history, setHistory] = useState<IHistoryExchange[]>([]);
  const [page, setPage] = useState({ page: 1, limit: 10 });
  const [total, setTotal] = useState(0);
  const [fromCoin, setFromCoin] = useState("usdt");
  const [toCoin, setTocoin] = useState("btc");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(0);
  const [expected, setExpected] = useState(0);
  const [openSelect, setOpenSelect] = useState(false);
  const available = 0;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getHistoryExchange(page.page, page.limit).then((res: any) => {
      if (res.status === true) {
        setHistory(res.data);
        setTotal(res.pagination.total);
      }
    });
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${coin.toLowerCase()}usdt@trade`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRate(parseFloat(data.p));
    };

    return () => ws.close();
  }, [coin]);

  /*
  expected usdt
  */

  useEffect(() => {
    const amt = Number(amount || 0);

    let result = 0;

    if (!rate || !amt) {
      setExpected(0);
      return;
    }

    if (fromCoin === "usdt") {
      result = Number(amt) / Number(rate);
    }

    setExpected(result);
  }, [amount, fromCoin, toCoin]);

  const handleSelectCoin = (coin: Icoin) => {
    setTocoin(coin.coinname);
    setCoin(coin.coinname);
    setOpenSelect(false);
  };

  const handleSubmit = async () => {
    await apiExchange(fromCoin, toCoin, Number(amount))
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        toast.success(t(`Toast.exchange_toast`));
        setAmount("");
      });
  };

  if (!user) {
    return <LoadingComponent />;
  }
  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#020617,#020617,#0f172a)",
        color: "white",
        p: 2,
        pb: "110px",
      }}
    >
      {/* header */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{ background: "#232932" }}
        >
          <ArrowBackIosNewIcon
            sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
          />
        </IconButton>

        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          {t("DepositWithdrawPage.exchange")}
        </Typography>
      </Box>

      {/* coin select */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
          mb: 3,
        }}
      >
        <Button
          onClick={() => {
            if (fromCoin !== "usdt") {
              setOpenSelect(true);
            }
          }}
          sx={{
            background: "#1e293b",
            color: "white",
            width: "35%",
            height: "50px",
            borderRadius: "10px",
            "&:hover": {
              background: "#2b3546ff",
            },
          }}
        >
          {fromCoin}
        </Button>

        <Box
          sx={{
            width: 60,
            height: 35,
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#22c55e",
            fontSize: 22,
            boxShadow: "0 0 10px rgba(16,185,129,.6)",
            cursor: "pointer",
          }}
          onClick={() => {
            if (toCoin === "usdt") {
              setTocoin(fromCoin);
              setFromCoin("usdt");
            } else {
              setTocoin("usdt");
              setFromCoin(coin);
            }
          }}
        >
          <ExchangeIcon width="35px" height="35px" />
        </Box>

        <Button
          sx={{
            background: "#1e293b",
            color: "white",
            width: "35%",
            height: "50px",
            borderRadius: "10px",
            "&:hover": {
              background: "#2b3546ff",
            },
          }}
          onClick={() => {
            if (toCoin !== "usdt") {
              setOpenSelect(true);
            }
          }}
        >
          {toCoin}
        </Button>
      </Box>

      {/* title */}

      <Typography fontWeight={600} mb={1}>
        {t("DepositWithdrawPage.exchange_num")}
      </Typography>

      {/* input */}

      <Box
        sx={{
          borderBottom: "1px solid #1e293b",
          pb: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          variant="standard"
          placeholder={t("DepositWithdrawPage.exchange_input")}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            input: {
              color: "white",
              fontSize: 16,
            },
          }}
        />

        <Typography sx={{ fontSize: "12px", width: "45px" }}>
          {fromCoin.toUpperCase()}
        </Typography>
        <Box
          sx={{
            width: "2px",
            height: "25px",
            background: "#ffffff26",
            ml: "8px",
            mr: "8px",
          }}
        />
        <Typography
          sx={{
            color: "#22c55e",
            cursor: "pointer",
            fontSize: "12px",
            width: "30px",
          }}
          onClick={() => setAmount(String(available))}
        >
          {t("DepositWithdrawPage.all")}
        </Typography>
      </Box>

      {/* available */}

      <Typography mt={1} fontSize={12} color="#64748b">
        {t("DepositWithdrawPage.message")}
        {fromCoin.toUpperCase()} {available}
      </Typography>

      {/* info */}
      <Box
        sx={{
          display: "flex",
          mt: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography color="rgba(100, 116, 139, 1)" fontSize={10}>
            {t("DepositWithdrawPage.exchange_title1")}
          </Typography>

          <Typography fontWeight={500} fontSize={11}>
            {rate ? rate : "--"}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: "center",
          }}
        >
          <Typography color="#64748b" fontSize={10}>
            {t("DepositWithdrawPage.message")} {fromCoin.toUpperCase()}
          </Typography>

          <Typography fontWeight={500} fontSize={11}>
            {Number(user?.balance.usdt ?? 0)}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: "right",
          }}
        >
          <Typography color="#64748b" fontSize={10}>
            {t("DepositWithdrawPage.exchange_title")} {toCoin.toUpperCase()}
          </Typography>

          <Typography fontWeight={500} fontSize={11}>
            {expected.toFixed(10)}
          </Typography>
        </Box>
      </Box>

      {/* button */}

      <Button
        fullWidth
        disabled={amount == "" || !user}
        sx={{
          mt: 4,
          height: 50,
          borderRadius: "25px",
          background: "linear-gradient(90deg,#22c55e,#16a34a)",
          color: "white",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "0 10px 25px rgba(16,185,129,.35)",
          "&:disabled": {
            background: "#34d39980",
            color: "#111827b3",
          },
        }}
        onClick={handleSubmit}
      >
        {t("DepositWithdrawPage.exchange")}
      </Button>

      {/* record */}

      <Typography mt={5} mb={2}>
        {t("DepositWithdrawPage.ex_re")}
      </Typography>
      {history.length > 0 ? (
        <Box>
          {history.map((item: IHistoryExchange, index: number) => (
            <Box
              key={index}
              sx={{
                background: "#22272d",
                border: "1px solid #ffffff1a",
                p: 2,
                borderRadius: "10px",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "11px", fontWeight: 500 }}
                >
                  {item.from_amount + " " + item.from_coin.toUpperCase()}
                </Typography>

                <Typography sx={{ color: "white", fontSize: "10px" }}>
                  →
                </Typography>

                <Typography
                  sx={{ color: "white", fontSize: "11px", fontWeight: 500 }}
                >
                  {item.to_amount + " " + item.to_coin.toUpperCase()}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "#6b7280",
                  fontSize: "11px",
                  fontWeight: 400,
                  mt: "5px",
                }}
              >
                {formatDateTime(item.addtime)}
              </Typography>
            </Box>
          ))}

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              page={page.page}
              count={Math.ceil(total / page.limit)}
              onChange={(e, value) =>
                setPage((prev) => ({
                  ...prev,
                  page: value,
                }))
              }
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#fff",
                },
              }}
            />
          </Box>
        </Box>
      ) : (
        <Typography color="#64748b" textAlign="center">
          {t("AssetPage.no_tran")}
        </Typography>
      )}

      {/* popup select coin */}
      <CoinPopup
        onClose={() => setOpenSelect(false)}
        open={openSelect}
        coin={toCoin}
        handleSelectCoin={handleSelectCoin}
      />
    </Box>
  );
}
