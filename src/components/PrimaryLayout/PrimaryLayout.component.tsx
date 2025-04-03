"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeaderPage from "../../pages/Header/Header.page";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import swal from "sweetalert";
import MenuI from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  AccountBalance,
  AccountBalanceWallet,
  AccountCircle,
  CardGiftcard,
  Support,
  Menu,
  Event,
  History,
} from "@mui/icons-material";
import LoadingComponent from "../Loading";
import { getMe } from "@/services/User.service";
import { GameConfig } from "@/configs/GameConfig";
import { getWalletGameByUser, walletTransfer } from "@/services/Wallet.service";
import MenuPopupComponent from "../popup/MenuPopup.component";
import SupportPopupComponent from "../popup/SupportPopup.component";
import "./PrimaryLayout.css";
// Lazy load các component ít ưu tiên
const SidebarPage = dynamic(() => import("../../pages/Sidebar/Sidebar.page"), {
  ssr: false,
});
const FooterPage = dynamic(() => import("@/pages/Footer/Footer.page"), {
  ssr: false,
});

export default function PrimaryLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menu, setMenu] = useState(1);
  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [load, setLoad] = useState(true);

  const handleClose = () => setOpen(false);

  const hanldMenu = (menu: number) => {
    setMenu(menu);
    setOpen(false);
    setOpenSupport(false);

    switch (menu) {
      case 1:
        window.open("https://t.me/HitJuwa", "_blank", "noopener,noreferrer");
        break;
      case 2:
        router.replace("/event");
        break;
      case 3:
        if (user) {
          router.replace("/profile/betting-history/");
        } else {
          swal("Login", "You are not logged in! please log in", "warning");
        }
        break;
      case 4:
        setOpenSupport(true);
        break;
      case 5:
        setOpen(true);
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
          await widrawals(); // Thực hiện widrawals
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

  const widrawals = async () => {
    const withdrawalPromises = GameConfig.map(async (item) => {
      try {
        const WalletUser: any = await getWalletGameByUser(item.code);
        if (WalletUser.status === true && WalletUser.balance > 0) {
          await walletTransfer(WalletUser.balance, String(item.type), 2);
        }
      } catch (error) {
        console.error(`Error processing ${item.name}:`, error);
      }
    });

    await Promise.allSettled(withdrawalPromises); // Đợi tất cả promise, kể cả lỗi
  };

  return (
    <>
      {load ? (
        <LoadingComponent />
      ) : (
        <div className="container">
          <HeaderPage user={user} />
          <div className="menu-sidebar-left">
            <SidebarPage />
          </div>
          <main>{children}</main>
          <FooterPage />

          <nav className="menu-mobile">
            <ul>
              <li>
                <button type="button" onClick={() => hanldMenu(5)}>
                  <Menu
                    width="25px"
                    height="25px"
                    className="moblie-icon"
                    style={
                      menu === 5 ? { color: "#d7ca63" } : { color: "white" }
                    }
                  />
                  <p className={menu === 5 ? "mobile-active" : "mobile-p"}>
                    Menu
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(2)}>
                  <Event
                    width="25px"
                    height="25px"
                    className="moblie-icon"
                    style={
                      menu === 2 ? { color: "#d7ca63" } : { color: "white" }
                    }
                  />
                  <p className={menu === 2 ? "mobile-active" : "mobile-p"}>
                    Event
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(1)}>
                  <Image
                    className="img-nap"
                    src={"/images/icon-deposit.svg"}
                    width={50}
                    height={50}
                    alt=""
                  />
                  <p className={menu === 1 ? "mobile-active" : "mobile-p"}>
                    Recharge
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(3)}>
                  <History
                    width="25px"
                    height="25px"
                    className="moblie-icon"
                    style={
                      menu === 3 ? { color: "#d7ca63" } : { color: "white" }
                    }
                  />
                  <p className={menu === 3 ? "mobile-active" : "mobile-p"}>
                    History
                  </p>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => hanldMenu(4)}>
                  <Support
                    width="25px"
                    height="25px"
                    className="moblie-icon"
                    style={
                      menu === 4 ? { color: "#d7ca63" } : { color: "white" }
                    }
                  />
                  <p className={menu === 4 ? "mobile-active" : "mobile-p"}>
                    Support
                  </p>
                </button>
              </li>
            </ul>
          </nav>

          <MenuPopupComponent
            open={open}
            onClose={handleClose}
            title="Category"
          />

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
