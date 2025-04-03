"use client";
import LoadingComponent from "@/components/Loading";
import useAuth from "@/hook/useAuth";
import {
  ProfileBettingHistory,
  ProfileDeposit,
  ProfileDiscount,
  ProfileGeneral,
  ProfileTransHistory,
  ProfileUserInfo,
  ProfileWBankAccount,
  ProfileWithdraw,
} from "@/shared/Svgs/Svg.component";
import { formatCurrency } from "@/utils/formatMoney";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function ChangePass() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // handle steps
  const steps = [
    {
      icon: <ProfileGeneral height="24px" width="24px" />, // Replace with actual icon components
      title: "General",
      link: "/profile/",
    },
    {
      icon: <ProfileUserInfo height="24px" width="24px" />,
      title: "Personal Details",
      link: "/profile/personal-detail",
    },
    {
      icon: <ProfileDeposit height="24px" width="24px" />,
      title: "Deposit Money",
      link: "/profile/account-deposit",
    },
    {
      icon: <ProfileWithdraw height="24px" width="24px" />,
      title: "Withdraw Money",
      link: "/profile/account-withdraw",
    },
    {
      icon: <ProfileWBankAccount height="24px" width="24px" />,
      title: "Bank Account",
      link: "/profile/bank-account",
    },
    {
      icon: <ProfileDiscount height="24px" width="24px" />,
      title: "Promotion",
      link: "/profile/account-promotion",
    },
    {
      icon: <ProfileBettingHistory height="24px" width="24px" />,
      title: "Betting History",
      link: "/profile/betting-history",
    },
    {
      icon: <ProfileTransHistory height="24px" width="24px" />,
      title: "Transaction History",
      link: "/profile/transaction-history",
    },
  ];

  const [activeStep, setActiveStep] = useState<number>(2);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#020D24",
            width: "80%",
            margin: "auto",
            height: "100vh",
            marginTop: 120,
            gap: 30,
          }}
        >
          <Grid
            className="profile-main"
            sx={{
              backgroundColor: "#0F192F",
              borderRadius: 3,
              width: "30%",
              maxWidth: 272,
              textAlign: "center",
            }}
          >
            <Grid sx={{ borderBottom: "1px solid #020d24" }}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -10,
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/images/quyphai17.jpg"
                  sx={{
                    width: 132,
                    height: 132,
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  textAlign: "center",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                {" "}
                {user?.name}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ color: "yellow", textAlign: "center" }}
              >
                {" "}
                {formatCurrency(user?.coin ?? 0)} USD
              </Typography>
            </Grid>

            <Stepper
              connector={<></>}
              orientation="vertical"
              activeStep={activeStep}
              sx={{
                backgroundColor: "#0F192F",
                borderRadius: 3,
                width: "100%",
                maxWidth: "360px",
                maxHeight: "384px",
                height: "384px",
                textAlign: "center",
                position: "relative",
                flexDirection: "column",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              {steps.map((step, index) => (
                <Step key={index} onClick={() => setActiveStep(index)}>
                  <div
                    className={
                      activeStep === index ? "step-label-active" : "step-label"
                    }
                    style={{ height: "48px", cursor: "pointer" }}
                    onClick={() => {
                      if (step.title === "Deposit Money") {
                        window.open(
                          "https://t.me/HitJuwa",
                          "_blank",
                          "noopener,noreferrer"
                        );
                      } else {
                        router.replace(step.link);
                      }
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        fontSize: "16px",
                        gap: "10px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        padding: "12px 24px",
                      }}
                    >
                      {step.icon} {/* Render the icon */}
                      <Typography
                        className={
                          activeStep === index
                            ? "step-title-active"
                            : "step-title"
                        }
                      >
                        {step.title}
                      </Typography>
                    </div>
                  </div>
                </Step>
              ))}
            </Stepper>
          </Grid>

          <CardContent
            sx={{
              width: "65%",
              marginTop: -6,
              borderRadius: 10,
              pt: (theme) => `${theme.spacing(6)} !important`,
            }}
          >
            <Grid
              container
              sx={{
                backgroundColor: "#0F192F",
                width: "100%",
                padding: 4.5,
                borderRadius: "8px",
              }}
            >
              <Grid container item xs={12} md={6} spacing={3.5}>
                <Grid container item xs={24} md={12}>
                  <Typography variant="h5" sx={{ color: "white", padding: 1 }}>
                    Change Password
                  </Typography>
                  <Button>turn back</Button>
                </Grid>

                <Grid item xs={24} md={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="caption"
                      sx={{ color: "#73879a", marginBottom: 1 }}
                    >
                      {" "}
                      Type Current password
                    </Typography>
                    <input
                      style={{
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                        paddingLeft: 10,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={24} md={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="caption"
                      sx={{ color: "#808691", marginBottom: 1 }}
                    >
                      Type New Password
                    </Typography>
                    <input
                      style={{
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                        paddingLeft: 10,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={24} md={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="caption"
                      sx={{ marginBottom: 1, color: "#808691" }}
                    >
                      Type new password again
                    </Typography>
                    <input
                      style={{
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                        paddingLeft: 10,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "green", marginTop: 5 }}
                  >
                    Chang password
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}></Grid>
            </Grid>
          </CardContent>
        </div>
      )}
    </>
  );
}
