import { IOrepool, IUser } from "@/shared/interfaces";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { MenuAccount } from "@/datafake/Menu";
import { getOrepool } from "@/services/User.service";
import { useRouter } from "next/navigation";

export default function Tab1Page({ user }: { user: IUser | null }) {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  const [stakingData, setStakingData] = useState<IOrepool>();
  const router = useRouter();
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

  const totalMyList = useMemo(() => {
    const myList = stakingData?.mylist || [];

    return myList.reduce((sum: number, item: any) => {
      return sum + Number(item.outusdt || 0);
    }, 0);
  }, [stakingData]);
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
            sx={{ background: "none", width: 25, height: 25 }}
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
          <Box
            key={item.id}
            sx={{ display: "grid", justifyContent: "center", gap: "5px" }}
            onClick={() => {
              router.push(item.link);
            }}
          >
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
              {Number(totalMyList).toLocaleString()} USDT
            </Typography>
            <Typography
              sx={{ color: "#868c9a", fontSize: 14, textAlign: "right" }}
            >
              ≈$ {Number(totalMyList).toLocaleString()}
            </Typography>
          </Box>
        </Box>

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
              {t("AccountPage.menu3")}
            </Typography>
          </Box>
          <Box display={"grid"} alignItems={"center"}>
            <Typography
              sx={{ color: "white", fontSize: 14, textAlign: "right" }}
            >
              {Number(totalMyList).toLocaleString()} USDT
            </Typography>
            <Typography
              sx={{ color: "#868c9a", fontSize: 14, textAlign: "right" }}
            >
              ≈$ {Number(totalMyList).toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display={"flex"} gap={"10px"} alignItems={"center"}>
            <Image
              src={"/images/icon-excavator.png"}
              width={20}
              height={20}
              alt=""
            />
            <Typography sx={{ color: "#868c9a", fontSize: 14 }}>
              {t("AccountPage.title3")}
            </Typography>
          </Box>
          <Box display={"grid"} alignItems={"center"}>
            <Typography
              sx={{ color: "white", fontSize: 14, textAlign: "right" }}
            >
              {Number(totalMyList).toLocaleString()} USDT
            </Typography>
            <Typography
              sx={{ color: "#868c9a", fontSize: 14, textAlign: "right" }}
            >
              ≈$ {Number(totalMyList).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
