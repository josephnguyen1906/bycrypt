"use client";
import { useState } from "react";
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
import { loginUser } from "@/services/User.service";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NextIcon, PreviousIcon } from "@/shared/Svgs/Svg.component";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadding, setLoadding] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleUsername = (e: any) => setEmail(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const router = useRouter();
  // Login handler
  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      setLoadding(true);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      await loginUser(formData)
        .then((res: any) => {
          if (res?.status === true) {
            toast.success(t("Toast.login1"));
            window.localStorage.setItem("token", res.token);
            window.location.href = "/";
          } else {
            toast.error(res?.message);
          }
        })
        .catch((err: any) => {
          const msg = err?.response?.data?.message || err.message;
          setError(msg);
        })
        .finally(() => {
          setLoadding(false);
          setError("");
        });
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
            {t("LoginPage.title")}
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            sx={{ color: "white", fontSize: "16px", mb: "20px" }}
          >
            {t("LoginPage.decription")}
          </Typography>
          {error.length > 0 && (
            <Typography
              sx={{ color: "red", fontSize: "14px", p: "10px", mt: 2 }}
            >
              Error: {error}
            </Typography>
          )}
          <form>
            <InputLabel sx={{ color: "white", mt: "10px" }}>
              {t("LoginPage.title1")}{" "}
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
              {" "}
              {t("LoginPage.title2")}{" "}
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

            <Box mt={3}>
              {/* Login */}
              <Button
                fullWidth
                onClick={login}
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
                {t("LoginPage.button1")}
              </Button>

              {/* OR */}
              <Typography
                textAlign="center"
                color="#9aa4b2"
                my={2}
                fontSize={14}
              >
                {t("LoginPage.title3")}
              </Typography>

              {/* Wallet login */}
              <Button
                fullWidth
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
                {t("LoginPage.button2")}
              </Button>

              {/* OR */}
              <Typography
                textAlign="center"
                color="#9aa4b2"
                my={2}
                fontSize={14}
              >
                {t("LoginPage.title3")}
              </Typography>

              {/* Create account */}
              <Button
                fullWidth
                onClick={() => router.push("/signup")}
                sx={{
                  background: "#1e2a3a",
                  color: "#fff",
                  borderRadius: "14px",
                  height: 52,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    background: "#253548",
                  },
                }}
              >
                {t("LoginPage.button3")}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
