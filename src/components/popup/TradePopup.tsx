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
import { IUser } from "@/shared/interfaces";
import { createOrder, getBuySellConfig } from "@/services/User.service";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  user: IUser;
  onClose: () => void;
  symbol: string;
  tab: string;
  price: number;
}

export default function TradePopup({
  open,
  onClose,
  symbol,
  price,
  tab,
  user,
}: Props) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<any>(null);
  const [priceConfig, setPriceConfig] = useState<any>(null);
  const [type, setType] = useState<any>(null);
  const [hytime, setHytime] = useState<any>(null);
  const [buySellConfig, setBuySellConfig] = useState<any>(null);
  const [hyykbl, setHyykbl] = useState<any>(null);
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
    // if (Number(priceConfig) < Number(amount)) {
    //   toast.error(t("Toast.buysell2"));
    //   return;
    // }
    // if (parseFloat(amount) > parseFloat(user?.balance.usdt || "0")) {
    //   router.push("/asset");
    //   return;
    // }
    try {
      const method = tab == "BUY" ? "1" : "2";
      const formData = new FormData();
      formData.append("ctime", hytime);
      formData.append("amount", priceConfig);
      formData.append("coinname", symbol.replace("usdt", "-usdt"));
      formData.append("method", method);
      formData.append("uprate", hyykbl);

      await createOrder(formData).then((res) => {
        onClose();
      });
      toast.success(t("Toast.buysell3"));
    } catch (error: any) {
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
              {tab}
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
            BUY
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
            SELL
          </Button>
        </Stack>

        {/* Duration */}
        <Typography
          mt={3}
          mb={1}
          sx={{ color: "#9ca3af", fontWeight: 400, fontSize: "13px" }}
        >
          Purchase price
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
                    border: "1px solid",
                    borderColor: type === index ? "#22c55e" : "#334155",
                    borderRadius: 2,
                    p: 1,
                    textAlign: "center",
                    cursor: "pointer",
                    background: type === index ? "#064e3b" : "#111827",
                  }}
                >
                  <Typography fontSize={12}>
                    {" "}
                    {item} {t("BuySellPage.minute")}
                  </Typography>
                  <Typography fontSize={11} color="#94a3b8">
                    {t("BuySellPage.profit")} {buySellConfig.hy_ykbl?.[index]}%
                  </Typography>
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
          Trading model
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
          Open position quantity
        </Typography>

        <TextField
          fullWidth
          placeholder="Please enter the opening quantity"
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
            Micro account funds
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
            <Typography sx={{ color: "#9ca3af" }}>Profitability</Typography>
            <Typography color="#22c55e">{hyykbl}%</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography sx={{ color: "#9ca3af" }}>Expected profit</Typography>
            <Typography>{Number(hyykbl)?.toFixed(2)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography sx={{ color: "#9ca3af" }}>Expected payout</Typography>
            <Typography>
              {(Number(amount) + Number(hyykbl) || 0).toFixed(2)}
            </Typography>
          </Stack>
        </Box>

        {/* Bottom Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            background: tab === "BUY" ? "#22c55e" : "#ef4444",
            py: 1.5,
            fontWeight: "bold",
            "&:hover": { background: tab === "BUY" ? "#22c55e" : "#ef4444" },
          }}
          onClick={handleSubmit}
        >
          {tab}
        </Button>
      </Box>
    </Drawer>
  );
}
