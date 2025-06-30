"use client";
import useAuth from "@/hook/useAuth";
import { getContractjc, getContractpc } from "@/services/User.service";
import {
  NotFoundIcon,
  UserIcon,
  VerifiedIcon,
  WarningIcon,
} from "@/shared/Svgs/Svg.component";
import { formatDateTime } from "@/utils/formatDateTime";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
export default function CloseCommand() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [history, setHisstory] = useState<any>(null);
  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getContractpc();
        if (res.status === true) {
          setHisstory(res.data);
        }
      } catch (errors: any) {
        toast.error(errors?.message);
      }
    };
    referral();
  }, []);
  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Box
        sx={{
          padding: 2,
          width: {
            xs: "100%",
            sm: "80%",
          },
          margin: "0 auto",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "flex",
            },
            alignItems: "center",
            gap: 2, // Space between elements
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 3,
                sm: 2,
              },
              paddingBottom: {
                xs: "10px",
                sm: "0px",
              },
            }}
          >
            <Avatar
              src={user?.username} // Replace with actual profile image pathh
              alt={user?.username}
              sx={{
                width: {
                  xs: 50,
                  sm: 80,
                },
                height: {
                  xs: 50,
                  sm: 80,
                },
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                borderRight: {
                  xs: "none",
                  sm: "1px solid #ccc",
                },
                paddingRight: 2,
                marginRight: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "25px",
                  },
                  color: "#fff",
                }}
              >
                {user?.username}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "18px",
                  },
                  color: "lightgrey",
                }}
              >
                {user?.phone}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "grid",
                },
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Email
              </Typography>
              <Typography sx={{ color: "#fff" }}>{user?.username} </Typography>
            </Box>
            {/* hide country */}
            <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                {t("ProfilePage.Identity")}
              </Typography>
              {user?.rzstatus === 0 ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",

                    gap: "5px",
                  }}
                >
                  <WarningIcon /> {t("ProfilePage.Identity1")}
                </Typography>
              ) : user?.rzstatus === 1 ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",

                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <WarningIcon /> {t("ProfilePage.Identity2")}
                </Typography>
              ) : user?.rzstatus === 2 ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",

                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <VerifiedIcon /> {t("ProfilePage.Identity3")}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",

                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <WarningIcon /> {t("ProfilePage.Identity4")}
                </Typography>
              )}
            </Box>
            {/* <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                {t("ProfilePage.country")}
              </Typography>
              <Typography sx={{ color: "#fff" }}>{user?.addr} </Typography>
            </Box> */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "grid",
                },
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                {t("ProfilePage.Trading")}
              </Typography>
              <Typography sx={{ color: "#fff" }}>
                {t("ProfilePage.Regular")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Grid container spacing={1}>
          {/* Left Section */}
          <Grid item xs={12} sm={12}>
            <StyledPaper
              sx={{
                display: "grid",
                gap: 2,
                background: "#000",
                border: "1px solid gray",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  mb: 3,
                  color: "#fff",
                }}
              >
                {t("HistoryPage.tab2")}
              </Typography>
              <TableContainer component={Paper} sx={{ background: "#000" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>
                        {t("ProfilePage.tran_pair")}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {t("ProfilePage.tran_type")}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {" "}
                        {t("HistoryPage.status")}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {t("HistoryPage.status_Command")}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {t("HistoryPage.Open")}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {" "}
                        {t("HistoryPage.close")}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {t("HistoryPage.profit")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history && history.length > 0 ? (
                      history?.map((row: any) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ color: "#fff" }}
                          >
                            {row.hyzd === 1 ? "Buy" : "Sell"}
                          </TableCell>
                          <TableCell sx={{ color: "#fff" }}>
                            {row.coinname}
                          </TableCell>
                          <TableCell sx={{ color: "#fff" }}>
                            {user?.status === 1
                              ? t("HistoryPage.status1")
                              : user?.status === 2
                              ? t("HistoryPage.status2")
                              : t("HistoryPage.status3")}
                          </TableCell>
                          <TableCell sx={{ color: "#fff" }}>
                            {row.is_win === 1 ? "Win" : "Lose"}
                          </TableCell>

                          <TableCell sx={{ color: "#fff" }}>
                            {formatDateTime(row.buytime)}
                          </TableCell>
                          <TableCell sx={{ color: "#fff" }}>
                            {formatDateTime(row.selltime)}
                          </TableCell>
                          <TableCell sx={{ color: "#fff" }}>
                            {row.ploss}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} align="center">
                          <NotFoundIcon width="100px" height="100px" />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
