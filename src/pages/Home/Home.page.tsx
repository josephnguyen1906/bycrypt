"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import "./Home.css";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Marquee from "react-fast-marquee";
import {
  AgentIcon,
  DownloadAppIcon,
  EmailIcon,
  SupportIcon,
} from "@/shared/Svgs/Svg.component";
import Modal from "@/components/Modal";
import Link from "next/link";
import { IBannerImg, INotification, IUser } from "@/shared/interfaces";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/Loading";
import swal from "sweetalert";
import { Avatar } from "@mui/material";
import { properties, slideMBImg } from "@/datafake/slide";
import { slideImg } from "@/datafake/slide";
import HotPage from "./Hot/Hot.page";
import BannerListgamePage from "./BannerListgame/BannerListgame.page";
import ListCasioPage from "./ListCasio/ListCasio.page";
import Carousel from "react-multi-carousel";
import NumberCount from "@/components/NumberCount/NumberCount";

const responsiveSettings = [
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

export default function HomePage() {
  const [isFixed, setIsFixed] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollPosition > documentHeight - windowHeight - 800;
      setIsFixed(scrollPosition > 300 && !isNearBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home">
      <HotPage />
      <BannerListgamePage />
      <ListCasioPage />
    </div>
  );
}
