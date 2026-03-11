"use client";

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { postUpdateUser } from "@/services/User.service";
import { useUserStore } from "@/stores/useUserStore";
import LoadingComponent from "@/components/Loading";

export default function LoanPage() {
  const [gender, setGender] = useState("1");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bithday, setBithday] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [certificate, setCertificate] = useState("cccd");
  const [frontImage, setFrontImage] = useState<File>();
  const [imgLoan, setImgLoan] = useState<string>("");
  const frontFileInput = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();
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
    : user?.img_loan || null;

  useEffect(() => {
    fetchUser();
    if (user) {
      setName(user.firstname);
      setLastName(user.lastname);
      setPhone(user.phonenumber);
      setBithday(user.dob);
      setCertificate(user.loan);
      setName(user.firstname);
      setImgLoan(user.img_loan);
      setCountry(user.country);
    }
  }, [fetchUser]);

  if (loading) {
    return <LoadingComponent />;
  }
  const handleSubmit = async () => {
    if (!frontImage) {
      toast.warning(t("Toast.uploadFIle"));
      return;
    }

    try {
      const date = new Date(bithday);

      const formatted = `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}/${date.getFullYear()}`;

      const formData = new FormData();
      formData.append("firstname", name);
      formData.append("lastname", lastName);
      formData.append("gender", gender);
      formData.append("dob", formatted);
      formData.append("country", country);
      formData.append("phonenumber", phone);
      formData.append("loan", certificate);
      formData.append("img_loan", frontImage);

      await postUpdateUser(formData);
      toast.success(t("Toast.update_succ"));
    } catch (error: any) {
      toast.error(t(error.message));
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "#111827",
        p: 2,
        pb: "130px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{ background: "#232932" }}
        >
          <ArrowBackIosNewIcon
            sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
          />
        </IconButton>

        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: 600,
            fontSize: 20,
            color: "white",
          }}
        >
          {t("Toast.loan")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          p: 3,
        }}
      >
        {/* NAME */}
        <Stack spacing={1} mt={2}>
          <Typography fontSize={13} color="white">
            {t("AssetPage.name")}:
          </Typography>

          <TextField
            placeholder={t("AssetPage.inputname")}
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            InputProps={{
              sx: inputStyle,
            }}
          />
        </Stack>

        {/* SURNAME */}
        <Stack spacing={1} mt={3}>
          <Typography fontSize={13} color="white">
            {t("AssetPage.Surname")}:
          </Typography>

          <TextField
            placeholder={t("AssetPage.input_4")}
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            InputProps={{
              sx: inputStyle,
            }}
          />
        </Stack>

        {/* GENDER */}
        <Stack spacing={1} mt={3}>
          <Typography fontSize={13} color="white">
            {t("AssetPage.gender")}:
          </Typography>

          <TextField
            select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            fullWidth
            InputProps={{
              sx: inputStyle,
            }}
          >
            <MenuItem value="1"> {t("AssetPage.male")}</MenuItem>
            <MenuItem value="0"> {t("AssetPage.female")}</MenuItem>
          </TextField>
        </Stack>

        {/* DATE */}
        <Stack spacing={1} mt={3}>
          <Typography fontSize={13} color="white">
            {t("AssetPage.Birth")}:
          </Typography>

          <TextField
            type="date"
            fullWidth
            value={bithday}
            onChange={(e) => setBithday(e.target.value)}
            InputProps={{
              sx: inputStyle,
            }}
          />
        </Stack>

        {/* COUNTRY */}
        <Stack spacing={1} mt={3}>
          <Typography fontSize={13} color="white">
            {t("ProfilePage.country")}:
          </Typography>

          <TextField
            placeholder={t("AssetPage.input_5")}
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            InputProps={{
              sx: inputStyle,
            }}
          />
        </Stack>

        {/* PHONE */}
        <Stack spacing={1} mt={3}>
          <Typography fontSize={13} color="white">
            {t("ProfilePage.Phone")}:
          </Typography>

          <TextField
            placeholder={t("AssetPage.input_6")}
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{
              sx: inputStyle,
            }}
          />
        </Stack>

        {/* CERTIFICATE */}
        <Stack spacing={1} mt={3}>
          <Typography fontSize={13} color="white">
            {t("AssetPage.Certificates")}:
          </Typography>

          <TextField
            select
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
            fullWidth
            InputProps={{
              sx: inputStyle,
            }}
          >
            <MenuItem value="cccd">CCCD</MenuItem>
            {/* <MenuItem value="passport">Passport</MenuItem>
            <MenuItem value="driver">Driver License</MenuItem> */}
          </TextField>
        </Stack>

        {/* UPLOAD */}
        <Stack alignItems="center" mt={4}>
          <Box sx={{ textAlign: "center" }}>
            {previewSrc ? (
              <Box
                component="img"
                src={previewSrc}
                alt="Handheld ID"
                onClick={handleFrontClick}
                sx={{
                  width: 130,
                  height: 130,
                  borderRadius: "8px",
                  boxShadow: 2,
                  cursor: "pointer",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                onClick={handleFrontClick}
                sx={{
                  width: 130,
                  height: 130,
                  borderRadius: 3,
                  background: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <PhotoCameraOutlinedIcon
                  sx={{ fontSize: 35, color: "#9ca3af" }}
                />
              </Box>
            )}

            <input
              type="file"
              accept="image/*"
              ref={frontFileInput}
              style={{ display: "none" }}
              onChange={handleFrontChange}
            />
            <Typography fontSize={13} color="#9ca3af" mt={1}>
              {t("AssetPage.photo")}
            </Typography>
          </Box>
        </Stack>

        {/* BUTTON */}
        <Button
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 4,
            height: 50,
            borderRadius: 10,
            background: "#34d399",
            color: "black",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              background: "#2cc48b",
            },
          }}
        >
          {t("DepositWithdrawPage.tab4")}
        </Button>
      </Box>
    </Box>
  );
}

const inputStyle = {
  background: "#1e293b",
  borderRadius: 2,
  color: "white",
  "& fieldset": {
    borderColor: "#334155",
  },
  "& input": {
    color: "white",
  },
};
