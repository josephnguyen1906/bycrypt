import { IUser } from "@/shared/interfaces";
import { InternetIcon } from "@/shared/Svgs/Svg.component";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AccountDrawer from "../subMenu/AccountDrawer";

export default function HeaderMobile({
  user,
  onClick,
}: {
  user: IUser | null;
  onClick: () => void;
}) {
  const route = useRouter();
  const { t } = useTranslation();
  return (
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
        <Button
          sx={{ width: 40, height: 40, background: "#0E0F18" }}
          onClick={onClick}
        >
          <MenuIcon sx={{ color: "white" }} />
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        {user ? (
          <Button
            sx={{
              width: 100,
              background: "#00A609",
              color: "#fff",
              textTransform: "none",
              justifyContent: "flex-start",
              px: 1.5,
              "&:hover": {
                background: "#009108",
              },
            }}
          >
            <Typography
              noWrap
              sx={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: 14,
              }}
            >
              {user.username}
            </Typography>
          </Button>
        ) : (
          <Button
            sx={{
              fontSize: 14,
              background: "#00A609",
              color: "white",
              px: "10px",
              textTransform: "capitalize",
            }}
            onClick={() => route.push("/login")}
          >
            {t("LoginPage.title1")}
          </Button>
        )}
        <Tooltip title="Language">
          <IconButton onClick={() => route.push("/language")}>
            <InternetIcon width="20px" height="20px" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
