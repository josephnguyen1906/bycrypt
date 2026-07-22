"use client";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Box } from "@mui/material";
import { getWebsiteConfig } from "@/services/User.service";
import { useUserStore } from "@/stores/useUserStore";
import HomeMobile from "./HomeMobile";

export default function HomePage() {
  const { user, loading, fetchUser } = useUserStore();
  const [setting, setSetting] = useState<any>();
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
      <HomeMobile setting={setting} user={user} />
    </Box>
  );
}
