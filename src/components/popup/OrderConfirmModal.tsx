"use client";

import { Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { getOrderResult } from "@/services/User.service";
import { IHistoryClose } from "@/shared/interfaces";
import { formatDateTime } from "@/utils/formatDateTime";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  data: any;
  type: string;
  profitability: number;
}

export default function OrderConfirmModal({
  open,
  onClose,
  data,
  type,
  profitability,
}: Props) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [dataOrder, setDataOrder] = useState<IHistoryClose | null>(null);

  useEffect(() => {
    if (!open || !data) return;

    setCountdown(data.time);
    setDataOrder(null);
  }, [open, data]);

  const getTimeLeft = (selltime: Date) => {
    const end = new Date(selltime).getTime();
    const now = Date.now();
    return Math.max(Math.floor((end - now) / 1000), 0);
  };

  const percent =
    countdown !== null ? (countdown / (data.time * 60)) * 100 : 100;

  const checkOrder = async () => {
    try {
      const res = await getOrderResult(data.id);
      if (res.status) {
        setDataOrder(res.data);
      }
    } catch (err) {
      console.log("err 1", err);
    }
  };
  useEffect(() => {
    if (!open || !data?.selltime) return;

    const update = () => {
      const left = getTimeLeft(data.selltime);

      setCountdown(left);

      if (left === 0 && !dataOrder) {
        checkOrder();
      }
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [open, data?.selltime]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          bgcolor: "#0b1622",
          borderRadius: "20px",
          border: "1px solid #374151",
          p: 2,
          color: "#fff",
          mx: "auto",
          mt: "10%",
          top: "10%",
          position: "relative",
        }}
      >
        {/* Close */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 10, top: 10, color: "#aaa" }}
        >
          <CloseIcon />
        </IconButton>

        <Typography fontWeight={600} fontSize={"13px"} mb={3}>
          {data?.coinname}
        </Typography>

        {!dataOrder ? (
          <>
            <Box
              sx={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: `conic-gradient(#34d399 ${percent}%, #243447 ${percent}%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  bgcolor: "#0b1622",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                {countdown}s
              </Box>
            </Box>

            <Typography textAlign="center" color="#7c8aa0" fontSize={13} mb={3}>
              {t("BuySellPage.title1")}
            </Typography>

            {/* Info */}
            <InfoRow
              label={t("ProfilePage.tran_type")}
              value={
                type === "BUY" ? t("BuySellPage.BUY") : t("BuySellPage.SELL")
              }
              color="green"
            />
            <InfoRow
              label={t("AssetPage.quantity")}
              value={Number(data?.num).toLocaleString()}
            />
            <InfoRow
              label={t("BuySellPage.Purchase")}
              value={Number(data?.buyprice).toLocaleString()}
            />
            <InfoRow
              label={t("BuySellPage.duration")}
              value={`${data?.time}s`}
            />
            <InfoRow
              label={t("BuySellPage.Profitability")}
              value={`${profitability}%`}
              color="green"
            />
            <InfoRow
              label={t("BuySellPage.payout")}
              value={Number(
                (data?.num * (1 + profitability / 100)).toFixed(2),
              ).toLocaleString()}
            />
          </>
        ) : (
          <>
            <Typography
              textAlign="center"
              fontSize={26}
              fontWeight={700}
              color={dataOrder.is_win === 1 ? "#34d399" : "red"}
              mb={2}
            >
              {dataOrder.is_win === 1
                ? `+ ${Number(dataOrder?.ploss).toLocaleString()}`
                : `- ${Number(dataOrder?.ploss).toLocaleString()}`}
            </Typography>

            <InfoRow
              label={t("ProfilePage.tran_type")}
              value={type}
              color="green"
            />
            <InfoRow label={t("AssetPage.quantity")} value={dataOrder?.num} />
            <InfoRow
              label={t("BuySellPage.Purchase")}
              value={Number(dataOrder?.buyprice).toLocaleString()}
            />
            <InfoRow
              label={t("BuySellPage.price")}
              value={Number(dataOrder?.sellprice).toLocaleString()}
            />
            <InfoRow
              label={t("BuySellPage.Transaction_time")}
              value={data?.time}
            />
            <InfoRow
              label={t("BuySellPage.Profitability")}
              value={`${dataOrder?.hybl}%`}
              color="green"
            />
            <InfoRow
              label={t("BuySellPage.Profit_loss")}
              value={
                dataOrder.is_win === 1
                  ? `+ ${Number(dataOrder?.ploss).toLocaleString()}`
                  : `- ${Number(dataOrder?.ploss).toLocaleString()}`
              }
              color={dataOrder.is_win === 1 ? "green" : "red"}
            />
            {/* <InfoRow label="Handling fee" value="0.10" /> */}
            <InfoRow
              label={t("BuySellPage.Opening")}
              value={formatDateTime(dataOrder?.buytime)}
            />
            <InfoRow
              label={t("BuySellPage.Close")}
              value={formatDateTime(dataOrder?.selltime)}
            />

            <Box
              onClick={onClose}
              sx={{
                mt: 3,
                bgcolor: "#34d399",
                textAlign: "center",
                py: 1.5,
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              OK
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

function InfoRow({
  label,
  value,
  color,
}: {
  label: string;
  value: any;
  color?: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 0.5,
        fontSize: 14,
      }}
    >
      <Typography color="#9aa4b2" fontSize={"11px"}>
        {label}
      </Typography>
      <Typography
        color={color == "green" ? "#34d399" : color == "red" ? "red" : "#fff"}
        fontSize={"11px"}
      >
        {value}
      </Typography>
    </Box>
  );
}
