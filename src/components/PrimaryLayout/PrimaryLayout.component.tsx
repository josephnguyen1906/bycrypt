"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeaderPage from "../../pages/Header/Header.page";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import LoadingComponent from "../Loading";
import { getMe } from "@/services/User.service";
import { GameConfig } from "@/configs/GameConfig";
import MenuPopupComponent from "../popup/MenuPopup.component";
import SupportPopupComponent from "../popup/SupportPopup.component";
import "./PrimaryLayout.css";
import {
  ArrowSwap1Icon,
  ArrowSwap2Icon,
  AssetsIcon,
  CasioIcon,
  DPGameIcon,
  ExploreIcon,
  HomeIcon,
  MarketIcon,
  SearchIcon,
  SportsIcon,
} from "@/shared/Svgs/Svg.component";
import { Button } from "@mui/material";
import useAuth from "@/hook/useAuth";
import { IUser } from "@/shared/interfaces";
import MenuProfileMobile from "../subMenu/MenuProfileMobile";
import "../../i18n";
import LiveChatWidget from "../LIveChat/LiveChat";
const FooterPage = dynamic(() => import("@/pages/Footer/Footer.page"), {
  ssr: false,
});

export default function PrimaryLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menu, setMenu] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const router = useRouter();
  const path = usePathname();
  const [load, setLoad] = useState(true);
  const [openSupport, setOpenSupport] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  // const { user, loading } = useAuth();
  const hanldMenu = (menu: number) => {
    setMenu(menu);
    setOpenSupport(false);

    switch (menu) {
      case 1:
        router.replace("/");
        break;
      case 2:
        router.replace("/staking");
        break;
      case 3:
        router.replace("/buysell");
        break;
      case 4:
        router.replace("/excavator");
        break;
      case 5:
        router.replace("/asset");
        break;
    }
  };
  const protectedPaths = [
    "/overview",
    "/profile",
    "/referral",
    "/verified",
    "/bill",
    "/history",
    "/frozenyet",
    "/frozenCommand",
    "/excavatorexpired",
    "/excavatoroperating",
    "/opencommand",
    "/closecommand",
    "/dailyrewards",
  ];
  useEffect(() => {
    const initialize = async () => {
      try {
        const res: any = await getMe();
        const isLoggedIn = !!res?.data;
        setUser(res.data);

        const isProtectedPath = protectedPaths.some((p) => path?.startsWith(p));

        if (res.status === false && isProtectedPath) {
          router.replace("/");
          return;
        }

        if (isLoggedIn) {
          const updatedRes: any = await getMe();
          setUser(updatedRes?.data);
          setLoad(false);
        }
      } catch (error) {
        const isProtectedPath = protectedPaths.some((p) => path?.startsWith(p));
        if (isProtectedPath) {
          router.replace("/");
          return;
        }
        setLoad(false);
      }
    };

    initialize();
  }, [path]);

  return (
    <>
      {load ? (
        <LoadingComponent />
      ) : (
        <div className="container">
          <HeaderPage user={user} />
          <MenuProfileMobile user={user} />
          <main>{children}</main>
          {path === "/login/" || path === "/signup/" ? "" : <FooterPage />}

          <nav className="menu-mobile">
            <ul>
              <li>
                <button type="button" onClick={() => hanldMenu(1)}>
                  <HomeIcon
                    width="25px"
                    height="25px"
                    fill={menu === 1 ? "#fff" : "#909090"}
                  />
                  <p className={menu === 1 ? "mobile-active" : "mobile-p"}>
                    Home
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(2)}>
                  <MarketIcon
                    width="25px"
                    height="25px"
                    fill={menu === 2 ? "#fff" : "#909090"}
                  />
                  <p className={menu === 2 ? "mobile-active" : "mobile-p"}>
                    Staking
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(3)}>
                  {menu === 3 ? (
                    <img
                      src="/images/swap2.png"
                      width="25px"
                      height="25px"
                      className="icon-home-m"
                    />
                  ) : (
                    <img
                      src="/images/swap1.png"
                      width="25px"
                      height="25px"
                      className="icon-home-m"
                    />
                  )}
                  <p className={menu === 3 ? "mobile-active" : "mobile-p"}>
                    Trade
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(4)}>
                  <ExploreIcon
                    width="25px"
                    height="25px"
                    fill={menu === 4 ? "#fff" : "#909090"}
                  />
                  <p className={menu === 4 ? "mobile-active" : "mobile-p"}>
                    Mining
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(5)}>
                  <AssetsIcon
                    width="25px"
                    height="25px"
                    fill={menu === 5 ? "#fff" : "#909090"}
                  />
                  <p className={menu === 5 ? "mobile-active" : "mobile-p"}>
                    Assets
                  </p>
                </button>
              </li>
            </ul>
          </nav>

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
          <LiveChatWidget />
        </div>
      )}
    </>
  );
}
