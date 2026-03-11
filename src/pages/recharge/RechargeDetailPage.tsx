"use client";

import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import { IDepositMethod } from "@/shared/interfaces";
import { getDepositMethod, topUpCoins } from "@/services/User.service";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";

export default function DepositPage() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [listMethod, setListMethod] = useState<IDepositMethod[]>([]);
  const [method, setMethod] = useState<IDepositMethod>();
  const [backImage, setBackImage] = useState<File | null>(null);
  const [amount, setAmount] = useState<string>("");
  const backFileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, [params]);

  const copyAddress = () => {
    if (method) {
      navigator.clipboard.writeText(method?.address);
      toast.success(t("DepositWithdrawPage.copy"));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await getDepositMethod();
    if (data.status) {
      setListMethod(data.data);
      if (params) {
        const item = data.data.find((e: IDepositMethod) => {
          return e.coin + e.wallet == params.coin;
        });

        setMethod(item);
      }
    }
    setLoading(false);
  };

  const handleBackClick = () => {
    backFileInput.current?.click();
  };
  const handleBackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBackImage(file);
    }
  };

  const submit = async () => {
    if (amount.length > 0 && backImage && method) {
      const formData = new FormData();
      formData.append("method", String(method?.id));
      formData.append("amount", amount);
      formData.append("payimg", backImage);
      await topUpCoins(formData)
        .then((res) => {
          if (res.status) {
            toast.success(t(`Toast.Desposit3`));
          }
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setAmount("");
          setBackImage(null);
        });
    }
  };
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Box
          sx={{
            background: "#0b1727",
            minHeight: "100vh",
            p: 2,
            maxWidth: "448px",
            margin: "auto",
            color: "white",
            pb: "120px",
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            alignItems="center"
            mb={3}
            justifyContent={"space-between"}
          >
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography fontSize={20} fontWeight={600}>
              {t("AssetPage.menu2")}
            </Typography>
            <IconButton></IconButton>
          </Box>

          {/* QR Box */}
          <Box
            sx={{
              background: "#1f2a3a",
              borderRadius: "16px",
              p: 3,
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src={method?.qrcode_url}
              sx={{
                width: 180,
                height: 180,
                bgcolor: "white",
                borderRadius: "10px",
                p: 1,
                margin: "auto",
              }}
            />

            <Typography mt={2} color="#94a3b8">
              {t("AssetPage.Currency")}
            </Typography>

            <Typography fontSize={13} mt={1}>
              {method?.address}
            </Typography>

            <Button
              onClick={copyAddress}
              sx={{
                mt: 2,
                background: "#34d399",
                color: "#000",
                borderRadius: "30px",
                px: 4,
                "&:hover": {
                  background: "#10b981",
                },
              }}
            >
              {t("Toast.copy")}
            </Button>
          </Box>

          {/* Deposit amount */}
          <Box mt={3}>
            <Typography mb={1}>{t("AssetPage.Deposit_a")}</Typography>

            <TextField
              placeholder={t("AssetPage.Deposit_a")}
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  background: "#1f2a3a",
                  borderRadius: "10px",
                },
              }}
            />
          </Box>

          {/* Upload */}
          <Box mt={3} sx={{ textAlign: "center" }}>
            <Typography mb={1}>{t("AssetPage.Upload")}</Typography>
            <input
              type="file"
              accept="image/*"
              ref={backFileInput}
              style={{ display: "none" }}
              onChange={handleBackChange}
            />
            {backImage ? (
              <Box
                component="img"
                src={
                  backImage
                    ? URL.createObjectURL(backImage)
                    : "/images/camera.png"
                }
                alt="Mặt sau CCCD"
                onClick={handleBackClick}
                sx={{
                  width: 120,
                  height: 120,
                  background: "#1f2a3a",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  margin: "auto",
                }}
              />
            ) : (
              <Box
                onClick={handleBackClick}
                sx={{
                  width: 120,
                  height: 120,
                  background: "#1f2a3a",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  margin: "auto",
                }}
              >
                📷
              </Box>
            )}
          </Box>

          <Button
            fullWidth
            sx={{
              mt: 5,
              background: "#34d399",
              color: "#000",
              borderRadius: "30px",
              py: 1.5,
              fontWeight: 600,
              textTransform: "capitalize",
              "&:hover": {
                background: "#10b981",
              },
            }}
            onClick={submit}
          >
            {t("AssetPage.Submit_transaction")}
          </Button>
        </Box>
      )}
    </>
  );
}
