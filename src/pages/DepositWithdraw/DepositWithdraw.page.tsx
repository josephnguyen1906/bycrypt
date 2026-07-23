"use client";
import {
  getDepositMethod,
  getMyWallet,
  topUpCoins,
} from "@/services/User.service";
import {
  ArrowBackIosNew,
  ContentCopy,
  DescriptionOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

type DepositMethod = {
  id: number;
  name?: string;
  wallet?: string;
  address?: string;
  coin?: string;
  status?: number;
  qrcode_url?: string;
};

export default function DepositWithdrawPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [coinId, setCoinId] = useState<string>();
  const [coinTitle, setCoinTitle] = useState("");
  const [depositMin, setDepositMin] = useState(0);
  const [methods, setMethods] = useState<DepositMethod[]>([]);
  const [methodId, setMethodId] = useState<number | null>(null);
  const [frontImage, setFrontImage] = useState<File>();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const selectedMethod = useMemo(
    () => methods.find((m) => m.id === methodId) || null,
    [methods, methodId],
  );

  const address = selectedMethod?.address?.trim() || "";

  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [walletRes, methodRes]: any[] = await Promise.all([
          getMyWallet(),
          getDepositMethod(),
        ]);

        const coin = walletRes?.status
          ? walletRes.data?.find((item: any) => String(item.id) === String(id))
          : null;

        if (!coin) {
          toast.error(t("Toast.Desposit4"));
          return;
        }

        setCoinId(String(coin.id));
        setCoinTitle(coin.title || coin.name || "");
        setDepositMin(Number(coin.deposit_min || 0));

        const allMethods: DepositMethod[] = methodRes?.status
          ? methodRes.data || []
          : [];
        const coinMethods = allMethods.filter(
          (m) =>
            String(m.coin || "").toLowerCase() ===
            String(coin.name || "").toLowerCase(),
        );

        setMethods(coinMethods);
        setMethodId(coinMethods[0]?.id ?? null);

        if (coinMethods.length === 0) {
          toast.warning("Chưa cấu hình ví nạp cho đồng này trong admin.");
        }
      } catch (error: any) {
        toast.error(
          typeof error?.message === "string"
            ? error.message
            : t("Toast.Desposit4"),
        );
      }
    };
    load();
  }, [id, t]);

  const handleSubmit = async () => {
    if (submitting) return;
    if (!frontImage) {
      toast.warning(t("Toast.Desposit1"));
      return;
    }
    if (!amount || !methodId || !coinId) {
      toast.warning(t("Toast.Desposit2"));
      return;
    }
    if (Number(amount) < depositMin) {
      toast.warning(t("Toast.Desposit3") + depositMin);
      return;
    }
    if (!address) {
      toast.warning("Chưa có địa chỉ ví nạp từ admin.");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("payimg", frontImage);
      formData.append("method", String(methodId));

      const res = (await topUpCoins(formData)) as unknown as {
        status?: boolean;
        message?: string;
      };

      if (res.status) {
        router.push("/deposit/success");
        setAmount("");
        setFromAddress("");
        setFrontImage(undefined);
        return;
      }

      toast.error(
        typeof res.message === "string" ? res.message : t("Toast.Desposit4"),
      );
    } catch (error: any) {
      toast.error(
        typeof error?.message === "string"
          ? error.message
          : t("Toast.Desposit4"),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pb: "100px",
      }}
    >
      <Box
        sx={{
          bgcolor: "#0D0E18",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            height: 60,
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton sx={{ color: "#fff" }} onClick={() => router.back()}>
            <ArrowBackIosNew />
          </IconButton>

          <Typography fontSize={18} fontWeight={500}>
            {t("DepositWithdrawPage.title8")}
          </Typography>

          <IconButton
            sx={{ color: "#fff" }}
            onClick={() => router.push("/deposit/history")}
          >
            <DescriptionOutlined />
          </IconButton>
        </Box>

        <Stack
          spacing={3}
          alignItems="center"
          sx={{
            px: 3,
            pt: 2,
          }}
        >
          <Typography fontSize={24} fontWeight={500}>
            {coinTitle} {t("DepositWithdrawPage.title9")}
          </Typography>

          <Box
            sx={{
              bgcolor: "#fff",
              p: 2,
            }}
          >
            <QRCode value={address || " "} size={150} />
          </Box>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#06b000",
              px: 5,
              py: 1,
              borderRadius: 0,
              fontSize: 13,
              "&:hover": {
                bgcolor: "#05a000",
              },
            }}
          >
            {t("DepositWithdrawPage.title10")}
          </Button>

          <Typography
            sx={{
              mt: 4,
              wordBreak: "break-all",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            {address || "—"}
          </Typography>

          <Button
            variant="outlined"
            startIcon={<ContentCopy sx={{ fontSize: 16 }} />}
            onClick={() => {
              if (!address) return;
              navigator.clipboard.writeText(address);
              toast.success(t("Toast.copy"));
            }}
            sx={{
              width: 170,
              height: 44,
              color: "#fff",
              borderColor: "#777",
              borderRadius: 0,
              fontSize: 13,
            }}
          >
            {t("DepositWithdrawPage.title11")}
          </Button>

          <Box width="100%">
            <Typography mb={1} fontSize={14}>
              {t("DepositWithdrawPage.title12")}
            </Typography>

            <TextField
              fullWidth
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              placeholder={t("DepositWithdrawPage.title13")}
              InputProps={{
                endAdornment: (
                  <Typography
                    sx={{
                      color: "#1e90ff",
                      cursor: "pointer",
                      fontSize: 12,
                      width: "30px",
                    }}
                    onClick={async () => {
                      const text = await navigator.clipboard.readText();
                      setFromAddress(text);
                    }}
                  >
                    {t("DepositWithdrawPage.title14")}
                  </Typography>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#1A1B25",
                  color: "#fff",
                  borderRadius: 0,
                },
                "& fieldset": {
                  border: 0,
                },
              }}
            />
          </Box>

          <Box width="100%">
            <Typography mb={1} fontSize={14}>
              {t("DepositWithdrawPage.title15")}
            </Typography>

            <TextField
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t("DepositWithdrawPage.title16")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#1A1B25",
                  color: "#fff",
                  borderRadius: 0,
                },
                "& fieldset": {
                  border: 0,
                },
              }}
            />
          </Box>

          <Box width="100%">
            <Typography mb={2} fontSize={14}>
              {t("DepositWithdrawPage.title17")}
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {methods.map((m) => {
                const active = methodId === m.id;
                return (
                  <Button
                    key={m.id}
                    onClick={() => setMethodId(m.id)}
                    sx={{
                      width: 120,
                      height: 50,
                      border: active ? "1px solid #00d000" : "1px solid #666",
                      color: active ? "#00d000" : "#fff",
                      textTransform: "none",
                    }}
                  >
                    {m.wallet || m.name || `Method ${m.id}`}
                  </Button>
                );
              })}
            </Stack>
          </Box>

          <Box width="100%">
            <Typography mb={2} fontSize={14}>
              {t("DepositWithdrawPage.title18")}
            </Typography>
            <Button
              component="label"
              sx={{
                width: 120,
                height: 120,
                minWidth: 120,
                p: 0,
                border: "1px dashed #fff",
                background: "#474B62",
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  background: "#474B62",
                },
              }}
            >
              {frontImage ? (
                <Box
                  component="img"
                  src={URL.createObjectURL(frontImage)}
                  alt="Payment"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <CameraAltIcon
                  sx={{
                    color: "#fff",
                    fontSize: 40,
                  }}
                />
              )}

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleFrontChange}
              />
            </Button>
          </Box>

          <Box
            sx={{
              p: "15px",
              background: "#1A1B24",
              borderRadius: "8px",
              mt: 5,
              pt: 3,
            }}
          >
            <Typography mb={2} fontSize={16} sx={{ color: "white" }}>
              {t("DepositWithdrawPage.title21")}
            </Typography>
            <Typography mb={2} fontSize={14} sx={{ color: "#868c9a" }}>
              {t("DepositWithdrawPage.title22")}
            </Typography>
            <Typography mb={2} fontSize={14} sx={{ color: "#868c9a" }}>
              {t("DepositWithdrawPage.title23")}
            </Typography>
            <Typography mb={2} fontSize={14} sx={{ color: "#868c9a" }}>
              {t("DepositWithdrawPage.title24")}
            </Typography>
            <Typography mb={2} fontSize={14} sx={{ color: "#868c9a" }}>
              {t("DepositWithdrawPage.title25")}
            </Typography>
            <Typography mb={2} fontSize={14} sx={{ color: "#868c9a" }}>
              {t("DepositWithdrawPage.title26")}
            </Typography>
            <Button
              fullWidth
              disabled={submitting}
              onClick={handleSubmit}
              variant="contained"
              sx={{
                mt: 3,
                height: 52,
                bgcolor: "#06b000",
                fontSize: 18,
                borderRadius: "8px",
                textTransform: "capitalize",
                "&.Mui-disabled": {
                  bgcolor: "#3d5c3d",
                  color: "rgba(255,255,255,.7)",
                },
              }}
            >
              {submitting
                ? t("DepositWithdrawPage.statusProcessing")
                : t("DepositWithdrawPage.title20")}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
