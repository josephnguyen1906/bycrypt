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
import Image from "next/image";

export default function SignupPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [mailSent, setMailSent] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleUsername = (e: any) => setEmail(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const router = useRouter();
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendInvite = async () => {
    if (!email || countdown > 0) return;

    setSending(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("email", email);

      const res: any = await sendCode(formData);

      if (res?.status) {
        setMailSent(true);
        setCountdown(60);
      } else {
        setErrorMsg(res?.message);
        toast.error(res?.message);
      }
    } catch (err: any) {
      const msg = err?.message || "Lỗi gửi mail";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };
  const signup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg(t("Toast.signup1"));
      // toast.error("Tên đăng nhập và mật khẩu không được để trống");
      return;
    }

    setLoadding(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("verification_code", inviteCode);

      const res: any = await signupUser(formData);

      if (res?.status) {
        toast.success(t("Toast.signup2"));
        window.location.href = "/login";
      } else {
        setErrorMsg(res?.message);
        toast.error(res?.message);
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Lỗi đăng ký";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoadding(false);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#141A1F",
        paddingTop: { xs: 0, sm: "50px" },
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "460px",
          },
          backgroundColor: "#202630",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: { xs: 0, sm: 6 },
          height: { xs: "100vh", sm: "auto" },
          pb: "30px",
          borderRadius: {
            xs: 0,
            sm: "10px",
          },
          p: 4,
        }}
      >
        <Box sx={{ maxWidth: "100%", width: "100%" }}>
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
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Image
              src={"/images/logo2.png"}
              width={100}
              height={100}
              alt=""
              style={{ height: "100px", objectFit: "contain" }}
            />
          </Box>

          {errorMsg && (
            <Typography color="error" fontSize={13} mt={1}>
              {errorMsg}
            </Typography>
          )}

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
                  borderRadius: "8px",
                  backgroundColor: "#2B313B",
                  color: "#fff",

                  "& fieldset": {
                    borderColor: "none",
                  },

                  "&:hover fieldset": {
                    borderColor: "none",
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
                    borderRadius: "8px",
                    backgroundColor: "#2B313B",
                    color: "#fff",

                    "& fieldset": {
                      borderColor: "none",
                    },

                    "&:hover fieldset": {
                      borderColor: "none",
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
                    borderRadius: "8px",
                    backgroundColor: "#2B313B",
                    color: "#fff",

                    "& fieldset": {
                      borderColor: "none",
                    },

                    "&:hover fieldset": {
                      borderColor: "none",
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

              <Button
                onClick={handleSendInvite}
                disabled={email.length === 0 || sending || countdown > 0}
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
                {countdown > 0 ? `${countdown}s` : t("SignupPage.button3")}
              </Button>
            </Box>
            {mailSent && (
              <Typography color="#4ade80" fontSize={13} mt={1}>
                {t("Toast.signup3")}
              </Typography>
            )}
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
