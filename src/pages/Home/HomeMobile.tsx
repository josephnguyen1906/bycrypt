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
