import { getContractjc, getContractpc } from "@/services/User.service";
import { IHistoryOpen, IUser } from "@/shared/interfaces";
import { formatDateTime } from "@/utils/formatDateTime";
import { formatCurrency } from "@/utils/formatMoney";
import { Box, TablePagination, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CommandOpen({
  user,
  history,
  onCLose,
}: {
  user: IUser | null;
  history: IHistoryOpen[];
  onCLose: () => void;
}) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: number }>({});
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    if (!history) return;

    const initial: any = {};

    history.forEach((item) => {
      initial[item.id] = getTimeLeft(item.selltime);
    });

    setTimeLeft(initial);
  }, [history]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const updated: any = {};

        Object.keys(prev).forEach((id) => {
          const numId = Number(id);

          const newTime = prev[numId] > 0 ? prev[numId] - 1 : 0;

          updated[numId] = newTime;

          if (prev[numId] === 1) {
            onCLose();
          }
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeLeft = (selltime: Date) => {
    const end = new Date(selltime).getTime();
    const now = Date.now();
    return Math.max(Math.floor((end - now) / 1000), 0);
  };
  return (
    <Box sx={{ width: "95%", margin: "auto", paddingTop: "20px", pb: 5 }}>
      {history && history.length > 0 ? (
        history.map((item: IHistoryOpen, index: number) => (
          <Box
            key={index}
            sx={{
              background: "#1c2735",
              borderRadius: "14px",
              padding: "16px 18px",
              marginBottom: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              {/* LEFT */}
              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "6px",
                  }}
                >
                  {item.coinname?.replace("-", "/")}
                </Typography>

                <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                  {t("StakingPage.amount")}: {Number(item.num).toLocaleString()}
                </Typography>

                <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                  {t("BuySellPage.price_buy")}:{" "}
                  {Number(item.buyprice).toLocaleString()}
                </Typography>
              </Box>

              {/* RIGHT */}
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    color: item.hyzd === 1 ? "#4ade80" : "#ef4444",
                    fontWeight: 600,
                    fontSize: 15,
                    marginBottom: "6px",
                  }}
                >
                  {item.hyzd === 1 ? "Mua" : "Bán"}
                </Typography>

                <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                  {t("BuySellPage.profit")}: {item.hybl}%
                </Typography>

                <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                  {t("BuySellPage.time")}: {timeLeft[item.id] || 0}s
                </Typography>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Image
            src={"/images/nothing.png"}
            width={100}
            height={100}
            alt="nothing"
            style={{ height: "80px", objectFit: "contain" }}
          />
          <Typography
            sx={{
              color: "#4d4d4d",
              fontSize: "12px",
              fontWeight: 600,
              textAlign: "center",
              mt: "-15px",
            }}
          >
            {t("AssetPage.no_tran")}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
