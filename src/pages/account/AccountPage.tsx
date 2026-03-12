"use client";

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Menu,
} from "@mui/material";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import SyncAlt from "@mui/icons-material/SyncAlt";
import AccountBalanceWalletOutlined from "@mui/icons-material/AccountBalanceWalletOutlined";
import SwapHorizOutlined from "@mui/icons-material/SwapHorizOutlined";
import RefreshOutlined from "@mui/icons-material/RefreshOutlined";
import ChevronRight from "@mui/icons-material/ChevronRight";
import LinkIcon from "@mui/icons-material/Link";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import {
  SyncAltOutlined,
  SyncOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";
import { InternetIcon } from "@/shared/Svgs/Svg.component";
import LanguageSwitcher from "@/components/Language/LanguageSwitcher";

export default function AccountPage() {
  const { t, i18n } = useTranslation();
  const [hideBalance, setHideBalance] = useState(false);
  const router = useRouter();
  const { user, fetchUser, loading } = useUserStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickLang = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#0b1b33 0%,#0b1b33 40%,#091426 100%)",
        p: 2,
        pb: "130px",
      }}
    >
      {/* login button */}
      {!user ? (
        <Box
          sx={{
            display: "flex",
            p: 2,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: "#22c55e",
              borderRadius: "8px",
              textTransform: "none",
              mb: 2,
              "&:hover": {
                background: "#1da850ff",
              },
            }}
            onClick={() => router.push("/login")}
          >
            {t("Toast.btn_login")}
          </Button>
          <Tooltip title="Language">
            <IconButton onClick={() => router.push("/language")}>
              <InternetIcon width="20px" height="20px" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : loading ? (
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "5px", p: 2 }}
        >
          <Skeleton
            variant="text"
            width={120}
            height={24}
            sx={{ bgcolor: "#374151" }}
          />
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Skeleton
              variant="text"
              width={80}
              height={20}
              sx={{ bgcolor: "#374151" }}
            />
            <Skeleton
              variant="text"
              width={80}
              height={20}
              sx={{ bgcolor: "#374151" }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",

            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", pb: "10px" }}>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography
                sx={{ color: "white", fontSize: "16px", fontWeight: 550 }}
              >
                {user.username}{" "}
              </Typography>
              <Box
                style={{
                  background: "#a3e635",
                  width: "8px",
                  height: "8px",
                  borderRadius: "100%",
                }}
              ></Box>
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Typography
                sx={{ color: "#9ca3af", fontSize: "15px", fontWeight: 300 }}
              >
                UID: {user.invit}
              </Typography>
            </Box>
          </Box>
          <Tooltip title="Language">
            <IconButton onClick={() => router.push("/language")}>
              <InternetIcon width="20px" height="20px" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <Card
        sx={{
          background: " linear-gradient(to bottom, #16a34a, #166534 );",
          borderRadius: 3,
          color: "#fff",
          mb: 3,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize={14}>
              {t("ProfilePage.Wallet")}(USDT)
            </Typography>

            <IconButton
              size="small"
              onClick={() => setHideBalance((prev) => !prev)}
              sx={{ color: "#fff" }}
            >
              {hideBalance ? (
                <VisibilityOffOutlined sx={{ fontSize: 18 }} />
              ) : (
                <VisibilityOutlined sx={{ fontSize: 18 }} />
              )}
            </IconButton>
          </Box>

          {loading ? (
            <Typography
              fontSize={32}
              fontWeight="bold"
              textAlign="center"
              mt={2}
            >
              ***
            </Typography>
          ) : (
            <Typography
              fontSize={32}
              fontWeight="bold"
              textAlign="center"
              mt={2}
            >
              {hideBalance
                ? "***"
                : user
                  ? Number(user?.balance.usdt_total).toLocaleString()
                  : "0.00"}
            </Typography>
          )}

          <Box
            display="flex"
            justifyContent="space-between"
            mt={2}
            fontSize={12}
          >
            <Typography>{t("DepositWithdrawPage.message")}:</Typography>

            <Typography
              display="flex"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                if (user) {
                  router.push("/assets");
                }
              }}
            >
              {hideBalance
                ? "***"
                : user
                  ? Number(user?.balance.usdt).toLocaleString()
                  : "0.00"}
              <ChevronRight sx={{ fontSize: 16, ml: 0.5 }} />
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* action buttons */}
      <Stack direction="row" justifyContent="space-between" mb={3}>
        {[
          {
            label: t("HomePage.recharge"),
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25"
                height="25"
                fill="none"
                stroke="currentColor"
                style={{ color: "#d1d5db" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
            ),
            link: "/recharge",
          },
          {
            label: t("StakingPage.tab3"),
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25"
                height="25"
                fill="none"
                stroke="currentColor"
                style={{ color: "#d1d5db" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
            ),
            link: "/withdraw",
          },
          {
            label: t("BuySellPage.trade"),
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25"
                height="25"
                fill="none"
                stroke="currentColor"
                style={{ color: "#d1d5db" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                ></path>
              </svg>
            ),
            link: "/transfer",
          },
          {
            label: t("DepositWithdrawPage.exchange"),
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25"
                height="25"
                fill="none"
                stroke="currentColor"
                style={{ color: "#d1d5db" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
            ),
            link: "/exchange",
          },
        ].map((item) => (
          <Box
            key={item.label}
            textAlign="center"
            onClick={() => {
              if (user) {
                router.push(item.link);
              } else {
                router.push("/login");
              }
            }}
          >
            <IconButton
              sx={{
                background: "#263244",
                width: 50,
                height: 50,
                color: "#fff",
                "&:hover": {
                  background: "#263244",
                },
              }}
            >
              {item.icon}
            </IconButton>

            <Typography color="#fff" mt={1} sx={{ fontSize: "12px" }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* account center */}
      <Typography
        color="#fff"
        mb={1}
        variant="h5"
        sx={{ fontSize: "18px", fontWeight: 600, pb: "10px" }}
      >
        {t("ProfilePage.center")}
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
          background: "linear-gradient(135deg,#3b4a36 0%,#303e30 100%)",
          p: 0,
        }}
      >
        {[
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                style={{ color: "#fff" }}
              >
                <path
                  d="M10 13a5 5 0 007.54.54l1.92-1.92a4 4 0 00-5.66-5.66l-1.03 1.03"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M14 11a5 5 0 00-7.54-.54L4.54 12.38a4 4 0 005.66 5.66l1.03-1.03"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            ),
            label: t("ProfilePage.ReferralLink"),
            link: "/referral",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                style={{ color: "#fff" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            ),
            label: t("ProfilePage.Security_center"),
            link: "/security",
          },
          {
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                style={{ color: "#fff" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 12H9m0 0l3-3m-3 3l3 3"
                ></path>
              </svg>
            ),
            label: t("ProfilePage.Logout"),
            link: null,
          },
        ].map((item, i) => (
          <Box
            key={item.label}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={2}
            py={2}
            borderBottom={i !== 2 ? "1px solid rgba(255,255,255,0.1)" : "none"}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (!user) {
                router.push("/login");
              } else if (item.link) {
                router.push(item.link);
              } else {
                window.localStorage.removeItem("token");
                router.push("/");
              }
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              {item.icon}

              <Typography color="#fff">{item.label}</Typography>
            </Box>

            <ChevronRight sx={{ color: "#fff" }} />
          </Box>
        ))}
      </Card>
    </Box>
  );
}
