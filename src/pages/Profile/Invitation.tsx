"use client";
import LoadingComponent from "@/components/Loading";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getReferral } from "@/services/User.service";
import {
  UserIcon,
  VerifiedIcon,
  WarningIcon,
} from "@/shared/Svgs/Svg.component";
import { formatDateTime } from "@/utils/formatDateTime";
import {
  Box,
  Button,
  IconButton,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Image from "next/image";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
export default function InvitationPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [referral, setReferral] = useState<any>(null);

  useEffect(() => {
    const referral = async () => {
      try {
        setLoading(true);
        const res: any = await getReferral();
        if (res.status === true) {
          setReferral(res.data);
        }
        setLoading(false);
      } catch (errors: any) {
        toast.error(errors?.message);
      }
    };
    referral();
  }, []);

  const copyAddress = () => {
    if (referral) {
      navigator.clipboard.writeText(referral?.invit);
      toast.success(t("DepositWithdrawPage.copy"));
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "#111827",

        pb: "130px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          p: 1,
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
            fontWeight: 500,
            fontSize: 20,
            color: "white",
          }}
        >
          {t("ProfilePage.Invite")}
        </Typography>
      </Box>

      <Box
        sx={{
          background: "#3b4338",
          width: "95%",
          margin: "auto",
          borderRadius: "20px",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Typography
          sx={{ color: "#34d399", textAlign: "center", fontSize: "14px" }}
        >
          {t("ProfilePage.Invi")}
        </Typography>
        <Typography
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "16px",
            fontWeight: 500,
            p: 2,
          }}
        >
          {referral?.invit}
        </Typography>
        <Box
          sx={{
            background: "white",
            width: "70%",
            p: 2,
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          <Image
            src={referral?.qrcode_url}
            width={300}
            height={300}
            alt=""
            style={{ objectFit: "contain", height: "200px" }}
          />
        </Box>
        <Typography
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: 400,
            p: 2,
          }}
        >
          {referral?.qrcode_url}
        </Typography>

        <Button
          onClick={copyAddress}
          sx={{
            width: "150px",
            height: "40px",
            background: "#7cf03a",
            color: "black",
            margin: "0 auto",
            textTransform: "capitalize",
            "&:hover": {
              background: "#7cf03a",
            },
          }}
        >
          {t("Toast.copy")}
        </Button>
      </Box>
    </Box>
  );
}
