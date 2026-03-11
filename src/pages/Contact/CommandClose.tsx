import { getContractpc } from "@/services/User.service";
import { IHistoryClose, IUser } from "@/shared/interfaces";
import { formatDateTime } from "@/utils/formatDateTime";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  Chip,
  IconButton,
  Modal,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CommandClose({ user }: { user: IUser }) {
  const { t } = useTranslation();
  const [bill, setBill] = useState<IHistoryClose[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IHistoryClose | null>(
    null,
  );
  const [openDetail, setOpenDetail] = useState(false);

  const handleOpenDetail = (order: IHistoryClose) => {
    setSelectedOrder(order);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedOrder(null);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getContractpc();
        console.log(res);

        if (res.status === true) {
          setBill(res.data);
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    referral();
  }, []);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "95%", margin: "auto", paddingTop: "20px" }}>
      {bill ? (
        <Box>
          {bill
            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item: any, index: number) => (
              <Box
                key={index}
                onClick={() => handleOpenDetail(item)}
                sx={{
                  background: "#1f2937",
                  borderRadius: "14px",
                  padding: "16px 18px",
                  marginBottom: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
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
                      {t("StakingPage.amount")}:{" "}
                      {Number(item.num).toLocaleString()}
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
                        color: item.is_win === 1 ? "#4ade80" : "#ef4444",
                        fontWeight: 600,
                        fontSize: 15,
                        marginBottom: "6px",
                      }}
                    >
                      {item.is_win === 1
                        ? t("BuySellPage.WIN")
                        : t("BuySellPage.LOSS")}
                    </Typography>

                    <Typography
                      sx={{
                        color: item.is_win === 1 ? "#4ade80" : "#ef4444",
                        fontSize: 13,
                      }}
                    >
                      {item.is_win === 1
                        ? `+ ${Number(item?.ploss).toLocaleString()}`
                        : `- ${Number(item?.ploss).toLocaleString()}`}
                    </Typography>

                    <Typography sx={{ color: "#9aa4b2", fontSize: 13 }}>
                      {t("BuySellPage.price_sell")}:{" "}
                      {Number(item.sellprice).toLocaleString() || 0}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          <TablePagination
            component="div"
            count={bill.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              width: "100%",
              color: "white",
              margin: "auto",
            }}
          />
        </Box>
      ) : (
        <Typography
          sx={{
            color: "#9ca3af",
            fontSize: "12px",
            fontWeight: 600,
            textAlign: "Center",
          }}
        >
          {t("AssetPage.no_tran")}
        </Typography>
      )}

      <Modal open={openDetail} onClose={handleCloseDetail}>
        <Box
          sx={{
            maxWidth: "448px",
            margin: "auto",
            height: "100vh",
            bgcolor: "#0b1622",
            border: "1px solid #374151",
            mx: "auto",
            pb: "100px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            color: "#fff",
          }}
        >
          {selectedOrder && (
            <>
              <Box
                sx={{
                  borderBottom: "1px solid #1f2937",
                  display: "flex",
                  justifyContent: "space-between",
                  height: "50px",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <IconButton
                  onClick={handleCloseDetail}
                  sx={{ background: "none" }}
                >
                  <ArrowBackIosNewIcon
                    sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
                  />
                </IconButton>
                <Typography textAlign="center" fontSize={18} fontWeight={600}>
                  {selectedOrder.coinname.replace("-", "/")}
                </Typography>
                <IconButton></IconButton>
              </Box>
              <Box p={2}>
                {/* STATUS */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#1f2937",
                      borderRadius: "20px",
                      px: 2,
                      py: 0.5,
                      fontSize: 12,
                      color: "#9aa4b2",
                    }}
                  >
                    {t("BuySellPage.Closed")}
                  </Box>
                  <Chip
                    label={
                      selectedOrder.hyzd === 1
                        ? t("BuySellPage.BUY")
                        : t("BuySellPage.SELL")
                    }
                    size="small"
                    sx={{
                      color: selectedOrder.hyzd === 1 ? "#f87171" : "#34d399",
                      background:
                        selectedOrder.hyzd === 1 ? "#ef444433" : "#10b98133",
                    }}
                  />
                  {/* <Chip
                    color={selectedOrder.hyzd === 1 ? "#f87171" : "#34d399"}
                    fontWeight={600}
                    sx={{
                      background:
                        selectedOrder.hyzd === 1 ? "#ef444433" : "#10b98133",
                      p: 1,
                      borderRadius: "20px",
                    }}
                  >
                    {selectedOrder.hyzd === 1 ? "Buy" : "Sell"}
                  </Chip> */}
                </Box>

                {/* MAIN CARD */}
                <Box
                  sx={{
                    background: "#1f2937",
                    borderRadius: "14px",
                    padding: "16px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    mb: 2,
                  }}
                >
                  <DetailRow
                    label={t("StakingPage.amount")}
                    value={selectedOrder.num}
                  />
                  <DetailRow
                    label={t("BuySellPage.price_buy")}
                    value={Number(selectedOrder.buyprice).toLocaleString()}
                  />
                  <DetailRow
                    label={t("BuySellPage.price_sell")}
                    value={Number(selectedOrder.sellprice).toLocaleString()}
                  />
                  <DetailRow
                    label={t("BuySellPage.duration")}
                    value={`${selectedOrder.time}s`}
                  />
                  <DetailRow
                    label={t("BuySellPage.Profitability")}
                    value={`${selectedOrder.hybl}%`}
                    green
                  />
                  <DetailRow
                    label={t("BuySellPage.Expected")}
                    value={Number(
                      selectedOrder.num * (selectedOrder.hybl / 100),
                    ).toFixed(2)}
                  />
                  <DetailRow
                    label={t("BuySellPage.payout")}
                    value={Number(
                      selectedOrder.num * (1 + selectedOrder.hybl / 100),
                    ).toFixed(2)}
                  />
                </Box>

                {/* RESULT */}
                <Box
                  sx={{
                    background: "#1f2937",
                    borderRadius: "14px",
                    padding: "16px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    mb: 2,
                  }}
                >
                  <DetailRow
                    label={t("BuySellPage.result")}
                    value={
                      selectedOrder.is_win === 1
                        ? t("BuySellPage.WIN")
                        : t("BuySellPage.LOSS")
                    }
                    green={selectedOrder.is_win === 1}
                    red={selectedOrder.is_win !== 1}
                  />

                  <DetailRow
                    label={t("BuySellPage.Actual")}
                    value={`${selectedOrder.is_win === 1 ? "+" : "-"} ${Number(
                      selectedOrder.ploss,
                    ).toLocaleString()}`}
                    green={selectedOrder.is_win === 1}
                    red={selectedOrder.is_win !== 1}
                  />
                </Box>

                {/* TIME */}
                <Box
                  sx={{
                    background: "#1f2937",
                    borderRadius: "14px",
                    padding: "16px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <DetailRow
                    label={t("BuySellPage.Opening")}
                    value={formatDateTime(selectedOrder.buytime)}
                  />
                  <DetailRow
                    label={t("BuySellPage.Expires")}
                    value={formatDateTime(selectedOrder.selltime)}
                  />
                  <DetailRow
                    label={t("BuySellPage.Close")}
                    value={formatDateTime(selectedOrder.selltime)}
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

function DetailRow({
  label,
  value,
  green,
  red,
}: {
  label: string;
  value: any;
  green?: boolean;
  red?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 0.8,
        fontSize: 13,
      }}
    >
      <Typography color="#9aa4b2">{label}</Typography>

      <Typography
        color={green ? "#34d399" : red ? "#f87171" : "#fff"}
        fontWeight={500}
      >
        {value}
      </Typography>
    </Box>
  );
}
