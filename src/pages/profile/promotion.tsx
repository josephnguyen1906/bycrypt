"use client";
import LoadingComponent from "@/components/Loading";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import NavigationGame from "@/hook/NavigationGame";
import useAuth from "@/hook/useAuth";
import {
  EmptyIcon,
  GiftBoxIcon,
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

export default function Promotion() {
  const { user, loading } = useAuth();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#0f1a35",
          borderRadius: 2,
          py: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#aaa",
        }}
      >
        <Box textAlign="center">
          <GiftBoxIcon />
          <Typography>Bạn chưa có phần thưởng nào!</Typography>
          <Button
            sx={{
              display: "flex",
              backgroundImage:
                "url(/images/bg-btn.png), conic-gradient(from 0deg at 50% 50%, #085cff 0deg, #2692e0 89.73deg, #263be0 180.18deg, #085cff 1turn)",
              color: "white",
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "14px",
              width: "200px",
              height: "38px",
              border: "none",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              margin: "auto",
              marginTop: "20px",
            }}
          >
            {" "}
            Tham Gia Ngay
          </Button>
        </Box>
      </Box>
    </>
  );
}
