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
import { toast } from "react-toastify";
import { signupUser } from "@/services/User.service";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadding, setLoadding] = useState<boolean>(false);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleUsername = (e: any) => setEmail(e.target.value);

  const signup = (e: React.FormEvent) => {
    // e.preventDefault();
    if (email !== "" && password !== "") {
      setLoadding(true);
      signupUser(email, password)
        .then((res: any) => {
          console.log(res.message);

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
    <Box sx={{ display: "flex", height: "100vh" }}>
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
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box sx={{ maxWidth: "400px", width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Enter your email
          </Typography>
          <form>
            <InputLabel>Email </InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Email"
              variant="outlined"
              value={email}
              onChange={handleUsername}
              sx={{ mb: 2, borderRadius: "15px" }}
            />

            <InputLabel>Password </InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePassword}
              sx={{ mb: 2, borderRadius: "15px" }}
            />
            <Button
              type="button"
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: "#000",
                borderRadius: "15px",
                color: "white",
                "&:hover": { backgroundColor: "#000", color: "white" },
              }}
              onClick={signup}
            >
              Sign up
            </Button>
            <div
              className="ThirdPartyLogin_title__wLNO7"
              style={{ textAlign: "center", padding: "10px 0" }}
            >
              <span>or continue with</span>
            </div>
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
          </form>
        </Box>
      </Box>
    </Box>
  );
}
