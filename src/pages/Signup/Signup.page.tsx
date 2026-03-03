"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import { sendCode, signupUser } from "@/services/User.service";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PreviousIcon } from "@/shared/Svgs/Svg.component";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loadding, setLoadding] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleUsername = (e: any) => setEmail(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const router = useRouter();

  const handleSendInvite = async () => {
    if (!email) return;

    try {
      setSending(true);
      const formData = new FormData();
      formData.append("email", email);
      sendCode(formData)
        .then((res: any) => {
          if (res?.status === true) {
            toast.success("Gửi mail thành công");
          } else {
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          console.error("API error:", err);
          toast.error(err?.message || "Lỗi không xác định");
        });

      // Nếu thành công → bắt đầu countdown
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const signup = (e: React.FormEvent) => {
    // e.preventDefault();
    if (email !== "" && password !== "") {
      setLoadding(true);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("verification_code", inviteCode);
      signupUser(formData)
        .then((res: any) => {
          if (res?.status === true) {
            toast.success("Đăng ký thành công");
            window.location.href = "/login";
          } else {
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          console.error("API error:", err);
          toast.error(err?.message || "Lỗi không xác định");
        });
    } else {
      toast.error("Tên đăng nhập và mật khẩu không được để trống");
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#111827",
        paddingTop: "50px",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#111827",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box sx={{ maxWidth: "400px", width: "100%" }}>
          <IconButton
            sx={{
              background: "#1f2937",
              position: "fixed",
              top: "20px",
              "&:hover": {
                background: "#2a313aff",
              },
            }}
            onClick={() => router.back()}
          >
            <PreviousIcon width="20px" height="20px" />
          </IconButton>
          <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
            {t("SignupPage.title")}
          </Typography>

          <form>
            <InputLabel sx={{ color: "white", mt: "10px" }}>
              {t("SignupPage.title1")}{" "}
            </InputLabel>
            <TextField
              fullWidth
              placeholder={t("LoginPage.value1")}
              variant="outlined"
              value={email}
              type="email"
              onChange={handleUsername}
              sx={{
                mb: 3,

                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  backgroundColor: "#1e2a3a",
                  color: "#fff",

                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },

                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.3)",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#4ade80",
                    borderWidth: "1px",
                  },
                },

                "& .MuiInputBase-input": {
                  color: "#fff",

                  "&::placeholder": {
                    color: "#7c8aa0",
                    opacity: 1,
                  },

                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px #1e2a3a inset",
                    WebkitTextFillColor: "#fff",
                  },
                },
              }}
            />

            <InputLabel sx={{ color: "white" }}>
              {t("SignupPage.title2")}
            </InputLabel>
            <Box
              sx={{
                mb: 2,
                borderRadius: "15px",
                mt: 1,
                width: "100%",
                height: "56px",
                position: "relative",
              }}
            >
              <TextField
                fullWidth
                placeholder={t("LoginPage.value2")}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
                sx={{
                  mb: 3,

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "#1e2a3a",
                    color: "#fff",

                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.15)",
                    },

                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#4ade80",
                      borderWidth: "1px",
                    },
                  },

                  "& .MuiInputBase-input": {
                    color: "#fff",

                    "&::placeholder": {
                      color: "#7c8aa0",
                      opacity: 1,
                    },

                    "&:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px #1e2a3a inset",
                      WebkitTextFillColor: "#fff",
                    },
                  },
                }}
              />

              <IconButton
                onClick={toggleShowPassword}
                style={{
                  position: "absolute",
                  right: "4px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: 4,
                  color: "white",
                }}
              >
                {showPassword ? (
                  <Visibility fontSize="small" />
                ) : (
                  <VisibilityOff fontSize="small" />
                )}
              </IconButton>
            </Box>
            {/* Invite code */}
            <InputLabel sx={{ color: "white", mt: 2 }}>
              {" "}
              {t("SignupPage.title3")}
            </InputLabel>

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <TextField
                fullWidth
                placeholder={t("SignupPage.value3")}
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "#1e2a3a",
                    color: "#fff",

                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.15)",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#4ade80",
                    },
                  },
                }}
              />

              <Button
                onClick={handleSendInvite}
                disabled={email.length == 0 || sending}
                sx={{
                  minWidth: 80,
                  borderRadius: "14px",
                  background: "#5BFF00",
                  color: "#000",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:disabled": {
                    background: "#9aa4b2",
                  },
                  "&:hover": {
                    background: "#4de000",
                  },
                }}
              >
                {t("SignupPage.button3")}
              </Button>
            </Box>
            <Box mt={3}>
              {/* Login */}
              <Button
                fullWidth
                onClick={signup}
                sx={{
                  background: "#5BFF00",
                  color: "#000",
                  fontWeight: 600,
                  borderRadius: "14px",
                  height: 52,
                  textTransform: "none",
                  boxShadow: "0 0 20px rgba(91,255,0,0.4)",
                  "&:hover": {
                    background: "#4de000",
                    boxShadow: "0 0 25px rgba(91,255,0,0.6)",
                  },
                }}
              >
                {t("SignupPage.button2")}
              </Button>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  textAlign="center"
                  color="#9aa4b2"
                  my={2}
                  fontSize={14}
                >
                  {t("SignupPage.title4")}
                </Typography>

                <Button
                  fullWidth
                  onClick={() => router.push("/login")}
                  sx={{
                    background: "none",
                    color: "#4ade80",
                    fontWeight: 600,
                    borderRadius: "14px",
                    height: 52,
                    width: 50,
                    textTransform: "none",
                  }}
                >
                  {t("SignupPage.button1")}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
