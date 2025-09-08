"use client";
import LinearWithValueLabel from "@/components/Input/LinearWithValueLabel";
import Safedetail from "@/components/subMenu/Safedetail";
import useAuth from "@/hook/useAuth";
import { buyMining, getOrepool } from "@/services/User.service";
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const router = useRouter();
  useEffect(() => {
    referral();
  }, []);

  const referral = async () => {
    try {
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
      </Box>
    </Box>
  );
}
