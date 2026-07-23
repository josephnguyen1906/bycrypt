"use client";

import {
  KeyboardArrowDown,
  QrCodeScannerOutlined,
} from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/useUserStore";
import {
  getFinaceCoin,
  sellCoins,
} from "@/services/User.service";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
interface IListcoin {
  id: number;
  name: string;
  czline: string;
  type: number;
  title: string;
  sort: number;
  addtime: string;
  status: number;
  czstatus: number;
  czaddress: string;
  czminnum: number;
  txstatus: number;
  sxftype: number;
  txsxf: number;
  txsxf_n: number;
  txminnum: number;
  txmaxnum: number;
  bbsxf: number;
  hysxf: number;
  bank: number;
}

export default function WithdrawPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number | null>(null);
  const [currency, setCurrency] = useState("TRC20");
  const [walletAddress, setWalletAddress] = useState("");
  const [listCoin, setListCoin] = useState<IListcoin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<IListcoin | null>(null);
  const { user, fetchUser } = useUserStore();
  const [submitting, setSubmitting] = useState(false);

  const fetchCoin = async () => {
    try {
      const res = await getFinaceCoin();

      if (res.status) {
        setListCoin(res.data);
        const usdt = res.data.find(
          (item: IListcoin) => item.name?.toLowerCase() === "usdt",
        );
        if (usdt) {
          setSelectedCoin(usdt);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoin();
    fetchUser?.();
  }, [fetchUser]);

  const availableBalance = useMemo(() => {
    if (!selectedCoin || !user) return 0;

    return Number(user?.balance.usdt ?? 0);
  }, [selectedCoin, user]);

  const withdrawFee = useMemo(() => {
    if (!selectedCoin) return 0;

    return Number(selectedCoin.bbsxf || 0);
  }, [selectedCoin]);

  const actualAmount = useMemo(() => {
    if (!amount) return 0;

    return Math.max(Number(amount) - withdrawFee, 0);
  }, [amount, withdrawFee]);
  const handlePasteAddress = async () => {
    try {
      const text = await navigator.clipboard.readText();

      setWalletAddress(text);
    } catch (error) {
      toast.error(t("Toast.Withdraw1"));
    }
  };

  const handleChangeCoin = (coinId: number) => {
    const coin = listCoin.find((item) => item.id === coinId);

    if (coin) {
      setSelectedCoin(coin);
    }
  };

  const handleSelectAll = () => {
    setAmount(availableBalance);
  };

  const hanldeWithdraw = async () => {
    if (submitting) return;
    try {
      if (!selectedCoin) {
        toast.error(t("Toast.Withdraw2"));
        return;
      }
      if (!walletAddress.trim()) {
        toast.error(t("Toast.Withdraw3"));
        return;
      }
      if (!amount || amount <= 0) {
        toast.error(t("Toast.Withdraw4"));
        return;
      }
      if (amount < selectedCoin.txminnum) {
        toast.error(
          `${t("Toast.Withdraw5")} ${selectedCoin.txminnum} ${selectedCoin.name.toUpperCase()}`,
        );
        return;
      }
      if (selectedCoin.txmaxnum > 0 && amount > selectedCoin.txmaxnum) {
        toast.error(
          `${t("Toast.Withdraw6")}  ${selectedCoin.txmaxnum} ${selectedCoin.name.toUpperCase()}`,
        );
        return;
      }
      if (amount > availableBalance) {
        toast.error(t("Toast.Withdraw7"));
        return;
      }

      setSubmitting(true);

      const formdata = new FormData();
      formdata.append("cid", String(selectedCoin.id));
      formdata.append("amount", String(amount));
      formdata.append("address", walletAddress);

      const res = (await sellCoins(formdata)) as unknown as {
        status?: boolean;
        message?: string;
      };

      if (res.status) {
        router.push("/withdraw/success");
        setAmount(null);
        setWalletAddress("");
        fetchUser?.();
      } else {
        toast.error(
          typeof res.message === "string" ? res.message : t("Toast.Withdraw9"),
        );
      }
    } catch (err: any) {
      toast.error(
        typeof err?.message === "string" ? err.message : t("Toast.Withdraw9"),
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
          height: 60,
          px: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#0D1018",
          borderBottom: "1px solid rgba(255,255,255,.05)",
        }}
      >
        {/* Left */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => router.back()}
            sx={{
              color: "#fff",
            }}
          >
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              width: "70%",
              margin: "auto",
              display: "flex",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 500,
                fontSize: 19,
              }}
            >
              {t("AccountPage.menuTab2")}
            </Typography>
          </Box>

          <IconButton
            sx={{
              color: "#9CA3AF",
              bgcolor: "none",
              "&:hover": {
                bgcolor: "none",
              },
            }}
            // href="/trade-chart"
            onClick={() => router.push("/withdraw/history")}
          >
            <HistoryIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          px: {
            xs: 2,
            sm: 4,
          },
          maxWidth: 900,
          mx: "auto",
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 500,
            mt: 3,
            color: "white",
          }}
        >
          {t("AccountPage.menuTab2")}
          {selectedCoin?.name?.toUpperCase() || "USDT"}
        </Typography>

        <Typography
          sx={{
            color: "#868c9a",
            fontSize: 16,
            mt: 1,
          }}
        >
          {t("AccountPage.menuTab2")}
          {selectedCoin?.name?.toUpperCase() || "USDT"}{" "}
          {t("DepositWithdrawPage.label3")}
        </Typography>

        <Box
          sx={{
            mt: 3,
            height: 50,
            bgcolor: "#1A1B24",
            borderRadius: "16px",
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "white",
            }}
          >
            {selectedCoin?.name?.toUpperCase() || "USDT"}
          </Typography>

          <Select
            value={""}
            onChange={(e) => handleChangeCoin(Number(e.target.value))}
            displayEmpty
            variant="standard"
            IconComponent={KeyboardArrowDown}
            disableUnderline
            sx={{
              minWidth: 220,
              color: "#fff",
              fontSize: 14,
              textAlign: "right",
              "& .MuiSelect-icon": {
                color: "#8D93A6",
                fontSize: 14,
              },
              "& .MuiSelect-select": {
                py: 1,
              },
            }}
          >
            <MenuItem value=""> {t("DepositWithdrawPage.label4")}</MenuItem>

            {/* {listCoin.map((coin) => (
              <MenuItem key={coin.id} value={coin.id}>
                {coin.name.toUpperCase()}
              </MenuItem>
            ))} */}
          </Select>
        </Box>

        <Typography
          sx={{
            fontSize: 14,
            color: "white",
            mt: 2,
            mb: 1,
          }}
        >
          {t("DepositWithdrawPage.label5")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          {(selectedCoin?.czline || "ERC20,TRC20").split(",").map((network) => {
            const name = network.trim();

            const active = currency === name;

            return (
              <Button
                key={name}
                onClick={() => setCurrency(name)}
                sx={{
                  py: 1,
                  px: 3,
                  borderRadius: "8px",
                  border: active ? "1px solid #00C853" : "1px solid #fff",
                  color: active ? "#00C853" : "#fff",
                  fontSize: 14,
                  textTransform: "none",
                }}
              >
                {name}
              </Button>
            );
          })}
        </Box>

        <Typography
          sx={{
            fontSize: 14,
            color: "white",
            mt: 2,
            mb: 1,
          }}
        >
          {t("DepositWithdrawPage.label6")}
        </Typography>

        <TextField
          fullWidth
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder={t("DepositWithdrawPage.label7")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography
                    onClick={handlePasteAddress}
                    sx={{
                      color: "#00C853",
                      cursor: "pointer",
                      fontSize: 14,
                      pr: "-10px",
                    }}
                  >
                    {t("DepositWithdrawPage.title14")}
                  </Typography>

                  <IconButton
                    sx={{
                      color: "#8D93A6",
                      width: 30,
                    }}
                  >
                    <QrCodeScannerOutlined
                      sx={{
                        fontSize: 30,
                      }}
                    />
                  </IconButton>
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 50,
              bgcolor: "#1A1B24",
              borderRadius: "12px",
              color: "#fff",
              fontSize: 16,
              px: 2,
              "& fieldset": {
                border: "none",
              },
            },
            "& input::placeholder": {
              color: "#A4A9BA",
              opacity: 1,
            },
          }}
        />

        <Typography
          sx={{
            fontSize: 14,
            color: "white",
            mt: 2,
            mb: 1,
          }}
        >
          {t("TradePage.title13")}
        </Typography>

        <TextField
          fullWidth
          type="number"
          value={amount ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            setAmount(value === "" ? null : Number(value));
          }}
          placeholder={t("DepositWithdrawPage.label8")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#8D93A6",
                      fontSize: 14,
                    }}
                  >
                    {selectedCoin?.name?.toUpperCase() || "USDT"}
                  </Typography>

                  <Typography
                    onClick={handleSelectAll}
                    sx={{
                      color: "#00C853",
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    {t("DepositWithdrawPage.label9")}
                  </Typography>
                </Box>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 50,
              bgcolor: "#1A1B24",
              borderRadius: "12px",
              color: "#fff",
              fontSize: 16,
              px: 2,
              "& fieldset": {
                border: "none",
              },
            },
            "& input::placeholder": {
              color: "#A4A9BA",
              opacity: 1,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography
            sx={{
              color: "#8D93A6",
              fontSize: 14,
            }}
          >
            {t("TradePage.title4")}
          </Typography>

          <Typography
            sx={{
              color: "#8D93A6",
              fontSize: 14,
            }}
          >
            {availableBalance.toLocaleString()}{" "}
            {selectedCoin?.name?.toUpperCase() || "USDT"}
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#8D93A6",
            fontSize: 14,
            mt: 3,
          }}
        >
          {t("DepositWithdrawPage.label12")}
        </Typography>

        <Typography
          sx={{
            fontSize: 16,
            color: "white",
            mt: 2,
            fontWeight: 700,
          }}
        >
          {actualAmount.toFixed(2)}{" "}
          <Typography
            component="span"
            sx={{
              color: "#8D93A6",
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            {selectedCoin?.name?.toUpperCase() || "USDT"}
          </Typography>
        </Typography>

        <Typography
          sx={{
            color: "#8D93A6",
            fontSize: 14,
            mt: 1,
          }}
        >
          {t("DepositWithdrawPage.label13")}: {withdrawFee.toFixed(2)}{" "}
          {selectedCoin?.name?.toUpperCase() || "USDT"}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "white",
            mt: 3,
            mb: 1,
          }}
        >
          {t("DepositWithdrawPage.label14")}:
        </Typography>

        <Button
          fullWidth
          disabled={submitting}
          onClick={hanldeWithdraw}
          sx={{
            height: 44,
            bgcolor: "#00B900",
            color: "#fff",
            borderRadius: "8px",
            fontSize: 16,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#00A500",
            },
            "&.Mui-disabled": {
              bgcolor: "#3d5c3d",
              color: "rgba(255,255,255,.7)",
            },
          }}
        >
          {submitting ? t("DepositWithdrawPage.statusProcessing") : t("AccountPage.menuTab2")}
        </Button>
      </Box>
    </Box>
  );
}
