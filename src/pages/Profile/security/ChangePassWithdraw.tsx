"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-toastify";
import { updatePaymentPassword } from "@/services/User.service";

const ChangePaymentPassword = () => {
  const { t } = useTranslation();
  const { user, loading, fetchUser } = useUserStore();

  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPaymentPassword, setNewPaymentPassword] = useState("");
  const [confirmPaymentPassword, setConfirmPaymentPassword] = useState("");

  const [verificationCode, setVerificationCode] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [verifyType, setVerifyType] = useState<"email" | "google">("email");

  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPaymentPassword !== confirmPaymentPassword) {
      toast.warning(t("Toast.change_pass4"));
      return;
    }

    setLoad(true);

    try {
      const formData = new FormData();

      if (user?.wdstatus === 1 && oldPassword) {
        formData.append("current_paypassword", oldPassword);
      }

      formData.append("paypassword", newPaymentPassword);
      formData.append("confirm_paypassword", confirmPaymentPassword);

      // Nếu API cần verification code
      formData.append("verification_code", verificationCode);

      // Nếu API cần loại xác minh
      formData.append("verify_type", verifyType);

      const response: any = await updatePaymentPassword(formData);

      if (response.status === true) {
        toast.success(
          user?.wdstatus === 1
            ? t("Toast.change_pass4")
            : t("Toast.change_pass6"),
        );

        setOldPassword("");
        setNewPaymentPassword("");
        setConfirmPaymentPassword("");
        setVerificationCode("");

        fetchUser();
      } else {
        toast.error(
          user?.wdstatus === 1
            ? t("Toast.change_pass5")
            : t("Toast.change_pass7"),
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Có lỗi xảy ra");
    } finally {
      setLoad(false);
    }
  };

  const inputSx = {
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
      padding: "0 18px",
      color: "#fff",
      height: "41px",
      boxSizing: "border-box",
    },

    "& .MuiInputBase-input::placeholder": {
      color: "#888A96",
      opacity: 1,
    },
  };

  if (loading) {
    return <LoadingComponent />;
  }

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
        component="form"
        onSubmit={handleSubmitPayment}
        sx={{
          width: {
            xs: "100%",
            sm: "410px",
          },
          minHeight: "100vh",
          margin: "0 auto",
          backgroundColor: "#0D0E16",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <IconButton
            onClick={() => router.back()}
            sx={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#fff",
              padding: "4px",
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
              fontSize: "15px",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            {t("ChangePass.title1")}
          </Typography>
        </Box>

        {/* ================= CONTENT ================= */}
        <Box
          sx={{
            padding: "4px 19px 30px",
          }}
        >
          {/* Mật khẩu mới */}
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              mb: "9px",
            }}
          >
            {t("ChangePass.title2")}
          </Typography>

          <TextField
            fullWidth
            placeholder={t("ChangePass.title6")}
            type={showNewPassword ? "text" : "password"}
            value={newPaymentPassword}
            onChange={(e) => setNewPaymentPassword(e.target.value)}
            required
            sx={inputSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    sx={{
                      color: "#999BA5",
                      padding: "4px",
                    }}
                  >
                    {showNewPassword ? (
                      <VisibilityIcon sx={{ fontSize: 17 }} />
                    ) : (
                      <VisibilityOffIcon sx={{ fontSize: 17 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography
            sx={{
              fontSize: "12px",
              color: "#8B8D98",
              mt: "8px",
              mb: "20px",
            }}
          >
            {t("ChangePass.title4")}
          </Typography>

          {/* Xác nhận mật khẩu mới */}
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              mb: "9px",
            }}
          >
            {t("ChangePass.title5")}
          </Typography>

          <TextField
            fullWidth
            placeholder={t("ChangePass.title6")}
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPaymentPassword}
            onChange={(e) => setConfirmPaymentPassword(e.target.value)}
            required
            sx={inputSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    sx={{
                      color: "#999BA5",
                      padding: "4px",
                    }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityIcon sx={{ fontSize: 17 }} />
                    ) : (
                      <VisibilityOffIcon sx={{ fontSize: 17 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography
            sx={{
              fontSize: "12px",
              color: "#8B8D98",
              mt: "8px",
              mb: "28px",
            }}
          >
            {t("ChangePass.title4")}
          </Typography>

          {/* ================= VERIFY TYPE ================= */}
          <Stack>
            {/* Email */}
            <Box
              onClick={() => setVerifyType("email")}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                height: "30px",
              }}
            >
              <Radio
                checked={verifyType === "email"}
                onChange={() => setVerifyType("email")}
                sx={{
                  padding: "0",
                  mr: "10px",
                  color: "#777984",

                  "&.Mui-checked": {
                    color: "#00C853",
                  },

                  "& .MuiSvgIcon-root": {
                    fontSize: "16px",
                  },
                }}
              />

              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                {t("ChangePass.title7")}
              </Typography>
            </Box>

            {/* Google */}
            <Box
              onClick={() => setVerifyType("google")}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                height: "30px",
              }}
            >
              <Radio
                checked={verifyType === "google"}
                onChange={() => setVerifyType("google")}
                sx={{
                  padding: "0",
                  mr: "10px",
                  color: "#777984",

                  "&.Mui-checked": {
                    color: "#00C853",
                  },

                  "& .MuiSvgIcon-root": {
                    fontSize: "16px",
                  },
                }}
              />

              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                {t("ChangePass.title8")}
              </Typography>
            </Box>
          </Stack>

          {/* ================= VERIFICATION CODE ================= */}
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              mt: "24px",
              mb: "9px",
            }}
          >
            {t("ChangePass.title9")}
          </Typography>

          <TextField
            fullWidth
            placeholder={t("ChangePass.title10")}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            sx={inputSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    type="button"
                    sx={{
                      minWidth: "auto",
                      padding: 0,
                      color: "#00C853",
                      fontSize: "12px",
                      textTransform: "none",
                      whiteSpace: "nowrap",

                      "&:hover": {
                        background: "transparent",
                        color: "#00E676",
                      },
                    }}
                  >
                    {t("ChangePass.title11")}
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          {/* ================= SUBMIT ================= */}
          <Button
            type="submit"
            disabled={load}
            fullWidth
            sx={{
              height: "41px",
              mt: "10px",

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
            {load ? t("ChangePass.title12") : "OK"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePaymentPassword;
