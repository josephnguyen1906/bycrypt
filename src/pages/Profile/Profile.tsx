"use client";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import OverviewPage from "./Overview.page";
import AccountPage from "./Account.page";
import VerifiedPage from "./Verified.page";
import ChangePassword from "./ChangePassword";
import InvitationPage from "./Invitation";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import BillPage from "./Bill";
import { useTranslation } from "react-i18next";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface TabProps {
  value: number;
  tab: number | null;
  subTab: number | null;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ProfilePage(props: TabProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value || 0);
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#000",
        paddingBottom: {
          xs: "100px",
          sm: "0px",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          paddingTop: {
            xs: "10px",
            sm: "80px",
          },
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
            width: "80%",
            margin: "0 auto",
            minWidth: "400px", // Optional, giúp Tabs không bị bóp nhỏ
            "& .MuiTab-root": {
              color: "#909090",
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
              backgroundColor: "#000",
            },
          }}
        >
          <Tab label={t("ProfilePage.menu0")} {...a11yProps(0)} />
          <Tab label={t("ProfilePage.menu1")} {...a11yProps(1)} />
          <Tab label={t("ProfilePage.menu2")} {...a11yProps(2)} />
          <Tab label={t("ProfilePage.menu4")} {...a11yProps(3)} />
          <Tab label={t("ProfilePage.menu5")} {...a11yProps(4)} />
        </Tabs>
      </Box>

      {/* Tab panels */}
      <CustomTabPanel value={value} index={0}>
        <OverviewPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AccountPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ChangePassword tab={props.tab || 0} subTab={props.subTab || 0} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <InvitationPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <BillPage />
      </CustomTabPanel>
    </Box>
  );
}
