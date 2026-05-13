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
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import {
  SyncAltOutlined,
  SyncOutlined,
  Visibility,
  VisibilityOff,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";
import { InternetIcon, PreviousIcon } from "@/shared/Svgs/Svg.component";
import LanguageSwitcher from "@/components/Language/LanguageSwitcher";
import Image from "next/image";

export default function AccountPage() {
  const { t, i18n } = useTranslation();
  const [hideBalance, setHideBalance] = useState(false);
  const router = useRouter();
  const { user, fetchUser, loading } = useUserStore();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      setLoad(false);
    }
  }, [user]);

  if (load) {
    return <LoadingComponent />;
  }

  const menuItems = [
    {
      title: "AssetPage.recent",
      icon: "/images/history-icon.png",
      onClick: () => {
        router.push("/contact/history");
      },
    },
    {
      title: "DepositWithdrawPage.Password",
      icon: "/images/chang-pass-icon.png",
      onClick: () => {
        router.push("/security");
      },
    },
    {
      title: "ProfilePage.tab_bank",
      icon: "/images/withdraw-icon.png",
      onClick: () => {
        router.push("/addbank");
      },
    },
    {
      title: "ProfilePage.menu3",
      icon: "/images/verified-icon.png",
      onClick: () => {
        router.push("/verified");
      },
    },
    // {
    //   title: "About us",
    //    icon: "/images/chang-pass-icon.png",
    //   onClick: () => {},
    // },
  ];

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
          height: { xs: "100%", sm: "860px" },
          borderRadius: {
            xs: 0,
            sm: "16px",
          },
          padding: "16px",
          position: "relative",
          pb: "150px",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={() => router.back()}
          >
            <PreviousIcon width="25px" height="20px" />
          </Box>

          <Box
            sx={{
              background: "#121821",
              color: "#28D17C",
              fontSize: "12px",
              padding: "4px 10px",
              borderRadius: "20px",
              fontWeight: 600,
            }}
          >
            80 Credit score
          </Box>
        </Box>

        {/* Avatar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "#D9D9D9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "50px",
              mb: 1,
              border: "4px solid #999",
            }}
          >
            👤
          </Box>

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            {user?.username || "huy@gmail.com"}
          </Typography>

          <Typography
            sx={{
              color: "#CFCFCF",
              fontSize: "13px",
              mt: 0.5,
            }}
          >
            UID: 6a0186cea862ea1426597312
          </Typography>
        </Box>

        {/* Balance Card */}
        <Box
          sx={{
            background: "#2A313D",
            borderRadius: "14px",
            padding: "16px",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
              }}
            >
              {t("AssetPage.title1")}
            </Typography>

            <Typography
              sx={{
                color: "#999",
                cursor: "pointer",
              }}
              onClick={() => setHideBalance(!hideBalance)}
            >
              {hideBalance ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "#fff",
              fontSize: "34px",
              fontWeight: 700,
              mt: 2,
            }}
          >
            {hideBalance
              ? "******"
              : Number(user?.balance.usdt_total).toLocaleString() + " USDT"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Typography
              sx={{
                color: "#A5A5A5",
                fontSize: "13px",
              }}
            >
              {t("ProfilePage.Available_balance")}
            </Typography>

            <Typography
              sx={{
                color: "#fff",
                fontSize: "13px",
              }}
            >
              {hideBalance
                ? "******"
                : Number(user?.balance.usdt).toLocaleString() + " USDT"}
            </Typography>
          </Box>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            onClick={() => router.push("/withdraw")}
            sx={{
              flex: 1,
              background: "#2A313D",
              borderRadius: "10px",
              padding: "14px",
              textAlign: "center",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ↕ {t("AssetPage.menu3")}
          </Box>

          <Box
            onClick={() => router.push("/deposit")}
            sx={{
              flex: 1,
              background: "#2A313D",
              borderRadius: "10px",
              padding: "14px",
              textAlign: "center",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ↓ {t("AssetPage.menu2")}
          </Box>
        </Box>

        {/* Menu List */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {menuItems.map((item, index) => (
            <Box
              key={index}
              onClick={item.onClick}
              sx={{
                background: "#2A313D",
                borderRadius: "10px",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": {
                  background: "#323B49",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Image
                  src={item.icon}
                  width={20}
                  height={20}
                  alt=""
                  style={{ height: "20px", objectFit: "contain" }}
                />

                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {t(item.title)}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "#CFCFCF",
                  fontSize: "18px",
                }}
              >
                ›
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Logout */}
        <Button
          onClick={() => {
            window.localStorage.removeItem("token");
            window.location.href = "/";
          }}
          sx={{
            width: "100%",
            mt: 3,
            background: "#fff",
            color: "red",
            textAlign: "left",
            padding: "14px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {t("ProfilePage.Logout")}
        </Button>
      </Box>
    </Box>
  );
}
