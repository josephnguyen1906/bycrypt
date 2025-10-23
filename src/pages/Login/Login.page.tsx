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
import { VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadding, setLoadding] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleUsername = (e: any) => setEmail(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Login handler
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      setLoadding(true);
      await loginUser(email, password)
        .then((res: any) => {
          if (res?.status === true) {
            toast.success("Đăng nhập thành công");
            window.localStorage.setItem("tokenStaking", res.token);
            window.location.href = "/";
          } else {
            toast.error(res?.msg);
          }
        })
        .catch((err) => {
          console.error("API error:", err);
          toast.error(err?.message || "Lỗi không xác định");
        })
        .finally(() => {
          setLoadding(false);
        });
    } else {
      toast.error("Tên đăng nhập và mật khẩu không được để trống");
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        paddingTop: "50px",
        display: "flex",
        alignItems: {
          xs: "flex-start",
          sm: "normal",
        },
        height: "100vh",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          width: "50%",
          backgroundColor: "black",
          color: "white",
          p: 4,
          display: {
            xs: "none",
            sm: "flex",
          },
          flexDirection: "column",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mt: 4, textAlign: "center" }}
          >
            {t("LoginPage.title")}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              color: "#909090",
              width: "60%",
              margin: "0 auto",
            }}
          >
            {t("LoginPage.decription")}
          </Typography>
        </Box>
        <Box sx={{ mb: 4, mt: 2 }}>
          <img
            src="/images/5AD5609D76BF42F4.webp"
            alt="Trading App"
            style={{
              height: "323px",
              margin: "0 auto",
              display: "block",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#1a1a1a",
            p: 2,
            borderRadius: "8px",
            width: "60%",
            margin: "0 auto",
            marginTop: "-30px",
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ color: "white", fontSize: "20px" }}
          >
            {t("LoginPage.join_tele")}
          </Typography>
          <Typography variant="body2" color="gray">
            {t("LoginPage.note")}
          </Typography>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "50%",
          },
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box sx={{ maxWidth: "400px", width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            {t("HomePage.mobile_login")}
          </Typography>
          <form>
            <InputLabel>{t("LoginPage.title1")} </InputLabel>
            <TextField
              fullWidth
              placeholder={t("LoginPage.value1")}
              variant="outlined"
              value={email}
              type="email"
              onChange={handleUsername}
              sx={{
                mb: 2,
                borderRadius: "15px",
                mt: 1,
                "& .MuiInputBase-input": {
                  color: "black",
                  background: "transparent",
                  // Fix autofill background
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px white inset", // chỉnh màu nền
                    WebkitTextFillColor: "white",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                },
              }}
            />

            <InputLabel>{t("LoginPage.title2")} </InputLabel>
            {/* <TextField
              fullWidth
              placeholder={t("LoginPage.value2")}
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePassword}
              sx={{ mb: 2, borderRadius: "15px", mt: 1 }}
            /> */}
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
                  mb: 2,
                  borderRadius: "15px",
                  mt: 1,
                  "& .MuiInputBase-input": {
                    background: "transparent",
                    // Fix autofill background
                    "&:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px black inset", // chỉnh màu nền
                      WebkitTextFillColor: "white",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                  },
                }}
              />

              <IconButton
                onClick={toggleShowPassword}
                style={{
                  position: "absolute",
                  right: "4px",
                  top: "65%",
                  transform: "translateY(-50%)",
                  padding: 4,
                  color: "black", // Màu trắng như bạn yêu cầu
                }}
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <VisibilityOff fontSize="small" />
                )}
              </IconButton>
            </Box>
            <Button
              type="submit"
              fullWidth
              onClick={login}
              sx={{
                mb: 2,
                backgroundColor: "#fcd534",
                borderRadius: "15px",
                color: "black",
                "&:hover": { backgroundColor: "#fcd534", color: "black" },
              }}
            >
              {t("HomePage.mobile_login")}
            </Button>
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
              {t("LoginPage.sub_title")}{" "}
              <a href="/signup" style={{ color: "#1976d2" }}>
                {t("HomePage.mobile_signup")}
              </a>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
