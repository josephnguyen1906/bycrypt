"use client";
import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getContractjc, getContractpc } from "@/services/User.service";
import CommandOpen from "../Contact/CommandOpen";
import CommandClose from "../Contact/CommandClose";
import { useUserStore } from "@/stores/useUserStore";
import { IHistoryClose, IHistoryOpen } from "@/shared/interfaces";
import Image from "next/image";

export default function HistoryContact() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
  const [history, setHisstory] = useState<any>(null);
  const [tab, setTab] = useState("BUY");
  const [value, setValue] = useState("one");
  const [bill, setBill] = useState<IHistoryClose[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    historyOpen();
    referral();
  }, []);

  const historyOpen = async () => {
    try {
      const his: any = await getContractjc();
      if (his.status === true) {
        setHisstory(his.data);
      }
    } catch (errors: any) {
      console.log(errors?.message);
    }
  };

  const referral = async () => {
    try {
      const res: any = await getContractpc();
      console.log(res);

      if (res.status === true) {
        setBill(res.data);
      }
    } catch (errors: any) {
      console.log(errors?.message);
    }
  };
  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "95%",
          margin: "auto",
          pt: 5,
        }}
      >
        <Box display="flex" alignItems="center" mb={3} gap={"50px"}>
          <IconButton onClick={() => router.back()} sx={{ background: "none" }}>
            <ArrowBackIosNewIcon
              sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
            />
          </IconButton>
          <Typography sx={{ color: "white", fontSize: 18 }}>
            {t("HistoryPage.title1")}{" "}
          </Typography>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          variant="fullWidth"
          sx={{
            bgcolor: "#1A1D27",
            p: "4px",
            borderRadius: "8px",

            "& .MuiTabs-indicator": {
              display: "none",
            },

            "& .MuiTab-root": {
              color: "#8D93A6",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "6px",
              minHeight: 32,
              width: 120,
            },

            "& .MuiTab-root.Mui-selected": {
              bgcolor: "#00A609",
              color: "#fff",
            },
          }}
        >
          <Tab value="one" label={t("HistoryPage.tab1")} wrapped />
          <Tab value="two" label={t("HistoryPage.tab2")} />
        </Tabs>
        {user ? (
          <>
            {value == "one" && (
              <Box sx={{ width: "95%", margin: "auto", paddingTop: "20px" }}>
                {history && history.length > 0 ? (
                  history.map((item: IHistoryOpen, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        background: "#1c2735",
                        borderRadius: "14px",
                        padding: "16px 18px",
                        marginBottom: "12px",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        {/* LEFT */}
                        <Box>
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Typography
                              sx={{
                                color: "#fff",
                                fontSize: "14px",
                                fontWeight: 500,
                                marginBottom: "6px",
                              }}
                            >
                              {item.coinname?.replace("-", "/")}
                            </Typography>
                            <Button
                              sx={{
                                color: "#d1d5db",
                                background: "#374151",
                                fontWeight: 400,
                                height: "25px",
                                fontSize: "10px",
                                textTransform: "capitalize",
                              }}
                            >
                              {t("HistoryPage.title3")}
                            </Button>
                          </Box>
                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {t("HistoryPage.title4")}
                          </Typography>

                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {t("HistoryPage.price_buy")}
                          </Typography>

                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {t("TradePage.title18")}
                          </Typography>
                        </Box>

                        {/* RIGHT */}
                        <Box sx={{ textAlign: "right" }}>
                          <Typography
                            sx={{
                              color: item.hyzd === 1 ? "#4ade80" : "#ef4444",
                              fontWeight: 500,
                              fontSize: 13,
                              marginBottom: "6px",
                            }}
                          >
                            {item.hyzd === 1
                              ? t("TradePage.title6")
                              : t("TradePage.title7")}
                          </Typography>
                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {Number(item.num).toLocaleString()} USDT
                          </Typography>

                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {Number(item.buyprice).toLocaleString()}
                          </Typography>

                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {timeAgo(item.buytime)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      margin: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      justifyContent: "center",
                      justifyItems: "center",
                      pt: "50px",
                    }}
                  >
                    <Image
                      src={"/images/no-data-fc5efa8b.png"}
                      width={90}
                      height={90}
                      alt=""
                      style={{
                        width: "100%",
                        textAlign: "center",
                        objectFit: "contain",
                      }}
                    />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "12px",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      {t("HistoryPage.title2")}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
            {value == "two" && (
              <Box sx={{ width: "95%", margin: "auto", paddingTop: "20px" }}>
                {bill && bill.length > 0 ? (
                  bill.map((item: IHistoryClose, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        background: "#1c2735",
                        borderRadius: "14px",
                        padding: "16px 18px",
                        marginBottom: "12px",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        {/* LEFT */}
                        <Box>
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Typography
                              sx={{
                                color: "#fff",
                                fontSize: "14px",
                                fontWeight: 500,
                                marginBottom: "6px",
                              }}
                            >
                              {item.coinname?.replace("-", "/")}
                            </Typography>
                            <Button
                              sx={{
                                color: "#d1d5db",
                                background: "#374151",
                                fontWeight: 400,
                                height: "25px",
                                fontSize: "10px",
                                textTransform: "capitalize",
                              }}
                            >
                              {t("HistoryPage.title3")}
                            </Button>
                          </Box>
                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {t("HistoryPage.title4")}
                          </Typography>
                          {item.hyzd === 1 ? (
                            <Typography
                              sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                            >
                              {t("HistoryPage.price_buy")}
                            </Typography>
                          ) : (
                            <Typography
                              sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                            >
                              {t("HistoryPage.price_sell")}
                            </Typography>
                          )}

                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {t("TradePage.title18")}
                          </Typography>
                        </Box>

                        {/* RIGHT */}
                        <Box sx={{ textAlign: "right" }}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                color:
                                  item.is_win === 1 ? "#4ade80" : "#ef4444",
                                background:
                                  item.is_win === 1 ? "#10b98133" : "#ef444433",
                                fontWeight: 400,
                                p: "5px 15px",
                                borderRadius: "10px",
                                fontSize: "12px",
                                textTransform: "capitalize",
                              }}
                            >
                              {item.is_win === 1
                                ? t("HistoryPage.WIN")
                                : t("HistoryPage.LOSS")}
                            </Typography>
                            <Typography
                              sx={{
                                color: item.hyzd === 1 ? "#4ade80" : "#ef4444",
                                fontWeight: 500,
                                fontSize: "16px",
                                marginBottom: "6px",
                                pt: "10px",
                              }}
                            >
                              {item.hyzd === 1
                                ? t("TradePage.title6")
                                : t("TradePage.title7")}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {Number(item.num).toLocaleString()} USDT
                          </Typography>

                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {Number(item.buyprice).toLocaleString()}
                          </Typography>

                          <Typography
                            sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                          >
                            {timeAgo(item.buytime)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      margin: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      justifyContent: "center",
                      justifyItems: "center",
                      pt: "50px",
                    }}
                  >
                    <Image
                      src={"/images/no-data-fc5efa8b.png"}
                      width={90}
                      height={90}
                      alt=""
                      style={{
                        width: "100%",
                        textAlign: "center",
                        objectFit: "contain",
                      }}
                    />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "12px",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      {t("HistoryPage.title2")}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              justifyItems: "center",
              pt: "50px",
            }}
          >
            <Image
              src={"/images/no-data-fc5efa8b.png"}
              width={90}
              height={90}
              alt=""
              style={{
                width: "100%",
                textAlign: "center",
                objectFit: "contain",
              }}
            />
            <Typography
              sx={{
                color: "#9ca3af",
                fontSize: "12px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {t("HistoryPage.title2")}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export function timeAgo(date: string | Date) {
  const now = new Date().getTime();
  const past = new Date(date).getTime();

  const diff = Math.floor((now - past) / 1000); // seconds

  if (diff < 60) return `${diff} giây trước`;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} phút trước`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;

  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}
