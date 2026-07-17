import { IUser } from "@/shared/interfaces";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { MenuAccount } from "@/datafake/Menu";
export default function Tab1Page({ user }: { user: IUser | null }) {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          textAlign: "center",
          gap: "5px",
        }}
      >
        <Image
          src={"/images/USDT-logo-3704c21d.png"}
          width={108}
          height={99}
          alt=""
          style={{ height: "99px", objectFit: "contain", textAlign: "center" }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "white", fontSize: 30, fontWeight: 600 }}>
            {show
              ? Number(user?.balance?.usdt_total).toLocaleString()
              : "*****"}
          </Typography>
          <IconButton
            sx={{ background: "none" }}
            onClick={() => setShow(!show)}
          >
            {show ? (
              <Visibility fontSize="small" sx={{ color: "white" }} />
            ) : (
              <VisibilityOff fontSize="small" sx={{ color: "white" }} />
            )}
          </IconButton>
        </Box>
        <Typography sx={{ color: "#868c9a", fontSize: 16, mt: "-5px" }}>
          ≈${Number(user?.balance?.usdt).toLocaleString()}
        </Typography>
        <Typography sx={{ color: "white", fontSize: 16 }}>
          {t("AccountPage.title1")}
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: "30px", mt: 2 }}
      >
        {MenuAccount.map((item) => (
          <Box sx={{ display: "grid", justifyContent: "center", gap: "5px" }}>
            <IconButton sx={{ width: 54, height: 54, background: "#1A1B24" }}>
              {item.icon}
            </IconButton>
            <Typography
              sx={{ color: "white", fontSize: 14, textAlign: "center" }}
            >
              {t(item.name)}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "grid", gap: "10px", mt: 2 }}>
        <Typography sx={{ color: "#B8BDC5", fontSize: 16 }}>
          {t("AccountPage.title2")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display={"flex"} gap={"10px"} alignItems={"center"}>
            <Image src={"/images/money.png"} width={20} height={20} alt="" />
            <Typography sx={{ color: "#868c9a", fontSize: 14 }}>
              {t("AccountPage.title2")}
            </Typography>
          </Box>
          <Box display={"grid"} alignItems={"center"}>
            <Typography
              sx={{ color: "white", fontSize: 14, textAlign: "right" }}
            >
              {Number(user?.balance?.usdt).toLocaleString()} USDT
            </Typography>
            <Typography
              sx={{ color: "#868c9a", fontSize: 14, textAlign: "right" }}
            >
              ≈$ {Number(user?.balance?.usdt).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
