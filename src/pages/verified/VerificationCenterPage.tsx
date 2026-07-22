"use client";

import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VerifiedIcon from "@mui/icons-material/Verified";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

export default function VerificationCenterPage() {
  const router = useRouter();

  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /**
   * Chuyển sang màn hình VerifiedPage
   * Đây chính là file code bạn đã gửi.
   */
  const handleCheckDetail = () => {
    router.push("/verified");
  };

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
          Trung tâm chứng nhận
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
            Personal Center
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
              src="https://flagcdn.com/w80/us.png"
              alt="US"
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
          Xem các tính năng hiện tại
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
              bgcolor: "#00B900",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
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
                mr: "6px",
              }}
            >
              <VerifiedIcon
                sx={{
                  fontSize: "15px",
                  color: "#00B900",
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
              Primary
              <br />
              Certification
            </Typography>
          </Box>

          {/* Advanced Certification */}
          <Box
            sx={{
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
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
              Chứng nhận nâng
              <br />
              cao
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
          yêu cầu
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
              }}
            >
              Thông tin cá nhân
            </Typography>
          </Box>

          {/* Government ID */}
          <Box
            sx={{
              minHeight: "47px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
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
              }}
            >
              Government Issued ID
            </Typography>
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
          Tính năng và Hạn chế
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
            Thời gian xem lại:3 days
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
            Đánh giá
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
          Chi tiết kiểm tra
        </Button>
      </Box>
    </Box>
  );
}
