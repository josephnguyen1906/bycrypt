"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { updatePassword } from "@/services/User.service";

export default function ChangePass() {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.warning("Mật khẩu mới không trùng khớp!");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return;
    }

    setLoading(true);

    try {
      const response: any = await updatePassword(
        currentPassword,
        newPassword,
        confirmPassword,
      );

      if (response.status === true) {
        toast.success(t("Toast.change_pass1"));

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(t("Toast.change_pass2"));
      }
    } catch (error: any) {
      toast.error(error?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const passwordInputSx = {
    "& .MuiOutlinedInput-root": {
      height: "41px",
      backgroundColor: "#1A1B24",
      borderRadius: "3px",
      fontSize: "13px",
      color: "#fff",
      paddingRight: "8px",

      "& fieldset": {
        border: "none",
      },

      "&:hover fieldset": {
        border: "none",
      },

      "&.Mui-focused fieldset": {
        border: "1px solid #2A64C4",
      },
    },

    "& .MuiInputBase-input": {
      height: "41px",
      padding: "0 18px",
      boxSizing: "border-box",
      color: "#fff",
    },

    "& .MuiInputBase-input::placeholder": {
      color: "#8B8D98",
      opacity: 1,
    },
  };

  const ClearIcon = () => (
    <CancelIcon
      sx={{
        fontSize: "13px",
        color: "#A7A9B2",
        mr: "8px",
      }}
    />
  );

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pb: "100px",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "410px",
          },

          minHeight: {
            xs: "100vh",
            sm: "calc(100vh - 10px)",
          },

          backgroundColor: "#0D0E16",

          margin: "0 auto",

          overflow: "hidden",
        }}
      >
        {/* ================= HEADER ================= */}
        <Box
          sx={{
            height: "50px",
            width: "100%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            position: "relative",
          }}
        >
          {/* Back button */}
          <IconButton
            onClick={() => router.back()}
            sx={{
              position: "absolute",
              left: "17px",
              top: "50%",
              transform: "translateY(-50%)",

              padding: 0,

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

          {/* Title */}
          <Typography
            sx={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {t("ChangePass.title13")}
          </Typography>
        </Box>

        {/* ================= FORM ================= */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            padding: "10px 15px 30px",
          }}
        >
          {/* ================= MẬT KHẨU CŨ ================= */}
          <Typography
            sx={{
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              mb: "9px",
            }}
          >
            {t("ChangePass.title3")}
          </Typography>

          <TextField
            fullWidth
            placeholder={t("ChangePass.title6")}
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            sx={passwordInputSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ClearIcon />

                    <IconButton
                      size="small"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      sx={{
                        padding: 0,
                        color: "#A7A9B2",
                      }}
                    >
                      {showCurrentPassword ? (
                        <VisibilityIcon sx={{ fontSize: 17 }} />
                      ) : (
                        <VisibilityOffIcon sx={{ fontSize: 17 }} />
                      )}
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          {/* ================= MẬT KHẨU MỚI ================= */}
          <Typography
            sx={{
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,

              mt: "23px",
              mb: "9px",
            }}
          >
            {t("ChangePass.title2")}
          </Typography>

          <TextField
            fullWidth
            placeholder={t("ChangePass.title6")}
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            sx={passwordInputSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ClearIcon />

                    <IconButton
                      size="small"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      sx={{
                        padding: 0,
                        color: "#A7A9B2",
                      }}
                    >
                      {showNewPassword ? (
                        <VisibilityIcon sx={{ fontSize: 17 }} />
                      ) : (
                        <VisibilityOffIcon sx={{ fontSize: 17 }} />
                      )}
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          {/* Password hint */}
          <Typography
            sx={{
              color: "#8B8D98",
              fontSize: "12px",
              mt: "8px",
            }}
          >
            {t("ChangePass.title14")}
          </Typography>

          {/* ================= XÁC NHẬN MẬT KHẨU ================= */}
          <Typography
            sx={{
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,

              mt: "23px",
              mb: "9px",
            }}
          >
            {t("ChangePass.title5")}
          </Typography>

          <TextField
            fullWidth
            placeholder={t("ChangePass.title6")}
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={passwordInputSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ClearIcon />

                    <IconButton
                      size="small"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      sx={{
                        padding: 0,
                        color: "#A7A9B2",
                      }}
                    >
                      {showConfirmPassword ? (
                        <VisibilityIcon sx={{ fontSize: 17 }} />
                      ) : (
                        <VisibilityOffIcon sx={{ fontSize: 17 }} />
                      )}
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          {/* Password hint */}
          <Typography
            sx={{
              color: "#8B8D98",
              fontSize: "12px",
              mt: "8px",
            }}
          >
            {t("ChangePass.title14")}
          </Typography>

          {/* ================= SUBMIT ================= */}
          <Button
            type="submit"
            disabled={loading}
            fullWidth
            sx={{
              height: "41px",

              mt: "29px",

              backgroundColor: "#2196F3",

              color: "#fff",

              borderRadius: "3px",

              fontSize: "14px",
              fontWeight: 500,

              textTransform: "none",

              "&:hover": {
                backgroundColor: "#1E88E5",
              },

              "&.Mui-disabled": {
                backgroundColor: "#1976D2",
                color: "#aaa",
              },
            }}
          >
            {loading ? t("ChangePass.title12") : "OK"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
