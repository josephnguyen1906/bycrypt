"use client";

import {
  Drawer,
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { IHistoryOpen, IUser } from "@/shared/interfaces";
import {
  createOrder,
  getBuySellConfig,
  getContractjc,
} from "@/services/User.service";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import OrderConfirmModal from "./OrderConfirmModal";
import { CheckIcon } from "@/shared/Svgs/Svg.component";

interface Props {
  open: boolean;
  user: IUser;
  onClose: () => void;
  symbol: string;
  tab: string;
  price: number;
  history: IHistoryOpen[];
  onLoadHitory: () => void;
}

export default function TradePopup({
  open,
  onClose,
  symbol,
  price,
  tab,
  user,
  history,
  onLoadHitory,
}: Props) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<any>(null);
  const [priceConfig, setPriceConfig] = useState<any>(null);
  const [type, setType] = useState<any>(null);
  const [hytime, setHytime] = useState<any>(null);
  const [buySellConfig, setBuySellConfig] = useState<any>(null);
  const [hyykbl, setHyykbl] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const referral = async () => {
      try {
        const buySellConfig: any = await getBuySellConfig();

        if (buySellConfig.status === true) {
          const data = buySellConfig.data;

          const processedData = {
            ...data,
            hy_time: data.hy_time?.split(",") || [],
            hy_ykbl: data.hy_ykbl?.split(",") || [],
            hy_tzed: data.hy_tzed?.split(",") || [],
            hy_min: data.hy_min?.split(",") || [],
          };
          setType(0);
          setHytime(processedData.hy_time?.[0] || "3");
          setHyykbl(processedData.hy_ykbl?.[0] || "15");
          setAmount(processedData.hy_tzed?.[0] || "200");
          setPriceConfig(Number(processedData.hy_tzed?.[0]) || 200);
          setBuySellConfig(processedData);
        }
      } catch (errors: any) {
        // toast.error(errors?.message);
      }
    };
    referral();
  }, []);

  const handleSubmit = async () => {
    if (user?.rzstatus !== 2) {
      toast.error(t("Toast.buysell5"));
      return;
    }

    if (!hytime || !amount) {
      toast.error(t("Toast.buysell1"));
      return;
    }

    try {
      const method = tab == "BUY" ? "1" : "2";

      const formData = new FormData();
      formData.append("ctime", hytime);
      formData.append("amount", priceConfig);
      formData.append("coinname", symbol.replace("usdt", "-usdt"));
      formData.append("method", method);
      formData.append("uprate", hyykbl);

      const res = await createOrder(formData);

      if (res?.data) {
        setOrderData(res.data);
        setOpenConfirm(true);
        onLoadHitory();
      }

      // onClose();
      // toast.success(t("Toast.buysell3"));
    } catch (error) {
      toast.error(t("Toast.buysell4"));
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxWidth: "448px",
          margin: "auto",
          height: "85vh",
          maxHeight: "90vh",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          background: "#1f2937",
          color: "white",
          overflow: "hidden",
          display: "flex",
          p: 2,
          flexDirection: "column",
          zIndex: 999999999,
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          px: 2,
          pb: "120px",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight="bold">
            {symbol.toUpperCase().replace("USDT", "/USDT")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "right",
              justifyItems: "right",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{ color: "#94a3b8", width: "40px", ml: "50%" }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              fontWeight="400"
              textAlign={"right"}
              color={tab === "BUY" ? "#22c55e" : "#ef4444"}
            >
              {tab === "BUY" ? t("BuySellPage.BUY") : t("BuySellPage.SELL")}
            </Typography>
            <Typography fontWeight="bold" color={"white"}>
              {price.toLocaleString()}
            </Typography>
          </Box>
        </Stack>

        {/* BUY / SELL */}
        <Stack direction="row" spacing={1} mt={2}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: tab === "BUY" ? "#22c55e" : "#111827",
              color: "white",
              "&:hover": { background: tab === "BUY" ? "#22c55e" : "#111827" },
            }}
          >
            {t("BuySellPage.buy")}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: tab === "SELL" ? "#ef4444" : "#111827",
              color: "white",
              "&:hover": { background: tab === "SELL" ? "#ef4444" : "#111827" },
            }}
          >
            {t("BuySellPage.sell")}
          </Button>
        </Stack>

        {/* Duration */}
        <Typography
          mt={3}
          mb={1}
          sx={{ color: "#9ca3af", fontWeight: 400, fontSize: "13px" }}
        >
          {t("BuySellPage.Purchase")}
        </Typography>

        <Grid container spacing={1}>
          {buySellConfig &&
            buySellConfig.hy_time.map((item: string, index: number) => (
              <Grid item xs={4} key={index}>
                <Box
                  onClick={() => {
                    setType(index);
                    setHytime(item);
                    setHyykbl(buySellConfig.hy_ykbl?.[index] || "0");
                    setAmount(buySellConfig.hy_tzed?.[index] || "200");
                    setPriceConfig(
                      Number(buySellConfig.hy_tzed?.[index]) || 100,
                    );
                  }}
                  sx={{
                    height: "83px",
                    border: "1px solid",
                    borderColor: type === index ? "#22c55e" : "#334155",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",

                    justifyContent: "center",
                    alignItems: "center",

                    textAlign: "center",
                    cursor: "pointer",
                    background: type === index ? "#064e3b" : "#111827",
                    position: "relative",
                  }}
                >
                  <Typography fontSize={12}>
                    {Number(item) * 60} {t("BuySellPage.Second")}
                  </Typography>
                  <Typography fontSize={11} color="#94a3b8">
                    {t("BuySellPage.Profitability")}{" "}
                    {buySellConfig.hy_ykbl?.[index]}%
                  </Typography>
                  {type === index && <CheckIcon width="14px" height="14px" />}
                </Box>
              </Grid>
            ))}
        </Grid>

        {/* Trading model */}
        <Typography
          mt={3}
          mb={1}
          sx={{ color: "#9ca3af", fontWeight: 400, fontSize: "13px" }}
        >
          {t("BuySellPage.Trading")}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Box
            sx={{
              flex: 1,
              p: 1.5,
              borderRadius: 2,
              border: "1px solid #22c55e",
              background: "#064e3b",
              textAlign: "center",
            }}
          >
            USDT
          </Box>
          {/* <Box
            sx={{
              flex: 1,
              p: 1.5,
              borderRadius: 2,
              border: "1px solid #334155",
              background: "#111827",
              textAlign: "center",
            }}
          >
            USDC
          </Box> */}
        </Stack>

        {/* Quantity */}
        <Typography
          mt={3}
          mb={1}
          sx={{ color: "#9ca3af", fontWeight: 400, fontSize: "13px" }}
        >
          {t("BuySellPage.Open")}
        </Typography>

        <TextField
          fullWidth
          placeholder={t("BuySellPage.input_n")}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{
            sx: {
              background: "#111827",
              color: "white",
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Typography
            sx={{ color: "#9ca3af", fontWeight: 400, fontSize: "13px" }}
          >
            {t("BuySellPage.h2")}
          </Typography>
          <Typography
            sx={{ color: "#9ca3af", fontWeight: 400, fontSize: "13px" }}
          >
            {Number(user?.balance.usdt).toLocaleString()} USDT
          </Typography>
        </Box>
        {/* Profit Box */}
        <Box
          mt={1}
          p={2}
          sx={{
            background: "#111827",
            borderRadius: 2,
            border: "1px solid #334155",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ color: "#9ca3af" }}>
              {" "}
              {t("BuySellPage.Profitability")}
            </Typography>
            <Typography color="#22c55e">{hyykbl}%</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography sx={{ color: "#9ca3af" }}>
              {" "}
              {t("BuySellPage.Expected")}
            </Typography>
            <Typography>{Number(hyykbl)?.toFixed(2)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography sx={{ color: "#9ca3af" }}>
              {" "}
              {t("BuySellPage.payout")}
            </Typography>
            <Typography>
              {(Number(amount) + Number(hyykbl) || 0).toFixed(2)}
            </Typography>
          </Stack>
        </Box>

        {/* Bottom Button */}
        <Button
          fullWidth
          variant="contained"
          disabled={history.length > 0}
          sx={{
            mt: 3,
            background: tab === "BUY" ? "#22c55e" : "#ef4444",
            py: 1.5,
            fontWeight: "bold",
            "&:hover": { background: tab === "BUY" ? "#22c55e" : "#ef4444" },
          }}
          onClick={handleSubmit}
        >
          {tab === "BUY" ? t("BuySellPage.BUY") : t("BuySellPage.SELL")}
        </Button>
        {history.length > 0 && (
          <Typography sx={{ p: "8px", fontSize: "12px", color: "orange" }}>
            {t("BuySellPage.note1")}
          </Typography>
        )}
        <OrderConfirmModal
          open={openConfirm}
          onClose={() => {
            setOpenConfirm(false);
            setOrderData(null);
          }}
          data={orderData}
          type={tab}
          profitability={Number(hyykbl)}
        />
      </Box>
    </Drawer>
  );
}
