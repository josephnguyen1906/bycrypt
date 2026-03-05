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
import { getOrepool, getStaking } from "@/services/User.service";
import { IOrepool, IOrepoolIterm, IStaking } from "@/shared/interfaces";
import InvestPopup from "@/components/popup/InvestPopup";
import StakingPopup from "@/components/popup/StakingPopup";
import { InternetIcon, UserIcon } from "@/shared/Svgs/Svg.component";
import LanguageSwitcher from "@/components/Language/LanguageSwitcher";
import { useRouter } from "next/navigation";

export default function ExcavatorPage() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openSt, setOpenST] = useState<boolean>(false);
  const [mining, setMining] = useState<IOrepoolIterm | null>(null);
  const [miningData, setMiningData] = useState<IOrepool | null>(null);
  const [stakingData, setStakingData] = useState<IStaking[] | null>(null);
  const [staking, setStaking] = useState<IStaking | null>(null);

  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const isLangMenuOpen = Boolean(langAnchorEl);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openA = Boolean(anchorEl);
  const handleClickLang = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const route = useRouter();
  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };

  useEffect(() => {
    fetchData();
    fetchStakingData();
  }, []);

  const fetchData = async () => {
    const res: any = await getOrepool();
    if (res.status) setMiningData(res.data);
  };

  const fetchStakingData = async () => {
    const res: any = await getStaking();
    if (res.status) setStakingData(res.data);
  };

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const renderCard = (item: IOrepoolIterm) => {
    const percent = (item.sellnum / item.allnum) * 100;
    const remaining = 100 - percent;

    return (
      <Box
        key={item.id}
        sx={{
          background: "#1f2937",
          borderRadius: "14px",
          p: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography color="white" fontWeight="bold" fontSize={"12px"}>
            {item.title}
          </Typography>

          <Stack direction="row" spacing={0.5}>
            <Chip
              label="In progress"
              size="small"
              sx={{
                background: "#1ED760",
                color: "#000",
                fontWeight: 600,
                fontSize: "11px",
              }}
            />

            <Button
              size="small"
              sx={{
                background: "#1ED760",
                color: "#000",
                fontSize: "11px",
                textTransform: "none",
                width: "135px",
                "&:hover": { background: "#17c653" },
              }}
              onClick={() => {
                setMining(item);
                setOpen(true);
              }}
            >
              Participate in activities
            </Button>
          </Stack>
        </Stack>

        <Typography fontSize={13} color="#cbd5e1" mb={1}>
          {item.sellnum.toLocaleString()} {item.pricecoin} /{" "}
          {item.allnum.toLocaleString()} {item.pricecoin} Remaining:{" "}
          {remaining.toFixed(2)}%
        </Typography>

        <LinearProgress
          variant="determinate"
          value={percent}
          sx={{
            height: 8,
            borderRadius: 10,
            background: "#2a3b52",
            "& .MuiLinearProgress-bar": {
              background: "#1ED760",
            },
          }}
        />

        <Typography fontSize={12} color="#9aa4b2" mt={0.5}>
          {percent.toFixed(2)}%
        </Typography>
      </Box>
    );
  };

  const handleCLose = () => {
    fetchData();
  };

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
        sx={{
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          background: "#111827",
        }}
      >
        <IconButton
          onClick={() => {
            route.push("/account");
          }}
        >
          <UserIcon width="20px" height="20px" />
        </IconButton>
        <Tooltip title="Language">
          <IconButton
            aria-controls={openA ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openA ? "true" : undefined}
            onClick={handleClickLang}
          >
            <InternetIcon width="30px" height="30px" />
          </IconButton>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openA}
          onClose={handleClose}
          sx={{
            width: "120px",
          }}
        >
          <LanguageSwitcher onLanguageChange={handleClose} />
        </Menu>
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
        <Tab label="AI & Mining" />
        <Tab label="IEO Launchpad" />
      </Tabs>

      <Typography fontSize={13} color="#9aa4b2" mb={2} p={2}>
        Our advanced AI supercomputing investment products can help you achieve
        stable profits in the market
      </Typography>

      <Typography fontSize={16} color="white" mb={2} p={2}>
        Featured Products
      </Typography>

      <Stack spacing={2} pb={20} p={2}>
        {/* Tab 0 */}
        {tab === 0 && miningData?.overview?.map((item) => renderCard(item))}

        {/* Tab 1 */}
        {tab === 1 && miningData?.exclusive?.map((item) => renderCard(item))}

        {tab === 0 && stakingData && (
          <Box mt={3} display="flex" flexDirection="column" gap={2}>
            {stakingData.map((item) => (
              <Card
                key={item.id}
                sx={{
                  background: "#1f2937",
                  borderRadius: "16px",
                  color: "white",
                  p: 2,
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {/* Header */}
                  <Box display="flex" gap={2} alignItems="center">
                    <Box
                      component="img"
                      src={item.imgs}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg,#34d399,#3b82f6)",
                        p: 1,
                      }}
                    />

                    <Box>
                      <Typography fontSize="20px" fontWeight="bold">
                        USDT
                      </Typography>

                      <Typography fontSize="14px">
                        Average Daily Return: {item.percent} %
                      </Typography>

                      <Typography fontSize="14px">
                        Minimum Purchase Amount{" "}
                        {Number(item.min).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Purchase button */}
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: "#22c55e",
                      borderRadius: "10px",
                      height: "45px",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      "&:hover": {
                        background: "#16a34a",
                      },
                    }}
                    onClick={() => {
                      setStaking(item);
                      setOpenST(true);
                    }}
                  >
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Stack>
      <InvestPopup
        open={open}
        onClose={() => setOpen(false)}
        data={mining}
        onSubmit={handleCLose}
      />
      <StakingPopup
        open={openSt}
        onClose={() => setOpenST(false)}
        data={staking}
        onSubmit={handleCLose}
      />
    </Box>
  );
}
