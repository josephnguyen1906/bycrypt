"use client";
import { useEffect, useRef, useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Autocomplete,
  IconButton,
} from "@mui/material";
import {
  updateBank,
  updatePassword,
  updatePaymentPassword,
} from "@/services/User.service";
import { toast } from "react-toastify";
import useAuth from "@/hook/useAuth";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { NextIcon } from "@/shared/Svgs/Svg.component";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function ChangePassword() {
  const { t } = useTranslation();
  const { user, refetchUser } = useAuth();
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#141A1F",
        paddingTop: {
          xs: "0px",
          sm: "80px",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "500px" },
          backgroundColor: "#202630",
          margin: "auto",
          minHeight: { xs: "100vh", sm: "700px" },
          borderRadius: {
            xs: 0,
            sm: "16px",
          },
          padding: "16px",
          position: "relative",
          pb: {
            xs: "120px",
            sm: 0,
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          p={2}
        >
          <IconButton
            onClick={() => router.back()}
            sx={{ background: "#232932" }}
          >
            <ArrowBackIosNewIcon
              sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
            />
          </IconButton>

          <Typography
            fontSize={20}
            fontWeight={600}
            textAlign={"center"}
            color={"white"}
          >
            {t("ProfilePage.menu2")}
          </Typography>
          <IconButton></IconButton>
        </Box>
        <Box
          onClick={() => router.push("/change-login-pass")}
          sx={{
            display: "flex",
            borderTop: "1px solid #1f2937",
            borderBottom: "1px solid #1f2937",
            height: "50px",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "space-between",
            p: "0px 10px",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            {t("DepositWithdrawPage.LoginPassword")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "#9ca3af", fontSize: "12px" }}>
              {t("DepositWithdrawPage.Revise")}
            </Typography>
            <IconButton sx={{ background: "none" }}>
              <NextIcon width="14px" height="14px" fill="#9ca3af" />
            </IconButton>
          </Box>
        </Box>
        <Box
          onClick={() => router.push("/change-tran-pass")}
          sx={{
            display: "flex",
            borderTop: "1px solid #1f2937",
            borderBottom: "1px solid #1f2937",
            height: "50px",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "space-between",
            p: "0px 10px",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "12px" }}>
            {t("DepositWithdrawPage.Password")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "#9ca3af", fontSize: "12px" }}>
              {t("DepositWithdrawPage.Revise")}
            </Typography>
            <IconButton sx={{ background: "none" }}>
              <NextIcon width="14px" height="14px" fill="#9ca3af" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
