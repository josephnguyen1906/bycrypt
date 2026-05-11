import CoinPage from "@/components/coins/CoinPage";
import { getWebsiteConfig } from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
import { InternetIcon, UserIcon } from "@/shared/Svgs/Svg.component";
import { Box, Dialog, IconButton, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

export default function HomeMobile({
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
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "#111827",

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
            <IconButton onClick={() => route.push("/language")}>
              <InternetIcon width="20px" height="20px" />
            </IconButton>
          </Tooltip>
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
              img: "/images/conversation.png",
              link: "/chat",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  style={{ color: "#22c55e" }}
                >
                  <path
                    d="M5 5.5C5 4.119 6.343 3 8 3h8c1.657 0 3 1.119 3 2.5v5c0 1.381-1.343 2.5-3 2.5H11l-3 3v-3H8C6.343 13 5 11.881 5 10.5v-5Z"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              ),
            },
            {
              key: "verified",
              img: "/images/check-mark.png",
              link: "/verified",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  style={{ color: "#22c55e" }}
                >
                  <circle cx="12" cy="12" r="8" strokeWidth="1.7"></circle>
                  <path
                    d="M8.5 12.5 11 15l4.5-6"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              ),
            },
            {
              key: "recharge",
              img: "/images/recharge.png",
              link: "/recharge",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  style={{ color: "#22c55e" }}
                >
                  <rect
                    x="3.5"
                    y="6"
                    width="17"
                    height="12"
                    rx="2"
                    strokeWidth="1.7"
                  ></rect>
                  <path
                    d="M10 12h5.5M10 9.5h3"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M6.5 9h1.5"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  ></path>
                </svg>
              ),
            },
            {
              key: "regulatory",
              img: "/images/wallet.png",
              link: "/regulatory",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  style={{ color: "#22c55e" }}
                >
                  <path
                    d="M6 9V7c0-1.105.895-2 2-2h8c1.105 0 2 .895 2 2v2"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M5 9h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9Z"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10 13h4"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  ></path>
                </svg>
              ),
            },
            {
              key: "loan",
              img: "/images/dollar.png",
              link: "/loan",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  style={{ color: "#22c55e" }}
                >
                  <circle cx="12" cy="12" r="8" strokeWidth="1.7" />
                  <path
                    d="M12 7v10M9.5 9.5h3.2a1.8 1.8 0 1 1 0 3.6H11m0 0H9.5"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
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
                if (!user && item.key !== "service") {
                  route.push("/login");
                } else if (item.link === "#") {
                  window.open(setting?.telegram, "_blank");
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
                {/* <Image src={item.icon} width={20} height={20} alt="" /> */}
                {item.icon}
              </Box>

              <Typography
                sx={{
                  fontSize: "10px",
                  color: "#9ca3af",
                  textAlign: "center",
                  px: 1,
                  lineHeight: 1.2,
                  wordBreak: "breakWord",
                }}
              >
                {t(`HomePage.${item.key}`)}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ width: "100%", margin: "auto" }}>
          {/* <MarketSummary /> */}
          <CoinPage />
        </Box>
        <Box sx={{ width: "90%", margin: "20px auto" }}>
          <Typography
            variant="h4"
            sx={{
              color: "white",
            }}
          >
            {t(`HomePage.h4`)}
          </Typography>
          <Typography variant="body1" sx={{ color: "white", mt: "15px" }}>
            {t(`HomePage.p_1`)}
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
            {t(`HomePage.p_2`)}
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
              {t(`HomePage.button`)}
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
