"use client";

import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomTabPanel } from "../DepositWithdraw/DepositWithdraw.page";
import Tab1Page from "./tabs/Tab1Page";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function AccountPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user, fetchUser, loading } = useUserStore();
  const [load, setLoad] = useState(true);

  const [value, setValue] = useState(1);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      setLoad(false);
    }
  }, [user]);

  if (load) {
    return <LoadingComponent />;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pb: "100px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "60px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "10px",
          background: "#0E0F18",
        }}
      >
        <Box>
          <Button sx={{ width: 40, height: 40, background: "#0E0F18" }}>
            <MenuIcon sx={{ color: "white" }} />
          </Button>
        </Box>
        <Typography sx={{ color: "white", fontSize: 16 }}>
          {t("AccountPage.title")}{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="scrollable prevent tabs example"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            width: "90%",
            margin: "0 auto",
            minWidth: "400px", // Optional, giúp Tabs không bị bóp nhỏ
            "& .MuiTab-root": {
              color: "#fff",
              fontSize: "12px",
              fontWeight: 500,
              whiteSpace: "nowrap", // giữ chữ không xuống dòng
              "&:hover": { color: "#fff" },
              "&.Mui-selected": {
                color: "#fff",
                fontWeight: 700,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#00A609",
              height: 3,
              borderRadius: "3px",
              transform: "scaleX(0.5)",
              transformOrigin: "center",
            },
          }}
        >
          <Tab label={t("AccountPage.menu1")} {...a11yProps(1)} />
          <Tab label={t("AccountPage.menu2")} {...a11yProps(2)} />
          <Tab label={t("AccountPage.menu3")} {...a11yProps(3)} />
          <Tab label={t("AccountPage.menu4")} {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={1}>
        <Tab1Page user={user} />
      </CustomTabPanel>
    </Box>
  );
}
