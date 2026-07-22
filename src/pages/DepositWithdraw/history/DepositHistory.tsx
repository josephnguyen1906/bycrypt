"use client";
import { timeAgo } from "@/pages/historyContact/HistoryContact";
import { getDepositHistory, getWithdrawHistory } from "@/services/User.service";
import { IWithdrawHistory } from "@/shared/interfaces";
import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { formatDateTime } from "@/utils/formatDateTime";
import Image from "next/image";
import { a11yProps, CustomTabPanel } from "@/components/Tabs/TabComponent";

export default function DepositHistory({ tab }: { tab: number }) {
  const [history, setHitory] = useState<IWithdrawHistory[]>([]);
  const [historyWithdraw, setHitoryWithdraw] = useState<IWithdrawHistory[]>([]);
  const { t } = useTranslation();
  const router = useRouter();
  const [value, setValue] = useState(tab || 0);

  const listHistory = async () => {
    const res = await getDepositHistory();
    if (res.status) {
      setHitory(res.data);
    }
  };

  const listHistoryWithdraw = async () => {
    const res = await getWithdrawHistory();
    if (res.status) {
      setHitoryWithdraw(res.data);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (value == 0) {
      listHistory();
    } else {
      listHistoryWithdraw();
    }
  }, [value]);
  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pb: "100px",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          position: "relative",
          pb: {
            xs: "120px",
            sm: 0,
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          gap={"10px"}
          justifyContent={"space-between"}
          sx={{
            padding: "16px",
          }}
        >
          <IconButton onClick={() => router.back()} sx={{ background: "none" }}>
            <ArrowBackIosNewIcon
              sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
            />
          </IconButton>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              color: "white",
              textTransform: "capitalize",
            }}
          >
            {t("AccountPage.menuTab3")}
          </Typography>
          <Typography></Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            centered
            sx={{
              width: "100%",
              mx: "auto",
              "& .MuiTab-root": {
                color: "#fff",
                fontSize: 12,
                fontWeight: 500,
                textTransform: "capitalize",

                borderBottom: "2px solid #393E49",
                "&.Mui-selected": {
                  color: "#fff",
                  fontWeight: 700,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#00A609",
                height: 3,
                borderRadius: "3px",
                transform: "scaleX(0.5)",
                transformOrigin: "center",
              },
            }}
          >
            <Tab label={t("AccountPage.menuTab1")} />
            <Tab label={t("AccountPage.menuTab2")} />
          </Tabs>
        </Box>
        <Box sx={{ width: "95%", margin: "auto", padding: "16px" }}>
          <CustomTabPanel value={value} index={0}>
            {history && history.length > 0 ? (
              history.map((item: IWithdrawHistory, index: number) => (
                <Box
                  key={index}
                  sx={{
                    py: 1.8,
                    borderBottom:
                      index !== history.length - 1
                        ? "1px solid rgba(255,255,255,.05)"
                        : "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Left */}
                    <Box>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                      >
                        {item.coinname.toUpperCase()}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#868c9a",
                          fontSize: 15,
                          mt: 1,
                        }}
                      >
                        {formatDateTime(item.addtime)}
                      </Typography>
                    </Box>

                    {/* Right */}
                    <Box textAlign="right">
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                      >
                        {Number(item.num).toLocaleString()}
                      </Typography>

                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 0.8,
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor:
                              item.st === 0
                                ? "#FFD84D"
                                : item.st === 1
                                  ? "#25C05A"
                                  : "#F44336",
                          }}
                        />

                        <Typography
                          sx={{
                            color: "#868c9a",
                            fontSize: 15,
                          }}
                        >
                          {item.st === 0
                            ? "Đang xác nhận"
                            : item.st === 1
                              ? "Thành công"
                              : "Đã từ chối"}
                        </Typography>
                      </Box>
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
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {historyWithdraw.length > 0 ? (
              historyWithdraw.map((item: IWithdrawHistory, index) => (
                <Box
                  key={index}
                  sx={{
                    py: 2,
                    borderBottom:
                      index !== history.length - 1
                        ? "1px solid rgba(255,255,255,.05)"
                        : "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Left */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          {item.coinname.toUpperCase()}
                        </Typography>

                        <Typography
                          sx={{
                            color: "#8D93A6",
                            fontSize: 14,
                            wordBreak: "break-all",
                          }}
                        >
                          - {t(`DepositWithdrawPage.${item.wallet}`)}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          color: "#8D93A6",
                          fontSize: 13,
                          mt: 0.8,
                        }}
                      >
                        {formatDateTime(item.addtime)}
                      </Typography>
                    </Box>

                    {/* Right */}
                    <Box textAlign="right">
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        -{Number(item.num).toLocaleString()}{" "}
                        {item.coinname.toUpperCase()}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: 0.8,
                          mt: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor:
                              item.status === 1
                                ? "#FFD84D"
                                : item.status === 2
                                  ? "#22C55E"
                                  : "#EF4444",
                          }}
                        />

                        <Typography
                          sx={{
                            color: "#8D93A6",
                            fontSize: 13,
                          }}
                        >
                          {item.status === 1
                            ? "Đang xử lý"
                            : item.status === 2
                              ? "Thành công"
                              : "Đã từ chối"}
                        </Typography>
                      </Box>
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
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
}
