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
import {
  CasioIcon,
  DPGameIcon,
  SearchIcon,
  SportsIcon,
} from "@/shared/Svgs/Svg.component";
import { Button } from "@mui/material";
import MiniGameComponent from "../popup/MiniGameComponent";
import MiniGameIframeComponent from "../popup/MiniGameIframeComponent";
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
  const [menu, setMenu] = useState(2);
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [load, setLoad] = useState(true);
  const [isMiniGameOpen, setIsMiniGameOpen] = useState(false);
  const [isIframeOpen, setIsIframeOpen] = useState(false);

  const handleOpenMiniGame = () => {
    setIsMiniGameOpen(true);
    setIsIframeOpen(false);
  };

  const handleCloseMiniGame = () => {
    setIsMiniGameOpen(false);
  };

  const handleOpenIframe = () => {
    setIsIframeOpen(true);
  };

  const handleCloseIframe = () => {
    setIsIframeOpen(false);
  };

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
          <Button
            onClick={handleOpenMiniGame}
            sx={{
              position: "fixed",
              right: "0",
              top: "80px", // 150px from bottom
              zIndex: "3",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 1,
              backgroundColor: "transparent", // Optional: transparent background
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Optional: hover effect
              },
            }}
          >
            <Image
              src={"/images/icon-mini-game-v2.webp"}
              width={100}
              height={100}
              alt="Mini Game Icon"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          </Button>
          <MiniGameComponent
            open={isMiniGameOpen}
            onClose={handleCloseMiniGame}
            onFirstItemClick={handleOpenIframe}
          />
          <MiniGameIframeComponent
            open={isIframeOpen}
            onClose={handleCloseIframe}
          />
        </div>
      )}
    </>
  );
}
