"use client";

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useRef, useState } from "react";
import { VisibilityOffOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { verifiUser } from "@/services/User.service";
import { CameraIcon } from "@/shared/Svgs/Svg.component";

export default function VerifiedPage() {
  const [fullName, setFullName] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState<string | null>(null);
  const [frontImage, setFrontImage] = useState<File>();
  const frontFileInput = useRef<HTMLInputElement>(null);
  const [backImage, setBackImage] = useState<File>();
  const backFileInput = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
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
    if (!frontImage || !backImage || !fullName || !cardNumber) {
      alert(
        "Please upload both front and back images and provide a phone number.",
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullname", fullName);
      formData.append("cccd", cardNumber);
      formData.append("cardfm", frontImage);
      formData.append("cardzm", backImage);

      await verifiUser(formData);
      toast.success(t("Toast.verifide1"));
      fetchUser();
    } catch (error) {
      console.error("Error submitting verification:", error);
      toast.error(t("Toast.verifide2"));
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#0b1b33 0%,#0b1b33 40%,#091426 100%)",
        p: 2,
        pb: "130px",
      }}
    >
      {/* login button */}
      {!user ? (
        <Button
          variant="contained"
          sx={{
            background: "#22c55e",
            borderRadius: "8px",
            textTransform: "none",
            mb: 2,
            "&:hover": {
              background: "#1da850ff",
            },
          }}
          onClick={() => router.push("/login")}
        >
          Go to login
        </Button>
      ) : (
        <>
          <Box
            display="flex"
            alignItems="center"
            mb={3}
            gap={"10px"}
            justifyContent={"space-between"}
          >
            <IconButton
              onClick={() => router.back()}
              sx={{ background: "#232932" }}
            >
              <ArrowBackIosNewIcon
                sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
              />
            </IconButton>

            <Typography fontSize={20} fontWeight={600} color={"white"}>
              {t("HomePage.verified")}
            </Typography>
            <IconButton></IconButton>
          </Box>
          {!user.cccd ? (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h6"
                mb={2}
                sx={{ color: "#d1d5db", fontSize: "16px" }}
              >
                {t("ProfilePage.verified_title1")}
              </Typography>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  mb={1}
                  mt={1}
                  sx={{ color: "#d1d5db", fontSize: "12px", textAlign: "left" }}
                >
                  {t("ProfilePage.verified_title4")}
                </Typography>
                <TextField
                  fullWidth
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder={t("ProfilePage.verified_title2")}
                  sx={{
                    borderRadius: "8px",
                    background: "#1f2937",
                    color: "#fff",
                    marginBottom: "20px",
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontSize: { xs: "16px", sm: "14px" },
                      opacity: 1, // để không bị mờ
                    },
                  }}
                />

                <Typography
                  variant="h6"
                  mb={1}
                  mt={1}
                  sx={{ color: "#d1d5db", fontSize: "12px", textAlign: "left" }}
                >
                  {t("ProfilePage.verified_title5")}
                </Typography>
                <TextField
                  fullWidth
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t("ProfilePage.verified_title3")}
                  sx={{
                    borderRadius: "8px",
                    background: "#1f2937",
                    color: "#fff",
                    marginBottom: "20px",
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "gray",
                      fontSize: { xs: "16px", sm: "14px" },
                      opacity: 1, // để không bị mờ
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  mb={1}
                  mt={1}
                  sx={{
                    color: "#4ade80",
                    fontSize: "16px",
                    textAlign: "center",
                    fontWeight: 400,
                  }}
                >
                  {t("ProfilePage.verified_title6")}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  {frontImage ? (
                    <>
                      <Box
                        component="img"
                        src={frontImage && URL.createObjectURL(frontImage)}
                        alt="Mặt trước CCCD"
                        onClick={handleFrontClick}
                        sx={{
                          width: "100%",
                          borderRadius: "8px",
                          boxShadow: 2,
                          cursor: "pointer",
                          objectFit: "cover",
                        }}
                      />
                    </>
                  ) : (
                    <Box
                      onClick={handleFrontClick}
                      sx={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "8px",
                        boxShadow: 2,
                        cursor: "pointer",
                        background: "#1f2937",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                      }}
                    >
                      <CameraIcon width="35px" height="35px" fill="white" />
                    </Box>
                  )}
                  <Typography
                    sx={{
                      color: "#d1d5db",
                      width: "100%",
                      textAlign: "center",
                      paddingBottom: "10px",
                      fontWeight: 400,
                      fontSize: "14px",
                      pt: "8px",
                    }}
                  >
                    {t("ProfilePage.before")}
                  </Typography>

                  <input
                    type="file"
                    accept="image/*"
                    ref={frontFileInput}
                    style={{ display: "none" }}
                    onChange={handleFrontChange}
                  />
                </Box>

                <Box
                  sx={{
                    width: "70%",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  {backImage ? (
                    <>
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
                          width: "100%",
                          borderRadius: "8px",
                          boxShadow: 2,
                          cursor: "pointer",
                          objectFit: "cover",
                        }}
                      />
                    </>
                  ) : (
                    <Box
                      onClick={handleBackClick}
                      sx={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "8px",
                        boxShadow: 2,
                        cursor: "pointer",
                        background: "#1f2937",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                      }}
                    >
                      <CameraIcon width="35px" height="35px" fill="white" />
                    </Box>
                  )}
                  <Typography
                    align="center"
                    sx={{
                      color: "#d1d5db",
                      width: "100%",
                      textAlign: "center",
                      paddingBottom: "10px",
                      fontWeight: 400,
                      fontSize: "14px",
                      pt: "8px",
                    }}
                  >
                    {t("ProfilePage.after")}
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    ref={backFileInput}
                    style={{ display: "none" }}
                    onChange={handleBackChange}
                  />
                </Box>

                <Button
                  type="button"
                  sx={{
                    display: "flex",
                    background: "#22c55e",
                    color: "#000",
                    width: "100%",
                    height: "50px",
                    borderRadius: "15px",
                    margin: "0 auto",
                    mt: "30px",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "#22c55e",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  {t("ProfilePage.verified_button")}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                mt: 5,
                background: "#1f2937",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#4ade80",
                  fontWeight: "bold",
                  fontSize: "16px",
                  mb: 2,
                }}
              >
                ✅{t("ProfilePage.verified_success") || "Verified successfully"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  textAlign: "left",
                }}
              >
                <Box>
                  <Typography sx={{ color: "#9ca3af", fontSize: "12px" }}>
                    {t("ProfilePage.verified_title4")}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#fff",
                      background: "#111827",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    {user.fullname}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: "#9ca3af", fontSize: "12px" }}>
                    {t("ProfilePage.verified_title5")}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#fff",
                      background: "#111827",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    {user.cccd}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
