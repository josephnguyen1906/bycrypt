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
  InputAdornment,
  Checkbox,
} from "@mui/material";
import { toast } from "react-toastify";
import { sendCode, signupUser } from "@/services/User.service";
import { useTranslation } from "react-i18next";
import { CheckBox, Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [paypassword, setPayPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [mailSent, setMailSent] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPayPassword, setShowPayPassword] = useState<boolean>(false);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleUsername = (e: any) => setEmail(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowPayPassword = () => setShowPayPassword(!showPayPassword);
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
      if (mailSent) {
        formData.append("verification_code", inviteCode);
      } else {
        formData.append("invit", inviteCode);
      }
      formData.append("paypassword", paypassword);

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
        maxWidth: "460px",
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pt: 1,
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "460px",
          },
          backgroundColor: "#0E0F18",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: { xs: 0, sm: 3 },
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
              background: "#0E0F18",
              position: "fixed",
              top: "20px",
              "&:hover": {
                background: "#2a313aff",
              },
            }}
            onClick={() => router.back()}
          >
            <CloseIcon width="20px" height="20px" sx={{ color: "white" }} />
          </IconButton>
          <Typography
            sx={{
              color: "white",
              fontSize: "26px",
              fontWeight: "600",
              p: "10px",
            }}
          >
            {t("SignupPage.title1")}
          </Typography>

          {errorMsg && (
            <Typography color="error" fontSize={13} mt={1}>
              {errorMsg}
            </Typography>
          )}

          <form>
            <InputLabel sx={{ color: "white", mt: "10px", mb: "5px" }}>
              {t("SignupPage.label1")}
            </InputLabel>
            <TextField
              fullWidth
              placeholder={t("LoginPage.placeholder1")}
              variant="outlined"
              value={email}
              type="email"
              onChange={handleUsername}
              sx={textField}
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
                placeholder={t("SignupPage.placeholder2")}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
                sx={textField}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Visibility
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          ) : (
                            <VisibilityOff
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <InputLabel sx={{ color: "white" }}>
              {t("SignupPage.label3")}
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
                placeholder={t("SignupPage.placeholder3")}
                variant="outlined"
                type={showPayPassword ? "text" : "password"}
                value={paypassword}
                onChange={(e) => setPayPassword(e.target.value)}
                sx={textField}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPayPassword(!showPassword)}
                        >
                          {showPayPassword ? (
                            <Visibility
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          ) : (
                            <VisibilityOff
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
            {/* Invite code */}
            <InputLabel sx={{ color: "white", mt: 2 }}>
              {" "}
              {t("SignupPage.label4")}
            </InputLabel>

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <TextField
                fullWidth
                placeholder={t("SignupPage.placeholder4")}
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                sx={textField}
              />

              {/* <Button
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
              </Button> */}
            </Box>
            {mailSent && (
              <Typography color="#4ade80" fontSize={13} mt={1}>
                {t("Toast.signup3")}
              </Typography>
            )}
            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
              <Checkbox
                icon={
                  <CircleIcon
                    sx={{
                      fontSize: 16,
                      color: "#fff",
                    }}
                  />
                }
                checkedIcon={
                  <CheckIcon
                    sx={{
                      width: 16,
                      height: 16,
                      p: "2px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      color: "#16A34A",
                      boxSizing: "border-box",
                    }}
                  />
                }
                sx={{
                  p: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              />
              <Typography color="#fff" fontSize={13}>
                {t("SignupPage.title4")}
              </Typography>
              <Typography color="#4ade80" fontSize={13}>
                {t("SignupPage.title5")}
              </Typography>
            </Box>
            <Box mt={2}>
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
                {t("SignupPage.title1")}
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  width: "100%",
                  mt: 1,
                }}
              >
                <Typography
                  textAlign="center"
                  color="#9aa4b2"
                  my={2}
                  fontSize={14}
                >
                  {t("SignupPage.title2")}
                </Typography>

                <Button
                  fullWidth
                  onClick={() => router.push("/login")}
                  sx={{
                    background: "none",
                    color: "#4ade80",
                    fontWeight: 400,
                    borderRadius: 14,
                    width: 130,
                    textTransform: "none",
                  }}
                >
                  {t("SignupPage.title3")}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

const textField = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#1A1B24",
    height: 48,
    color: "#fff",
    border: "none",
    "& fieldset": {
      borderColor: "none",
    },

    "&:hover fieldset": {
      borderColor: "none",
    },

    "&.Mui-focused fieldset": {
      border: "none",
      borderWidth: "1px",
    },
  },

  "& .MuiInputBase-input": {
    color: "#fff",
    border: "none",

    "&::placeholder": {
      color: "#7c8aa0",
      opacity: 1,
    },

    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #1e2a3a inset",
      WebkitTextFillColor: "#fff",
    },
  },
};
