"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Autocomplete,
} from "@mui/material";
import {
  updateBank,
  updatePassword,
  updatePaymentPassword,
} from "@/services/User.service";
import { toast } from "react-toastify";
import useAuth from "@/hook/useAuth";
import { useTranslation } from "react-i18next";
import ChangePass from "./security/ChangePass";
import ChangePassWithdraw from "./security/ChangePassWithdraw";
import ChangeBank from "./security/ChangeBank";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
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

interface Tab {
  tab: number | null;
  subTab: number | null;
}

export default function ChangePassword(props: Tab) {
  const { t } = useTranslation();
  const { user, refetchUser } = useAuth();

  const [value, setValue] = useState(props.tab || 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          width: {
            xs: "100%",
            sm: "80%",
          },
          margin: "auto",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
            },
            padding: "0px 10px",
            "& .MuiTab-root": {
              color: "#909090",
              fontSize: "11px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              "&:hover": { color: "#fff" },
              "&.Mui-selected": {
                color: "#fff",
                fontWeight: 700,
                borderBottom: "2px solid #fff",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#000",
            },
          }}
        >
          <Tab label={t("ProfilePage.tab_pass3")} {...a11yProps(0)} />
          <Tab label={t("ProfilePage.tab_pass2")} {...a11yProps(1)} />
          <Tab label={t("ProfilePage.tab_pass1")} {...a11yProps(2)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <ChangeBank subTabs={props.subTab} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ChangePassWithdraw user={user} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ChangePass />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
