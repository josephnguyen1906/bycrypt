"use client";

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Stack,
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
import { VisibilityOffOutlined } from "@mui/icons-material";
import LoadingComponent from "@/components/Loading";

export default function AccountPage() {
  const [hideBalance, setHideBalance] = useState(false);
  const router = useRouter();
  const { user, fetchUser, loading } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <Box
      sx={{
        maxWidth: "768px",
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
          Go to login
        </Button>
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
          sx={{ display: "flex", flexDirection: "column", gap: "5px", p: 2 }}
        >
          <Typography
            sx={{ color: "white", fontSize: "16px", fontWeight: 550 }}
          >
            {user.username}
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography
              sx={{ color: "#9ca3af", fontSize: "15px", fontWeight: 300 }}
            >
              ID: {user.id},
            </Typography>{" "}
            <Typography
              sx={{ color: "#9ca3af", fontSize: "15px", fontWeight: 300 }}
            >
              VIP Level: {user.level}
            </Typography>
          </Box>
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
            <Typography fontSize={14}>My assets(USDT)</Typography>

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
                  ? Number(user?.balance.usdt).toLocaleString()
                  : "0.00"}
            </Typography>
          )}

          <Box
            display="flex"
            justifyContent="space-between"
            mt={2}
            fontSize={12}
          >
            <Typography>Available:</Typography>

            <Typography
              display="flex"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => setHideBalance((prev) => !prev)}
            >
              {hideBalance ? "***" : user ? user?.money : "0.00"}
              <ChevronRight sx={{ fontSize: 16, ml: 0.5 }} />
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* action buttons */}
      <Stack direction="row" justifyContent="space-between" mb={3}>
        {[
          {
            label: "Recharge",
            icon: <RefreshOutlined sx={{ color: "white" }} />,
            link: "/recharge",
          },
          {
            label: "Withdraw",
            icon: <AccountBalanceWalletOutlined sx={{ color: "white" }} />,
            link: "/withdraw",
          },
          {
            label: "Transfer",
            icon: <SyncAlt sx={{ color: "white" }} />,
            link: "/transfer",
          },
          {
            label: "Exchange",
            icon: <SwapHorizOutlined sx={{ color: "white" }} />,
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

            <Typography fontSize={12} color="#fff" mt={1}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* account center */}
      <Typography color="#fff" mb={1}>
        Account center
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
            icon: <LinkIcon sx={{ color: "white" }} />,
            label: "Referral link",
            link: "/referral",
          },
          {
            icon: <SecurityOutlined sx={{ color: "white" }} />,
            label: "Security center",
            link: "/security",
          },
          {
            icon: <LogoutOutlined sx={{ color: "white" }} />,
            label: "Logout",
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
              if (item.link) {
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
