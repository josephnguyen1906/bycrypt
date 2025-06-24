"use client";
import LinearWithValueLabel from "@/components/Input/LinearWithValueLabel";
import useAuth from "@/hook/useAuth";
import {
  getContractjc,
  getContractpc,
  getNormalmin,
} from "@/services/User.service";
import {
  NotFoundIcon,
  UserIcon,
  VerifiedIcon,
  WarningIcon,
} from "@/shared/Svgs/Svg.component";
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
export default function NormalMin() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [history, setHisstory] = useState<any>(null);
  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getNormalmin();
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
              src={user?.username} // Replace with actual profile image path
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
            <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                {t("ProfilePage.country")}
              </Typography>
              <Typography sx={{ color: "#fff" }}>{user?.addr} </Typography>
            </Box>
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
                {t("HistoryPage.tab3")}
              </Typography>
              {history && history.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  {history.map((item: any, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "calc(45% - 20px)",
                        },
                        border: "1px solid #909090",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={item.imgs}
                        alt={item.title}
                        style={{
                          width: "100px",
                          height: "auto",
                          borderRadius: "10px",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            marginTop: "10px",
                            color: "#fff",
                            fontSize: "16px",
                          }}
                        >
                          {item.kjtitle}
                        </Typography>
                        <Typography
                          sx={{
                            paddingTop: "5px",
                            fontSize: "10px",
                            color: "#666",
                            paddingBottom: "10px",
                          }}
                        >
                          {t("MiningPage.type")}:{" "}
                          {item.type === 1
                            ? t("MiningPage.type2")
                            : t("MiningPage.type3")}
                        </Typography>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "10px" }}
                          >
                            {t("HistoryPage.cycle")}: {item.cycle}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "10px" }}
                          >
                            {t("HistoryPage.rate")}: {item.sharebl || 0} %
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "10px" }}
                          >
                            {t("HistoryPage.Revenue")}: {item.synum}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "10px" }}
                          >
                            {t("HistoryPage.status")} :{" "}
                            {item.type === 1
                              ? t("HistoryPage.mining1")
                              : item.type === 2
                              ? t("HistoryPage.mining2")
                              : t("HistoryPage.mining3")}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "10px" }}
                          >
                            {t("HistoryPage.Output")} : {item.outcoin}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "10px" }}
                          >
                            {t("HistoryPage.Produce")}: {item.outnum} coin
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "10px" }}
                          >
                            {t("HistoryPage.Produce")}: {item.outusdt} usdt
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "10px" }}
                          >
                            {t("HistoryPage.Freeze")}:{" "}
                            {item.djout === 1 ? "No" : "Yes"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{ width: "100%", textAlign: "center", padding: "20px" }}
                >
                  <NotFoundIcon width="100px" height="100px" />
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", textAlign: "center" }}
                  >
                    {t("HistoryPage.mining_status")}
                  </Typography>
                </Box>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
