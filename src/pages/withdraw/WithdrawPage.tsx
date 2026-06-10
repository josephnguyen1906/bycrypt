"use client";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { getFinaceCoin, sellCoins } from "@/services/User.service";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useWithdrawTimeCheck from "@/hook/useWithdrawTimeCheck";
import WithdrawTimeDialog from "@/components/popup/WithdrawTimeDialog";

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
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number | null>(null);
  const [currency, setCurrency] = useState("VND");
  const [password, setPassword] = useState("");
  const { user, fetchUser } = useUserStore();
  const [listCoin, setListCoin] = useState<IListcoin[] | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<IListcoin | null>({
    id: 2,
    name: "usdt",
    czline: "TJASXiXxAcdBqEfD1UFwrrtKZcxeM7LbNT",
    type: 1,
    title: "USDT",
    sort: 1,
    addtime: "2026-06-04T03:39:14.000000Z",
    status: 1,
    czstatus: 1,
    czaddress: "TWPncVw8KgYBwBAasZrgZ3VGQ6sNayES2R",
    czminnum: 100,
    txstatus: 1,
    sxftype: 1,
    txsxf: 0,
    txsxf_n: 0,
    txminnum: 100,
    txmaxnum: 1000000,
    bbsxf: 0.03,
    hysxf: 0,
    bank: 28000,
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const router = useRouter();
  const { open, setOpen } = useWithdrawTimeCheck();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchCoin = async () => {
    const res = await getFinaceCoin();
    if (res.status) {
      setListCoin(res.data);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const hanldeWithdraw = async () => {
    try {
      if (!selectedCoin) {
        toast.error(t("Toast.widthraw_title5"));
        return;
      }
      const formdata = new FormData();
      formdata.append("cid", String(selectedCoin?.id));
      formdata.append("amount", String(amount));
      formdata.append("paypassword", String(password));
      const res = await sellCoins(formdata);

      if (res.status) {
        toast.success(t("DepositWithdrawPage.status_true"));
        setAmount(null);
        setPassword("");
        return;
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  console.log("sel", selectedCoin);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#141A1F",
        paddingTop: {
          xs: "0px",
          sm: "100px",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "500px" },
          backgroundColor: "#202630",
          margin: "auto",
          height: { xs: "100%", sm: "980px" },
          borderRadius: {
            xs: 0,
            sm: "16px",
          },
          padding: "16px",
          position: "relative",
          pb: "150px",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            height: 64,
            px: 1,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onClick={() => router.back()}
            sx={{
              color: "#fff",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <Typography
            sx={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {t("AssetPage.menu3")}
          </Typography>

          <Box
            onClick={() => {
              router.push("/withdraw/history");
            }}
            sx={{
              width: 46,
              height: 46,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <WalletOutlinedIcon
              sx={{
                color: "#fff",
              }}
            />
          </Box>
        </Box>

        {/* BODY */}
        <Box
          sx={{
            p: 2.5,
          }}
        >
          <CardBox sx={{ mb: 2 }}>
            <RowItem
              left={t("AssetPage.Network")}
              right={
                <Select
                  value={selectedCoin?.name || ""}
                  onChange={(e) => {
                    const coin = listCoin?.find(
                      (item) => item.name === e.target.value,
                    );

                    setSelectedCoin(coin || null);
                  }}
                  variant="standard"
                  disableUnderline
                  IconComponent={KeyboardArrowDownIcon}
                  sx={{
                    color: "#fff",
                    minWidth: 120,

                    "& .MuiSelect-icon": {
                      color: "#fff",
                    },
                  }}
                >
                  {listCoin?.map((coin) => (
                    <MenuItem key={coin.id} value={coin.name}>
                      {coin.title}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </CardBox>
          {/* AMOUNT */}
          <CardBox>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                mb: 2,
              }}
            >
              {t("Toast.widthraw_title1")}
            </Typography>

            <Box
              sx={{
                height: 48,
                borderRadius: "16px",
                background: "#141A1F",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
              }}
            >
              <InputBase
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                // placeholder="0"
                sx={{
                  flex: 1,
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,

                  "& input::placeholder": {
                    color: "#fff",
                    opacity: 1,
                  },
                }}
              />

              <Typography
                sx={{
                  color: "#8e98a7",
                  fontSize: 14,
                }}
              >
                {t("Toast.widthraw_title2")}{" "}
                {Number((selectedCoin?.bbsxf ?? 0) * 100) ?? 0}%
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: "10px" }}>
              <Typography
                sx={{
                  textAlign: "right",
                  color: "#8e98a7",
                  fontSize: 14,
                  mt: 2,
                }}
              >
                {t("ProfilePage.Available_balance")}:
              </Typography>
              <Typography
                sx={{
                  textAlign: "right",
                  color: "#fff",
                  fontSize: 14,
                  mt: 2,
                }}
              >
                {Number(user?.balance.usdt).toLocaleString()} (USDT)
              </Typography>
            </Box>
          </CardBox>

          <CardBox sx={{ mt: 2 }}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                mb: 2,
              }}
            >
              {t("DepositWithdrawPage.Password")}
            </Typography>

            <TextField
              id="outlined-basic"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                width: "100%",
                background: "#141A1F",
                borderRadius: "16px",
                borderColor: "none",
                "& .MuiInputBase-input": {
                  color: "white",
                  background: "#141A1F",
                  borderRadius: "20px",
                  // Fix autofill background
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px black inset", // chỉnh màu nền
                    WebkitTextFillColor: "white",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
                marginBottom: "20px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "none",
                    borderRadius: "16px",
                  },
                  "&:hover fieldset": {
                    borderColor: "none",
                    borderRadius: "16px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#141A1F",
                    borderRadius: "16px",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </CardBox>

          {/* RECEIVE TYPE */}
          <CardBox sx={{ mt: 2 }}>
            <RowItem
              left={t("Toast.widthraw_title3")}
              right={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "#e5002d",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffde00",
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    ★
                  </Box>

                  <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    variant="standard"
                    disableUnderline
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 14,

                      "& .MuiSelect-icon": {
                        color: "#fff",
                      },
                    }}
                  >
                    <MenuItem value="VND">VND</MenuItem>
                  </Select>
                </Stack>
              }
            />
          </CardBox>

          {/* BANK */}
          <CardBox sx={{ mt: 2 }}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                mb: 2,
              }}
            >
              {t("Toast.widthraw_title4")}
            </Typography>

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
                {user?.bank_name || "--"}
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
              <Typography
                sx={{
                  color: "#D7D7D7",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "1px",
                }}
              >
                {user?.bank_acc_name || "--"}
              </Typography>

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
          </CardBox>

          {/* BUTTON */}
          <Button
            fullWidth
            onClick={hanldeWithdraw}
            sx={{
              mt: 12,
              height: 54,
              borderRadius: "14px",

              background: "linear-gradient(90deg,#47e0a1 0%, #12c87b 100%)",

              color: "#fff",
              fontSize: 20,
              fontWeight: 700,
              textTransform: "none",

              "&:hover": {
                background: "linear-gradient(90deg,#47e0a1 0%, #12c87b 100%)",
              },
            }}
          >
            {t("AssetPage.menu3")}
          </Button>
        </Box>
      </Box>
      <WithdrawTimeDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

function CardBox({ children, sx }: { children: React.ReactNode; sx?: any }) {
  return (
    <Box
      sx={{
        background: "#283142",
        borderRadius: "18px",
        p: 2,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function RowItem({ left, right }: { left: string; right: React.ReactNode }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography
        sx={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {left}
      </Typography>

      {right}
    </Stack>
  );
}
