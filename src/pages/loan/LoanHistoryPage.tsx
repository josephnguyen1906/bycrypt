"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { CustomTabPanel } from "@/components/Tabs/TabComponent";
import Image from "next/image";

const LoanHistoryPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "448px",
        },
        minHeight: "100vh",
        mx: "auto",
        bgcolor: "#0E0F18",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          height: "54px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #20232E",
        }}
      >
        {/* Back */}
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "80px",
            height: "80px",
            color: "#fff",
            p: 0,
          }}
        >
          <ArrowBackIosNewIcon
            sx={{
              fontSize: "23px",
            }}
          />
        </IconButton>

        {/* Title */}
        <Typography
          sx={{
            color: "#fff",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {t("loan.history.title")}
        </Typography>
      </Box>

      {/* ================= TABS ================= */}
      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid #20232E",
          overflow: "hidden",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: "24px",
              padding: "10px",
            },

            "& .MuiTab-root": {
              minWidth: "auto",
              px: 0,
              color: "#9295A3",
              fontSize: "14px",
              textTransform: "none",
              whiteSpace: "nowrap",
            },

            "& .MuiTab-root.Mui-selected": {
              color: "#00B900",
              border: "1px solid #00B900",
              borderRadius: "20px",
              px: "20px",
              py: "5px",
            },

            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab label={t("loan.history.tabs.all")} />

          <Tab label={t("loan.history.tabs.pending")} />

          <Tab label={t("loan.history.tabs.failed")} />
        </Tabs>
      </Box>

      {/* ================= CONTENT ================= */}
      <Box
        sx={{
          px: "14px",
        }}
      >
        <CustomTabPanel value={tab} index={0}>
          <Box
            sx={{
              minHeight: "122px",
              py: "18px",
              borderBottom: "1px solid #2D303A",
            }}
          >
            {/* Top row */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Amount */}
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {t("loan.history.amount")}:{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#00D68F",
                  }}
                >
                  +200000 USDT
                </Box>
              </Typography>

              {/* Status */}
              <Button
                variant="contained"
                disableElevation
                sx={{
                  minWidth: "174px",
                  height: "36px",
                  px: "12px",
                  bgcolor: "#C2A92E",
                  color: "#fff",
                  borderRadius: "5px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  whiteSpace: "nowrap",

                  "&:hover": {
                    bgcolor: "#C2A92E",
                  },
                }}
              >
                {t("loan.history.pending")}
              </Button>
            </Box>

            {/* Note */}
            <Typography
              sx={{
                mt: "5px",
                color: "#fff",
                fontSize: "15px",
                lineHeight: "24px",
              }}
            >
              {t("loan.history.note")}
            </Typography>

            {/* Detail */}
            <Button
              variant="contained"
              disableElevation
              onClick={() => router.push("/loan/history/detail")}
              sx={{
                display: "block",
                width: "174px",
                height: "36px",
                ml: "auto",
                mt: "-3px",
                bgcolor: "#08A5E5",
                color: "#fff",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",

                "&:hover": {
                  bgcolor: "#08A5E5",
                },
              }}
            >
              {t("loan.history.detail")}
            </Button>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              pt: "100px",
            }}
          >
            <Image
              src={"/images/noData-7d35fd7d.png"}
              width={80}
              height={80}
              alt=""
            />
            <Typography sx={{ color: "#868D9A", fontSize: 14 }}>
              {t("HistoryPage.title2")}
            </Typography>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2}>
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              pt: "100px",
            }}
          >
            <Image
              src={"/images/noData-7d35fd7d.png"}
              width={80}
              height={80}
              alt=""
            />
            <Typography sx={{ color: "#868D9A", fontSize: 14 }}>
              {t("HistoryPage.title2")}
            </Typography>
          </Box>
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default LoanHistoryPage;
