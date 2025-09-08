import { updatePassword } from "@/services/User.service";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function ChangePass() {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: any) => {
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
        sx={{ fontWeight: "bold", color: "#fff", fontSize: "18px" }}
      >
        {t("ProfilePage.title_change")}
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        gutterBottom
        sx={{ color: "#fff" }}
      >
        * {t("ProfilePage.change_note")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label={t("ProfilePage.change_label1")}
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
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

        <TextField
          fullWidth
          label={t("ProfilePage.change_label2")}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
