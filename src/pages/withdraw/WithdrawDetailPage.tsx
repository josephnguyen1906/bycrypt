"use client";

import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Divider,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import {
  IDepositMethod,
  IFinaceBalace,
  IWithdrawHistory,
} from "@/shared/interfaces";
import {
  getDepositMethod,
  getFinaceBalance,
  getWithdrawHistory,
  sellCoins,
  topUpCoins,
} from "@/services/User.service";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/stores/useUserStore";
import { formatDateTime } from "@/utils/formatDateTime";

export default function WithdrawDetailPage() {
  const { t, i18n } = useTranslation();
  const { user, fetchUser, loading: load } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [chain, setChain] = useState("ERC20");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [listMethod, setListMethod] = useState<IFinaceBalace[]>([]);
  const [history, setHitory] = useState<IWithdrawHistory[]>([]);
  const [method, setMethod] = useState<IFinaceBalace>();
  const router = useRouter();
  const params = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setChain(newValue);
  };
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchData();
    listHistory();
  }, [params]);

  const listHistory = async () => {
    const res = await getWithdrawHistory();
    if (res.status) {
      setHitory(res.data);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const data = await getFinaceBalance();
    if (data.status) {
      setListMethod(data.data);
      if (params) {
        const item = data.data.find((e: IFinaceBalace) => {
          return e.name == params.coin;
        });

        setMethod(item);
      }
    }
    setLoading(false);
  };

  const submit = async () => {
    try {
      const formData = new FormData();
      formData.append("cid", String(method?.id));
      formData.append("amount", String(amount));
      formData.append("wallet", chain);
      formData.append("paypassword", password);
      formData.append("address", address);
      const withdrawn = await sellCoins(formData);
      if (withdrawn.status) {
        setAmount("");
        setAddress("");
        setPassword("");
        toast.success(t("DepositWithdrawPage.status_true"));
        listHistory();
      } else {
        toast.error(t("DepositWithdrawPage.status_false"));
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {loading || load ? (
        <LoadingComponent />
      ) : (
        <Box
          sx={{
            background: "#0b1727",
            minHeight: "100vh",
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
            justifyContent={"space-between"}
            p={2}
          >
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon sx={{ color: "white" }} />
            </IconButton>

            <Typography fontSize={20} fontWeight={600}>
              {t("StakingPage.tab3")}
            </Typography>
            <IconButton></IconButton>
          </Box>
          <Box
            sx={{
              background: "linear-gradient(180deg,#1b2430,#111827)",
              p: 3,
              color: "white",
            }}
          >
            {/* Title */}
            <Typography fontSize={20} fontWeight={600}>
              {method?.title} {t("StakingPage.tab3")}
            </Typography>

            <Typography fontSize={13} color="#9ca3af" mt={0.5}>
              {t("DepositWithdrawPage.message")} {method?.balance.available}
              {method?.title}
            </Typography>

            {/* Chain type */}
            <Box mt={3}>
              <Typography fontSize={15} mb={1}>
                Chain type
              </Typography>

              <Tabs
                value={chain}
                onChange={handleChange}
                textColor="inherit"
                indicatorColor="primary"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#22c55e",
                    height: 3,
                  },
                }}
              >
                <Tab
                  label="ERC20"
                  value="ERC20"
                  sx={{
                    color: chain === "ERC20" ? "#22c55e" : "#9ca3af",
                    fontWeight: 600,
                  }}
                />
                <Tab
                  label="TRC20"
                  value="TRC20"
                  sx={{
                    color: chain === "TRC20" ? "#22c55e" : "#9ca3af",
                    fontWeight: 600,
                  }}
                />
              </Tabs>
            </Box>

            <Divider sx={{ borderColor: "#1f2937", my: 2 }} />

            {/* Withdrawal address */}
            <Box sx={{ mb: 2 }}>
              <Typography fontSize={15}>
                {t("AssetPage.Withdrawal_add")}
              </Typography>

              <TextField
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                variant="standard"
                placeholder={t("AssetPage.input_1")}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography
                        sx={{
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {t("AssetPage.Set")}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mt: 1,
                  input: {
                    color: "white",
                  },
                  background: "none",
                  borderRadius: "6px",
                  borderBottom: "1px solid #1f2937",
                  p: 1,
                }}
              />
            </Box>

            {/* Quantity */}
            <Box sx={{ mb: 2 }}>
              <Typography fontSize={15}>{t("AssetPage.quantity")}</Typography>

              <TextField
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                variant="standard"
                placeholder={t("AssetPage.input_2") + method?.withdraw_min}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography mr={1} color={"white"}>
                        {method?.name.toUpperCase()}
                      </Typography>
                      <Box
                        sx={{
                          width: "2px",
                          height: "25px",
                          background: "#ffffff26",
                          mr: "5px",
                        }}
                      ></Box>
                      <Typography
                        sx={{
                          color: "#22c55e",
                          cursor: "pointer",
                        }}
                      >
                        {t("DepositWithdrawPage.all")}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mt: 1,
                  input: {
                    color: "white",
                  },
                  background: "none",
                  borderRadius: "6px",
                  borderBottom: "1px solid #1f2937",
                  p: 1,
                }}
              />
            </Box>

            {/* Transaction password */}
            <Box>
              <Typography fontSize={15}>
                {t("AssetPage.Transaction")}
              </Typography>

              <TextField
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="standard"
                placeholder={t("AssetPage.input_3")}
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  mt: 1,
                  input: {
                    color: "white",
                  },
                  background: "none",
                  borderRadius: "6px",
                  borderBottom: "1px solid #1f2937",
                  p: 1,
                }}
              />
            </Box>

            {/* Info */}
            {/* <Box mt={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography color="#9ca3af">Arrival quantity</Typography>
                <Typography>0 {method?.name.toUpperCase()} </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="#9ca3af">Handling fee</Typography>
                <Typography>
                  {method?.balance.freeze + " " + method?.name.toUpperCase()}
                </Typography>
              </Box>
            </Box> */}

            {/* Withdraw Button */}
            <Button
              fullWidth
              onClick={submit}
              sx={{
                mt: 2,
                background: "#2f855a",
                color: "white",
                height: 50,
                borderRadius: "12px",
                fontSize: 16,
                fontWeight: 600,
                textTransform: "capitalize",
                "&:hover": {
                  background: "#2a7a53",
                },
              }}
            >
              {t("StakingPage.tab3")}
            </Button>

            {/* Record */}
            <Box mt={4} textAlign="left">
              <Typography fontSize={16}>
                {t("DepositWithdrawPage.title10")}
              </Typography>
              {history.length > 0 ? (
                history.map((item: IWithdrawHistory, index) => (
                  <Box
                    key={index}
                    sx={{
                      background: "#22272d",
                      border: "1px solid #ffffff1a",
                      p: 2,
                      borderRadius: "10px",
                      mb: 2,
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        color: "white",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {t("DepositWithdrawPage.tab2")}{" "}
                        {item.coinname.toUpperCase()}- {item.wallet}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#6b7280",
                          fontSize: "10px",
                          fontWeight: 400,
                          mt: "5px",
                        }}
                      >
                        {formatDateTime(item.addtime)}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "11px",
                        fontWeight: 400,
                        mt: "5px",
                      }}
                    >
                      {t("DepositWithdrawPage.amount_name")}: {item.num}
                      {item.coinname.toUpperCase()}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography color="#6b7280" mt={2} textAlign="center">
                  {t("AssetPage.no_tran")}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
