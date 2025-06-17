"use client";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import History from "./History";
import OpenCommand from "./OpenCommand";
import CloseCommand from "./CloseCommand";
import NormalMin from "./NormalMin";
import OverdueMin from "./OverdueMin";
import NormalIssue from "./NormalIssue";
import OverDueIssue from "./OverDueIssue";
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
export default function HistoryPage(props: TabProps) {
  const [value, setValue] = useState(props.value || 0);
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const tabRefs = useRef<(HTMLElement | null)[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (tabRefs.current[value]) {
      tabRefs.current[value]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [value]);
  const tabLabels = [
    "History",
    "Open command",
    "Close command",
    "Excavator operating",
    "Excavator expired",
    "Frozen Command",
    "Not frozen yet Command",
  ];
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
            minWidth: "600px", // Optional, giúp Tabs không bị bóp nhỏ
            "& .MuiTab-root": {
              color: "#909090",
              fontSize: "18px",
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
          {tabLabels.map((label, index) => (
            <Tab
              key={index}
              label={label}
              {...a11yProps(index)}
              ref={(el) => (tabRefs.current[index] = el)}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab panels */}
      <CustomTabPanel value={value} index={0}>
        <History />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OpenCommand />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CloseCommand />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <NormalMin />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <OverdueMin />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <NormalIssue />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <OverDueIssue />
      </CustomTabPanel>
    </Box>
  );
}
