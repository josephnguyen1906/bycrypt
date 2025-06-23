"use client";
import LinearWithValueLabel from "@/components/Input/LinearWithValueLabel";
import useAuth from "@/hook/useAuth";
import { buyMining, getOrepool } from "@/services/User.service";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ExcavatorPage() {
  const { t } = useTranslation();
  const [orepool, setOrepool] = useState<any>(null);
  const [value, setValue] = React.useState(0);
  const { user } = useAuth();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const router = useRouter();
  useEffect(() => {
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
    referral();
  }, []);
  const handleSubmit = async (item: any) => {
    if (!user) {
      toast.error("Please login to rent a machine.");
      return;
    }
    if (Number(user.balance.usdt) < Number(item.pricenum)) {
      router.push("/asset");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", item.id);
      await buyMining(formData);
      toast.success("Buy mining machine successfully.");
    } catch (error: any) {
      toast.error(
        error?.message || "An error occurred while renting the machine."
      );
    }
  };
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#000",
          display: {
            xs: "none",
            sm: "flex",
          },
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
          gap: {
            xs: "10px",
            sm: "50px",
          },
          paddingTop: "80px",
          paddingBottom: {
            xs: "0px",
            sm: "0px",
          },
        }}
      >
        <Box>
          <img src="/images/113A699D75096FA7.png" style={{ height: "350px" }} />
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "400px",
            },
            textAlign: {
              xs: "center",
              sm: "left",
            },
            paddingBottom: {
              xs: "100px",
              sm: "0px",
            },
          }}
        >
          <Typography
            variant="h6"
            color={"#e5f663"}
            sx={{ fontSize: { xs: "18px", sm: "20px" } }}
          >
            {t("MiningPage.title1")}
          </Typography>
          <Typography
            variant="h6"
            color={"#e5f663"}
            sx={{ fontSize: { xs: "18px", sm: "20px" } }}
          >
            {t("MiningPage.title2")}
          </Typography>
          <Typography
            variant="h3"
            color={"white"}
            sx={{ fontSize: { xs: "20px", sm: "35px" } }}
          >
            {t("MiningPage.title3")}
          </Typography>
          <Typography sx={{ color: "white", fontSize: "16px", width: "300px" }}>
            {t("MiningPage.title4")}
          </Typography>
          <Button
            type="button"
            sx={{
              background: "white",
              color: "#000",
              width: "150px",
              height: "45px",
              borderRadius: "10px",
              marginTop: "20px",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "lightgray",
                color: "#000",
              },
            }}
          >
            {t("MiningPage.button")}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#000",
          paddingBottom: {
            xs: "100px",
            sm: "0px",
          },
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            padding: "20px 0",
            color: "#fff",
            fontSize: {
              xs: "20px",
              sm: "35px",
            },
            fontWeight: "bold",
          }}
          variant="h3"
        >
          {t("MiningPage.title")}
        </Typography>
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  justifyContent: "center",
                  display: "flex",

                  "& .MuiTabs-flexContainer": {
                    justifyContent: "center",
                  },

                  "& .MuiTab-root": {
                    textTransform: "capitalize",
                    color: "gray",
                    fontSize: "18px",
                    fontWeight: 500,
                    "&:hover": { color: "gray" },
                    "&.Mui-selected": {
                      textTransform: "capitalize",
                      color: "#fff",
                      fontWeight: 700,
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#fff",
                  },
                }}
              >
                <Tab label={t("MiningPage.tab1")} {...a11yProps(0)} />
                <Tab label={t("MiningPage.tab2")} {...a11yProps(1)} />
                <Tab label={t("MiningPage.tab3")} {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box
                sx={{
                  width: "100%",
                  margin: "0 auto",
                  display: {
                    xs: "grid",
                    sm: "flex",
                  },
                  flexWrap: "wrap",
                  gap: "30px",
                }}
              >
                {orepool?.overview.map((item: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "calc(50% - 20px)",
                      },
                      border: "1px solid #909090",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.imgs}
                      alt={item.title}
                      style={{
                        width: "100px",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ marginTop: "10px", color: "#fff" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          paddingTop: "5px",
                          fontSize: "14px",
                          color: "#666",
                          paddingBottom: "10px",
                        }}
                      >
                        {item.content}
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "10px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.price")}: {item.pricenum} USDT
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.type")}:{" "}
                          {item.type === 1
                            ? `${t("MiningPage.type2")}`
                            : `${t("MiningPage.type3")}`}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.type1")}: {item.outcoin}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.output")}:{" "}
                          {item.dayoutnum + " " + item.outcoin}/
                          {t("MiningPage.day")}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.method")}:{" "}
                          {t("MiningPage.methodValue")}
                        </Typography>
                        <Button
                          type="button"
                          sx={{
                            width: "100px",
                            height: "40px",
                            background: "#fff",
                            color: "black",
                            borderRadius: "10px",
                            textTransform: "capitalize",
                            "&:hover": {
                              backgroundColor: "#fff",
                            },
                          }}
                          onClick={() => handleSubmit(item)}
                        >
                          {t("MiningPage.button2")}
                        </Button>
                      </Box>
                      <LinearWithValueLabel value={item.suanl} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Box
                sx={{
                  width: "100%",
                  margin: "0 auto",
                  display: {
                    xs: "grid",
                    sm: "flex",
                  },
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {orepool?.exclusive.map((item: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "calc(50% - 20px)",
                      },
                      border: "1px solid #909090",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.imgs}
                      alt={item.title}
                      style={{
                        width: "100px",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ marginTop: "10px", color: "#fff" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          paddingTop: "5px",
                          fontSize: "14px",
                          color: "#666",
                          paddingBottom: "10px",
                        }}
                      >
                        {item.content}
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "10px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.price")}: {item.pricenum}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.type")}:{" "}
                          {item.type === 1
                            ? `${t("MiningPage.type2")}`
                            : `${t("MiningPage.type3")}`}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.type1")}: {item.outcoin}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.output")}:{" "}
                          {item.dayoutnum + " " + item.outcoin}/
                          {t("MiningPage.day")}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.method")}:{" "}
                          {t("MiningPage.methodValue")}
                        </Typography>
                        <Button
                          type="button"
                          sx={{
                            width: "100px",
                            height: "40px",
                            background: "#fff",
                            color: "black",
                            borderRadius: "10px",
                            textTransform: "capitalize",
                            "&:hover": {
                              backgroundColor: "#fff",
                            },
                          }}
                          onClick={() => handleSubmit(item)}
                        >
                          {t("MiningPage.tab1")}
                        </Button>
                      </Box>
                      <LinearWithValueLabel value={item.suanl} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Box
                sx={{
                  width: "100%",
                  margin: "0 auto",
                  display: {
                    xs: "grid",
                    sm: "flex",
                  },
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {orepool?.shared.map((item: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "calc(50% - 20px)",
                      },
                      border: "1px solid #909090",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.imgs}
                      alt={item.title}
                      style={{
                        width: "100px",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ marginTop: "10px", color: "#fff" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          paddingTop: "5px",
                          fontSize: "14px",
                          color: "#666",
                          paddingBottom: "10px",
                        }}
                      >
                        {item.content}
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "10px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.price")}: {item.pricenum}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.type")}:{" "}
                          {item.type === 1
                            ? `${t("MiningPage.type2")}`
                            : `${t("MiningPage.type3")}`}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.type1")}: {item.outcoin}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.output")}:{" "}
                          {item.dayoutnum + " " + item.outcoin}/
                          {t("MiningPage.day")}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#666", fontSize: "14px" }}
                        >
                          {t("MiningPage.method")}:{" "}
                          {t("MiningPage.methodValue")}
                        </Typography>
                        <Button
                          type="button"
                          sx={{
                            width: "100px",
                            height: "40px",
                            background: "#fff",
                            color: "black",
                            borderRadius: "10px",
                            textTransform: "capitalize",
                            "&:hover": {
                              backgroundColor: "#fff",
                            },
                          }}
                          onClick={() => handleSubmit(item)}
                        >
                          {t("MiningPage.tab1")}
                        </Button>
                      </Box>
                      <LinearWithValueLabel value={item.suanl} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
