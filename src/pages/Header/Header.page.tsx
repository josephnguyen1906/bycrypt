"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState, useRef } from "react";
import "./Header.css";
import dayjs from "dayjs";
import Link from "next/link";
import { userResponse } from "@/interface/user.interface";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import {
  getMe,
  getNotification,
  getWebsiteConfig,
} from "@/services/User.service";
import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  Skeleton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import TranslateContextComponent from "../../components/GgTranstale/TranslateContext.component";
import MenuProfile from "@/components/subMenu/MenuProfile";
import MenuProfileMobile from "@/components/subMenu/MenuProfileMobile";
import { getToken } from "@/configs/client-store";
import LoadingComponent from "@/components/Loading";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import { MenuWebsite } from "@/datafake/Menu";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  InternetIcon,
  NotiIcon,
  QuestionIcon,
} from "@/shared/Svgs/Svg.component";
import TranslateGoogle from "../../components/GgTranstale/TranslateContext.component";
import LanguageSwitcher from "@/components/Language/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "@/utils/formatDateTime";
import NavigationGame from "@/hook/NavigationGame";
import { useUserStore } from "@/stores/useUserStore";

interface propUser {
  user: userResponse | null;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100, // Tăng chiều rộng để hiển thị nội dung dài
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: "14px",
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      padding: theme.spacing(1.5, 2), // Tăng padding để đẹp hơn
      "& p": {
        margin: 0,
        fontSize: "14px",
        color: theme.palette.text.secondary,
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function HeaderPage() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "en";
    setLanguage(storedLang);
  }, []);
  const router = useRouter();
  const { user, loading, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Box
      sx={{
        width: "100vw",
        background: "#141A1F",
        backdropFilter: "blur(10px)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          height: "80px",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px", pl: "20px" }}>
          <Image
            src={"/images/logo2.png"}
            width={100}
            height={100}
            alt=""
            style={{ height: "50px", objectFit: "contain", cursor: "pointer" }}
            onClick={() => router.push("/")}
          />
          <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
            {MenuWebsite.map((item) => (
              <Link
                href={item.link}
                key={item.id}
                style={{ color: "white", textDecoration: "none" }}
              >
                {t(`MenuWebsite.${item.title}`)}
              </Link>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Button
            onClick={() => router.push("/deposit")}
            sx={{
              background: "#202630",
              color: "white",
              textTransform: "capitalize",
              borderRadius: "20px",
              padding: "2px 20px",
              height: "35px",
            }}
          >
            {t("AssetPage.menu2")}
          </Button>
          <Button
            onClick={() => router.push("/language")}
            sx={{
              background: "#202630",
              color: "white",
              textTransform: "capitalize",
              borderRadius: "20px",
              padding: "2px 20px",
              height: "35px",
              display: "flex",
              gap: "10px",
            }}
          >
            <Image
              src={"/images/lang-icon.png"}
              width={20}
              height={20}
              alt=""
              style={{ height: "20px", objectFit: "contain" }}
            />
            {language}
          </Button>
          <IconButton onClick={() => router.push(user ? "/account" : "/login")}>
            <Image
              src={"/images/avatar-icon.png"}
              width={30}
              height={30}
              alt=""
              style={{ height: "30px", objectFit: "contain" }}
            />
          </IconButton>
          <IconButton sx={{ width: 40, height: 40, background: "#202630" }}>
            <Image
              src={"/images/live-chat.png"}
              width={25}
              height={25}
              alt=""
              style={{ height: "25px", objectFit: "contain" }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
