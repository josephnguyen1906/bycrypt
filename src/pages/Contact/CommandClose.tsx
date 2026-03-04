import { getContractpc } from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
import { formatDateTime } from "@/utils/formatDateTime";
import { formatCurrency } from "@/utils/formatMoney";
import { Box, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CommandClose({ user }: { user: IUser }) {
  const { t } = useTranslation();
  const [bill, setBill] = useState<any>(null);

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
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item: any, index: number) => (
              <Box key={index} sx={{ padding: "10px 0" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {item.hyzd === 1
                        ? t("BuySellPage.buy")
                        : t("BuySellPage.sell")}{" "}
                      {item.coinname}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#909090",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {formatDateTime(item.buytime)}
                    </Typography>
                  </Box>
                  <Box>
                    {item.is_win === 1 ? (
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "green",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      >
                        + {Number(item.ploss).toLocaleString()} usdt
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "red",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      >
                        - {Number(item.ploss).toLocaleString()} usdt
                      </Typography>
                    )}
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
    </Box>
  );
}
