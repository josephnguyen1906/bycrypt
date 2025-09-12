"use client";
import LinearWithValueLabel from "@/components/Input/LinearWithValueLabel";
import Safedetail from "@/components/subMenu/Safedetail";
import useAuth from "@/hook/useAuth";
import {
  buyMining,
  getOrepool,
  getWebsiteConfig,
} from "@/services/User.service";
import { CloseOutlined } from "@mui/icons-material";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function ExcavatorPage() {
  const { t } = useTranslation();
  const [orepool, setOrepool] = useState<any>(null);
  const [value, setValue] = React.useState(0);
  const [type, setType] = useState<string>("");
  const { user, refetchUser } = useAuth();
  const [showPopup, setShowPopup] = useState(true);
  const [websiteConfig, setWebsiteConfig] = useState<any>(null);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const router = useRouter();
  useEffect(() => {
    referral();
    setTimeout(() => {
      setShowPopup(false);
    }, 10000);
  }, []);

  const referral = async () => {
    try {
      const buySellConfig: any = await getWebsiteConfig();
      if (buySellConfig) {
        setWebsiteConfig(buySellConfig.data);
      }
      const res: any = await getOrepool();
      if (res.status === true) {
        setOrepool(res.data);
      }
    } catch (errors: any) {
      toast.error(errors?.message);
    }
  };
  const fetchSafe = useCallback(async () => {
    try {
      const res: any = await getOrepool();
      if (res.status === true) {
        console.log("API data:", res.data);
        setOrepool({ ...res.data }); // ép reference mới
      }
    } catch (errors: any) {
      toast.error(errors?.message);
    }
  }, []);

  return (
    <Box sx={{ width: "100%", p: 1, backgroundColor: "#000", height: "100vh" }}>
      <Typography
        sx={{
          color: "white",
          fontWeight: "600",
          textAlign: "center",
          fontSize: "25px",

          pt: {
            xs: "50px",
            sm: "100px",
          },
          pb: "20px",
        }}
      >
        {" "}
        {t("MiningPage.title")}
      </Typography>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          display: {
            xs: "block",
            sm: "flex",
          },
          gap: "10px",
          pb: "50px",
        }}
        justifyContent={"center"}
      >
        {orepool?.list &&
          orepool.list.map((item: any, index: number) => (
            <Box
              key={index}
              sx={{
                borderRadius: "10px",
                width: {
                  xs: "100%",
                  sm: "30%",
                },
                border: "1px solid gray",
                p: 2,
                display: "flex",
                gap: "10px",
                mt: "10px",
              }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                src={"/images/iconket.png"}
                width={150}
                height={50}
                alt=""
                style={{
                  objectFit: "contain",
                  width: "100px",
                  height: "100px",
                }}
              />
              <Box sx={{ display: "grid" }}>
                {item.jlcoin == "vnd" ? (
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: {
                        xs: "15px",
                        sm: "18px",
                      },
                    }}
                  >
                    {t("MiningPage.title1")}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: {
                        xs: "15px",
                        sm: "18px",
                      },
                    }}
                  >
                    {t("MiningPage.title2")}
                  </Typography>
                )}
                <Typography
                  sx={{
                    color: "white",
                    fontSize: {
                      xs: "14px",
                      sm: "18px",
                    },
                  }}
                >
                  {t("MiningPage.rate")}: {item.suanl}%
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: {
                      xs: "14px",
                      sm: "18px",
                    },
                  }}
                >
                  {t("MiningPage.time")}: 30
                  {t("MiningPage.date")}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: {
                      xs: "14px",
                      sm: "18px",
                    },
                  }}
                >
                  {t("MiningPage.note")}
                </Typography>

                {user ? (
                  <Safedetail
                    safe={item}
                    user={user}
                    refetchUser={refetchUser}
                  />
                ) : (
                  ""
                )}
              </Box>
            </Box>
          ))}
        {showPopup && (
          <Box
            sx={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <Box
              sx={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                width: "90%",
                textAlign: "center",
                position: "relative",
                marginTop: "-20%",
              }}
            >
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    padding: "5px",
                  }}
                >
                  {t("HomePage.popup_notification_title")}
                </Typography>
                <img
                  src={websiteConfig?.websildea || "/images/6852b28e33382.png"}
                  style={{ width: "100%", borderRadius: "15px" }}
                />

                {(websiteConfig && (
                  <Typography
                    sx={{ padding: "5px" }}
                    dangerouslySetInnerHTML={{
                      __html: websiteConfig.checkin_notify,
                    }}
                  />
                )) || (
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "18px", padding: "5px" }}
                  >
                    {t("HomePage.popup_welcome_message")}
                  </Typography>
                )}

                <Button
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "5px",
                    color: "black",
                    "&:hover": { background: "none" },
                  }}
                  onClick={() => setShowPopup(false)}
                >
                  <CloseOutlined style={{ fontSize: "20px" }} />
                </Button>
              </>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
