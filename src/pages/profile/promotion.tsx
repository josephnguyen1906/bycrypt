"use client";
import LoadingComponent from "@/components/Loading";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import NavigationGame from "@/hook/NavigationGame";
import useAuth from "@/hook/useAuth";
import {
  ProfileBettingHistory,
  ProfileDeposit,
  ProfileDiscount,
  ProfileEmptyIcon,
  ProfileGeneral,
  ProfileTransHistory,
  ProfileUserInfo,
  ProfileWBankAccount,
  ProfileWithdraw,
} from "@/shared/Svgs/Svg.component";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Grid,
  Step,
  Stepper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./profile.css";
import { formatCurrency } from "@/utils/formatMoney";
export default function Promotion() {
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
      icon: <ProfileDiscount fill="green" height="24px" width="24px" />,
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

  const [activeStep, setActiveStep] = useState<number>(5);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "#020D24",
          width: { xs: "90%", sm: "80%" },
          height: { xs: "1000px", sm: "800px" },
          paddingTop: { xs: 0, sm: 20 },
          // paddingBottom: { xs: 60, sm: 0 },
          margin: "auto",
          gap: 2,
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
                    if (
                      step.title === "Deposit Money" &&
                      activeStep === index
                    ) {
                      NavigationGame("https://t.me/HitJuwa");
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
            width: { xs: "100%", sm: "65%" },
            marginTop: -8,
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
            <Grid container width={"100%"} spacing={1}>
              <Grid container item xs={24} md={12}>
                <Typography variant="h6" sx={{ color: "white", padding: 2 }}>
                  Promotion
                </Typography>
                {loading ? (
                  <>
                    <SimpleBackdrop />
                  </>
                ) : (
                  <Grid
                    width="100%"
                    container
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: {
                        xs: "520px",
                        sm: "320px",
                      },
                      // paddingRight: ,
                    }}
                  >
                    <ProfileEmptyIcon height="78px" width="96px" />
                    <h2
                      style={{
                        color: "white",
                        marginBottom: 3,
                      }}
                    >
                      YOU HAVE NOT JOINED ANY PROMOTION PROGRAM
                    </h2>
                    <Typography sx={{ marginBottom: -3.5 }} variant="body2">
                      You have not participated in any promotional programs yet.
                    </Typography>
                    <Typography marginBottom={3} variant="body2">
                      Hurry up and choose a promotional package to get a chance
                      to double your deposit amount!
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "green" }}
                    >
                      Deposit Now!
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </>
  );
}
