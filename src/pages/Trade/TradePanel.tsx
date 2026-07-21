"use client";

import { useEffect, useState } from "react";
import { Box, Button, Grid, InputBase, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  createOrder,
  getBuySellConfig,
  getContractjc,
} from "@/services/User.service";
import { toast } from "react-toastify";
import { IUser } from "@/shared/interfaces";
import OrderConfirmModal from "@/components/popup/OrderConfirmModal";

const optionTimes = [
  { time: "60s", profit: "9~9%" },
  { time: "90s", profit: "19~19%" },
  { time: "120s", profit: "28~28%" },
  { time: "180s", profit: "100~100%" },
];

export default function TradePanel({
  user,
  symbol,
  onSuccess,
}: {
  symbol: string;
  user: IUser | null;
  onSuccess: (a: any) => void;
}) {
  const [openConfirm, setOpenConfirm] = useState(true);
  const [tab, setTab] = useState("1");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<any>(null);
  const [hytime, setHytime] = useState<any>(null);
  const [buySellConfig, setBuySellConfig] = useState<any>(null);
  const [hyykbl, setHyykbl] = useState<any>(null);
  const [orderOpen, setOderOpen] = useState<any>(null);
  const { t } = useTranslation();
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

            hy_min_per_frame: data.hy_min_per_frame?.split(",") || [],
            hy_max_per_frame: data.hy_max_per_frame?.split(",") || [],
          };
          setType(0);
          setHytime(processedData.hy_time?.[0] || "3");
          setHyykbl(processedData.hy_ykbl?.[0] || "15");
          setAmount(processedData.hy_tzed?.[0] || "200");
          setBuySellConfig(processedData);
        }
      } catch (errors: any) {
        // toast.error(errors?.message);
      }
    };
    referral();
  }, []);

  const handleSubmit = async (method: string) => {
    if (user?.rzstatus !== 2) {
      toast.error(t("Toast.buysell1"));
      return;
    }
    if (!hytime || !amount) {
      toast.error(t("Toast.buysell2"));
      return;
    }

    try {
      const formData = new FormData();
      formData.append("ctime", hytime);
      formData.append("amount", amount);
      formData.append("coinname", symbol);
      formData.append("method", method);
      formData.append("uprate", hyykbl);

      const res = await createOrder(formData);

      if (res?.data) {
        const his: any = await getContractjc();
        if (his.data?.length > 0) {
          setOderOpen(his.data[0]);
        }
        setOpenConfirm(true);
      }
      toast.success(t("Toast.buysell3"));
    } catch (error: any) {
      toast.error(t("Toast.buysell4"));
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mt: "10px",
      }}
    >
      <Button
        fullWidth
        sx={{
          mb: 3,
          height: 42,
          bgcolor: "#1B1F2A",
          color: "#fff",
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          width: 110,
          textAlign: "center",
          margin: "auto",
          "&:hover": {
            bgcolor: "#232837",
          },
        }}
      >
        {t("TradePage.title17")}
      </Button>

      <Typography
        sx={{
          color: "#8C92A4",
          fontSize: 13,
          mb: 1,
        }}
      >
        {t("TradePage.title18")}
      </Typography>

      <Grid container spacing={1}>
        {buySellConfig?.hy_time?.map((item: string, index: number) => (
          <Grid size={6} key={index}>
            <Box
              onClick={() => {
                setType(index);
                setHytime(item);
                setHyykbl(buySellConfig.hy_ykbl[index]);
                setAmount(buySellConfig.hy_tzed?.[index] || "200");
              }}
              sx={{
                cursor: "pointer",
                display: "flex",
                overflow: "hidden",
                borderRadius: "2px",
              }}
            >
              {/* Time */}
              <Box
                sx={{
                  width: "42%",
                  py: 1,
                  bgcolor: type === index ? "#6E5BFF" : "#23283B",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {Number(item) * 60}s
                </Typography>
              </Box>

              {/* Profit */}
              <Box
                sx={{
                  flex: 1,
                  py: 1,
                  bgcolor: type === index ? "#7756F6" : "#353B56",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {buySellConfig.hy_ykbl?.[index]}%
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Input */}
      <Box
        sx={{
          mt: 3,
          height: 48,
          borderRadius: "10px",
          border: "1px solid #232837",
          bgcolor: "#0B0D15",
          display: "flex",
          alignItems: "center",
          px: 2,
        }}
      >
        <InputBase
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={t("TradePage.title19") + amount}
          sx={{
            flex: 1,

            "& input": {
              color: "#fff",
              fontSize: 16,
              textAlign: "center",
            },

            "& input::placeholder": {
              color: "#fff",
              opacity: 1,
            },
          }}
        />

        <Typography
          sx={{
            color: "#B5BAC8",
            fontSize: 13,
          }}
        >
          USDT
        </Typography>
      </Box>

      {/* Buy */}
      <Button
        fullWidth
        sx={{
          mt: 2,
          height: 54,
          borderRadius: "28px",
          bgcolor: "#09D57A",
          color: "#fff",
          fontSize: 18,
          fontWeight: 500,
          textTransform: "none",

          "&:hover": {
            bgcolor: "#09D57A",
          },
        }}
        onClick={() => {
          handleSubmit("1");
          setTab("1");
        }}
      >
        {t("TradePage.title6")}
      </Button>

      <Stack mt={1} spacing={0.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#B2B6C3" fontSize={13}>
            {t("TradePage.title4")}
          </Typography>

          <Typography color="#fff" fontWeight={600} fontSize={13}>
            0 USDT
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography color="#B2B6C3" fontSize={13}>
            {t("TradePage.title11")}
          </Typography>

          <Typography color="#fff" fontWeight={600} fontSize={13}>
            0.00 USDT
          </Typography>
        </Stack>
      </Stack>

      {/* Sell */}
      <Button
        fullWidth
        onClick={() => {
          handleSubmit("2");
          setTab("2");
        }}
        sx={{
          mt: 3,
          height: 47,
          bgcolor: "#FF4B45",
          color: "#fff",
          borderRadius: "30px",
          fontSize: 18,
          fontWeight: 600,
          textTransform: "none",
          "&:hover": {
            bgcolor: "#FF4B45",
          },
        }}
      >
        {t("TradePage.title7")}
      </Button>

      <Stack mt={1} spacing={0.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="#B2B6C3" fontSize={13}>
            {t("TradePage.title4")}
          </Typography>

          <Typography color="#fff" fontWeight={600} fontSize={13}>
            0 USDT
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography color="#B2B6C3" fontSize={13}>
            {t("TradePage.title11")}
          </Typography>

          <Typography color="#fff" fontWeight={600} fontSize={13}>
            0.00 USDT
          </Typography>
        </Stack>
      </Stack>
      <OrderConfirmModal
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
        data={orderOpen}
        type={tab}
        profitability={Number(hyykbl)}
      />
    </Box>
  );
}
