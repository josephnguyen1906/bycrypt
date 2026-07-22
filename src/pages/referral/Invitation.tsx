"use client";

import LoadingComponent from "@/components/Loading";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  getReferral,
  type ReferralData,
  type ReferralMember,
} from "@/services/User.service";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/useUserStore";
import QRCode from "react-qr-code";

export default function InvitationPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useUserStore();
  const [referral, setReferral] = useState<ReferralData | null>(null);
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [loadingReferral, setLoadingReferral] = useState(true);
  const [showInvitation, setShowInvitation] = useState(false);

  const fetchReferral = useCallback(async (nextLevel: 1 | 2 | 3) => {
    try {
      setLoadingReferral(true);
      const res = await getReferral(nextLevel);
      if (res.data?.status) {
        setReferral(res.data.data);
      }
    } catch {
      // keep previous summary if tab switch fails
    } finally {
      setLoadingReferral(false);
    }
  }, []);

  useEffect(() => {
    fetchReferral(level);
  }, [fetchReferral, level]);

  const copyAddress = () => {
    const code = user?.invit || referral?.invit;
    if (!code) return;
    navigator.clipboard.writeText(code);
    toast.success(t("DepositWithdrawPage.copy"));
  };

  if (!user) {
    return <LoadingComponent />;
  }

  const members: ReferralMember[] = referral?.members ?? [];
  const qrValue = referral?.referral_url || user.invit || "";

  const tabSx = (active: boolean) => ({
    color: active ? "#00D084" : "#fff",
    fontSize: "14px",
    fontWeight: active ? 600 : 400,
    pb: "10px",
    borderBottom: active ? "2px solid #00D084" : "2px solid transparent",
    cursor: "pointer",
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "#0D0E16",
        color: "#fff",
        pb: "100px",
      }}
    >
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
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#fff",
            width: "35px",
            height: "35px",
            p: 0,
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "21px", color: "#fff" }} />
        </IconButton>

        <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 600 }}>
          {t("InvitationPage.menu")}
        </Typography>
      </Box>

      {!showInvitation && (
        <>
          <Box
            sx={{
              width: "100%",
              height: "110px",
              position: "relative",
              overflow: "hidden",
              background: "#E9F0E8",
            }}
          >
            <Box
              component="img"
              src="/images/invite-bg-3cbb5fa3.png"
              alt="Invitation"
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                width: "70%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: "20px",
              }}
            >
              <Typography
                sx={{
                  color: "#172B48",
                  fontSize: "23px",
                  lineHeight: "29px",
                  fontWeight: 700,
                }}
              >
                {t("InvitationPage.h2")}
              </Typography>

              <Typography
                sx={{
                  color: "#172B48",
                  fontSize: "19px",
                  lineHeight: "27px",
                  fontWeight: 600,
                  mt: "5px",
                }}
              >
                {t("InvitationPage.h3")}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ px: "16px", pt: "18px" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                alignItems: "start",
                gap: "10px",
              }}
            >
              <Box>
                <Typography sx={{ color: "#8D909B", fontSize: "12px", mb: "16px" }}>
                  {t("InvitationPage.title2")}
                </Typography>
                <Typography
                  sx={{ color: "#00D084", fontSize: "30px", lineHeight: 1, fontWeight: 600 }}
                >
                  {referral?.total_bonus ?? "0"}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ color: "#8D909B", fontSize: "12px", mb: "16px" }}>
                  {t("InvitationPage.title3")}
                </Typography>
                <Typography
                  sx={{ color: "#00D084", fontSize: "30px", lineHeight: 1, fontWeight: 600 }}
                >
                  {referral?.total_deposit ?? "0.00"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", mt: "2px" }}>
                <Typography sx={{ color: "#00D084", fontSize: "12px", whiteSpace: "nowrap" }}>
                  {t("InvitationPage.title4")}
                </Typography>
                <KeyboardArrowRightIcon sx={{ color: "#008FFF", fontSize: "22px" }} />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              px: "16px",
              mt: "35px",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography sx={{ color: "#8D909B", fontSize: "12px" }}>
                {t("InvitationPage.title5")}
              </Typography>
              <Typography sx={{ color: "#8D909B", fontSize: "20px", mt: "38px" }}>
                {referral?.level_one_count ?? 0}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#8D909B", fontSize: "12px" }}>
                {t("InvitationPage.title6")}
              </Typography>
              <Typography sx={{ color: "#8D909B", fontSize: "20px", mt: "38px" }}>
                {referral?.level_two_count ?? 0}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#8D909B", fontSize: "12px" }}>
                {t("InvitationPage.title7")}
              </Typography>
              <Typography sx={{ color: "#8D909B", fontSize: "20px", mt: "38px" }}>
                {referral?.level_three_count ?? 0}
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            sx={{
              mx: "16px",
              width: "calc(100% - 32px)",
              height: "49px",
              mt: "28px",
              bgcolor: "#00B900",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "15px",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": { bgcolor: "#00B900" },
            }}
            onClick={() => setShowInvitation(true)}
          >
            {t("InvitationPage.button1")}
          </Button>

          <Box sx={{ mt: "50px", px: "16px" }}>
            <Typography
              sx={{ color: "#fff", fontSize: "16px", fontWeight: 500, mb: "25px" }}
            >
              {t("InvitationPage.title8")}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                textAlign: "center",
              }}
            >
              <Box onClick={() => setLevel(1)}>
                <Typography sx={tabSx(level === 1)}>{t("InvitationPage.title9")}</Typography>
              </Box>
              <Box onClick={() => setLevel(2)}>
                <Typography sx={tabSx(level === 2)}>{t("InvitationPage.title10")}</Typography>
              </Box>
              <Box onClick={() => setLevel(3)}>
                <Typography sx={tabSx(level === 3)}>{t("InvitationPage.title11")}</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                textAlign: "center",
                mt: "25px",
                gap: "10px",
              }}
            >
              <Typography sx={{ color: "#8D909B", fontSize: "13px", lineHeight: "20px" }}>
                {t("InvitationPage.title12")}
              </Typography>
              <Typography sx={{ color: "#8D909B", fontSize: "13px", lineHeight: "20px" }}>
                {t("InvitationPage.title13")}
              </Typography>
              <Typography sx={{ color: "#8D909B", fontSize: "13px", lineHeight: "20px" }}>
                {t("InvitationPage.title14")}
              </Typography>
            </Box>

            {loadingReferral ? (
              <Box sx={{ py: "30px" }}>
                <LoadingComponent />
              </Box>
            ) : members.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "80px",
                }}
              >
                <Typography sx={{ color: "#8D909B", fontSize: "13px" }}>
                  {t("InvitationPage.title15")}
                </Typography>
              </Box>
            ) : (
              members.map((member) => (
                <Box
                  key={`${level}-${member.username}`}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    textAlign: "center",
                    py: "12px",
                    borderBottom: "1px solid #2D303A",
                    gap: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "13px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {member.username}
                  </Typography>
                  <Typography sx={{ color: "#fff", fontSize: "13px" }}>
                    {member.referral_count}
                  </Typography>
                  <Typography sx={{ color: "#fff", fontSize: "13px" }}>
                    {member.total_deposit}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </>
      )}

      {showInvitation && (
        <Box
          sx={{
            mt: "10px",
            mx: "16px",
            pt: "25px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              width: "180px",
              height: "180px",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "6px",
              p: "8px",
            }}
          >
            <QRCode value={qrValue} size={150} />
          </Box>
          <Typography
            sx={{
              color: "#fff",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: 500,
              mb: "15px",
              mt: "15px",
            }}
          >
            {t("InvitationPage.title1")}
          </Typography>

          <Typography
            sx={{
              color: "#00D084",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: 600,
              mb: "15px",
            }}
          >
            {user?.invit || referral?.invit}
          </Typography>

          <Button
            onClick={copyAddress}
            sx={{
              width: "150px",
              height: "40px",
              display: "flex",
              margin: "20px auto 0",
              background: "#00B900",
              color: "#fff",
              borderRadius: "4px",
              textTransform: "none",
              "&:hover": { background: "#00B900" },
            }}
          >
            {t("InvitationPage.button")}
          </Button>

          <Button
            onClick={() => setShowInvitation(false)}
            sx={{
              width: "150px",
              height: "40px",
              display: "flex",
              margin: "12px auto 0",
              color: "#8D909B",
              textTransform: "none",
            }}
          >
            {t("common.back", { defaultValue: "Back" })}
          </Button>
        </Box>
      )}
    </Box>
  );
}
