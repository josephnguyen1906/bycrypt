import { IOrepool, IUser } from "@/shared/interfaces";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { MenuAccount } from "@/datafake/Menu";
import { getOrepool } from "@/services/User.service";
import { useRouter } from "next/navigation";

export default function Tab2Page({ user }: { user: IUser | null }) {
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
              if (!item.link) return;

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

      <Box sx={{ display: "grid", gap: 2, mt: 2 }}>
        <Typography sx={{ color: "#B8BDC5", fontSize: 16 }}>
          {t("AccountPage.title2")}
        </Typography>

        {stakingData?.mylist?.map((item) => {
          const available = Number(item.outnum || 0);
          const total = available;

          return (
            <Box
              key={item.id}
              sx={{
                bgcolor: "#141824",
                borderRadius: "12px",
                p: 2,
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={item.imgs}
                    alt={item.kjtitle}
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#C8CDD7",
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    {item.kjtitle}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 22,
                    }}
                  >
                    {total.toFixed(6)}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#8C95A6",
                      fontSize: 13,
                    }}
                  >
                    ≈${total.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              {/* Info */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#7D8596",
                      fontSize: 13,
                    }}
                  >
                    {t("TradePage.title4")}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      mt: 0.5,
                    }}
                  >
                    {available.toFixed(8)}
                  </Typography>
                </Box>

                {/* <Box>
                  <Typography
                    sx={{
                      color: "#7D8596",
                      fontSize: 13,
                    }}
                  >
                    {t("AccountPage.title4")}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      mt: 0.5,
                    }}
                  >
                    {lock.toFixed(8)}
                  </Typography>
                </Box> */}

                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    sx={{
                      color: "#7D8596",
                      fontSize: 13,
                    }}
                  >
                    {t("AccountPage.title4")}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      mt: 0.5,
                    }}
                  >
                    {item.djout == 1
                      ? t("AccountPage.title5")
                      : t("AccountPage.title6")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
