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
  const router = useRouter();
  const bannerHome = [
    { id: 1, img: "/images/home_banner_1.png" },
    { id: 2, img: "/images/home_banner_2.png" },
    { id: 3, img: "/images/home_banner_3.png" },
    { id: 4, img: "/images/home_banner_4.png" },
  ];

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
          width: "80%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          background: "#000",
          pt: "130px",
          pb: "30px",
        }}
      >
        <Box>
          <Box
            sx={{
              color: "transparent",
              fontSize: "48px",
              fontWeight: "bold",
              mb: "10px",
              backgroundClip: "text",
              display: "inline-block",
              backgroundImage:
                "linear-gradient(90deg,#d3af85 0%,#ffe0b2 20%,#d3af85 40%,#d3af85 100%)",
              backgroundSize: "200% 100%",
              animation: "color-wave 4s linear infinite",
            }}
          >
            {t("HomePage.title1")}
          </Box>
          <Typography sx={{ fontSize: "36px", color: "white" }}>
            {t("HomePage.title8")}
          </Typography>
          <Typography sx={{ fontSize: "20px", color: "white" }}>
            {t("HomePage.title9")}
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              mt: "20px",
            }}
          >
            <TextField
              fullWidth
              placeholder={t("SignupPage.value1")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  position: "relative",

                  borderRadius: "20px",
                  backgroundColor: "#000",
                  color: "#fff",

                  "& fieldset": {
                    borderColor: "#8c8c8c",
                  },

                  "&:hover fieldset": {
                    borderColor: "#8c8c8c",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#d3af85",
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
                    WebkitBoxShadow: "0 0 0 1000px #000 inset",
                    WebkitTextFillColor: "#fff",
                  },
                },
              }}
            />

            <Button
              onClick={() => router.push("/signup")}
              variant="contained"
              sx={{
                position: "absolute",

                right: 12,
                bottom: 10,

                minWidth: "110px",
                height: "38px",

                borderRadius: "12px",

                background: "none",
                color: "#fff",

                fontWeight: 700,
                textTransform: "none",

                boxShadow: "none",

                "&:hover": {
                  background: "none",
                  boxShadow: "none",
                },
              }}
            >
              Đăng ký {">"}
            </Button>
          </Box>
        </Box>

        <video
          src={"/images/new_banner-bg4.mp4"}
          width={500}
          height={500}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "450px", height: "350px" }}
        />
      </Box>
      <Box
        sx={{ width: "80%", background: "#000", margin: "auto", pb: "100px" }}
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
              items: 4,
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
          {bannerHome.map((item) => (
            <div key={item.id}>
              <Image
                src={item.img}
                width={270}
                height={120}
                loading="lazy"
                alt=""
                style={{
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}
        </Carousel>
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
              padding: "2px 2px",
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
                      fontWeight: 700,
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
