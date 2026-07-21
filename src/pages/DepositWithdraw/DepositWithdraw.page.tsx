"use client";
import {
  getMyWallet,
  getWebsiteConfig,
  topUpCoins,
} from "@/services/User.service";
import {
  ArrowBackIosNew,
  ContentCopy,
  DescriptionOutlined,
  FileUploadOutlined,
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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function DepositWithdrawPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [coin, setCoin] = useState<string>();
  const [bank, setbank] = useState(0);
  const [method, setMethod] = useState(2);
  const [wallet, setWallet] = useState<any>(null);
  const [depositMin, setDepositMin] = useState(0);
  const [configs, setConfigs] = useState<any>();
  const [frontImage, setFrontImage] = useState<File>();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
    }
  };

  useEffect(() => {
    const referral = async () => {
      const res: any = await getMyWallet();
      if (res.status === true) {
        const data = res.data.find((item: any) => item.id == id);
        setWallet(data);
        setCoin(data?.id?.toString() || "2");
        setbank(data?.bank || 0);
        setAddress(data?.addresss || "");
        setDepositMin(data?.deposit_min || 0);
      }
    };
    referral();
  }, []);
  useEffect(() => {
    const referral = async () => {
      try {
        const config: any = await getWebsiteConfig();

        if (config.status === true) {
          setConfigs(config.data);
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    referral();
  }, []);

  const handleSubmit = async () => {
    if (!frontImage) {
      toast.warning(t("Toast.Desposit1"));
      return;
    }
    if (!amount || !method || !coin) {
      toast.warning(t("Toast.Desposit2"));
      return;
    }
    if (Number(amount) < depositMin) {
      toast.warning(t("Toast.Desposit11") + depositMin);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("cid", coin);
      formData.append("amount", amount);
      formData.append("payimg", frontImage);
      formData.append("method", "2");

      await topUpCoins(formData);
      router.push("/deposit/success");
      setAmount("");
      setMethod(0);
    } catch (error: any) {
      toast.error(t("Toast.Desposit4"));
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
        {/* Header */}
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

          <IconButton sx={{ color: "#fff" }}>
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
          {/* Title */}
          <Typography fontSize={24} fontWeight={500}>
            {wallet?.title} {t("DepositWithdrawPage.title9")}
          </Typography>

          {/* QR */}
          <Box
            sx={{
              bgcolor: "#fff",
              p: 2,
            }}
          >
            <QRCode value={address || ""} size={150} />
          </Box>

          {/* Save QR */}
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

          {/* Wallet */}
          <Typography
            sx={{
              mt: 4,
              wordBreak: "break-all",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            {address}
          </Typography>

          <Button
            variant="outlined"
            onClick={() => {
              navigator.clipboard.writeText(address || "");
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

          {/* Sender */}
          <Box width="100%">
            <Typography mb={1} fontSize={14}>
              {t("DepositWithdrawPage.title12")}
            </Typography>

            <TextField
              fullWidth
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
                      setAddress(text);
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

          {/* Amount */}
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

          {/* Network */}
          <Box width="100%">
            <Typography mb={2} fontSize={14}>
              {t("DepositWithdrawPage.title17")}
            </Typography>

            <Stack direction="row" spacing={2}>
              {wallet?.deposit_network == "ERC20" && (
                <Button
                  onClick={() => setMethod(1)}
                  sx={{
                    width: 120,
                    height: 50,
                    border:
                      method === 1 ? "1px solid #00d000" : "1px solid #666",
                    color: method === 1 ? "#00d000" : "#fff",
                  }}
                >
                  ERC20
                </Button>
              )}
              {wallet?.deposit_network == "TRC20" && (
                <Button
                  onClick={() => setMethod(2)}
                  sx={{
                    width: 120,
                    height: 50,
                    border:
                      method === 2 ? "1px solid #00d000" : "1px solid #666",
                    color: method === 2 ? "#00d000" : "#fff",
                  }}
                >
                  TRC20
                </Button>
              )}
            </Stack>
          </Box>

          {/* Upload */}
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
              onClick={handleSubmit}
              variant="contained"
              sx={{
                mt: 3,
                height: 52,
                bgcolor: "#06b000",
                fontSize: 18,
                borderRadius: "8px",
                textTransform: "capitalize",
              }}
            >
              {t("DepositWithdrawPage.title20")}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
