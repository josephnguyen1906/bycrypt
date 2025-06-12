"use client";
import useAuth from "@/hook/useAuth";
import { VerifiedIcon, WarningIcon } from "@/shared/Svgs/Svg.component";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import React, { useRef, useState } from "react";

export default function VerifiedPage() {
  const { user, loading } = useAuth();
  const frontFileInput = useRef<HTMLInputElement>(null);
  const backFileInput = useRef<HTMLInputElement>(null);

  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const handleFrontClick = () => {
    frontFileInput.current?.click();
  };

  const handleBackClick = () => {
    backFileInput.current?.click();
  };

  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ padding: "100px 0px", backgroundColor: "#fff" }}>
      <Box sx={{ width: "80%", margin: "auto" }}>
        <Typography variant="h3" sx={{ fontSize: "25px", fontWeight: "600" }}>
          Account Verified
        </Typography>
        {user?.cardfm === undefined ||
        user?.cardfm === null ||
        user?.cardfm === "" ? (
          <Typography
            sx={{
              fontSize: "16px",
              color: "#d32f2f",
              display: "flex",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <WarningIcon /> The customer is account has not been verified.
          </Typography>
        ) : (
          <Typography
            sx={{
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <VerifiedIcon /> Account has been verified
          </Typography>
        )}
        {user && user.cardfm && user.cardzm ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              The customer has verified the account.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Box sx={{ width: "40%", textAlign: "center" }}>
                <Box
                  component="img"
                  src={user.cardfm}
                  alt="Mặt trước CCCD"
                  sx={{
                    width: "400px",
                    borderRadius: "8px",
                    boxShadow: 2,
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />

                <Typography align="center" mt={1}>
                  Mặt trước
                </Typography>
              </Box>

              <Box sx={{ width: "40%", textAlign: "center" }}>
                <Box
                  component="img"
                  src={user.cardzm}
                  alt="Mặt sau CCCD"
                  sx={{
                    width: "400px",
                    borderRadius: "8px",
                    boxShadow: 2,
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                />

                <Typography align="center" mt={1}>
                  Mặt sau
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Your CCCD image (click to replace)
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Box sx={{ width: "40%", textAlign: "center" }}>
                <Box
                  component="img"
                  src={
                    frontImage ? frontImage : "/images/mau_the_can-cuoc_moi.jpg"
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
                <Typography align="center" mt={1}>
                  Mặt trước
                </Typography>
              </Box>

              <Box sx={{ width: "40%", textAlign: "center" }}>
                <Box
                  component="img"
                  src={backImage ? backImage : "/images/cccdms.png"}
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
                <Typography align="center" mt={1}>
                  Mặt sau
                </Typography>
              </Box>
            </Box>
            <Button
              type="button"
              sx={{
                display: "flex",
                background: "#000",
                color: "#fff",
                width: "200px",
                height: "50px",
                borderRadius: "15px",
                margin: "0 auto",
                "&:hover": {
                  background: "#333",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
