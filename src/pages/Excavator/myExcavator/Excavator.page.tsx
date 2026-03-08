"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Stack,
  Chip,
  Button,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Menu,
} from "@mui/material";
import {
  getMyStaking,
  getNormalmin,
  getOrepool,
  getStaking,
} from "@/services/User.service";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  IMyOrepool,
  IMyStaking,
  IOrepool,
  IOrepoolIterm,
  IStaking,
} from "@/shared/interfaces";
import InvestPopup from "@/components/popup/InvestPopup";
import StakingPopup from "@/components/popup/StakingPopup";
import {
  InternetIcon,
  NotFoundIcon,
  UserIcon,
} from "@/shared/Svgs/Svg.component";
import LanguageSwitcher from "@/components/Language/LanguageSwitcher";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "@/utils/formatDateTime";

export default function MyExcavatorPage() {
  const [tab, setTab] = useState(0);
  const [miningData, setMiningData] = useState<IMyOrepool[]>([]);
  const [stakingData, setStakingData] = useState<IMyStaking[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    fetchData();
    fetchStakingData();
  }, []);

  const fetchData = async () => {
    const res: any = await getNormalmin();
    if (res.status) setMiningData(res.data);
  };

  const fetchStakingData = async () => {
    setLoading(true);
    const res: any = await getMyStaking();
    if (res.status) setStakingData(res.data);
    setLoading(false);
  };

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Box
      sx={{
        maxWidth: "768px",
        margin: "auto",
        minHeight: "100vh",
        background: "#111827",

        pb: "130px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={3}
        p={2}
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
      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        textColor="inherit"
        TabIndicatorProps={{
          style: { background: "#1ED760" },
        }}
        sx={{
          mb: 2,
          "& .MuiTab-root": {
            color: "#9aa4b2",
            fontWeight: 600,
            width: "50%",
            background: "#1f2937",
            textTransform: "capitalize",
          },
          "& .Mui-selected": {
            color: "#fff",
          },
        }}
      >
        <Tab label={t("MiningPage.title3")} />
        <Tab label={t("MiningPage.title4")} />
      </Tabs>

      <Stack spacing={2} pb={20} p={2}>
        {/* Tab 0 */}
        {tab === 0 && miningData && miningData.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {miningData.map((item: IMyOrepool, index: number) => (
              <Box
                key={index}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(45% - 20px)",
                  },
                  background: "#1f2937",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={item.imgs}
                  alt={item.kjtitle}
                  style={{
                    width: "100px",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: "10px",
                      color: "#fff",
                      fontSize: "16px",
                    }}
                  >
                    {item.kjtitle}
                  </Typography>
                  <Typography
                    sx={{
                      paddingTop: "5px",
                      fontSize: "10px",
                      color: "#666",
                      paddingBottom: "10px",
                    }}
                  >
                    {t("MiningPage.type")}:{" "}
                    {item.type === 1
                      ? t("MiningPage.type2")
                      : t("MiningPage.type3")}
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "10px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "10px" }}
                    >
                      {t("HistoryPage.cycle")}: {item.cycle}{" "}
                      {t("MiningPage.day")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "10px" }}
                    >
                      {t("HistoryPage.rate")}: {item.sharebl || 0} %
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "10px" }}
                    >
                      {t("HistoryPage.Revenue")}: {item.synum}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "10px" }}
                    >
                      {t("HistoryPage.status")} :{" "}
                      {item.type === 1
                        ? t("HistoryPage.mining1")
                        : item.type === 2
                          ? t("HistoryPage.mining2")
                          : t("HistoryPage.mining3")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "10px" }}
                    >
                      {t("HistoryPage.Output")} : {item.outcoin}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "10px" }}
                    >
                      {t("HistoryPage.Produce")}: {item.outnum} coin
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "10px" }}
                    >
                      {t("HistoryPage.Produce")}: {item.outusdt} usdt
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "10px" }}
                    >
                      {t("HistoryPage.Freeze")}:{" "}
                      {item.djout === 1 ? "No" : "Yes"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {tab === 1 && stakingData && stakingData.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {stakingData.map((item, index: number) => (
              <Box
                key={index}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 20px)",
                  },
                  background: "#1f2937",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ marginTop: "10px", color: "#fff" }}
                  >
                    {item.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "10px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "14px" }}
                    >
                      {t("HistoryPage.Purchase")}: {item.num}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "14px" }}
                    >
                      {t("HistoryPage.Amount")}: {item.percent}%
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "14px" }}
                    >
                      {t("HistoryPage.Add_time")}:{" "}
                      {formatDateTime(item.addtime)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "14px" }}
                    >
                      {t("HistoryPage.End_time")}:{" "}
                      {formatDateTime(item.endtime)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "14px" }}
                    >
                      {t("HistoryPage.End_day")}: {formatDateTime(item.endday)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#666", fontSize: "14px" }}
                    >
                      {t("HistoryPage.status")}:{" "}
                      {item.status === 1
                        ? t("HistoryPage.staking_status1")
                        : t("HistoryPage.staking_status2")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {miningData.length == 0 ||
          (stakingData.length == 0 && (
            <Box sx={{ width: "100%", textAlign: "center", padding: "20px" }}>
              <NotFoundIcon width="30px" height="30px" fill="white" />
            </Box>
          ))}
      </Stack>
    </Box>
  );
}
