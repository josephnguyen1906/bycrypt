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
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/Loading";
import swal from "sweetalert";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Dialog,
  Drawer,
  IconButton,
  Menu,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { getWebsiteConfig } from "@/services/User.service";
import { useUserStore } from "@/stores/useUserStore";
import HomeMobile from "./HomeMobile";
import HomeDesktop from "./HomeDesktop";

export default function HomePage() {
  const { user, loading, fetchUser } = useUserStore();
  const [setting, setSetting] = useState<any>();

  const isSM = useMediaQuery("(min-width:600px)");
  const isXS = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    fetchUser();
    getSetting();
  }, [fetchUser]);

  const getSetting = async () => {
    const res = await getWebsiteConfig();
    if (res.status) {
      setSetting(res.data);
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {isXS && <HomeMobile setting={setting} user={user} />}
      {isSM && <HomeDesktop setting={setting} user={user} />}
    </Box>
  );
}
