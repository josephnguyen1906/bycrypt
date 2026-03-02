"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import "./Home.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/Loading";
import swal from "sweetalert";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Dialog,
  Drawer,
  IconButton,
  Menu,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import useAuth from "@/hook/useAuth";
import TradingViewHotlists from "@/components/ChartView/TradingViewHotlists";
import {
  CoinIcon,
  InternetIcon,
  SearchIcon,
  UserIcon,
} from "@/shared/Svgs/Svg.component";
import { CloseOutlined, Search } from "@mui/icons-material";
import { formatCurrency } from "@/utils/formatMoney";
import { getWebsiteConfig } from "@/services/User.service";
import { useTranslation } from "react-i18next";
import CoinPage from "@/components/coins/CoinPage";
import LanguageSwitcher from "@/components/Language/LanguageSwitcher";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { user, loading } = useAuth();

  const [langAnchorEl, setLangAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const isLangMenuOpen = Boolean(langAnchorEl);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickLang = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [websiteConfig, setWebsiteConfig] = useState<any>(null);
  const route = useRouter();
  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };
  useEffect(() => {
    const referral = async () => {
      try {
        const buySellConfig: any = await getWebsiteConfig();
        if (buySellConfig) {
          setWebsiteConfig(buySellConfig.data);
        }

        const hasShownPopup = sessionStorage.getItem("popupShown");
      } catch (errors: any) {
        // toast.error(errors?.message);
      }
    };

    if (!loading) {
      referral();
    }
  }, [user, loading]);

  return (
    <div className="home">
      <div className="home-mobile">
        <Box>
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
            <IconButton>
              <UserIcon width="30px" height="30px" />
            </IconButton>
            <Tooltip title="Language">
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickLang}
              >
                <InternetIcon width="30px" height="30px" />
              </IconButton>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                width: "120px",
              }}
            >
              <LanguageSwitcher onLanguageChange={handleClose} />
            </Menu>
          </Box>
          <Box
            sx={{
              width: "100%",
              paddingTop: "10px",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1)",
            }}
          >
            <Image
              src={"/images/banner.jpg"}
              width={368}
              height={212}
              alt=""
              style={{
                width: "90%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              mt: 3,
              alignItems: "flex-start",
            }}
          >
            {[
              {
                key: "service",
                icon: "/images/icon-service.png",
                link: "#",
              },
              {
                key: "verified",
                icon: "/images/verified.png",
                link: "#",
              },
              {
                key: "recharge",
                icon: "/images/recharge.png",
                link: "#",
              },
              {
                key: "regulatory",
                icon: "/images/wallet.png",
                link: "#",
              },
              { key: "loan", icon: "/images/loan.png", link: "#" },
            ].map((item) => (
              <Box
                key={item.key}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
                onClick={() => {
                  if (item.link === "#") {
                    swal("Notice", "This feature is coming soon!", "info");
                  } else {
                    route.push(item.link);
                  }
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    border: "1px solid #22b65a",
                    background: "#1f2937",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image src={item.icon} width={25} height={25} alt="" />
                </Box>

                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "white",
                    textAlign: "center",
                    px: 1,
                    lineHeight: 1.2,
                    wordBreak: "break-word",
                  }}
                >
                  {t(`HomePage.${item.key}`)}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ width: "100%", margin: "auto" }}>
            <CoinPage />
          </Box>
          <Box sx={{ width: "90%", margin: "20px auto" }}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
              }}
            >
              About Us
            </Typography>
            <Typography variant="body1" sx={{ color: "white", mt: "15px" }}>
              We are a leading trading platform dedicated to providing safe,
              efficient and reliable digital asset trading services. Our mission
              is to provide advanced cryptocurrency trading experiences to
              global users and promote the development and innovation of the
              digital asset market.
            </Typography>
            <Image
              src={"./images/about-us.jpg"}
              width={340}
              height={340}
              alt="l"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                margin: "15px 0px",
                borderRadius: "20px",
              }}
            />
            <Typography
              variant="body1"
              sx={{ color: "white", mt: "15px", pb: "100px" }}
            >
              In the field of digital currency, we are committed to becoming a
              leading innovator and industry benchmark. Our vision is to build a
              world-leading digital asset trading platform through technological
              innovation and service excellence, providing users with the best
              trading experience and the most comprehensive selection of digital
              assets.
            </Typography>
          </Box>
        </Box>

        <Dialog
          open={isLangMenuOpen}
          onClose={handleLangMenuClose}
          PaperProps={{
            style: {
              width: "80%",
              backgroundColor: "#909090",
              color: "#fff",
              borderRadius: "8px",
              marginTop: "10%",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              background: "#909090",
              color: "#fff",
              height: "200px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "200px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Select language
              </Typography>
            </Box>
          </Box>
        </Dialog>
      </div>
    </div>
  );
}
