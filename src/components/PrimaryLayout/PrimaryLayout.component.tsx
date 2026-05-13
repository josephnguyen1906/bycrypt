"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeaderPage from "../../pages/Header/Header.page";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import LoadingComponent from "../Loading";
import {
  getMe,
  getNotiDetail,
  getNotification,
  seeAllNoti,
} from "@/services/User.service";
import MenuPopupComponent from "../popup/MenuPopup.component";
import SupportPopupComponent from "../popup/SupportPopup.component";
import "./PrimaryLayout.css";
import {
  ArrowSwap1Icon,
  ArrowSwap2Icon,
  AssetsIcon,
  CasioIcon,
  ChartIcon,
  DPGameIcon,
  ExploreIcon,
  HomeIcon,
  MarketIcon,
  SearchIcon,
  SettingsIcon,
  SportsIcon,
  UserIcon,
} from "@/shared/Svgs/Svg.component";
import { Box, Button, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import useAuth from "@/hook/useAuth";
import { IUser } from "@/shared/interfaces";
import MenuProfileMobile from "../subMenu/MenuProfileMobile";
import "../../i18n";
import LiveChatWidget from "../LIveChat/LiveChat";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/useUserStore";

const theme = createTheme({
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
});

export default function PrimaryLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const { user, fetchUser } = useUserStore();
  const router = useRouter();
  const path = usePathname();
  const [openSupport, setOpenSupport] = useState(false);
  const isSM = useMediaQuery("(min-width:600px)");
  const isXS = useMediaQuery("(max-width:600px)");
  const getActiveMenu = () => {
    if (path === "/") return 1;
    if (path?.startsWith("/trade")) return 2;
    if (path?.startsWith("/contact")) return 3;
    if (path?.startsWith("/excavator")) return 4;
    if (path?.startsWith("/account")) return 5;
    return 0;
  };
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const activeMenu = getActiveMenu();
  const hanldMenu = (menu: number) => {
    setOpenSupport(false);

    switch (menu) {
      case 1:
        router.push("/");
        break;
      case 2:
        router.push("/market");
        break;
      case 3:
        router.push("/trade");
        break;
      case 4:
        router.push("/excavator");
        break;
      case 5:
        if (user) router.push("/account");
        else router.push("/login");
        break;
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="container">
          <main>{children}</main>
          {isSM && <HeaderPage />}
          {isXS &&
            path !== "/login/" &&
            path !== "/signup/" &&
            path !== "/chat/" &&
            path !== "/trade/" && (
              <nav className="menu-mobile">
                <ul>
                  <li>
                    <button type="button" onClick={() => hanldMenu(1)}>
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <HomeIcon
                          width="25px"
                          height="25px"
                          fill={activeMenu === 1 ? "white" : "#909090"}
                        />
                      </Box>
                      <p
                        className={
                          activeMenu === 1 ? "mobile-active" : "mobile-p"
                        }
                      >
                        {t("MenuMobile.menu1")}
                      </p>
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => hanldMenu(2)}>
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={"/images/market-icon.png"}
                          width={25}
                          height={25}
                          alt=""
                        />
                      </Box>
                      <p
                        className={
                          activeMenu === 2 ? "mobile-active" : "mobile-p"
                        }
                      >
                        {t("MenuMobile.menu2")}
                      </p>
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => hanldMenu(3)}>
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mt: "10px",
                        }}
                      >
                        <Image
                          src={"/images/trade-icon.png"}
                          width={30}
                          height={30}
                          alt=""
                        />
                      </Box>
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => hanldMenu(4)}>
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ChartIcon
                          width="25px"
                          height="25px"
                          fill={activeMenu === 4 ? "white" : "#909090"}
                        />
                      </Box>
                      <p
                        className={
                          activeMenu === 4 ? "mobile-active" : "mobile-p"
                        }
                      >
                        {t("MenuMobile.menu4")}
                      </p>
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => hanldMenu(5)}>
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={"/images/profile-icon.png"}
                          width={25}
                          height={25}
                          alt=""
                          style={{ height: "25px", objectFit: "contain" }}
                        />
                      </Box>
                      <p
                        className={
                          activeMenu === 5 ? "mobile-active" : "mobile-p"
                        }
                      >
                        {t("MenuMobile.menu5")}
                      </p>
                    </button>
                  </li>
                </ul>
              </nav>
            )}

          {/* <MenuPopupComponent
            open={open}
            onClose={handleClose}
            title="Category"
          /> */}
          <SupportPopupComponent
            open={openSupport}
            onClose={() => setOpenSupport(false)}
            title="Support"
          />
          {/* <LiveChatWidget /> */}
        </div>
      </ThemeProvider>
    </>
  );
}
