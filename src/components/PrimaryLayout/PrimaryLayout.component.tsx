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
  CasioIcon,
  DPGameIcon,
  SearchIcon,
  SportsIcon,
} from "@/shared/Svgs/Svg.component";
import { Button } from "@mui/material";
import useAuth from "@/hook/useAuth";
import { IUser } from "@/shared/interfaces";

const FooterPage = dynamic(() => import("@/pages/Footer/Footer.page"), {
  ssr: false,
});

export default function PrimaryLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menu, setMenu] = useState(2);
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
        router.replace("/sport");
        break;
      case 2:
        router.replace("/");
        break;
      case 3:
        router.replace("/livecasino");
        break;
      case 4:
        router.replace("/tablegame");
        break;
      case 5:
        router.replace("/event");
        break;
    }
  };
  useEffect(() => {
    const initialize = async () => {
      try {
        const res: any = await getMe();
        setUser(res.user);
        if (path?.startsWith("/profile") && !res.user) {
          router.replace("/");
          return;
        }
        if (res?.user) {
          setUser(res.user);

          const updatedRes: any = await getMe(); // Gọi lại API sau khi hoàn thành
          setUser(updatedRes?.user);
        }
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
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

          <main>{children}</main>
          {path === "/login/" || path === "/signup/" ? "" : <FooterPage />}

          {/* <nav className="menu-mobile">
            <ul>
              <li>
                <button type="button" onClick={() => hanldMenu(5)}>
                  <Image
                    src={"/images/khuyenmai.webp"}
                    width={25}
                    height={25}
                    style={
                      menu === 5 ? { color: "#d7ca63" } : { color: "white" }
                    }
                    alt=""
                    className="moblie-icon"
                  />
                  <p className={menu === 5 ? "mobile-active" : "mobile-p"}>
                    Khuyến mãi
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(1)}>
                  <SportsIcon className="moblie-icon" />
                  <p className={menu === 1 ? "mobile-active" : "mobile-p"}>
                    Thể thao
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(2)}>
                  <Image
                    src={"/images/home.png"}
                    width={34}
                    height={34}
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                  <p className={menu === 2 ? "mobile-active" : "mobile-p"}>
                    Trang chủ
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(3)}>
                  <CasioIcon className="moblie-icon" />
                  <p className={menu === 3 ? "mobile-active" : "mobile-p"}>
                    Live casino
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(4)}>
                  <DPGameIcon className="moblie-icon" />
                  <p className={menu === 4 ? "mobile-active" : "mobile-p"}>
                    Games
                  </p>
                </button>
              </li>
            </ul>
          </nav> */}

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
        </div>
      )}
    </>
  );
}
