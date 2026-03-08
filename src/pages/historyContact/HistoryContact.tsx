"use client";
import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getContractjc } from "@/services/User.service";
import CommandOpen from "../Contact/CommandOpen";
import CommandClose from "../Contact/CommandClose";
import { useUserStore } from "@/stores/useUserStore";

export default function HistoryContact() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
  const [history, setHisstory] = useState<any>(null);
  const [tab, setTab] = useState("BUY");
  const [value, setValue] = useState("one");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  useEffect(() => {
    historyOpen();
  }, []);

  const historyOpen = async () => {
    try {
      const his: any = await getContractjc();
      if (his.status === true) {
        setHisstory(his.data);
      }
    } catch (errors: any) {
      console.log(errors?.message);
    }
  };
  return (
    <Box
      sx={{
        maxWidth: "768px",
        margin: "auto",
        minHeight: "100vh",
        background: "#111827",
        p: 2,
        pb: "130px",
      }}
    >
      {" "}
      <Box
        display="flex"
        alignItems="center"
        mb={3}
        gap={"10px"}
        justifyContent={"space-between"}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{ background: "#232932" }}
        >
          <ArrowBackIosNewIcon
            sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
          />
        </IconButton>
      </Box>
      {user && (
        <>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            TabIndicatorProps={{
              sx: {
                backgroundColor: "#34d399",
                height: 2,
              },
            }}
            sx={{
              "& .MuiTab-root": {
                color: "#9ca3af",
                textTransform: "capitalize",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#34d399",
              },
            }}
          >
            <Tab value="one" label={t("BuySellPage.transaction")} wrapped />
            <Tab value="two" label={t("BuySellPage.Position")} />
          </Tabs>
          {value == "one" && <CommandOpen user={user} history={history} />}
          {value == "two" && <CommandClose user={user} />}
        </>
      )}
    </Box>
  );
}
