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
import { Box, Button } from "@mui/material";
import useAuth from "@/hook/useAuth";
import { IUser } from "@/shared/interfaces";
import MenuProfileMobile from "../subMenu/MenuProfileMobile";
import "../../i18n";
import LiveChatWidget from "../LIveChat/LiveChat";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/useUserStore";
const FooterPage = dynamic(() => import("@/pages/Footer/Footer.page"), {
  ssr: false,
});

export default function PrimaryLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const [menu, setMenu] = useState(1);
  const router = useRouter();
  const path = usePathname();
  const [openSupport, setOpenSupport] = useState(false);

  const getActiveMenu = () => {
    if (path === "/") return 1;
    if (path?.startsWith("/trade")) return 2;
    if (path?.startsWith("/buysell")) return 3;
    if (path?.startsWith("/excavator")) return 4;
    if (path?.startsWith("/account")) return 5;
    return 0;
  };
  const activeMenu = getActiveMenu();
  const hanldMenu = (menu: number) => {
    setOpenSupport(false);

    switch (menu) {
      case 1:
        router.push("/");
        break;
      case 2:
        router.push("/trade");
        break;
      case 3:
        router.push("/buysell");
        break;
      case 4:
        router.push("/excavator");
        break;
      case 5:
        router.push("/account");
        break;
    }
  };

  return (
    <>
      <div className="container">
        <main>{children}</main>
        {path !== "/login/" && path !== "/signup/" && (
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
                      background: activeMenu === 1 ? "#22c55e" : "none",
                    }}
                  >
                    <HomeIcon
                      width="25px"
                      height="25px"
                      fill={activeMenu === 1 ? "white" : "#909090"}
                    />
                  </Box>
                  <p
                    className={activeMenu === 1 ? "mobile-active" : "mobile-p"}
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
                      background: activeMenu === 2 ? "#22c55e" : "none",
                    }}
                  >
                    <MarketIcon
                      width="25px"
                      height="25px"
                      fill={activeMenu === 2 ? "white" : "#909090"}
                    />
                  </Box>
                  <p
                    className={activeMenu === 2 ? "mobile-active" : "mobile-p"}
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
                      background: activeMenu === 3 ? "#22c55e" : "none",
                    }}
                  >
                    <SettingsIcon
                      width="30px"
                      height="30px"
                      fill={activeMenu === 3 ? "white" : "#909090"}
                    />
                  </Box>
                  <p
                    className={activeMenu === 3 ? "mobile-active" : "mobile-p"}
                  >
                    {t("MenuMobile.menu3")}
                  </p>
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
                      background: activeMenu === 4 ? "#22c55e" : "none",
                    }}
                  >
                    <ChartIcon
                      width="25px"
                      height="25px"
                      fill={activeMenu === 4 ? "white" : "#909090"}
                    />
                  </Box>
                  <p
                    className={activeMenu === 4 ? "mobile-active" : "mobile-p"}
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
                      background: activeMenu === 5 ? "#22c55e" : "none",
                    }}
                  >
                    <UserIcon
                      width="25px"
                      height="25px"
                      fill={activeMenu === 5 ? "white" : "#909090"}
                    />
                  </Box>
                  <p
                    className={activeMenu === 5 ? "mobile-active" : "mobile-p"}
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
    </>
  );
}
