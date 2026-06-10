"use client";

import { updateBank } from "@/services/User.service";
import { PreviousIcon } from "@/shared/Svgs/Svg.component";
import { useUserStore } from "@/stores/useUserStore";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function AddBankPage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { user, fetchUser } = useUserStore();
  const [bankName, setBankName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const hasBank = user?.bank_acc_name && user?.bank_acc_no && user?.bank_name;

  const hanldSubmit = async () => {
    if (
      bankName.length > 0 &&
      bankNumber.length > 0 &&
      receiverName.length > 0
    ) {
      const formData = new FormData();
      formData.append("bank_name", bankName);
      formData.append("bank_acc_no", bankNumber);
      formData.append("bank_acc_name", receiverName);
      await updateBank(formData)
        .then((response: any) => {
          if (response.status === true) {
            toast.success(t("Toast.change_pass9"));
            fetchUser();
          } else {
            toast.error(t("Toast.change_pass8"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error(t("Toast.Desposit5"));
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#141A1F",
        paddingTop: {
          xs: "0px",
          sm: "80px",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "500px" },
          backgroundColor: "#202630",
          margin: "auto",
          minHeight: { xs: "100vh", sm: "700px" },
          borderRadius: {
            xs: 0,
            sm: "16px",
          },
          padding: "16px",
          position: "relative",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: "58px",
            border: "1px solid #2A313D",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingX: "16px",
            mb: 4,
          }}
        >
          {/* Back */}
          <Typography
            onClick={() => router.back()}
            sx={{
              color: "#fff",
              fontSize: "32px",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            <PreviousIcon width="25px" height="20px" />
          </Typography>

          {/* Title */}
          <Typography
            sx={{
              color: "#fff",
              fontSize: {
                xs: "18px",
                sm: "22px",
              },
              fontWeight: 500,
            }}
          >
            {t("DepositWithdrawPage.method")}
          </Typography>

          {/* Add icon */}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#fff",
              color: "#1D2430",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            +
          </Box>
        </Box>

        {hasBank ? (
          <Box
            sx={{
              width: "100%",
              height: "130px",
              borderRadius: "18px",
              padding: "26px",
              background: "linear-gradient(90deg, #3F7A42 0%, #17323A 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Bank Name */}
            <Typography
              sx={{
                color: "#fff",
                fontSize: "20px",
                fontWeight: 700,
                mb: 1,
              }}
            >
              {user.bank_name}
            </Typography>

            {/* Bank Number */}
            <Typography
              sx={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              ************{user?.bank_acc_no?.slice(-6) || "--"}
            </Typography>

            {/* Account Name */}
            {/* <Typography
              sx={{
                color: "#D7D7D7",
                fontSize: "14px",
                mt: 2,
              }}
            >
              {user.bank_acc_name}
            </Typography> */}

            {/* Mastercard Icon */}
            <Box
              sx={{
                position: "absolute",
                right: 24,
                bottom: 24,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "red",
                  opacity: 0.95,
                }}
              />

              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "orange",
                  marginLeft: "-10px",
                  opacity: 0.95,
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Bank Name */}
            <Box>
              <Typography
                sx={{
                  color: "#B9B9B9",
                  mb: 1,
                  fontSize: "16px",
                }}
              >
                {t("DepositWithdrawPage.bank_name")}
              </Typography>

              <TextField
                fullWidth
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                variant="outlined"
                placeholder="MB Bank"
                InputProps={{
                  sx: {
                    background: "#2A313D",
                    borderRadius: "16px",
                    color: "#fff",
                    height: "62px",
                    fontSize: "16px",
                    fontWeight: 500,

                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            </Box>

            {/* Receiver Name */}
            <Box>
              <Typography
                sx={{
                  color: "#B9B9B9",
                  mb: 1,
                  fontSize: "16px",
                }}
              >
                {t("DepositWithdrawPage.acc_name")}
              </Typography>

              <TextField
                fullWidth
                value={receiverName}
                onChange={(e) =>
                  setReceiverName(String(e.target.value).toUpperCase())
                }
                variant="outlined"
                placeholder="NGUYEN VAN A"
                InputProps={{
                  sx: {
                    background: "#2A313D",
                    borderRadius: "16px",
                    color: "#fff",
                    height: "62px",
                    fontSize: "16px",
                    fontWeight: 500,

                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            </Box>

            {/* Bank Number */}
            <Box>
              <Typography
                sx={{
                  color: "#B9B9B9",
                  mb: 1,
                  fontSize: "16px",
                }}
              >
                {t("DepositWithdrawPage.back_acc")}
              </Typography>

              <TextField
                fullWidth
                value={bankNumber}
                onChange={(e) => setBankNumber(e.target.value)}
                variant="outlined"
                placeholder="091818818XXX"
                InputProps={{
                  sx: {
                    background: "#2A313D",
                    borderRadius: "16px",
                    color: "#fff",
                    height: "62px",
                    fontSize: "16px",
                    fontWeight: 500,

                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            </Box>

            {/* Confirm Button */}
            <Button
              fullWidth
              onClick={() => hanldSubmit()}
              sx={{
                mt: 2,
                height: "58px",
                background: "#fff",
                color: "#102C63",
                borderRadius: "14px",
                fontSize: "20px",
                fontWeight: 600,
                textTransform: "none",

                "&:hover": {
                  background: "#f2f2f2",
                },
              }}
            >
              {t("ProfilePage.verified_button")}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
