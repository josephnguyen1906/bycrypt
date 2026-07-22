"use client";

import {
  apiExchange,
  apiExchangeQuote,
  getFinaceCoin,
  getHistoryExchange,
  getMyWallet,
} from "@/services/User.service";
import { IHistoryExchange } from "@/shared/interfaces";
import {
  ArrowBackIosNew,
  AccessTimeOutlined,
  Close,
  KeyboardArrowDown,
  SwapVert,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  InputBase,
  Modal,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type WalletCoin = {
  name: string;
  title?: string;
  balance?: {
    available?: string | number;
    freeze?: string | number;
    total?: string | number;
  };
};

type FinanceCoin = {
  id: number;
  name: string;
  title?: string;
  status?: number;
};

type QuoteData = {
  from: string;
  to: string;
  amount: string;
  received: string;
  from_rate_usdt: string;
  to_rate_usdt: string;
  fee: string;
};

const USDT = "USDT";

export default function ConvertPage() {
  const { t } = useTranslation();

  const [coins, setCoins] = useState<FinanceCoin[]>([]);
  const [wallet, setWallet] = useState<WalletCoin[]>([]);
  const [fromCoin, setFromCoin] = useState(USDT);
  const [toCoin, setToCoin] = useState("SOL");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [quoting, setQuoting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pickerSide, setPickerSide] = useState<"from" | "to" | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<IHistoryExchange[]>([]);
  const [historyPage, setHistoryPage] = useState(1);
  const [historyLastPage, setHistoryLastPage] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(false);

  const quoteSeq = useRef(0);

  const fromBalance = useMemo(() => {
    const row = wallet.find(
      (item) => item.name?.toLowerCase() === fromCoin.toLowerCase(),
    );
    return Number(row?.balance?.available ?? 0);
  }, [wallet, fromCoin]);

  const loadWallet = async () => {
    try {
      const res: any = await getMyWallet();
      if (res.status === true) {
        setWallet(res.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCoins = async () => {
    try {
      const res: any = await getFinaceCoin();
      if (res.status === true) {
        const list: FinanceCoin[] = (res.data || []).filter(
          (item: FinanceCoin) => item?.name,
        );
        setCoins(list);

        const hasSol = list.some(
          (item) => item.name.toLowerCase() === "sol",
        );
        if (!hasSol) {
          const firstNonUsdt = list.find(
            (item) => item.name.toLowerCase() !== "usdt",
          );
          if (firstNonUsdt) {
            setToCoin(firstNonUsdt.name.toUpperCase());
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadWallet();
    loadCoins();
  }, []);

  const fetchQuote = async (from: string, to: string, amount: string) => {
    const num = Number(amount);
    if (!amount || isNaN(num) || num <= 0) {
      setToAmount("");
      setQuote(null);
      return;
    }

    const seq = ++quoteSeq.current;
    setQuoting(true);
    try {
      const res: any = await apiExchangeQuote(
        from.toLowerCase(),
        to.toLowerCase(),
        num,
      );
      if (seq !== quoteSeq.current) return;

      if (res.status === true && res.data) {
        setQuote(res.data);
        setToAmount(Number(res.data.received).toFixed(5));
      } else {
        setQuote(null);
        setToAmount("");
      }
    } catch {
      if (seq !== quoteSeq.current) return;
      setQuote(null);
      setToAmount("");
    } finally {
      if (seq === quoteSeq.current) {
        setQuoting(false);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchQuote(fromCoin, toCoin, fromAmount);
    }, 300);
    return () => clearTimeout(timer);
  }, [fromCoin, toCoin, fromAmount]);

  const applyCoinPick = (side: "from" | "to", coinName: string) => {
    const picked = coinName.toUpperCase();

    if (side === "from") {
      if (picked === USDT) {
        if (toCoin === USDT) {
          const fallback =
            coins.find((c) => c.name.toLowerCase() !== "usdt")?.name || "SOL";
          setToCoin(fallback.toUpperCase());
        }
        setFromCoin(USDT);
      } else {
        setFromCoin(picked);
        setToCoin(USDT);
      }
    } else {
      if (picked === USDT) {
        if (fromCoin === USDT) {
          const fallback =
            coins.find((c) => c.name.toLowerCase() !== "usdt")?.name || "SOL";
          setFromCoin(fallback.toUpperCase());
        }
        setToCoin(USDT);
      } else {
        setToCoin(picked);
        setFromCoin(USDT);
      }
    }

    setPickerSide(null);
  };

  const handleSwap = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setFromAmount(toAmount && Number(toAmount) > 0 ? toAmount : "");
    setToAmount("");
    setQuote(null);
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) return;
    setFromAmount(value);
  };

  const setMax = () => {
    if (fromBalance > 0) {
      setFromAmount(String(fromBalance));
    }
  };

  const openConfirm = () => {
    const num = Number(fromAmount);
    if (!fromAmount || isNaN(num) || num <= 0) {
      toast.error(t("Toast.convert1"));
      return;
    }
    if (num > fromBalance) {
      toast.error(t("Toast.convert3") || "Số dư không đủ");
      return;
    }
    if (!quote) {
      toast.error(t("Toast.convert3") || "Không lấy được tỷ giá");
      return;
    }
    setConfirmOpen(true);
  };

  const submitExchange = async () => {
    const num = Number(fromAmount);
    if (!num || num <= 0) return;

    setSubmitting(true);
    try {
      const res: any = await apiExchange(
        fromCoin.toLowerCase(),
        toCoin.toLowerCase(),
        num,
      );
      if (res.status === true) {
        toast.success(t("Toast.convert2"));
        setConfirmOpen(false);
        setFromAmount("");
        setToAmount("");
        setQuote(null);
        await loadWallet();
      } else {
        toast.error(res.message || t("Toast.convert3"));
      }
    } catch (err: any) {
      toast.error(err?.message || t("Toast.convert3"));
    } finally {
      setSubmitting(false);
    }
  };

  const loadHistory = async (page = 1, append = false) => {
    setHistoryLoading(true);
    try {
      const res: any = await getHistoryExchange(page, 20);
      if (res.status === true) {
        const rows: IHistoryExchange[] = res.data || [];
        setHistory((prev) => (append ? [...prev, ...rows] : rows));
        setHistoryPage(res.pagination?.current_page || page);
        setHistoryLastPage(res.pagination?.last_page || 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const openHistory = () => {
    setHistoryOpen(true);
    loadHistory(1, false);
  };

  const coinLabel = (name: string) => name.toUpperCase();

  const renderCoinRow = (name: string, onClick: () => void) => (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        minWidth: 120,
        cursor: "pointer",
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
          src={`/images/coin/${name.toLowerCase()}.png`}
          alt={name}
          width={32}
          height={32}
        />
      </Box>
      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
        {coinLabel(name)}
      </Typography>
      <KeyboardArrowDown sx={{ color: "#9CA0B2", fontSize: 22 }} />
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: "448px" },
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
        <IconButton
          onClick={() => window.history.back()}
          sx={{ color: "#fff", p: 0.5 }}
        >
          <ArrowBackIosNew sx={{ fontSize: 18 }} />
        </IconButton>

        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
          {t("AccountPage.menuTab4")}
          <Typography
            component="span"
            sx={{ color: "#00C896", fontSize: 12, ml: 0.5 }}
          >
            0 {t("DepositWithdrawPage.label15")}
          </Typography>
        </Typography>

        <IconButton onClick={openHistory} sx={{ color: "#fff", p: 0.5 }}>
          <AccessTimeOutlined sx={{ fontSize: 22 }} />
        </IconButton>
      </Box>

      <Box sx={{ px: 1.5, pt: 5 }}>
        <Typography sx={{ fontSize: 14, mb: 1.5 }}>
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
          {renderCoinRow(fromCoin, () => setPickerSide("from"))}

          <InputBase
            value={fromAmount}
            onChange={handleFromAmountChange}
            placeholder="0"
            inputProps={{ inputMode: "decimal" }}
            sx={{
              flex: 1,
              color: "#fff",
              fontSize: 14,
              "& input": { padding: 0 },
              "& input::placeholder": { color: "#fff", opacity: 1 },
            }}
          />

          <Typography
            onClick={setMax}
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

        <Typography sx={{ color: "#8A8FA8", fontSize: 13, mt: 1 }}>
          {t("DepositWithdrawPage.label12")}:{" "}
          <Typography component="span" sx={{ color: "#fff", fontSize: 13 }}>
            {fromBalance.toLocaleString("vi-VN")} {coinLabel(fromCoin)}
          </Typography>
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
          <IconButton
            onClick={handleSwap}
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#151B2B",
              color: "#8A8FA8",
              "&:hover": { bgcolor: "#1B2438" },
            }}
          >
            <SwapVert sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        <Typography sx={{ fontSize: 14, mb: 1.5 }}>
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
          {renderCoinRow(toCoin, () => setPickerSide("to"))}

          <InputBase
            value={toAmount}
            readOnly
            placeholder="0.00000"
            sx={{
              flex: 1,
              color: "#fff",
              fontSize: 14,
              "& input": { padding: 0 },
              "& input::placeholder": { color: "#fff", opacity: 1 },
            }}
          />
          {quoting && <CircularProgress size={16} sx={{ color: "#8A8FA8" }} />}
        </Box>

        <Button
          fullWidth
          onClick={openConfirm}
          disabled={submitting || quoting || !fromAmount || !quote}
          sx={{
            mt: 8,
            height: 48,
            borderRadius: "5px",
            background: "linear-gradient(90deg, #2864D7, #36A9E1)",
            color: "#fff",
            fontSize: 17,
            fontWeight: 700,
            textTransform: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              background: "linear-gradient(90deg, #2864D7, #36A9E1)",
            },
            "&.Mui-disabled": {
              background: "#2A2D3A",
              color: "#7A7F96",
            },
          }}
        >
          {t("DepositWithdrawPage.label19")}
        </Button>
      </Box>

      {/* Coin picker */}
      <Drawer
        anchor="bottom"
        open={pickerSide !== null}
        onClose={() => setPickerSide(null)}
        sx={{
          "& .MuiPaper-root": {
            width: { xs: "100%", sm: 448 },
            left: { xs: 0, sm: "calc(50% - 224px)" },
            right: "auto",
            maxHeight: "70vh",
            bgcolor: "#0E0F18",
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            color: "#fff",
          },
        }}
      >
        <Box p={2}>
          <Box
            sx={{
              width: 36,
              height: 4,
              bgcolor: "#3A3D4A",
              borderRadius: 10,
              mx: "auto",
              mb: 2,
            }}
          />
          <Typography align="center" fontWeight={700} fontSize={14} mb={2}>
            {pickerSide === "from"
              ? t("DepositWithdrawPage.label16")
              : t("DepositWithdrawPage.label17")}
          </Typography>
          <Box sx={{ maxHeight: "55vh", overflowY: "auto" }}>
            {coins.map((coin) => {
              const name = coin.name.toUpperCase();
              return (
                <Box
                  key={coin.id || coin.name}
                  onClick={() =>
                    pickerSide && applyCoinPick(pickerSide, coin.name)
                  }
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 1.5,
                    borderBottom: "1px solid #1A1B24",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={`/images/coin/${coin.name.toLowerCase()}.png`}
                      alt={name}
                      width={32}
                      height={32}
                    />
                  </Box>
                  <Box>
                    <Typography fontSize={14} fontWeight={600}>
                      {name}
                    </Typography>
                    {coin.title && (
                      <Typography fontSize={12} color="#8A8FA8">
                        {coin.title}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Drawer>

      {/* History drawer */}
      <Drawer
        anchor="bottom"
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        sx={{
          "& .MuiPaper-root": {
            width: { xs: "100%", sm: 448 },
            left: { xs: 0, sm: "calc(50% - 224px)" },
            right: "auto",
            maxHeight: "75vh",
            bgcolor: "#0E0F18",
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            color: "#fff",
          },
        }}
      >
        <Box p={2}>
          <Box
            sx={{
              width: 36,
              height: 4,
              bgcolor: "#3A3D4A",
              borderRadius: 10,
              mx: "auto",
              mb: 2,
            }}
          />
          <Typography align="center" fontWeight={700} fontSize={14} mb={2}>
            {t("AccountPage.menuTab4")}
          </Typography>

          {historyLoading && history.length === 0 ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress size={24} />
            </Box>
          ) : history.length === 0 ? (
            <Typography align="center" color="#8A8FA8" py={4} fontSize={13}>
              —
            </Typography>
          ) : (
            <Box sx={{ maxHeight: "55vh", overflowY: "auto" }}>
              {history.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    py: 1.5,
                    borderBottom: "1px solid #1A1B24",
                  }}
                >
                  <Typography fontSize={14} fontWeight={600}>
                    {String(item.from_coin).toUpperCase()} →{" "}
                    {String(item.to_coin).toUpperCase()}
                  </Typography>
                  <Typography fontSize={13} color="#8A8FA8" mt={0.5}>
                    {Number(item.from_amount).toLocaleString("vi-VN", {
                      maximumFractionDigits: 8,
                    })}{" "}
                    →{" "}
                    {Number(item.to_amount).toLocaleString("vi-VN", {
                      maximumFractionDigits: 8,
                    })}
                  </Typography>
                  <Typography fontSize={12} color="#6B7088" mt={0.5}>
                    {item.addtime
                      ? new Date(item.addtime).toLocaleString("vi-VN")
                      : ""}
                  </Typography>
                </Box>
              ))}
              {historyPage < historyLastPage && (
                <Button
                  fullWidth
                  disabled={historyLoading}
                  onClick={() => loadHistory(historyPage + 1, true)}
                  sx={{
                    mt: 1,
                    height: 44,
                    textTransform: "none",
                    color: "#1687FF",
                  }}
                >
                  {historyLoading ? (
                    <CircularProgress size={18} />
                  ) : (
                    "Load more"
                  )}
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Confirm modal */}
      <Modal open={confirmOpen} onClose={() => !submitting && setConfirmOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 360 },
            bgcolor: "#151B2B",
            borderRadius: "12px",
            p: 2.5,
            color: "#fff",
            outline: "none",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography fontWeight={700} fontSize={16}>
              {t("DepositWithdrawPage.label19")}
            </Typography>
            <IconButton
              size="small"
              disabled={submitting}
              onClick={() => setConfirmOpen(false)}
              sx={{ color: "#8A8FA8" }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>

          {[
            ["Từ", `${quote?.amount || fromAmount} ${fromCoin}`],
            ["Đến", `${quote?.received || toAmount} ${toCoin}`],
            [
              "Tỷ giá",
              quote
                ? `1 ${fromCoin} ≈ ${(
                    Number(quote.amount) > 0
                      ? Number(quote.received) / Number(quote.amount)
                      : 0
                  ).toFixed(6)} ${toCoin}`
                : "—",
            ],
            ["Phí", "0"],
          ].map(([label, value]) => (
            <Box
              key={label}
              display="flex"
              justifyContent="space-between"
              py={1}
              borderBottom="1px solid #1A1B24"
            >
              <Typography fontSize={13} color="#8A8FA8">
                {label}
              </Typography>
              <Typography fontSize={13} fontWeight={600}>
                {value}
              </Typography>
            </Box>
          ))}

          <Box display="flex" gap={1.5} mt={3}>
            <Button
              fullWidth
              disabled={submitting}
              onClick={() => setConfirmOpen(false)}
              sx={{
                height: 46,
                textTransform: "none",
                color: "#fff",
                bgcolor: "#2A2D3A",
                "&:hover": { bgcolor: "#34384A" },
              }}
            >
              Huỷ
            </Button>
            <Button
              fullWidth
              disabled={submitting}
              onClick={submitExchange}
              sx={{
                height: 46,
                textTransform: "none",
                fontWeight: 700,
                color: "#fff",
                background: "linear-gradient(90deg, #2864D7, #36A9E1)",
                "&.Mui-disabled": {
                  background: "#2A2D3A",
                  color: "#7A7F96",
                },
              }}
            >
              {submitting ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                "Xác nhận"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
