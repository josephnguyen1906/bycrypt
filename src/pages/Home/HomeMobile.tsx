import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationBell from "@/components/popup/NotificationBell";
import { getOrepool, getWebsiteConfig } from "@/services/User.service";
import { IOrepool, IUser } from "@/shared/interfaces";
import {
  InternetIcon,
  SquareIcon,
  UserIcon,
} from "@/shared/Svgs/Svg.component";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import Carousel from "react-multi-carousel";
import { slideImg } from "@/datafake/slide";
import PoolList from "./PoolList";
import CoinTicker from "@/components/CoinTicker/CoinTicker";
import { COINS, MONEYCOIN } from "@/datafake/home";

export default function HomeMobile({
  user,
  setting,
}: {
  user: IUser | null;
  setting: any;
}) {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState(0);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const isLangMenuOpen = Boolean(langAnchorEl);
  const [stakingData, setStakingData] = useState<IOrepool>();
  const route = useRouter();

  const fetchStakingData = async () => {
    try {
      const res: any = await getOrepool();

      if (res) {
        setStakingData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStakingData();
  }, []);

  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };
  const coinList = useMemo(() => {
    return tab == 1 ? MONEYCOIN : COINS;
  }, [tab]);
  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",

        pb: "130px",
      }}
    >
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "60px",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            background: "#0E0F18",
          }}
        >
          <Box>
            <Button sx={{ width: 40, height: 40, background: "#0E0F18" }}>
              <MenuIcon sx={{ color: "white" }} />
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <NotificationBell />
            <IconButton
              sx={{ height: "20px" }}
              onClick={() => route.push("/news")}
            >
              <Image
                src={"/images/history-icon.png"}
                width={20}
                height={20}
                alt=""
                style={{ height: "20px", objectFit: "cover" }}
              />
            </IconButton>
            <Tooltip title="Language">
              <IconButton onClick={() => route.push("/language")}>
                <InternetIcon width="20px" height="20px" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box
          sx={{
            width: "95%",
            margin: "auto",
            py: "10px",
          }}
        >
          <Carousel
            arrows={false}
            autoPlay
            infinite
            showDots={false}
            responsive={{
              mobile: {
                breakpoint: {
                  max: 3000,
                  min: 0,
                },
                items: 1,
              },
            }}
          >
            {slideImg.map((item) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "197px",
                    borderRadius: "10px",
                  }}
                >
                  <Image
                    src={item.img}
                    fill
                    alt=""
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              );
            })}
          </Carousel>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ width: "90%", margin: "auto" }}
        >
          <Box display={"flex"} gap={"10px"} alignItems={"center"}>
            <SquareIcon />
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontSize: 20,
              }}
            >
              {t(`HomePage.title1`)}
            </Typography>
          </Box>
          <IconButton sx={{ background: "none", border: "none" }}>
            <ArrowForwardIcon sx={{ color: "white", fontSize: 24 }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: "95%",
            margin: "auto",
            mt: "20px",
          }}
        >
          <Box display={"flex"} justifyContent={"space-between"}></Box>
          <PoolList pools={stakingData?.overview ?? []} />

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "197px",
              borderRadius: "10px",
              mb: 2,
              mt: 1,
            }}
          >
            <Image
              src={"/images/b1-66ebdb3e.jpg"}
              fill
              alt=""
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ width: "90%", margin: "auto" }}
        >
          <Box display={"flex"} gap={"10px"} alignItems={"center"}>
            <SquareIcon />
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontSize: 20,
              }}
            >
              {t(`HomePage.title2`)}
            </Typography>
          </Box>
          <IconButton sx={{ background: "none", border: "none" }}>
            <ArrowForwardIcon sx={{ color: "white", fontSize: 24 }} />
          </IconButton>
        </Box>

        <Box
          sx={{
            width: "95%",
            margin: "auto",
            mt: "20px",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px", mb: "20px" }}>
            <Button
              sx={{
                background: tab == 0 ? "#00A609" : "none",
                fontSize: 14,
                textTransform: "capitalize",
                color: "white",
                borderRadius: 20,
              }}
              onClick={() => setTab(0)}
            >
              {t(`HomePage.menu1`)}
            </Button>
            <Button
              sx={{
                background: tab == 1 ? "#00A609" : "none",
                fontSize: 14,
                textTransform: "capitalize",
                color: "white",
                borderRadius: 20,
              }}
              onClick={() => setTab(1)}
            >
              {t(`HomePage.menu2`)}
            </Button>
            <Button
              sx={{
                background: tab == 2 ? "#00A609" : "none",
                fontSize: 14,
                textTransform: "capitalize",
                color: "white",
                borderRadius: 20,
              }}
              onClick={() => setTab(2)}
            >
              {t(`HomePage.menu2`)}
            </Button>
          </Box>

          <CoinTicker key={tab} listCoin={coinList} tab={tab} />
        </Box>
        <Box
          sx={{
            width: "95%",
            margin: "auto",
            mt: "20px",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{ width: "90%", margin: "auto" }}
          >
            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
              <SquareIcon />
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                {t(`HomePage.title3`)}
              </Typography>
            </Box>
            <IconButton sx={{ background: "none", border: "none" }}>
              <ArrowForwardIcon sx={{ color: "white", fontSize: 24 }} />
            </IconButton>
          </Box>
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
              {t(`HomePage.button`)}
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
