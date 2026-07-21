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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useUserStore } from "@/stores/useUserStore";
import QRCode from "react-qr-code";
export default function InvitationPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, loading } = useUserStore();
  const [referral, setReferral] = useState<any>(null);
  const [showInvitation, setShowInvitation] = useState(false);
  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getReferral();
        if (res.status === true) {
          setReferral(res.data);
        }
      } catch (errors: any) {
        // toast.error(errors?.message);
      }
    };
    referral();
  }, []);

  const copyAddress = () => {
    if (user) {
      navigator.clipboard.writeText(user.invit);
      toast.success(t("DepositWithdrawPage.copy"));
    }
  };

  if (!user) {
    return <LoadingComponent />;
  }
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
      {/* ================= HEADER ================= */}
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
          <ArrowBackIosNewIcon
            sx={{
              fontSize: "21px",
              color: "#fff",
            }}
          />
        </IconButton>

        <Typography
          sx={{
            color: "#fff",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
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
                {" "}
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

          <Box
            sx={{
              px: "16px",
              pt: "18px",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                alignItems: "start",
                gap: "10px",
              }}
            >
              {/* Tổng khuyến mãi */}
              <Box>
                <Typography
                  sx={{
                    color: "#8D909B",
                    fontSize: "12px",
                    mb: "16px",
                  }}
                >
                  {t("InvitationPage.title2")}
                </Typography>

                <Typography
                  sx={{
                    color: "#00D084",
                    fontSize: "30px",
                    lineHeight: 1,
                    fontWeight: 600,
                  }}
                >
                  {referral?.total_bonus ?? 0}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "#8D909B",
                    fontSize: "12px",
                    mb: "16px",
                  }}
                >
                  {t("InvitationPage.title3")}
                </Typography>

                <Typography
                  sx={{
                    color: "#00D084",
                    fontSize: "30px",
                    lineHeight: 1,
                    fontWeight: 600,
                  }}
                >
                  {referral?.total_deposit ?? "0.00"}
                </Typography>
              </Box>

              {/* Quy tắc */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  mt: "2px",
                }}
              >
                <Typography
                  sx={{
                    color: "#00D084",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("InvitationPage.title4")}
                </Typography>

                <KeyboardArrowRightIcon
                  sx={{
                    color: "#008FFF",
                    fontSize: "22px",
                  }}
                />
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
              <Typography
                sx={{
                  color: "#8D909B",
                  fontSize: "12px",
                }}
              >
                {t("InvitationPage.title5")}
              </Typography>

              <Typography
                sx={{
                  color: "#8D909B",
                  fontSize: "20px",
                  mt: "38px",
                }}
              >
                {referral?.level_one_count ?? 0}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "#8D909B",
                  fontSize: "12px",
                }}
              >
                {t("InvitationPage.title6")}
              </Typography>

              <Typography
                sx={{
                  color: "#8D909B",
                  fontSize: "20px",
                  mt: "38px",
                }}
              >
                {referral?.level_two_count ?? 0}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "#8D909B",
                  fontSize: "12px",
                }}
              >
                {t("InvitationPage.title7")}
                Số lượng hạng Ba
              </Typography>

              <Typography
                sx={{
                  color: "#8D909B",
                  fontSize: "20px",
                  mt: "38px",
                }}
              >
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

              "&:hover": {
                bgcolor: "#00B900",
              },
            }}
            onClick={() => setShowInvitation(true)}
          >
            {t("InvitationPage.button1")}
          </Button>

          <Box
            sx={{
              mt: "50px",
              px: "16px",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "16px",
                fontWeight: 500,
                mb: "25px",
              }}
            >
              {t("InvitationPage.title8")}
            </Typography>

            {/* Rank tabs */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                textAlign: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#00D084",
                    fontSize: "14px",
                    fontWeight: 600,
                    pb: "10px",
                    borderBottom: "2px solid #00D084",
                  }}
                >
                  {t("InvitationPage.title9")}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                    pb: "10px",
                  }}
                >
                  {t("InvitationPage.title10")}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                    pb: "10px",
                  }}
                >
                  {t("InvitationPage.title11")}
                </Typography>
              </Box>
            </Box>

            {/* Table header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                textAlign: "center",
                mt: "25px",
                gap: "10px",
              }}
            >
              <Typography
                sx={{
                  color: "#8D909B",
                  fontSize: "13px",
                  lineHeight: "20px",
                }}
              >
                {t("InvitationPage.title12")}
              </Typography>

              <Typography
                sx={{
                  color: "#8D909B",
                  fontSize: "13px",
                  lineHeight: "20px",
                }}
              >
                {t("InvitationPage.title13")}
              </Typography>

              <Typography
                sx={{
                  color: "#8D909B",
                  fontSize: "13px",
                  lineHeight: "20px",
                }}
              >
                {t("InvitationPage.title14")}
              </Typography>
            </Box>

            {/* Empty state */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80px",
              }}
            >
              <Typography
                sx={{
                  color: "#8D909B",
                  fontSize: "13px",
                }}
              >
                {t("InvitationPage.title15")}
              </Typography>
            </Box>
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
          {/* QR */}
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
            <QRCode value={user?.invit || ""} size={150} />
          </Box>
          <Typography
            sx={{
              color: "#fff",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: 500,
              mb: "15px",
            }}
          >
            {t("InvitationPage.title1")}
          </Typography>

          {/* Invitation code */}
          <Typography
            sx={{
              color: "#00D084",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: 600,
              mb: "15px",
            }}
          >
            {user?.invit}
          </Typography>
          {/* Copy */}
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

              "&:hover": {
                background: "#00B900",
              },
            }}
          >
            {t("InvitationPage.button")}
          </Button>
        </Box>
      )}
    </Box>
  );
}
