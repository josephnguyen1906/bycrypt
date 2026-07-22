"use client";
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Avatar,
  ButtonBase,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SecurityIcon from "@mui/icons-material/Security";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useRouter } from "next/navigation";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";
export default function SecurityPage() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "448px",
        },
        minHeight: "100vh",
        mx: "auto",
        bgcolor: "#0E0F18",
        color: "#fff",
        pb: 10,
      }}
    >
      <Box sx={{ width: "90%", margin: "auto", pt: 2 }}>
        <IconButton
          onClick={() => router.back()}
          sx={{
            transform: "translateY(-50%)",

            padding: 0,
            pt: 2,

            color: "#fff",

            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: 1.2,
            mb: "14px",
          }}
        >
          {t("Menu.security")}
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            mb: "7px",
          }}
        >
          {t("LoginPage.title17")}
        </Typography>

        <Typography
          sx={{
            fontSize: "12px",
            lineHeight: 1.35,
            color: "#9295A3",
            maxWidth: "315px",
            mb: "20px",
          }}
        >
          {t("LoginPage.title18")}
        </Typography>

        {/* 2FA buttons */}
        <Stack
          direction="row"
          spacing="10px"
          sx={{
            width: "100%",
          }}
        >
          <SecurityMethod
            icon={<SecurityIcon />}
            label="Google Authenticator"
            onClick={() => router.push("/google-authenticator")}
          />

          <SecurityMethod
            icon={<EmailOutlinedIcon />}
            label={t("ChangePass.title7")}
            onClick={() => router.push("/email-verification")}
          />
        </Stack>

        {/* Menu */}
        <Stack
          sx={{
            mt: "4px",
          }}
        >
          <SecurityMenuItem
            label={t("ChangePass.title13")}
            onClick={() => router.push("/change-login-pass")}
          />

          <SecurityMenuItem
            label={t("ChangePass.title1")}
            onClick={() => router.push("/change-tran-pass")}
          />

          {/* <SecurityMenuItem label="Đặt lại thủ công" onClick={onManualReset} /> */}
        </Stack>
      </Box>
    </Box>
  );
}

interface SecurityMethodProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function SecurityMethod({ icon, label, onClick }: SecurityMethodProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "50%",
        height: "88px",
        border: "1px solid #74798D",
        bgcolor: "#202238",
        display: "block",
        textAlign: "left",
        transition: "all .2s ease",

        "&:hover": {
          bgcolor: "#272A45",
          borderColor: "#A7ABBE",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          px: "18px",
          gap: "10px",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Avatar
            sx={{
              width: 31,
              height: 31,
              bgcolor: "#D9DCE3",
              color: "#73798A",
            }}
          >
            {icon}
          </Avatar>

          {/* Warning badge */}
          <Box
            sx={{
              position: "absolute",
              right: -7,
              bottom: -2,
              width: 17,
              height: 17,
              borderRadius: "50%",
              bgcolor: "#FFD43B",
              color: "#555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            !
          </Box>
        </Box>

        {/* Text */}
        <Typography
          sx={{
            flex: 1,
            fontSize: "12px",
            lineHeight: 1.25,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          {label}
        </Typography>

        <ArrowForwardIosIcon
          sx={{
            fontSize: 15,
            color: "#B9BDCA",
          }}
        />
      </Box>
    </ButtonBase>
  );
}

interface SecurityMenuItemProps {
  label: string;
  onClick?: () => void;
}

function SecurityMenuItem({ label, onClick }: SecurityMenuItemProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "100%",
        height: "48px",
        justifyContent: "space-between",
        textAlign: "left",
        borderRadius: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#fff",
        }}
      >
        {label}
      </Typography>

      <ArrowForwardIosIcon
        sx={{
          fontSize: 14,
          color: "#B9BDCA",
          mr: "5px",
        }}
      />
    </ButtonBase>
  );
}
