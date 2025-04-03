"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import "./Header.css";
import dayjs from "dayjs";
import DialogLogin from "@/components/login/loginForm";
import {
  AboutIcon,
  AccountIcon,
  AgentIcon,
  ArrowDown,
  CasinoCardsIcon,
  CasinoIcon,
  ChickenIcon,
  ClaimIcon,
  EmailIcon,
  EmailloginIcon,
  EmailmenuIcon,
  EventIcon,
  FindIcon,
  FishIcon,
  GameIcon,
  HistoryIcon,
  LogoutIcon,
  LottoIcon,
  MissionIcon,
  MoneybagIcon,
  MonyExchangeIcon,
  ReportIcon,
  SlotsIcon,
  SpeakerIcon,
  SpinsIcon,
  SportIcon,
  SupportIcon,
  TabletGameIcon,
  UserIcon,
} from "@/shared/Svgs/Svg.component";
import Link from "next/link";
import { IUser } from "@/shared/interfaces";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { getMe, getMessage } from "@/services/User.service";
import { Avatar, Button, Skeleton, Typography } from "@mui/material";
import TranslateContextComponent from "../../components/GgTranstale/TranslateContext.component";
import { userResponse } from "@/interface/user.interface";
import MenuProfile from "@/components/subMenu/MenuProfile";
import MenuProfileMobile from "@/components/subMenu/MenuProfileMobile";
import { getToken } from "@/configs/client-store";
import usePlayGame from "@/hook/usePlayGame";
import LoadingComponent from "@/components/Loading";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import { MenuMobile, MenuWebsite } from "@/datafake/Menu";
import { GameConfig } from "@/configs/GameConfig";

interface propUser {
  user: userResponse;
}
export default function HeaderPage(props: propUser) {
  const { loading, playGame } = usePlayGame();
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [user, setUser] = useState<any>(props.user);
  const [message, setMessage] = React.useState<any>(null);
  const handleClose = () => setShow(false);
  const handleSetActiveTab = useCallback((tabIndex: number) => {
    setActiveTab(tabIndex);
    setShow(true);
  }, []);

  const [device, setDevice] = useState("");
  useEffect(() => {
    const initialize = async () => {
      try {
        const res: any = await getMe();
        if (res?.user) {
          setUser(res.user);
          const updatedRes: any = await getMe(); // Gọi lại API sau khi hoàn thành
          setUser(updatedRes?.user);
        }
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        // setLoad(false);
      }
    };
    getMessage().then((res) => {
      if (res.data) {
        setMessage(res.data);
      }
    });
    initialize();
  }, []);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setDevice("iOS");
    } else if (/Android/i.test(userAgent)) {
      setDevice("Android");
    } else {
      setDevice("Khác");
    }
  }, []);

  return (
    <header>
      <div className="main-header">
        <div className="header-top">
          <div className="header-left">
            <div className="logo">
              <Link
                href={"/"}
                prefetch={false}
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontFamily: "sans-serif",
                  fontStyle: "italic",
                }}
              >
                {/* <Image
                  src="/images/openart-1bd95ea5-a202-4491-b723-436d1d59311f.png"
                  width={80}
                  height={80}
                  alt=""
                /> */}
                <h2>Reddy232</h2>
              </Link>
            </div>
          </div>

          <div className="header-right">
            {user ? (
              <div className="header-right-menu">
                {/* <Link href="#">
                  <Image
                    src="/images/ic-giftcode.webp"
                    alt=""
                    width="200"
                    height="32"
                  />
                </Link> */}
                <Link href="/event">
                  <Image
                    src="/images/ic-event.webp"
                    alt=""
                    width="200"
                    height="32"
                  />
                </Link>
                <span></span>
                <MenuProfile user={user} message={message} />
              </div>
            ) : (
              <div className="header-right-menu">
                {/* <Link href="#">
                  <Image
                    src="/images/ic-giftcode.webp"
                    alt=""
                    width="200"
                    height="32"
                  />
                </Link> */}
                <Link href="/event">
                  <Image
                    src="/images/ic-event.webp"
                    alt=""
                    width="200"
                    height="32"
                  />
                </Link>
                <span></span>

                <button
                  className="login"
                  onClick={() => handleSetActiveTab(0)} // Use memoized function
                >
                  Login
                </button>

                <button
                  className="register"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSetActiveTab(1)} // Use memoized function
                >
                  Register
                </button>
                <DialogLogin
                  activeTab={activeTab}
                  onClose={handleClose}
                  open={show}
                />
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <>
            <SimpleBackdrop />
            <nav className="header-bottom">
              <ul>
                {MenuWebsite.map((item) => (
                  <li key={item.id}>
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        ) : (
          <nav className="header-bottom">
            <ul>
              {MenuWebsite.map((item) => (
                <li key={item.id}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="main-header-mobile">
        <div className="header-top">
          <div
            className={device === "Android" ? "header-left" : "header-left-ios"}
          >
            <div className="logo">
              <Link href={"/"} prefetch={false}>
                <Image
                  src="/images/openart-1bd95ea5-a202-4491-b723-436d1d59311f.png"
                  width={100}
                  height={40}
                  alt=""
                />
              </Link>
            </div>
          </div>

          <div
            className={
              device === "Android" ? "header-right" : "header-right-ios"
            }
          >
            {user ? (
              <div className="header-right-menu">
                <MenuProfileMobile user={user} message={message} />
              </div>
            ) : (
              <div className="header-right-menu">
                {/* <Link href="#">
                  <Image
                    src="/images/ic-giftcode.webp"
                    alt=""
                    width="200"
                    height="32"
                  />
                </Link> */}
                <Link href="/event">
                  <Image
                    src="/images/ic-event.webp"
                    alt=""
                    width="200"
                    height="32"
                  />
                </Link>
                <span></span>

                <button
                  className="login"
                  onClick={() => handleSetActiveTab(0)} // Use memoized function
                >
                  Login
                </button>

                <button
                  className="register"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSetActiveTab(1)} // Use memoized function
                >
                  Register
                </button>
                <DialogLogin
                  activeTab={activeTab}
                  onClose={handleClose}
                  open={show}
                />
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <>
            <SimpleBackdrop />
            <nav className="header-bottom-mobile">
              <ul>
                {MenuMobile.map((item) => (
                  <li key={item.id}>
                    <Link href={item.link}>
                      {item.icon}
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        ) : (
          <nav className="header-bottom-mobile">
            <ul>
              {MenuMobile.map((item) => (
                <li key={item.id}>
                  <Link href={item.link}>
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
