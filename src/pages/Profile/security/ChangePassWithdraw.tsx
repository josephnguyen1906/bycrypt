import { updatePassword, updatePaymentPassword } from "@/services/User.service";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
type iProps = {
  user: any;
};

export default function ChangePassWithdraw({ user }: iProps) {
  const { t } = useTranslation();

  const [oldPassword, setOldPassword] = useState<string | null>(null);
  const [newPaymentPassword, setNewPaymentPassword] = useState("");
  const [confirmPaymentPassword, setConfirmPaymentPassword] = useState("");
  const handleSubmitPayment = async (e: any) => {
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
          } else {
            toast.error(t("Toast.change_pass7"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "80%",
        },
        margin: "auto",
        textAlign: {
          xs: "Center",
          sm: "left",
        },
        mt: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#fff" }}
      >
        {t("ProfilePage.change_pay_title")}
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        gutterBottom
        sx={{ color: "#fff" }}
      >
        * {t("ProfilePage.change_pay_note")}
      </Typography>
      <form onSubmit={handleSubmitPayment}>
        {user && user.wdstatus === 1 && (
          <TextField
            fullWidth
            label={t("ProfilePage.change_label1")}
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            margin="normal"
            required
            helperText={t("ProfilePage.helper_text1")}
            InputLabelProps={{
              sx: {
                color: "#fff",
                "&.Mui-focused": {
                  color: "#fff", // giữ màu trắng khi label floating
                },
              }, // Label màu trắng
            }}
            InputProps={{
              sx: {
                color: "#fff", // Chữ nhập vào màu trắng
                "& .MuiInputBase-input::placeholder": {
                  color: "#fff", // Placeholder màu trắng
                  opacity: 1,
                },
              },
            }}
            FormHelperTextProps={{
              sx: { color: "#fff" }, // HelperText màu trắng
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#fff",
                },
                "&:hover fieldset": {
                  borderColor: "#fff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fff",
                },
              },
            }}
          />
        )}
        <TextField
          fullWidth
          label={t("ProfilePage.change_label2")}
          type="password"
          value={newPaymentPassword}
          onChange={(e) => setNewPaymentPassword(e.target.value)}
          margin="normal"
          required
          helperText={t("ProfilePage.helper_text2")}
          InputLabelProps={{
            sx: {
              color: "#fff",
              "&.Mui-focused": {
                color: "#fff", // giữ màu trắng khi label floating
              },
            }, // Label màu trắng
          }}
          InputProps={{
            sx: {
              color: "#fff", // Chữ nhập vào màu trắng
              "& .MuiInputBase-input::placeholder": {
                color: "#fff", // Placeholder màu trắng
                opacity: 1,
              },
            },
          }}
          FormHelperTextProps={{
            sx: { color: "#fff" }, // HelperText màu trắng
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fff",
              },
              "&:hover fieldset": {
                borderColor: "#fff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label={t("ProfilePage.change_label3")}
          type="password"
          value={confirmPaymentPassword}
          onChange={(e) => setConfirmPaymentPassword(e.target.value)}
          margin="normal"
          required
          helperText={t("ProfilePage.helper_text3")}
          InputLabelProps={{
            sx: {
              color: "#fff",
              "&.Mui-focused": {
                color: "#fff", // giữ màu trắng khi label floating
              },
            }, // Label màu trắng
          }}
          InputProps={{
            sx: {
              color: "#fff", // Chữ nhập vào màu trắng
              "& .MuiInputBase-input::placeholder": {
                color: "#fff", // Placeholder màu trắng
                opacity: 1,
              },
            },
          }}
          FormHelperTextProps={{
            sx: { color: "#fff" }, // HelperText màu trắng
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fff",
              },
              "&:hover fieldset": {
                borderColor: "#fff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
          }}
        />
        <Button
          type="submit"
          sx={{
            mt: 2,
            backgroundColor: "#fff",
            color: "black",
            width: "250px",
            height: "50px",
            borderRadius: "15px",
            textTransform: "capitalize",
          }}
        >
          {t("ProfilePage.button_change")}
        </Button>
      </form>
    </Box>
  );
}
