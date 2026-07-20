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
  InputAdornment,
} from "@mui/material";
import { getWebsiteConfig, loginUser } from "@/services/User.service";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NextIcon, PreviousIcon } from "@/shared/Svgs/Svg.component";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";

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
        maxWidth: "460px",
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pt: 2,
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
          mt: { xs: 0, sm: 2 },
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
            {t("LoginPage.title1")}
          </Typography>

          {error.length > 0 && (
            <Typography
              sx={{ color: "red", fontSize: "14px", p: "10px", mt: 2 }}
            >
              Error: {error}
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
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setEmail("")}>
                        <CancelIcon fontSize="small" sx={{ color: "white" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <InputLabel sx={{ color: "white" }}>
              {t("LoginPage.label2")}
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
                placeholder={t("LoginPage.placeholder2")}
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

            <Box
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
                background: "none",
                color: "#00A609",
                borderRadius: "14px",
                height: 20,
                textAlign: "left",
                textTransform: "none",
                cursor: "pointer",
                fontSize: "13px",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              {t("LoginPage.title2")}
            </Box>
            <Box mt={3} width={"100%"}>
              <Button
                fullWidth
                onClick={login}
                sx={{
                  background: "#00A609",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "12px",
                  height: 52,
                  textTransform: "none",
                  "&:hover": {
                    background: "#4de000",
                  },
                }}
              >
                {t("LoginPage.title1")}
              </Button>
              <Button
                fullWidth
                sx={{
                  border: "1px solid #00A609",
                  background: "none",
                  color: "#00A609",
                  fontWeight: 600,
                  mt: 2,
                  borderRadius: "12px",
                  height: 52,
                  textTransform: "none",
                  "&:hover": {
                    background: "#4de000",
                    color: "white",
                  },
                }}
              >
                {t("LoginPage.title3")}
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Typography
                sx={{ color: "white", fontSize: 13, fontWeight: 400 }}
              >
                {t("LoginPage.title4")}
              </Typography>
              <Typography
                onClick={() => {
                  router.push("/signup");
                }}
                sx={{
                  color: "#00A609",
                  fontSize: 13,
                  fontWeight: 400,
                  cursor: "pointer",
                }}
              >
                {t("LoginPage.title5")}
              </Typography>
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
