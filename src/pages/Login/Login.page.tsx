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
} from "@mui/material";
import { loginUser } from "@/services/User.service";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadding, setLoadding] = useState<boolean>(false);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleUsername = (e: any) => setEmail(e.target.value);
  console.log(email);
  console.log(password);

  // Login handler
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      setLoadding(true);
      await loginUser(email, password)
        .then((res: any) => {
          if (res?.status === true) {
            toast.success("Đăng nhập thành công");
            window.localStorage.setItem("tokenokx", res.token);
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
            Trade with confidence
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
            We don’t lend out customer funds, which is verified through our
            regularly published Proof of Reserves audits.
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
            Join our Telegram group
          </Typography>
          <Typography variant="body2" color="gray">
            Ask questions, get answers, and chat with other traders to shape the
            crypto future together
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
            Log in
          </Typography>
          <form>
            <InputLabel>Email / username </InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Email / username"
              variant="outlined"
              value={email}
              type="email"
              onChange={handleUsername}
              sx={{ mb: 2, borderRadius: "15px" }}
            />

            <InputLabel>Password </InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePassword}
              sx={{ mb: 2, borderRadius: "15px" }}
            />
            <Button
              type="submit"
              fullWidth
              onClick={login}
              sx={{
                mb: 2,
                backgroundColor: "#000",
                borderRadius: "15px",
                color: "white",
                "&:hover": { backgroundColor: "#000", color: "white" },
              }}
            >
              Log in
            </Button>
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
              Don’t have an account?{" "}
              <a href="/signup" style={{ color: "#1976d2" }}>
                Sign up
              </a>
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
              <Grid item>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: "50%",
                    minWidth: "50px",
                    height: "50px",
                    border: "0.5px solid #000",
                  }}
                >
                  <img
                    src="/images/google.webp"
                    alt="Google"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  {/* Replace with actual icon path */}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: "50%",
                    minWidth: "50px",
                    height: "50px",
                    border: "0.5px solid #000",
                  }}
                >
                  <img
                    src="/images/apple.webp"
                    alt="Apple"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  {/* Replace with actual icon path */}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: "50%",
                    minWidth: "50px",
                    height: "50px",
                    border: "0.5px solid #000",
                  }}
                >
                  <img
                    src="/images/wallet.webp"
                    alt="Wallet"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  {/* Replace with actual icon path */}
                </Button>
              </Grid>
            </Grid>
            <Typography variant="body2" align="center" color="textSecondary">
              This site is protected by Google reCAPTCHA to ensure you’re not a
              bot.{" "}
              <a href="#" style={{ color: "#1976d2" }}>
                Learn more
              </a>
            </Typography>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
