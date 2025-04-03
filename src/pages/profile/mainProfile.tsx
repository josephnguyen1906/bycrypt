"use client";
import React, { useEffect, useState } from "react";
// import ProfileMenu from "./menu";
import { Box, Card, Divider, Grid, Step } from "@mui/material";
import {
  ProfileGeneral,
  ProfileUserInfo,
  ProfileDeposit,
  ProfileWithdraw,
  ProfileWBankAccount,
  ProfileDiscount,
  ProfileBettingHistory,
  ProfileTransHistory,
} from "@/shared/Svgs/Svg.component";
import { useRouter } from "next/navigation";
import Stepper from "@mui/material/Stepper";
import "./profile.css";
import MuiStep, { StepProps } from "@mui/material/Step";
import CardContent, { CardContentProps } from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import "./profile.css";
import useAuth from "@/hook/useAuth";
import General from "./general";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import NavigationGame from "@/hook/NavigationGame";
import { formatCurrency } from "@/utils/formatMoney";

function MainProfile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // handle steps
  const steps = [
    {
      icon: <ProfileGeneral fill="green" height="24px" width="24px" />, // Replace with actual icon components
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
      link: "https://t.me/HitJuwa",
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

  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <>
      <Box className="profile-m">
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
            width: {
              xs: "100%",
              sm: "65%",
            },
            borderRadius: 10,
            pt: (theme) => `${theme.spacing(6)} !important`,
          }}
        >
          {loading ? (
            <>
              <SimpleBackdrop />
              <General />
            </>
          ) : (
            <General />
          )}
        </CardContent>
      </Box>
    </>
  );
}

export default MainProfile;
