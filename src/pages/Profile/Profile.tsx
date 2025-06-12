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
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface TabProps {
  value: number;
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
  const [value, setValue] = useState(props.value || 0);
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#fff" }}>
      <Box sx={{ width: "80%", paddingTop: "80px", margin: "0 auto" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTab-root": {
              color: "#909090",
              fontSize: "18px",
              fontWeight: 500,
              "&:hover": { color: "#333" },
              "&.Mui-selected": {
                color: "#000",
                fontWeight: 700,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#000",
            },
          }}
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Profile" {...a11yProps(1)} />
          <Tab label="Security setting" {...a11yProps(2)} />
          <Tab label="Account verification" {...a11yProps(3)} />
          <Tab label="Invitation to join" {...a11yProps(4)} />
          <Tab label="Notification" {...a11yProps(5)} />
          <Tab label="Bill" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <OverviewPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AccountPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ChangePassword />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <VerifiedPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <InvitationPage />
      </CustomTabPanel>
    </Box>
  );
}
