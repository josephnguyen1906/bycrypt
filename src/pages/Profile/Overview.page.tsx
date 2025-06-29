"use client";
import MarketDataWidget from "@/components/ChartView/MarketDataWidget";
import MarketDataWidget2 from "@/components/ChartView/MarketDataWidget2";
import TradingViewHotlists from "@/components/ChartView/TradingViewHotlists";
import useAuth from "@/hook/useAuth";
import { getMyWallet, getNotification } from "@/services/User.service";
import {
  ProfileIcon,
  UserIcon,
  VerifiedIcon,
  WarningIcon,
} from "@/shared/Svgs/Svg.component";
import { formatDateTime } from "@/utils/formatDateTime";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Divider,
  styled,
  Avatar,
} from "@mui/material";
import { log } from "console";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const CryptoTable = styled("div")({
  "& table": {
    width: "100%",
    borderCollapse: "collapse",
  },
  "& th, & td": {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
});

export default function OverviewPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [noti, setNoti] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    const notiData = async () => {
      try {
        const res: any = await getNotification();
        const wallet: any = await getMyWallet();
        if (res.status === true) {
          setNoti(res.data);
          setLoading(false);
        }
        setWallet(wallet.data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    };
    notiData();
  }, []);
  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Box
        sx={{
          padding: 2,
          width: {
            xs: "100%",
            sm: "80%",
          },
          margin: "0 auto",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "flex",
            },
            alignItems: "center",
            gap: 2, // Space between elements
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 3,
                sm: 2,
              },
              paddingBottom: {
                xs: "10px",
                sm: "0px",
              },
            }}
          >
            <Avatar
              src={user?.username} // Replace with actual profile image path
              alt={user?.username}
              sx={{
                width: {
                  xs: 50,
                  sm: 80,
                },
                height: {
                  xs: 50,
                  sm: 80,
                },
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                borderRight: {
                  xs: "none",
                  sm: "1px solid #ccc",
                },
                paddingRight: 2,
                marginRight: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "25px",
                  },
                  color: "#fff",
                }}
              >
                {user?.username}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "18px",
                  },
                  color: "lightgrey",
                }}
              >
                {user?.phone}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "grid",
                },
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Email
              </Typography>
              <Typography sx={{ color: "#fff" }}>{user?.username} </Typography>
            </Box>
            <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                {t("ProfilePage.Identity")}
              </Typography>
              {user?.rzstatus === 0 ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",

                    gap: "5px",
                  }}
                >
                  <WarningIcon /> {t("ProfilePage.Identity1")}
                </Typography>
              ) : user?.rzstatus === 1 ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",

                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <WarningIcon /> {t("ProfilePage.Identity2")}
                </Typography>
              ) : user?.rzstatus === 2 ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",

                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <VerifiedIcon /> {t("ProfilePage.Identity3")}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",

                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <WarningIcon /> {t("ProfilePage.Identity4")}
                </Typography>
              )}
            </Box>
            {/* <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                {t("ProfilePage.country")}
              </Typography>
              <Typography sx={{ color: "#fff" }}>{user?.addr} </Typography>
            </Box> */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "grid",
                },
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                {t("ProfilePage.Trading")}
              </Typography>
              <Typography sx={{ color: "#fff" }}>
                {t("ProfilePage.Regular")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {/* Left Section */}
          <Grid item xs={12} sm={8}>
            {user && user.rzstatus === 2 ? (
              <StyledPaper
                sx={{
                  display: "grid",
                  gap: 1,
                  background: "#000",
                  border: "1px solid gray",
                }}
              >
                <Typography
                  sx={{ fontSize: "25px", fontWeight: "bold", color: "#fff" }}
                >
                  {t("ProfilePage.balance")}
                </Typography>
                <Typography sx={{ color: "#fff", fontSize: "15px" }}>
                  {t("ProfilePage.balance_note")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {parseFloat(user.balance.usdt).toLocaleString()} USDT
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {parseFloat(user.balance.pi).toLocaleString()} Pi
                  </Typography>
                </Box>
              </StyledPaper>
            ) : (
              <StyledPaper
                sx={{
                  display: "grid",
                  gap: 2,
                  background: "#000",
                  border: "1px solid gray",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontSize: "30px", fontWeight: "bold", color: "#fff" }}
                >
                  {t("ProfilePage.verified")}
                </Typography>
                <Typography sx={{ color: "#fff" }}>
                  {t("ProfilePage.your_ID")}
                </Typography>
                <Button
                  type="button"
                  sx={{
                    mt: 1,
                    backgroundColor: "#fff",
                    color: "#000",
                    borderRadius: "20px",
                    width: "150px",
                    height: "50px",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                  }}
                  href="/verified"
                >
                  {t("ProfilePage.button_verified")}
                </Button>
              </StyledPaper>
            )}
            <StyledPaper
              sx={{ mt: 2, background: "#000", border: "1px solid gray" }}
            >
              <Typography
                variant="h4"
                sx={{ fontSize: "25px", fontWeight: "bold", color: "#fff" }}
              >
                {t("ProfilePage.today")}
              </Typography>
              <Box sx={{ overflowX: "auto", background: "#000" }}>
                {/* <MarketDataWidget2 width={750} height={450} theme="dark" /> */}
                <TradingViewHotlists />
              </Box>
            </StyledPaper>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} sm={4}>
            <StyledPaper
              sx={{
                display: "grid",
                gap: 2,
                background: "#000",
                border: "1px solid gray",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontSize: "28px", fontWeight: "bold", color: "#fff" }}
              >
                {t("ProfilePage.noti")}
              </Typography>
              {noti &&
                noti?.notices.map((announcement: any, index: number) => (
                  <Box key={index}>
                    {/* <Divider sx={{ my: 1 }} /> */}
                    <Box
                      sx={{
                        padding: "10px 0px",
                        borderTop: "1px solid gray",
                      }}
                    >
                      <Typography variant="body2" color="white">
                        {formatDateTime(announcement.addtime)}
                      </Typography>
                      <Typography variant="body2" color="white">
                        {announcement.title}
                      </Typography>
                      <Typography
                        color="gray"
                        sx={{ fontSize: "14px", fontWeight: "400" }}
                      >
                        {announcement.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
