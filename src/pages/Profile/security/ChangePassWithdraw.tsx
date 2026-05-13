"use client";
import { updatePassword, updatePaymentPassword } from "@/services/User.service";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useUserStore } from "@/stores/useUserStore";
import LoadingComponent from "@/components/Loading";

export default function ChangePassWithdraw() {
  const { t } = useTranslation();
  const { user, loading, fetchUser } = useUserStore();
  const [oldPassword, setOldPassword] = useState<string | null>(null);
  const [load, setLoad] = useState(false);
  const [newPaymentPassword, setNewPaymentPassword] = useState("");
  const [confirmPaymentPassword, setConfirmPaymentPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading && load) {
    return <LoadingComponent />;
  }

  const handleSubmitPayment = async (e: any) => {
    setLoad(true);
    e.preventDefault();
    if (newPaymentPassword !== confirmPaymentPassword) {
      toast.warning(t("Toast.change_pass4"));
      return;
    }
    if (oldPassword && newPaymentPassword && confirmPaymentPassword) {
      const formData = new FormData();
      formData.append("current_paypassword", oldPassword);
      formData.append("paypassword", newPaymentPassword);
      formData.append("confirm_paypassword", confirmPaymentPassword);
      await updatePaymentPassword(formData)
        .then((response: any) => {
          if (response.status === true) {
            toast.success(t("Toast.change_pass4"));
            setNewPaymentPassword("");
            setOldPassword("");
            setConfirmPaymentPassword("");
            fetchUser();
          } else {
            toast.error(t("Toast.change_pass5"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    if (!oldPassword && newPaymentPassword && confirmPaymentPassword) {
      const formData = new FormData();
      formData.append("paypassword", newPaymentPassword);
      formData.append("confirm_paypassword", confirmPaymentPassword);
      await updatePaymentPassword(formData)
        .then((response: any) => {
          if (response.status === true) {
            toast.success(t("Toast.change_pass6"));
            fetchUser();
            setNewPaymentPassword("");
            setOldPassword("");
            setConfirmPaymentPassword("");
          } else {
            toast.error(t("Toast.change_pass7"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    setLoad(false);
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
            {t("DepositWithdrawPage.Password")}
          </Typography>
          <IconButton></IconButton>
        </Box>
        <Typography
          sx={{
            width: "90%",
            p: 2,
            background: "#3b82f61a",
            color: "#60a5fa",
            border: "1px solid #3b82f633",
            fontSize: "12px",
            margin: "auto",
            borderRadius: "10px",
          }}
        >
          {t("ProfilePage.change_pay_note")}
        </Typography>
        <form onSubmit={handleSubmitPayment} style={{ padding: "15px" }}>
          {user && user.wdstatus === 1 && (
            <TextField
              fullWidth
              placeholder={t("ProfilePage.change_label1")}
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
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
                  mt: 1,
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
          )}
          <TextField
            fullWidth
            placeholder={t("ProfilePage.change_label2")}
            type="password"
            value={newPaymentPassword}
            onChange={(e) => setNewPaymentPassword(e.target.value)}
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
                mt: 1,
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
            value={confirmPaymentPassword}
            onChange={(e) => setConfirmPaymentPassword(e.target.value)}
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
                mt: 1,
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
