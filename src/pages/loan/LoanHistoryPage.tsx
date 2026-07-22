"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { CustomTabPanel } from "@/components/Tabs/TabComponent";
import Image from "next/image";
import LoadingComponent from "@/components/Loading";
import { getLoanHistory, type LoanItem } from "@/services/Loan.service";

const STATUS_BY_TAB = ["all", "pending", "rejected"] as const;

const statusLabelKey = (status: string) => {
  switch (status) {
    case "pending":
      return "loan.history.pending";
    case "rejected":
      return "loan.history.failed";
    case "active":
      return "loan.history.active";
    case "repaid":
      return "loan.history.repaid";
    case "overdue":
      return "loan.history.overdue";
    default:
      return "loan.history.pending";
  }
};

const statusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "#C2A92E";
    case "rejected":
      return "#FF4B57";
    case "active":
      return "#08A5E5";
    case "repaid":
      return "#00B900";
    case "overdue":
      return "#FF4B57";
    default:
      return "#C2A92E";
  }
};

const LoanHistoryPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [items, setItems] = useState<LoanItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const status = STATUS_BY_TAB[tab] ?? "all";
        const res: any = await getLoanHistory(status);
        if (!cancelled) setItems(res.data ?? []);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tab]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const empty = (
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
  );

  const list = loading ? (
    <LoadingComponent />
  ) : items.length === 0 ? (
    empty
  ) : (
    items.map((loan) => (
      <Box
        key={loan.id}
        sx={{
          minHeight: "122px",
          py: "18px",
          borderBottom: "1px solid #2D303A",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {t("loan.history.amount")}:{" "}
            <Box component="span" sx={{ color: "#00D68F" }}>
              +{Number(loan.amount).toLocaleString()} {loan.currency}
            </Box>
          </Typography>

          <Button
            variant="contained"
            disableElevation
            sx={{
              minWidth: "120px",
              height: "36px",
              px: "12px",
              bgcolor: statusColor(loan.status),
              color: "#fff",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: statusColor(loan.status) },
            }}
          >
            {t(statusLabelKey(loan.status), { defaultValue: loan.status })}
          </Button>
        </Box>

        <Typography
          sx={{
            mt: "5px",
            color: "#fff",
            fontSize: "15px",
            lineHeight: "24px",
          }}
        >
          {t("loan.history.note")}
          {loan.note ? `: ${loan.note}` : ""}
        </Typography>

        <Button
          variant="contained"
          disableElevation
          onClick={() => router.push(`/loan/history/${loan.id}`)}
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
            "&:hover": { bgcolor: "#08A5E5" },
          }}
        >
          {t("loan.history.detail")}
        </Button>
      </Box>
    ))
  );

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
          <ArrowBackIosNewIcon sx={{ fontSize: "23px" }} />
        </IconButton>

        <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 600 }}>
          {t("loan.history.title")}
        </Typography>
      </Box>

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

      <Box sx={{ px: "14px" }}>
        <CustomTabPanel value={tab} index={0}>
          {list}
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          {list}
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2}>
          {list}
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default LoanHistoryPage;
