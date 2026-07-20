"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import SupportPopupComponent from "../popup/SupportPopup.component";
import "./PrimaryLayout.css";
import { ChartIcon, HomeIcon } from "@/shared/Svgs/Svg.component";
import { Box, Button, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/stores/useUserStore";
import NavMobileBottom from "./NavMobileBottom";

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
          {path !== "/login/" &&
            path !== "/signup/" &&
            path !== "/chat/" &&
            path !== "/trade/" &&
            path !== "/trade-chart/" && <NavMobileBottom />}

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
