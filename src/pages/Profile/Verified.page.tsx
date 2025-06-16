"use client";
import useAuth from "@/hook/useAuth";
import { verifiUser } from "@/services/User.service";
import { VerifiedIcon, WarningIcon } from "@/shared/Svgs/Svg.component";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function VerifiedPage() {
  const { user, loading } = useAuth();
  const frontFileInput = useRef<HTMLInputElement>(null);
  const backFileInput = useRef<HTMLInputElement>(null);

  const [phone, setPhone] = useState<string>("");
  const [frontImage, setFrontImage] = useState<File>();
  const [backImage, setBackImage] = useState<File>();

  const handleFrontClick = () => {
    frontFileInput.current?.click();
  };

  const handleBackClick = () => {
    backFileInput.current?.click();
  };

  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
    }
  };

  const handleBackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBackImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!frontImage || !backImage || !phone) {
      alert(
        "Please upload both front and back images and provide a phone number."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("cardfm", frontImage);
      formData.append("cardzm", backImage);

      await verifiUser(formData);
      toast.success("Verification submitted successfully!");
    } catch (error) {
      console.error("Error submitting verification:", error);
      toast.error("Failed to submit verification. Please try again.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Box sx={{ width: "80%", margin: "auto" }}>
        <Typography
          variant="h3"
          sx={{ fontSize: "25px", fontWeight: "600", color: "#fff" }}
        >
          Account Verified
        </Typography>
        {user?.cardfm === undefined ||
        user?.cardfm === null ||
        user?.cardfm === "" ? (
          <Typography
            sx={{
              fontSize: "16px",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <WarningIcon /> The customer account has not been verified.
          </Typography>
        ) : (
          <Typography
            sx={{
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              paddingTop: "10px",
              color: "#fff",
            }}
          >
            <VerifiedIcon /> Account has been verified
          </Typography>
        )}
        {user && user.cardfm && user.cardzm ? (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              sx={{ color: "#fff" }}
            >
              The customer has verified the account.
            </Typography>
            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "flex",
                },
                justifyContent: "center",
                gap: 2,
                textAlign: "center",
              }}
            >
              <Box
                sx={{ width: { xs: "100%", sm: "40%" }, textAlign: "center" }}
              >
                <Box
                  component="img"
                  src={user.cardfm}
                  alt="Mặt trước CCCD"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "400px",
                    },
                    borderRadius: "8px",
                    boxShadow: 2,
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
                <Typography align="center" mt={1} sx={{ color: "#fff" }}>
                  Mặt trước
                </Typography>
              </Box>

              <Box
                sx={{
                  width: {
                    xs: "100%",
                    sm: "40%",
                  },
                  textAlign: "center",
                }}
              >
                <Box
                  component="img"
                  src={user.cardzm}
                  alt="Mặt sau CCCD"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "400px",
                    },
                    borderRadius: "8px",
                    boxShadow: 2,
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
                <Typography align="center" mt={1} sx={{ color: "#fff" }}>
                  Mặt sau
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              sx={{ color: "#fff" }}
            >
              Your CCCD image (click to replace)
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Box sx={{ width: "40%", textAlign: "center" }}>
                <Box
                  component="img"
                  src={
                    frontImage
                      ? URL.createObjectURL(frontImage)
                      : "/images/mau_the_can-cuoc_moi.jpg"
                  }
                  alt="Mặt trước CCCD"
                  onClick={handleFrontClick}
                  sx={{
                    width: "400px",
                    borderRadius: "8px",
                    boxShadow: 2,
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={frontFileInput}
                  style={{ display: "none" }}
                  onChange={handleFrontChange}
                />
                <Typography align="center" mt={1} sx={{ color: "#fff" }}>
                  Mặt trước
                </Typography>
              </Box>

              <Box sx={{ width: "40%", textAlign: "center" }}>
                <Box
                  component="img"
                  src={
                    backImage
                      ? URL.createObjectURL(backImage)
                      : "/images/cccdms.png"
                  }
                  alt="Mặt sau CCCD"
                  onClick={handleBackClick}
                  sx={{
                    width: "400px",
                    borderRadius: "8px",
                    boxShadow: 2,
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={backFileInput}
                  style={{ display: "none" }}
                  onChange={handleBackChange}
                />
                <Typography align="center" mt={1} sx={{ color: "#fff" }}>
                  Mặt sau
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #fff",
                  background: "#000",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              />
              <Button
                type="button"
                sx={{
                  display: "flex",
                  background: "#fff",
                  color: "#000",
                  width: "200px",
                  height: "50px",
                  borderRadius: "15px",
                  margin: "0 auto",
                  "&:hover": {
                    background: "#fff",
                  },
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
