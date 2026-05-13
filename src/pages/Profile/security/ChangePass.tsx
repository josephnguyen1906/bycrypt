"use client";
import { updatePassword } from "@/services/User.service";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function ChangePass() {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (currentPassword && newPassword && confirmPassword) {
      await updatePassword(currentPassword, newPassword, confirmPassword)
        .then((response: any) => {
          if (response.status === true) {
            toast.success(t("Toast.change_pass1"));
          } else {
            toast.error(t("Toast.change_pass2"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
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
            {t("DepositWithdrawPage.LoginPassword")}
          </Typography>
          <IconButton></IconButton>
        </Box>
        <form onSubmit={handleSubmit} style={{ padding: "15px" }}>
          <TextField
            fullWidth
            placeholder={t("ProfilePage.change_label1")}
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            InputProps={{
              sx: {
                color: "#ffffffe6",
                background: "#3b4338",
                borderRadius: "20px",
                "& .MuiInputBase-input::placeholder": {
                  color: "#ffffffe6", // Placeholder màu trắng
                  opacity: 1,
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "12px",
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />

          <TextField
            fullWidth
            placeholder={t("ProfilePage.change_label2")}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            InputProps={{
              sx: {
                color: "#ffffffe6",
                background: "#3b4338",
                borderRadius: "20px",
                "& .MuiInputBase-input::placeholder": {
                  color: "#ffffffe6", // Placeholder màu trắng
                  opacity: 1,
                },
              },
            }}
            sx={{
              mt: "10px",
              "& .MuiOutlinedInput-root": {
                fontSize: "12px",
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <TextField
            fullWidth
            placeholder={t("ProfilePage.change_label3")}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              sx: {
                color: "#ffffffe6",
                background: "#3b4338",
                borderRadius: "20px",
                "& .MuiInputBase-input::placeholder": {
                  color: "#ffffffe6", // Placeholder màu trắng
                  opacity: 1,
                },
              },
            }}
            sx={{
              mt: "10px",
              "& .MuiOutlinedInput-root": {
                fontSize: "12px",
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
          <Button
            type="submit"
            disabled={loading}
            sx={{
              mt: 3,
              backgroundColor: "#34d399",
              color: "black",
              width: "100%",
              height: "50px",
              borderRadius: "15px",
              textTransform: "capitalize",
              ":hover": {
                backgroundColor: "#34d399",
              },
            }}
          >
            {t("ProfilePage.button_change")}
          </Button>
        </form>
      </Box>
    </Box>
  );
}
