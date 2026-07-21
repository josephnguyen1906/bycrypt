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
  InputBase,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CancelIcon from "@mui/icons-material/Cancel";
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
      alert("Vui lòng upload ảnh căn cước công dân lên");
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
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "448px",
        },
        minHeight: "100vh",
        mx: "auto",
        bgcolor: "#0E0F18",
        color: "#fff",
        pb: 10,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          px: "14px",
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "32px",
            height: "32px",
            color: "#fff",
            p: 0,
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              fontSize: "20px",
              color: "#fff",
            }}
          />
        </IconButton>

        <Typography
          sx={{
            color: "#fff",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {t("VerifiedPage.title")}
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          width: "100%",
          px: "14px",
          pt: "2px",
          pb: "40px",
        }}
      >
        {/* Họ tên */}
        <Typography
          sx={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: 400,
            mb: "7px",
            mt: "0px",
          }}
        >
          {t("VerifiedPage.label1")}
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "41px",
            bgcolor: "#1B1C25",
            borderRadius: "4px",
            mb: "20px",
          }}
        >
          <InputBase
            value={fullName ?? ""}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t("VerifiedPage.label2")}
            sx={{
              width: "100%",
              height: "100%",
              px: "20px",
              pr: "45px",
              color: "#fff",
              fontSize: "13px",

              "& input": {
                padding: 0,
                color: "#fff",
                fontSize: "13px",

                "&::placeholder": {
                  color: "#777985",
                  opacity: 1,
                },
              },
            }}
          />

          {fullName && (
            <IconButton
              onClick={() => setFullName("")}
              sx={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "24px",
                height: "24px",
                p: 0,
                color: "#A4A6AF",
              }}
            >
              <CancelIcon sx={{ fontSize: "14px" }} />
            </IconButton>
          )}
        </Box>

        {/* Số CCCD / Hộ chiếu */}
        <Typography
          sx={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: 400,
            mb: "7px",
          }}
        >
          {t("VerifiedPage.label3")}
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "41px",
            bgcolor: "#1B1C25",
            borderRadius: "4px",
            mb: "20px",
          }}
        >
          <InputBase
            value={cardNumber ?? ""}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder={t("VerifiedPage.label4")}
            sx={{
              width: "100%",
              height: "100%",
              px: "20px",
              pr: "45px",
              color: "#fff",
              fontSize: "13px",

              "& input": {
                padding: 0,
                color: "#fff",
                fontSize: "13px",

                "&::placeholder": {
                  color: "#777985",
                  opacity: 1,
                },
              },
            }}
          />

          {cardNumber && (
            <IconButton
              onClick={() => setCardNumber("")}
              sx={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "24px",
                height: "24px",
                p: 0,
                color: "#A4A6AF",
              }}
            >
              <CancelIcon sx={{ fontSize: "14px" }} />
            </IconButton>
          )}
        </Box>

        {/* Upload CCCD */}
        <Typography
          sx={{
            color: "#fff",
            fontSize: "13px",
            fontWeight: 400,
            mb: "8px",
          }}
        >
          {t("VerifiedPage.label5")}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            mb: "2px",
            mt: 1,
          }}
        >
          {/* Mặt trước */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              onClick={handleFrontClick}
              sx={{
                width: "74px",
                height: "74px",
                bgcolor: "#4B506A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              {frontImage ? (
                <Box
                  component="img"
                  src={URL.createObjectURL(frontImage)}
                  alt={t("VerifiedPage.label6")}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <CameraIcon width="24px" height="24px" fill="#E8EAF0" />
              )}
            </Box>

            <Typography
              sx={{
                mt: "8px",
                color: "#A8A9B3",
                fontSize: "13px",
                textAlign: "center",
                lineHeight: "18px",
              }}
            >
              {t("VerifiedPage.label6")}
            </Typography>

            <input
              type="file"
              accept="image/*"
              ref={frontFileInput}
              style={{ display: "none" }}
              onChange={handleFrontChange}
            />
          </Box>

          {/* Mặt sau */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              onClick={handleBackClick}
              sx={{
                width: "74px",
                height: "74px",
                bgcolor: "#4B506A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              {backImage ? (
                <Box
                  component="img"
                  src={URL.createObjectURL(backImage)}
                  alt={t("VerifiedPage.label7")}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <CameraIcon width="24px" height="24px" fill="#E8EAF0" />
              )}
            </Box>

            <Typography
              sx={{
                mt: "8px",
                color: "#A8A9B3",
                fontSize: "13px",
                textAlign: "center",
                lineHeight: "18px",
              }}
            >
              {t("VerifiedPage.label7")}
            </Typography>

            <input
              type="file"
              accept="image/*"
              ref={backFileInput}
              style={{ display: "none" }}
              onChange={handleBackChange}
            />
          </Box>
        </Box>

        {/* Button */}
        <Button
          type="button"
          onClick={handleSubmit}
          fullWidth
          sx={{
            height: "46px",
            mt: "10px",
            bgcolor: "#00B900",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 500,
            textTransform: "none",

            "&:hover": {
              bgcolor: "#00B900",
            },
          }}
        >
          {t("VerifiedPage.button")}
        </Button>

        {/* Note */}
        <Typography
          sx={{
            mt: "18px",
            color: "#7E818D",
            fontSize: "12px",
            lineHeight: "17px",
          }}
        >
          {t("VerifiedPage.note")}{" "}
          <Box
            component="span"
            sx={{
              color: "#1683E8",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {t("VerifiedPage.note1")}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
