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
  Link,
} from "@mui/material";
import { getWebsiteConfig, loginUser } from "@/services/User.service";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NextIcon, PreviousIcon } from "@/shared/Svgs/Svg.component";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [configs, setConfigs] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const referral = async () => {
      try {
        const config: any = await getWebsiteConfig();

        if (config.status === true) {
          setConfigs(config.data);
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    referral();
  }, []);
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
          toast.error(msg);
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
              src={"/images/logo.png"}
              width={100}
              height={100}
              alt=""
              style={{
                height: "100px",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
          </Box>

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
                  borderRadius: "8px",
                  backgroundColor: "#2B313B",
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
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#2B313B",
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

            <Box mt={3} width={"100%"}>
              {/* Login */}
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  fullWidth
                  onClick={() => {
                    const newWindow = window.open(
                      configs.telegram,
                      "_blank",
                      "noopener,noreferrer",
                    );
                    if (newWindow) {
                      newWindow.opener = null;
                    }
                  }}
                  sx={{
                    width: "120px",
                    background: "none",
                    color: "white",
                    borderRadius: "14px",
                    height: 20,
                    textTransform: "none",
                    textAlign: "right",
                    "&:hover": {
                      background: "none",
                    },
                  }}
                >
                  Quên mật khẩu?
                </Button>

                <Link
                  href="/signup"
                  sx={{
                    // width: "130px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    textDecoration: "none",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {t("LoginPage.button3")}{" "}
                  <NextIcon width="12px" height="12px" />{" "}
                </Link>
              </Box>

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
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
