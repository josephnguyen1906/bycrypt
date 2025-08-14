"use client";
import useAuth from "@/hook/useAuth";
import { getReferral } from "@/services/User.service";
import {
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
export default function InvitationPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [referral, setReferral] = useState<any>(null);
  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getReferral();
        if (res.status === true) {
          setReferral(res.data);
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
                {`*******${user?.phone?.slice(-3)}` || "*******727"}
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
        <Grid container spacing={2}>
          {/* Left Section */}
          <Grid item xs={12} sm={8}>
            <StyledPaper
              sx={{
                display: "grid",
                gap: 2,
                background: "#000",
                border: "1px solid gray",
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: "30px", fontWeight: "bold", color: "#fff" }}
              >
                {t("ProfilePage.Group")}
              </Typography>
              <Box
                sx={{
                  display: {
                    xs: "grid",
                    sm: "flex",
                  },
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    sm: "",
                  },
                  gap: 4,
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "bold", color: "#fff" }}
                  >
                    {t("ProfilePage.Member")}:
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                    {referral?.carr.allrz} {t("ProfilePage.Verified_pe")}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                    {referral?.carr.allnrz} {t("ProfilePage.Unverified_pe")}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "bold", color: "#fff" }}
                  >
                    {t("ProfilePage.generation1")}:
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                    {referral?.carr.one} {t("ProfilePage.Verified_pe")}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                    {referral?.carr.onen} {t("ProfilePage.Unverified_pe")}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "bold", color: "#fff" }}
                  >
                    {t("ProfilePage.generation2")}:
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                    {referral?.carr.two} {t("ProfilePage.Verified_pe")}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                    {referral?.carr.twon} {t("ProfilePage.Unverified_pe")}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: "bold", color: "#fff" }}
                  >
                    {t("ProfilePage.generation3")}:
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                    {referral?.carr.three} {t("ProfilePage.Verified_pe")}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                    {referral?.carr.threen} {t("ProfilePage.Unverified_pe")}
                  </Typography>
                </Box>
              </Box>
            </StyledPaper>
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
                {t("ProfilePage.diary")}
              </Typography>
              <TableContainer component={Paper} sx={{ background: "#000" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>
                        {t("ProfilePage.Login_type")}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {t("ProfilePage.Login_IP")}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {t("ProfilePage.Login_date")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {referral?.loglist?.map((row: any) => (
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
                          {row.remark}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {row.addip}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {formatDateTime(row?.addtime)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </Grid>
          {/* Right Section */}
          <Grid item xs={12} sm={3}>
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
                sx={{ fontSize: "20px", fontWeight: "bold", color: "#fff" }}
              >
                {t("ProfilePage.menu4")}
              </Typography>
              <Box sx={{ mt: 1, mb: 2, textAlign: "center" }}>
                <Box
                  component="img"
                  src={referral?.qrcode_url}
                  alt="QR Code"
                  sx={{ width: 150, height: 150 }}
                />
                <Typography sx={{ fontSize: "16px", color: "#fff" }}>
                  {t("ProfilePage.my_referral")}: {referral?.invit}
                </Typography>
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
