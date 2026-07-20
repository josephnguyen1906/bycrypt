"use client";

import { useState } from "react";
import { Box, Tab, Tabs, Typography, Stack, Chip, Button } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function BottomTabs() {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  return (
    <Box
      sx={{
        mt: 2,
        bgcolor: "#10131C",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.05)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          variant="fullWidth"
          sx={{
            bgcolor: "#1A1D27",
            p: "4px",
            borderRadius: "8px",

            "& .MuiTabs-indicator": {
              display: "none",
            },

            "& .MuiTab-root": {
              color: "#8D93A6",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "6px",
              minHeight: 32,
              width: 120,
            },

            "& .MuiTab-root.Mui-selected": {
              bgcolor: "#00A609",
              color: "#fff",
            },
          }}
        >
          <Tab label={t("TradePage.tab1")} />
          <Tab label={t("TradePage.tab2")} />
        </Tabs>
        <Button sx={{ width: 39 }}>
          <Image
            src={"/images/icon-history.png"}
            width={39}
            height={22}
            alt=""
            style={{ objectFit: "contain" }}
          />
        </Button>
      </Box>
      <Box
        sx={{
          minHeight: 180,
          p: 2,
        }}
      >
        {tab === 0 && (
          <Stack spacing={2}>
            <Box
              sx={{
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <Typography color="#666">{t("TradePage.noti1")}</Typography>
            </Box>
          </Stack>
        )}

        {tab === 1 && (
          <Stack spacing={2}>
            <Box
              sx={{
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <Typography color="#666">{t("TradePage.noti2")}</Typography>
            </Box>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
