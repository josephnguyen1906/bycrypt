"use client";
import { useState } from "react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import useAuth from "@/hook/useAuth";
import { useTranslation } from "react-i18next";
import SafeVND from "./SafeVND";
import SafeUSDT from "./SafeUSDT";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
type TabProps = {
  value: number;
};

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

export default function SafeBoxPage(props: TabProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [value, setValue] = useState(props.value || 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#000",
        paddingTop: {
          xs: "10px",
          sm: "80px",
        },
        paddingBottom: {
          xs: "50px",
          sm: "0px",
        },
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "80%",
          },
          display: {
            xs: "block",
            sm: "flex",
          },
          justifyContent: "center",
          margin: "0 auto",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "35%" },
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "20px",
                sm: "35px",
              },
              fontWeight: "600",
              color: "#fff",
              textAlign: "center",
            }}
          >
            {t("DepositWithdrawPage.title")}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "20px",
                sm: "20px",
              },
              fontWeight: "500",
              color: "#909090",
              textAlign: "center",
            }}
          >
            {t("DepositWithdrawPage.decription")}
          </Typography>
        </Box>
        {user ? (
          <Box
            sx={{
              width: { xs: "100%", sm: "55%" },
              border: {
                xs: "none",
                sm: "1px solid rgba(203, 203, 203, 0.46)",
              },

              boxShadow: {
                xs: "none",
                sm: "0px 0px 30px rgba(255, 255, 255, 0.42)",
              },
              padding: {
                xs: "0px",
                sm: "10px",
              },
              backgroundColor: "#000",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ borderBottom: 1 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{ style: { display: "none" } }}
                sx={{
                  backgroundColor: "#2c2c2c",
                  borderRadius: "999px",
                  minHeight: "30px",
                  width: "fit-content",
                  margin: "auto",
                  display: "flex",
                  "& .MuiTab-root": {
                    textTransform: "none",
                    borderRadius: "999px",
                    minHeight: "30px",
                    minWidth: "80px",
                    px: 3,
                    fontWeight: 500,
                    color: "#ffffff", // màu chữ mặc định
                    backgroundColor: "transparent",
                    transition: "0.3s",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#00c853", // màu nền khi selected
                    color: "#ffffff", // màu chữ khi selected
                    fontWeight: 600,
                  },
                  "& .MuiTabs-flexContainer": {
                    color: "#ffffff", // có thể bỏ nếu không cầnn
                  },
                }}
              >
                <Tab
                  label={t("SafeBox.tab1")}
                  {...a11yProps(0)}
                  sx={{
                    color: "white",
                    "&.Mui-selected": {
                      backgroundColor: "#00c853",
                      color: "white",
                      fontWeight: 600,
                    },
                  }}
                />
                <Tab
                  label={t("SafeBox.tab2")}
                  {...a11yProps(1)}
                  sx={{
                    color: "white",
                    "&.Mui-selected": {
                      backgroundColor: "#fcd534",
                      color: "black",
                      fontWeight: 600,
                    },
                  }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <SafeVND />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SafeUSDT />
            </CustomTabPanel>
          </Box>
        ) : (
          <Box
            sx={{
              width: {
                xs: "90%",
                sm: "55%",
              },
              textAlign: "center",
              boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.24)",
              borderRadius: "15px",
              height: "400px",
              margin: "0 auto",
              display: "grid",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                {t("DepositWithdrawPage.log_title")}
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "20px", fontWeight: 600 }}
              >
                {t("DepositWithdrawPage.log_note")}
              </Typography>
              <Button
                type="button"
                href="/login"
                sx={{
                  background: "#fff",
                  color: "black",
                  width: "250px",
                  height: "45px",
                  borderRadius: "15px",
                  marginTop: "20px",
                  fontWeight: 600,
                  "&:hover": {
                    background: "#fff",
                  },
                }}
              >
                {t("HomePage.mobile_login")}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
