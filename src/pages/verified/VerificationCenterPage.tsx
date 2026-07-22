"use client";

import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VerifiedIcon from "@mui/icons-material/Verified";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getVerificationStatus } from "@/services/User.service";
import { useTranslation } from "react-i18next";

type VerificationInfo = {
  fullname?: string | null;
  cccd?: string | null;
  rzstatus: number;
  rzstatus_label: string;
  primary_certified: boolean;
  advanced_certified: boolean;
  personal_info_done: boolean;
  government_id_done: boolean;
  review_days: number;
  can_submit: boolean;
  locale: string;
  country_name: string;
  flag_png: string;
  flag_url: string;
  detail_path: string;
};

const STATUS_TEXT: Record<string, string> = {
  none: "VerifiedPage.label21",
  pending: "VerifiedPage.label22",
  approved: "VerifiedPage.label23",
  rejected: "VerifiedPage.label24",
};

export default function VerificationCenterPage() {
  const router = useRouter();
  const [info, setInfo] = useState<VerificationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    let cancelled = false;
    getVerificationStatus()
      .then((res: any) => {
        if (cancelled) return;
        if (res?.status && res.data) {
          setInfo(res.data as VerificationInfo);
        }
      })
      .catch(() => {
        /* keep empty state */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCheckDetail = () => {
    router.push(info?.detail_path || "/verified");
  };

  const statusLabel =
    STATUS_TEXT[info?.rzstatus_label || "none"] || STATUS_TEXT.none;
  const primaryOn = Boolean(info?.primary_certified || info?.rzstatus === 1);
  const personalDone = Boolean(info?.personal_info_done);
  const idDone = Boolean(info?.government_id_done);

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
        pb: 5,
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
          }}
        >
          {t("VerifiedPage.label8")}
        </Typography>
      </Box>

      {/* ================= CONTENT ================= */}
      <Box
        sx={{
          px: "13px",
          pt: "12px",
        }}
      >
        {/* Personal Center */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#fff",
              fontWeight: 400,
            }}
          >
            {info?.fullname || "Personal Center"}
          </Typography>

          {/* Quốc kỳ */}
          <Box
            sx={{
              width: "38px",
              height: "24px",
              overflow: "hidden",
              borderRadius: "1px",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Box
              component="img"
              src={
                info?.flag_png ||
                info?.flag_url ||
                "https://flagcdn.com/w80/vn.png"
              }
              alt={info?.country_name || "flag"}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Stack>

        {/* ================= CURRENT FEATURES BUTTON ================= */}
        <Button
          startIcon={
            <VerifiedIcon
              sx={{
                fontSize: "16px !important",
                color: "#00A8FF",
              }}
            />
          }
          sx={{
            height: "47px",
            px: "15px",
            borderRadius: "24px",
            bgcolor: "#1B2237",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 400,
            textTransform: "none",

            "&:hover": {
              bgcolor: "#222A42",
            },
          }}
        >
          {loading
            ? t("VerifiedPage.label10")
            : `${t("VerifiedPage.label9")}: ${t(statusLabel)}`}
        </Button>

        {/* ================= VERIFICATION TYPE ================= */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px",
            mt: "38px",
          }}
        >
          {/* Primary Certification */}
          <Box
            sx={{
              height: "38px",
              borderRadius: "22px",
              bgcolor: primaryOn ? "#00B900" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={handleCheckDetail}
          >
            <Box
              sx={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                bgcolor: "#DCEBFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: "6px",
              }}
            >
              <VerifiedIcon
                sx={{
                  fontSize: "15px",
                  color: primaryOn ? "#00B900" : "#62B5FF",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: "12px",
                lineHeight: "14px",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {t("VerifiedPage.label11")}
            </Typography>
          </Box>

          {/* Advanced Certification */}
          <Box
            sx={{
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "default",
              opacity: info?.advanced_certified ? 1 : 0.55,
            }}
          >
            <Box
              sx={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                bgcolor: "#DCEBFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: "7px",
              }}
            >
              <VerifiedIcon
                sx={{
                  fontSize: "15px",
                  color: "#62B5FF",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: "12px",
                lineHeight: "16px",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              {t("VerifiedPage.label12")}
            </Typography>
          </Box>
        </Box>

        {/* ================= REQUIRE ================= */}
        <Typography
          sx={{
            mt: "16px",
            color: "#8A8D9A",
            fontSize: "12px",
          }}
        >
          {t("DepositWithdrawPage.label19")}
        </Typography>

        {/* ================= REQUIREMENT LIST ================= */}
        <Stack
          spacing={0}
          sx={{
            mt: "8px",
          }}
        >
          {/* Personal Information */}
          <Box
            sx={{
              minHeight: "47px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleCheckDetail}
          >
            <PersonOutlineIcon
              sx={{
                fontSize: "22px",
                color: "#8B8E9B",
                mr: "7px",
              }}
            />

            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#fff",
                flex: 1,
              }}
            >
              {t("VerifiedPage.label13")}
            </Typography>

            {personalDone && (
              <CheckCircleIcon sx={{ fontSize: 18, color: "#00B900" }} />
            )}
          </Box>

          {/* Government ID */}
          <Box
            sx={{
              minHeight: "47px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleCheckDetail}
          >
            <BadgeIcon
              sx={{
                fontSize: "21px",
                color: "#8B8E9B",
                mr: "8px",
              }}
            />

            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#fff",
                flex: 1,
              }}
            >
              {t("VerifiedPage.label14")}
            </Typography>

            {idDone && (
              <CheckCircleIcon sx={{ fontSize: 18, color: "#00B900" }} />
            )}
          </Box>
        </Stack>

        {/* ================= FEATURES & LIMITATIONS ================= */}
        <Typography
          sx={{
            mt: "7px",
            fontSize: "12px",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          {t("VerifiedPage.label15")}
        </Typography>

        {/* Time */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "14px",
          }}
        >
          <AccessTimeIcon
            sx={{
              fontSize: "22px",
              color: "#777B89",
              mr: "7px",
            }}
          />

          <Typography
            sx={{
              color: "#777B89",
              fontSize: "11px",
            }}
          >
            {t("VerifiedPage.label16")}: {info?.review_days ?? 3}{" "}
            {t("HomePage.title7")}
          </Typography>
        </Box>

        {/* ================= REVIEW ================= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: "-4px",
          }}
        >
          <Button
            startIcon={
              <StarIcon
                sx={{
                  fontSize: "17px !important",
                  color: "#F2C200",
                }}
              />
            }
            endIcon={
              <KeyboardArrowRightIcon
                sx={{
                  fontSize: "16px !important",
                  color: "#777",
                }}
              />
            }
            sx={{
              minWidth: "95px",
              height: "38px",
              borderRadius: "20px 0 0 20px",
              bgcolor: "#fff",
              color: "#D59F00",
              fontSize: "12px",
              textTransform: "none",
              px: "10px",

              "&:hover": {
                bgcolor: "#fff",
              },
            }}
          >
            {t("VerifiedPage.label17")}
          </Button>
        </Box>

        {/* ================= CHECK DETAIL BUTTON ================= */}
        <Button
          fullWidth
          onClick={handleCheckDetail}
          sx={{
            height: "42px",
            mt: "14px",
            bgcolor: "#00B900",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "none",

            "&:hover": {
              bgcolor: "#00B900",
            },
          }}
        >
          {info?.can_submit === false && info?.rzstatus === 2
            ? t("VerifiedPage.label18")
            : info?.rzstatus === 1
              ? t("VerifiedPage.label19")
              : t("VerifiedPage.label20")}
        </Button>
      </Box>
    </Box>
  );
}
