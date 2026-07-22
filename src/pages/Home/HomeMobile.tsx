import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationBell from "@/components/popup/NotificationBell";
import { getOrepool, getWebsiteConfig } from "@/services/User.service";
import { IOrepool, IUser } from "@/shared/interfaces";
import {
  InternetIcon,
  ShareIcon,
  SquareIcon,
  UserIcon,
} from "@/shared/Svgs/Svg.component";
import {
  Box,
  Button,
  Container,
  Dialog,
  Grid,
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
import {
  listAdvantage2,
  listAdvantages,
  ListPartner,
  slideImg,
} from "@/datafake/slide";
import PoolList from "./PoolList";
import CoinTicker from "@/components/CoinTicker/CoinTicker";
import { COINS, MONEYCOIN, news } from "@/datafake/home";
import NewsCard from "./NewCard";
import HeaderMobile from "@/components/PrimaryLayout/HeaderMobile";
import AccountDrawer from "@/components/subMenu/AccountDrawer";

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
  const [open, setOpen] = useState(false);
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
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pb: "100px",
      }}
    >
      <Box>
        <HeaderMobile user={user} onClick={() => setOpen(true)} />

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
          <PoolList pools={stakingData?.overview ?? []} user={user} />

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
          <Box
            sx={{
              py: 3,
            }}
          >
            <Grid container spacing={2}>
              {news.map((item) => (
                <Grid
                  size={{
                    xs: 12,
                    md: 12,
                  }}
                  key={item.id}
                >
                  <NewsCard news={item} />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            justifyContent={"center"}
          >
            <Typography
              sx={{ fontSize: 18, color: "white", textAlign: "center" }}
            >
              {t("HomePage.title9")}
            </Typography>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 600,
                color: "white",
                textAlign: "center",
              }}
            >
              {t("HomePage.title10")}
            </Typography>
            <Image
              src={"/images/imac-show-3bc75d79.png"}
              width={1000}
              height={200}
              alt=""
              style={{
                width: "100%",
                height: "222px",
                objectFit: "contain",
              }}
            />
            <Typography
              sx={{
                fontSize: 25,
                fontWeight: 600,
                color: "white",
                textAlign: "center",
                mt: 3,
              }}
            >
              {t("HomePage.title11")}
            </Typography>
            <Image
              src={"/images/processor-ecd8315e.png"}
              width={1000}
              height={200}
              alt=""
              style={{
                width: "100%",
                height: "222px",
                objectFit: "contain",
              }}
            />
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 500,
                color: "white",
                textAlign: "center",
                width: 300,
                margin: "auto",
              }}
            >
              {t("HomePage.title12")}
            </Typography>
            <Image
              src={"/images/server-de4179a5.png"}
              width={1000}
              height={200}
              alt=""
              style={{
                width: "100%",
                height: "222px",
                objectFit: "contain",
              }}
            />

            <Box display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <SquareIcon />
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  {t(`HomePage.title13`)}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: "white",
                fontSize: 13,
              }}
            >
              {t(`HomePage.title14`)}
            </Typography>

            <Box
              sx={{
                bgcolor: "#1A1B24",
                borderRadius: "8px",
                padding: "10px",
                px: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                {t(`HomePage.title15`)}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                52310.48K USDT
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontSize: 16,
                }}
              >
                $ 52,314,791.00
              </Typography>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box sx={{ display: "flex", flexDirection: "column", pt: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "white",
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    1,230
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#888",
                      fontSize: 13,
                    }}
                  >
                    {t(`HomePage.title16`)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "white",
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    1,077
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#888",
                      fontSize: 13,
                    }}
                  >
                    {t(`HomePage.title17`)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "white",
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    185 {t(`HomePage.title18`)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#888",
                      fontSize: 13,
                    }}
                  >
                    {t(`HomePage.title19`)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={2}
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
                  {t(`HomePage.title20`)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {listAdvantages?.map((e) => (
                <Box
                  key={e.id}
                  sx={{
                    display: "flex",
                    gap: "20px",
                    padding: "10px",
                    alignItems: "center",
                    background: "#1A1B24",
                    borderRadius: "8px",
                  }}
                >
                  <Box sx={{ width: 50, height: 50 }}> {e.icon}</Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <Typography
                      sx={{ color: "white", fontSize: 16, fontWeight: 550 }}
                    >
                      {t(e.title)}
                    </Typography>
                    <Typography
                      sx={{ color: "#888", fontSize: 12, fontWeight: 400 }}
                    >
                      {t(e.note)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={2}
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
                  {t(`HomePage.title24`)}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: "white",
                fontSize: 13,
              }}
            >
              {t(`HomePage.title25`)}
            </Typography>
            <Box display={"flex"} flexWrap={"wrap"} gap={"10px 30px"}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: 13,
                }}
              >
                #{t(`HomePage.title26`)}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: 13,
                }}
              >
                #{t(`HomePage.title27`)}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: 13,
                }}
              >
                #{t(`HomePage.title28`)}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: 13,
                }}
              >
                #{t(`HomePage.title29`)}
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: 13,
                }}
              >
                #{t(`HomePage.title30`)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                mt: 2,
              }}
            >
              {listAdvantage2?.map((e) => (
                <Box
                  key={e.id}
                  sx={{
                    display: "flex",
                    gap: "20px",
                    padding: "15px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#1A1B24",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontSize: 16, fontWeight: 550 }}
                  >
                    {t(e.title)}
                  </Typography>
                  <ShareIcon />
                </Box>
              ))}
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={2}
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
                  {t(`HomePage.title34`)}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
                mt: 2,
              }}
            >
              {ListPartner?.map((e) => (
                <Box key={e.id}>
                  <Image
                    src={e.img}
                    width={1000}
                    height={47}
                    alt=""
                    style={{
                      width: "130px",
                      height: "47px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ color: "#a6a6a6", fontSize: 12, fontWeight: 500 }}
              >
                Copyright@2023 NFT by-crypto.top
              </Typography>
              <Typography
                sx={{ color: "#a6a6a6", fontSize: 12, fontWeight: 500 }}
              >
                {t("HomePage.title35")}
              </Typography>
              <Typography
                sx={{ color: "#a6a6a6", fontSize: 12, fontWeight: 500 }}
              >
                support@bycrypto.site
              </Typography>
              <Box display={"flex"} gap={"10px"} mt={2}>
                <Image
                  src={"/images/icon-x.png"}
                  width={40}
                  height={40}
                  alt=""
                  style={{ height: "40px", objectFit: "cover" }}
                />
                <Image
                  src={"/images/Facebook-2115e38a.svg"}
                  width={40}
                  height={40}
                  alt=""
                  style={{ height: "40px", objectFit: "cover" }}
                />
              </Box>
            </Box>
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

      <AccountDrawer onClose={() => setOpen(false)} open={open} />
    </Box>
  );
}
