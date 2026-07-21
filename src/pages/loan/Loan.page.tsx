"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { postUpdateUser } from "@/services/User.service";
import LoadingComponent from "@/components/Loading";
import { useUserStore } from "@/stores/useUserStore";

export default function LoanSupportPage() {
  const [gender, setGender] = useState("1");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bithday, setBithday] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [certificate, setCertificate] = useState("cccd");
  const [frontImage, setFrontImage] = useState<File>();
  const [backImage, setBackImage] = useState<File>();
  const [imgLoan, setImgLoan] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const frontFileInput = useRef<HTMLInputElement>(null);
  const backFileInput = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { user, fetchUser, loading } = useUserStore();

  const handleFrontClick = () => {
    frontFileInput.current?.click();
  };

  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFrontImage(file);
    }
  };

  const previewSrc = frontImage
    ? URL.createObjectURL(frontImage)
    : imgLoan || null;

  const handleBackClick = () => {
    backFileInput.current?.click();
  };

  const handleBackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setBackImage(file);
    }
  };

  const previewBackSrc = backImage
    ? URL.createObjectURL(backImage)
    : imgLoan || null;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!user) return;
    setName(user.firstname || "");
    setLastName(user.lastname || "");
    setPhone(user.phonenumber || "");
    setBithday(user.dob || "");
    setCertificate(user.loan || "cccd");
    setImgLoan(user.img_loan || "");
    setCountry(user.country || "");
  }, [user]);

  const handleSubmit = async () => {
    if (!frontImage && !imgLoan) {
      toast.warning(t("Toast.uploadFIle"));
      return;
    }

    try {
      setSubmitting(true);

      // const formData = new FormData();
      // formData.append("firstname", name);
      // formData.append("lastname", lastName);
      // formData.append("gender", gender);
      // if (bithday) {
      //   const date = new Date(bithday);

      //   const formatted = `${String(date.getDate()).padStart(2, "0")}/${String(
      //     date.getMonth() + 1,
      //   ).padStart(2, "0")}/${date.getFullYear()}`;

      //   formData.append("dob", formatted);
      // }
      // formData.append("country", country);
      // formData.append("phonenumber", phone);
      // formData.append("loan", certificate);

      // if (frontImage) {
      //   formData.append("img_loan", frontImage);
      // }

      // await postUpdateUser(formData);

      toast.success(t("Toast.update_succ"));
      await fetchUser();
      setFrontImage(undefined);
    } catch (error: any) {
      toast.error(t(error?.message || "Toast.update_error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

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
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          height: "55px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Back */}
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#fff",
            width: "40px",
            height: "40px",
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              fontSize: "22px",
            }}
          />
        </IconButton>

        {/* Title */}
        <Typography
          sx={{
            color: "#fff",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {t("loan.title")}
        </Typography>

        {/* Right buttons */}
        <Box
          sx={{
            position: "absolute",
            right: "10px",
            display: "flex",
            gap: "8px",
          }}
        >
          <IconButton
            sx={{
              width: "25px",
              height: "25px",
              bgcolor: "#EDF2FF",
              color: "#095CE5",
              "&:hover": {
                bgcolor: "#EDF2FF",
              },
            }}
            onClick={() => router.push("/loan/rule")}
          >
            <InfoOutlinedIcon
              sx={{
                fontSize: "22px",
              }}
            />
          </IconButton>

          <IconButton
            sx={{
              width: "25px",
              height: "25px",
              bgcolor: "#EDF2FF",
              color: "#095CE5",
              "&:hover": {
                bgcolor: "#EDF2FF",
              },
            }}
            onClick={() => router.push("/loan/history")}
          >
            <DescriptionOutlinedIcon
              sx={{
                fontSize: "22px",
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* ================= CONTENT ================= */}
      <Box
        sx={{
          px: "14px",
        }}
      >
        {/* Warning */}
        <Typography
          sx={{
            color: "#FF4B57",
            fontSize: 14,
            lineHeight: "27px",
            mt: "40px",
            mb: "35px",
          }}
        >
          {t("loan.warning")}
        </Typography>

        {/* ================= LOAN INFO ================= */}
        <Box>
          {/* Số tiền vay */}
          <Box
            sx={{
              minHeight: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography
              sx={{
                color: "#9298A9",
                fontSize: 14,
              }}
            >
              {t("loan.info.expectedAmount")}
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              200000
            </Typography>
          </Box>

          {/* Chu kỳ */}
          <Box
            sx={{
              minHeight: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography
              sx={{
                color: "#9298A9",
                fontSize: 14,
              }}
            >
              {t("loan.info.paymentCycle")}
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("loan.values.paymentCycle")}
            </Typography>
          </Box>

          {/* Lãi suất */}
          <Box
            sx={{
              minHeight: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography
              sx={{
                color: "#9298A9",
                fontSize: 14,
              }}
            >
              {t("loan.info.dailyInterestRate")}
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("loan.values.dailyInterestRate")}
            </Typography>
          </Box>

          {/* Phương thức */}
          <Box
            sx={{
              minHeight: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "15px",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography
              sx={{
                color: "#9298A9",
                fontSize: 14,
              }}
            >
              {t("loan.info.paymentMethod")}
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                textAlign: "right",
              }}
            >
              {t("loan.info.paymentMethodValue")}
            </Typography>
          </Box>

          {/* Tiền lãi */}
          <Box
            sx={{
              minHeight: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography
              sx={{
                color: "#9298A9",
                fontSize: 14,
              }}
            >
              {t("loan.info.interest")}
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("loan.values.interest")}
            </Typography>
          </Box>

          {/* Ngân hàng */}
          <Box
            sx={{
              minHeight: "75px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #2D303A",
            }}
          >
            <Typography
              sx={{
                color: "#9298A9",
                fontSize: 14,
              }}
            >
              {t("loan.info.lender")}
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {t("loan.values.lender")}
            </Typography>
          </Box>
        </Box>

        {/* ================= UPLOAD ================= */}
        <Typography
          sx={{
            color: "#fff",
            fontSize: 14,
            lineHeight: "27px",
            mt: "40px",
            mb: "25px",
          }}
        >
          {t("loan.upload.title")} {t("loan.upload.description")}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Image */}
            <Box
              onClick={handleFrontClick}
              sx={{
                width: "100%",
                maxWidth: "100%",
                height: "154px",
                bgcolor: "#4B506A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: "5px",
              }}
            >
              {previewSrc ? (
                <Box
                  component="img"
                  src={previewSrc}
                  alt={t("loan.upload.documentAlt")}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <CameraAltIcon
                  sx={{
                    color: "#E8EAF0",
                    fontSize: "45px",
                  }}
                />
              )}
            </Box>

            {/* Label */}
            <Typography
              sx={{
                color: "#9295A3",
                fontSize: "14px",
                mt: "15px",
                textAlign: "center",
              }}
            >
              {t("VerifiedPage.label6")}
            </Typography>

            {/* Input */}
            <input
              ref={frontFileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFrontChange}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Image */}
            <Box
              onClick={handleBackClick}
              sx={{
                width: "100%",
                maxWidth: "100%",
                height: "154px",
                bgcolor: "#4B506A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                borderRadius: "5px",
              }}
            >
              {previewBackSrc ? (
                <Box
                  component="img"
                  src={previewBackSrc}
                  alt={t("loan.upload.documentAlt")}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <CameraAltIcon
                  sx={{
                    color: "#E8EAF0",
                    fontSize: "45px",
                  }}
                />
              )}
            </Box>

            {/* Label */}
            <Typography
              sx={{
                color: "#9295A3",
                fontSize: "14px",
                mt: "15px",
                textAlign: "center",
              }}
            >
              {t("VerifiedPage.label7")}
            </Typography>

            {/* Input */}
            <input
              ref={backFileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={handleBackChange}
            />
          </Box>
        </Box>

        {/* ================= SUBMIT ================= */}
        <Button
          fullWidth
          onClick={handleSubmit}
          disabled={submitting}
          sx={{
            height: "55px",
            mt: "45px",
            bgcolor: "#00B900",
            color: "#fff",
            borderRadius: "5px",
            fontSize: 14,
            fontWeight: 500,
            textTransform: "none",

            "&:hover": {
              bgcolor: "#00B900",
            },

            "&.Mui-disabled": {
              bgcolor: "#087F08",
              color: "#aaa",
            },
          }}
        >
          {submitting ? t("loan.form.processing") : t("loan.form.confirm")}
        </Button>
      </Box>
    </Box>
  );
}
