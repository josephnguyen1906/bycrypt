"use client";
import LinearWithValueLabel from "@/components/Input/LinearWithValueLabel";
import Stakingdetail from "@/components/subMenu/Stakingdetail";
import useAuth from "@/hook/useAuth";
import {
  buyMining,
  getOrepool,
  getStaking,
  getWebsiteConfig,
} from "@/services/User.service";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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

export default function StakingPage() {
  const [orepool, setOrepool] = useState<any>(null);
  const [value, setValue] = React.useState(0);
  const [websiteConfig, setWebsiteConfig] = useState<any>(null);
  const { user } = useAuth();
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getStaking();
        const buySellConfig: any = await getWebsiteConfig();
        if (buySellConfig) {
          setWebsiteConfig(buySellConfig.data);
        }
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
      toast.error("Please login to Staking.");
      return;
    }
    if (Number(user.balance.usdt) < Number(item.pricenum)) {
      router.push("/asset");
      return;
    }
    setSelectedItem(item);
    setOpenPopup(true);
  };

  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      formData.append("id", selectedItem.id);
      await buyMining(formData);
      setOpenPopup(false);
    } catch (error: any) {
      toast.error(
        error?.message || "An error occurred while renting the machine."
      );
    }
  };

  const handleClose = () => {
    setOpenPopup(false);
    setSelectedItem(null);
  };

  return (
    <Box sx={{ width: "100%", background: "#000" }}>
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
          paddingTop: {
            xs: "10px",
            sm: "80px",
          },
        }}
      >
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
          }}
        >
          <Typography
            variant="h6"
            color={"#e5f663"}
            sx={{ fontSize: { xs: "18px", sm: "30px" } }}
          >
            Staking
          </Typography>
          <Typography
            variant="h3"
            color={"white"}
            sx={{
              fontSize: { xs: "20px", sm: "35px" },
              fontWeight: "bold",
              padding: "10px 0",
            }}
          >
            Earn passive income with your crypto
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: "16px",
              width: {
                xs: "90%",
                sm: "300px",
              },
              margin: "0 auto",
            }}
          >
            Turn your idle crypto into a steady source of income with just a few
            simple steps. Staking allows you to lock tokens to support the
            operation of the blockchain network and receive periodic rewards.
          </Typography>
          <Button
            type="button"
            sx={{
              background: "#d7fe65",
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
            Read more
          </Button>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <img src="/images/F695CAF106522D37.png" style={{ height: "300px" }} />
        </Box>
      </Box>
      <Box sx={{ width: "90%", margin: "auto", textAlign: "center" }}>
        <img
          src={websiteConfig && websiteConfig?.websildea}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          display: "grid",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Consignment promotion:
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "12px",
            fontWeight: 550,
            padding: "5px",
            color: "white",
          }}
        >
          1. Milestone: From 1,000 Pi to 10,000 Pi with a monthly profit of 10%
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "12px",
            fontWeight: 550,
            padding: "5px",
            color: "white",
          }}
        >
          2. Milestone: From 10,000 Pi to 50,000 Pi with a monthly profit of 20%
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "12px",
            fontWeight: 550,
            padding: "5px",
            color: "white",
          }}
        >
          3. Milestone: From 100.000 Pi to 150.000 Pi with a monthly profit of
          25%
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "12px",
            fontWeight: 550,
            padding: "5px",
            color: "white",
          }}
        >
          4. Milestone: From 150.000 Pi to 300.000 Pi with a monthly profit of
          30%
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "12px",
            fontWeight: 550,
            padding: "5px 0px 0px 5px",
            color: "white",
          }}
        >
          5. Milestone: From 300,000 Pi and above, the monthly interest is 45%.
        </Typography>
      </Box>
      <Box
        sx={{
          background: "#000",
          // padding: "20px 0",
          paddingTop: "10px",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            // padding: "20px 0",
            color: "#fff",
            fontSize: {
              xs: "20px",
              sm: "35px",
            },
            fontWeight: "bold",
          }}
          variant="h3"
        >
          Staking list
        </Typography>
        <Box
          sx={{
            width: "90%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            margin: "auto",
          }}
        >
          {orepool?.map((item: any, index: number) => (
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
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    sm: "50%",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ marginTop: "10px", color: "#fff" }}
                >
                  {item.name}
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "100%",
                      sm: "repeat(2, 1fr)",
                    },
                    gap: "10px",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", fontSize: "14px" }}
                  >
                    Minimum purchase:{" "}
                    {item.min
                      ? `${parseFloat(item.min).toLocaleString()} Pi`
                      : "0 "}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", fontSize: "14px" }}
                  >
                    Maximum purchase :{" "}
                    {item.max
                      ? `${parseFloat(item.max).toLocaleString()} Pi`
                      : "0 "}
                  </Typography>
                  {user ? <Stakingdetail staking={item} /> : ""}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#000",
          display: {
            xs: "grid",
            sm: "none",
          },
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
          gap: {
            xs: "10px",
            sm: "50px",
          },
          paddingTop: {
            xs: "10px",
            sm: "80px",
          },
          paddingBottom: {
            xs: "100px",
            sm: "0px",
          },
        }}
      >
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
          }}
        >
          <Typography
            variant="h6"
            color={"#e5f663"}
            sx={{ fontSize: { xs: "18px", sm: "30px" } }}
          >
            Staking
          </Typography>
          <Typography
            variant="h3"
            color={"white"}
            sx={{
              fontSize: { xs: "20px", sm: "35px" },
              fontWeight: "bold",
              padding: "10px 0",
            }}
          >
            Earn passive income with your crypto
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: "16px",
              width: {
                xs: "90%",
                sm: "300px",
              },
              margin: "0 auto",
            }}
          >
            Turn your idle crypto into a steady source of income with just a few
            simple steps. Staking allows you to lock tokens to support the
            operation of the blockchain network and receive periodic rewards.
          </Typography>
          <Button
            type="button"
            onClick={() => setShowPopup(true)}
            sx={{
              background: "#d7fe65",
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
            Read more
          </Button>
        </Box>
        <Box>
          <img src="/images/F695CAF106522D37.png" style={{ height: "300px" }} />
        </Box>
      </Box>
      {/* {showPopup && (
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
                Consignment promotion
              </Typography>
              <img
                src={
                  websiteConfig.websildeb ||
                  "/images/photo_2025-06-18_15-01-46-removebg-preview.png"
                }
                style={{ width: "100%", borderRadius: "15px" }}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: "5px",
                  }}
                >
                  Milestone: From 1,000 Pi to 10,000 Pi with a monthly profit of
                  10%
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: "5px",
                  }}
                >
                  Milestone: From 10,000 Pi to 50,000 Pi with a monthly profit
                  of 20%
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: "5px",
                  }}
                >
                  Milestone: From 100.000 Pi to 150.000 Pi with a monthly profit
                  of 25%
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: "5px",
                  }}
                >
                  Milestone: From 150.000 Pi to 300.000 Pi with a monthly profit
                  of 30%
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: "5px",
                  }}
                >
                  Milestone: From 300,000 Pi and above, the monthly interest is
                  45%.
                </Typography>
              </Box>
              <Button
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "5px",
                  color: "black",
                  "&:hover": {
                    background: "none",
                  },
                }}
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                <CloseOutlined style={{ fontSize: "20px" }} />
              </Button>
            </>
          </Box>
        </Box>
      )} */}
    </Box>
  );
}
