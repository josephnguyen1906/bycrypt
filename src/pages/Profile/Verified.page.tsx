"use client";
import useAuth from "@/hook/useAuth";
import { verifiUser } from "@/services/User.service";
import { VerifiedIcon, WarningIcon } from "@/shared/Svgs/Svg.component";
import { Box, Button, Stack, Typography, Grid, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function VerifiedPage() {
  const { t } = useTranslation();
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
        "Please upload both front and back images and provide a phone number.",
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("cardfm", frontImage);
      formData.append("cardzm", backImage);

      await verifiUser(formData);
      toast.success(t("Toast.verifide1"));
    } catch (error) {
      console.error("Error submitting verification:", error);
      toast.error(t("Toast.verifide2"));
    }
  };

  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "80%",
          },
          margin: "auto",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: "25px", fontWeight: "600", color: "#fff" }}
        >
          {t("ProfilePage.menu3")}
        </Typography>
        {user?.rzstatus === 0 ? (
          <Typography
            sx={{
              fontSize: "14px",
              color: "#fff",
              display: "flex",
              alignItems: "center",

              gap: "5px",
            }}
          >
            <WarningIcon /> {t("ProfilePage.Identity1")}
          </Typography>
        ) : user?.rzstatus === 1 ? (
          <Typography
            sx={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",

              color: "#fff",
              gap: "5px",
            }}
          >
            <WarningIcon /> {t("ProfilePage.Identity2")}
          </Typography>
        ) : user?.rzstatus === 2 ? (
          <Typography
            sx={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",

              color: "#fff",
              gap: "5px",
            }}
          >
            <VerifiedIcon /> {t("ProfilePage.Identity3")}
          </Typography>
        ) : (
          <Typography
            sx={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",

              color: "#fff",
              gap: "5px",
            }}
          >
            <WarningIcon /> {t("ProfilePage.Identity4")}
          </Typography>
        )}
        {user && (user.rzstatus === 2 || user.rzstatus === 1) ? (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              sx={{ color: "#fff" }}
            >
              {t("ProfilePage.verified_title")}
            </Typography>
            {/* <Box
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
                  {t("ProfilePage.before")}
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
                  {t("ProfilePage.after")}
                </Typography>
              </Box>
            </Box> */}
          </Box>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              sx={{ color: "#fff" }}
            >
              {t("ProfilePage.verified_title1")}
            </Typography>
            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "flex",
                },
                justifyContent: "center",
                gap: 2,
              }}
            >
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
                <Typography
                  sx={{
                    color: "#fff",
                    width: "100%",
                    textAlign: "center",
                    paddingBottom: "10px",
                  }}
                >
                  {t("ProfilePage.before")}
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
                <Typography align="center" sx={{ color: "#fff" }}>
                  {t("ProfilePage.after")}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <TextField
                fullWidth
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("ProfilePage.verified_title2")}
                sx={{
                  borderRadius: "8px",
                  background: "#909090",
                  color: "#fff",
                  marginBottom: "20px",
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    fontSize: { xs: "16px", sm: "14px" },
                    opacity: 1, // để không bị mờ
                  },
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
                {t("ProfilePage.verified_button")}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
