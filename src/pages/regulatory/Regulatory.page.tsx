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
import Image from "next/image";

export default function RegulatoryPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "white",
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
          sx={{ background: "#e5e7eb" }}
        >
          <ArrowBackIosNewIcon
            sx={{ cursor: "pointer", color: "black", fontSize: "14px" }}
          />
        </IconButton>
        <Typography sx={{ fontSize: "11px", pl: "5px" }}> 1 of 1</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Image
          src={"/images/photo.jpg"}
          width={400}
          height={600}
          alt=""
          style={{ width: "100%", objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
}
