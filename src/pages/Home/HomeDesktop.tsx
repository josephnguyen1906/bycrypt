import CoinPage from "@/components/coins/CoinPage";
import CoinPageDesktop from "@/components/coins/CoinPageDesktop";
import { bannerWeb, dataDashboard } from "@/datafake/home";
import { getWebsiteConfig } from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
import { InternetIcon, UserIcon } from "@/shared/Svgs/Svg.component";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";

export default function HomeDesktop({
  user,
  setting,
}: {
  user: IUser | null;
  setting: any;
}) {
  const { t, i18n } = useTranslation();

  const [langAnchorEl, setLangAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const isLangMenuOpen = Boolean(langAnchorEl);

  const route = useRouter();

  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        margin: "auto",
        minHeight: "100vh",
        background: "#000",
      }}
    >
      <Box
        sx={{
          width: "60%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#000",
          mt: 5,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{ fontSize: "40px", fontWeight: 700, color: "white" }}
          >
            {t("HomePage.title1")}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 3, mb: 3 }}>
            <TextField
              fullWidth
              placeholder={t("SignupPage.value3")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#2B313B",
                  color: "#fff",

                  "& fieldset": {
                    borderColor: "none",
                  },

                  "&:hover fieldset": {
                    borderColor: "none",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#4ade80",
                    borderWidth: "1px",
                  },
                },

                "& .MuiInputBase-input": {
                  color: "#fff",

                  "&::placeholder": {
                    color: "#7c8aa0",
                    opacity: 1,
                  },

                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px #1e2a3a inset",
                    WebkitTextFillColor: "#fff",
                  },
                },
              }}
            />

            <Button
              sx={{
                minWidth: 80,
                borderRadius: "14px",
                background: "#3fd47c",
                color: "#000",
                fontWeight: 600,
                textTransform: "none",
                "&:disabled": {
                  background: "#9aa4b2",
                },
                "&:hover": {
                  background: "#4de000",
                },
              }}
            >
              {t("SignupPage.button3")}
            </Button>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: "white", fontSize: "15px" }}
          >
            {t("HomePage.title2")}
          </Typography>
        </Box>

        <Box>
          <Image
            src={"/images/banner-home.png"}
            width={500}
            height={500}
            alt=""
            style={{ height: "700px", objectFit: "contain" }}
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", background: "#141A1F" }}>
        <Box
          sx={{
            width: "70%",
            height: "100%",
            margin: "0 auto",
            mb: "10px",
            background: "#141A1F",
            textAlign: "center",
          }}
        >
          <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="carousel-container"
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            autoPlay
            arrows={false}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 5,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 2,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {bannerWeb.map((item) => (
              <div key={item.id}>
                <Image
                  src={"/images/" + item.images}
                  width={214}
                  height={107}
                  loading="lazy"
                  alt=""
                  style={{
                    height: "107px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Carousel>
          <Box
            sx={{
              pt: 5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                textAlign: "center",
                fontWeight: 550,
                color: "white",
                fontSize: "25px",
              }}
            >
              {t("HomePage.title4")}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              backgroundImage:
                "linear-gradient(90deg, rgb(0, 188, 255) 0%, rgb(0, 171, 255) 6.66%, rgb(112, 77, 255) 21.88%, rgb(156, 51, 255) 50.9%, rgb(40, 79, 255) 78.01%, rgb(3, 143, 251) 93.23%)",
              borderRadius: "40px",
              padding: "2px 5px",
              margin: "auto",
              mt: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                background: "#141A1F",
                borderRadius: "40px",
                padding: "20px 50px",
              }}
            >
              {dataDashboard.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      textAlign: "center",
                      fontWeight: 550,
                      color: "white",
                      fontSize: "30px",
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      textAlign: "center",
                      fontWeight: 550,
                      color: "grey",
                      fontSize: "15px",
                    }}
                  >
                    {t(`HomePage.${item.title}`)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <CoinPageDesktop />
      </Box>
    </Box>
  );
}
