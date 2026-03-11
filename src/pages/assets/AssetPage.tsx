"use client";

import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { getMyWallet } from "@/services/User.service";
import { IFinaceBalace } from "@/shared/interfaces";
import { useUserStore } from "@/stores/useUserStore";
import {
  StackedBarChartSharp,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import CoinDetailPopup from "@/components/popup/CoinDetailPopup";
import { useRouter } from "next/navigation";

export default function AssetPage() {
  const { t, i18n } = useTranslation();
  const tabs = [
    t("AssetPage.tab1"),
    t("AssetPage.tab2"),
    t("AssetPage.tab3"),
    t("AssetPage.tab4"),
  ];
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [hideBalance, setHideBalance] = useState(false);
  const [tabLabel, setTabLabel] = useState(tabs[0]);
  const [wallet, setWallet] = useState<IFinaceBalace[]>([]);
  const [coin, setCoin] = useState<IFinaceBalace>();
  const { user, fetchUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchData = async () => {
    const res = await getMyWallet();
    if (res.status) {
      setWallet(res.data);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "#14181d",
        p: 2,
        pb: "130px",
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" mb={3}>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIosNewIcon sx={{ color: "white", fontSize: 14 }} />
        </IconButton>

        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: 600,
            fontSize: 20,
            color: "white",
          }}
        >
          {t("ProfilePage.Wallet")}
        </Typography>
        <IconButton onClick={() => setHideBalance((prev) => !prev)}>
          {hideBalance ? (
            <VisibilityOffOutlined sx={{ fontSize: 18, color: "white" }} />
          ) : (
            <VisibilityOutlined sx={{ fontSize: 18, color: "white" }} />
          )}
        </IconButton>
      </Stack>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, v) => {
          setTab(v);
          setTabLabel(tabs[v]);
        }}
        variant="fullWidth"
        TabIndicatorProps={{
          sx: {
            backgroundColor: "#34d399",
            height: 2,
          },
        }}
        sx={{
          "& .MuiTab-root": {
            color: "#9ca3af",
            textTransform: "capitalize",
            fontSize: "14px",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#34d399",
          },
        }}
      >
        <Tab label={t("AssetPage.tab1")} />
        <Tab label={t("AssetPage.tab2")} />
        <Tab label={t("AssetPage.tab3")} />
        <Tab label={t("AssetPage.tab4")} />
      </Tabs>

      {/* Total */}
      <Box mb={2} mt={2}>
        <Typography
          variant="h4"
          sx={{ fontSize: "16px", color: "white", mb: "10px" }}
        >
          {tabLabel}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 11, color: "#9ca3af", fontWeight: 400 }}>
            {t("AssetPage.title1")} (USDT)
          </Typography>

          <Typography
            sx={{ fontWeight: 400, fontSize: 11, mt: 1, color: "#d1d5db" }}
          >
            {hideBalance ? "***" : Number(user?.balance.usdt).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {tab == 0 &&
        wallet.map((item) => (
          <Card
            key={item.id}
            sx={{
              background: "#22272d",
              borderRadius: 3,
              color: "white",
              mb: "10px",
            }}
            onClick={() => {
              setOpen(true);
              setCoin(item);
            }}
          >
            <CardContent>
              <Box>
                <Typography fontWeight={600}>{item.title}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ color: "#9ca3af", fontSize: 11, mt: 0.8 }}>
                    {t("DepositWithdrawPage.message")}:
                  </Typography>

                  <Typography sx={{ color: "#9ca3af", fontSize: 11, mt: 0.8 }}>
                    {t("HistoryPage.Freeze")}:
                  </Typography>

                  <Typography sx={{ color: "#9ca3af", fontSize: 11, mt: 0.8 }}>
                    {t("AssetPage.title2")}:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box>
                    <Typography
                      sx={{
                        color: "#e5e7eb",
                        fontSize: 11,
                        mt: 0.8,
                        textAlign: "right",
                      }}
                    >
                      {hideBalance
                        ? "***"
                        : Number(item.balance.available).toLocaleString()}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#e5e7eb",
                        fontSize: 11,
                        mt: 0.8,
                        textAlign: "right",
                      }}
                    >
                      {hideBalance
                        ? "***"
                        : Number(item.balance.freeze).toLocaleString()}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#e5e7eb",
                        fontSize: 11,
                        mt: 0.8,
                        textAlign: "right",
                      }}
                    >
                      {hideBalance
                        ? "***"
                        : Number(item.balance.total).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box width={"30px"} sx={{ textAlign: "right" }}>
                    <ChevronRightIcon
                      sx={{ color: "#9ca3af", fontSize: "20px" }}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      {tab == 2 &&
        wallet
          .filter((item) => item.title === "USDT" || item.title === "USDC")
          .map((item) => (
            <Card
              key={item.id}
              sx={{
                background: "#22272d",
                borderRadius: 3,
                color: "white",
                mb: "10px",
              }}
              onClick={() => {
                setOpen(true);
                setCoin(item);
              }}
            >
              <CardContent>
                <Box>
                  <Typography fontWeight={600}>{item.title}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography
                      sx={{ color: "#9ca3af", fontSize: 11, mt: 0.8 }}
                    >
                      {t("DepositWithdrawPage.message")}:
                    </Typography>

                    <Typography
                      sx={{ color: "#9ca3af", fontSize: 11, mt: 0.8 }}
                    >
                      {t("HistoryPage.Freeze")}:
                    </Typography>

                    <Typography
                      sx={{ color: "#9ca3af", fontSize: 11, mt: 0.8 }}
                    >
                      {t("AssetPage.title2")}:
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Typography
                        sx={{
                          color: "#e5e7eb",
                          fontSize: 11,
                          mt: 0.8,
                          textAlign: "right",
                        }}
                      >
                        {hideBalance
                          ? "***"
                          : Number(item.balance.available).toLocaleString()}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#e5e7eb",
                          fontSize: 11,
                          mt: 0.8,
                          textAlign: "right",
                        }}
                      >
                        {hideBalance
                          ? "***"
                          : Number(item.balance.freeze).toLocaleString()}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#e5e7eb",
                          fontSize: 11,
                          mt: 0.8,
                          textAlign: "right",
                        }}
                      >
                        {hideBalance
                          ? "***"
                          : Number(item.balance.total).toLocaleString()}
                      </Typography>
                    </Box>

                    <Box width={"30px"} sx={{ textAlign: "right" }}>
                      <ChevronRightIcon
                        sx={{ color: "#9ca3af", fontSize: "20px" }}
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
      {(tab == 1 || tab == 3) && (
        <Card
          sx={{
            background: "#22272d",
            borderRadius: 3,
            color: "white",
            mb: "10px",
          }}
          onClick={() => {
            setOpen(true);
            setCoin(wallet[0]);
          }}
        >
          <CardContent>
            <Box>
              <Typography fontWeight={600}>USDT</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ color: "#9ca3af", fontSize: 11, mt: 0.8 }}>
                  {t("DepositWithdrawPage.message")}:
                </Typography>

                <Typography sx={{ color: "#9ca3af", fontSize: 11, mt: 0.8 }}>
                  {t("HistoryPage.Freeze")}:
                </Typography>

                <Typography sx={{ color: "#9ca3af", fontSize: 11, mt: 0.8 }}>
                  {t("AssetPage.title2")}:
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography
                    sx={{
                      color: "#e5e7eb",
                      fontSize: 11,
                      mt: 0.8,
                      textAlign: "right",
                    }}
                  >
                    {hideBalance
                      ? "***"
                      : Number(user?.balance.usdt).toLocaleString()}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#e5e7eb",
                      fontSize: 11,
                      mt: 0.8,
                      textAlign: "right",
                    }}
                  >
                    {hideBalance
                      ? "***"
                      : Number(user?.balance.usdt_d).toLocaleString()}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#e5e7eb",
                      fontSize: 11,
                      mt: 0.8,
                      textAlign: "right",
                    }}
                  >
                    {hideBalance
                      ? "***"
                      : Number(user?.balance.usdt_total).toLocaleString()}
                  </Typography>
                </Box>
                <Box width={"30px"} sx={{ textAlign: "right" }}>
                  <ChevronRightIcon
                    sx={{ color: "#9ca3af", fontSize: "20px" }}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
      <CoinDetailPopup
        onClose={() => setOpen(false)}
        open={open}
        title={tabLabel}
        coin={coin}
      />
    </Box>
  );
}
