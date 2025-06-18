"use client";
import LinearWithValueLabel from "@/components/Input/LinearWithValueLabel";
import Stakingdetail from "@/components/subMenu/Stakingdetail";
import useAuth from "@/hook/useAuth";
import { buyMining, getOrepool, getStaking } from "@/services/User.service";
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
  const { user } = useAuth();
  const router = useRouter();
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getStaking();
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
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#000",
          display: {
            xs: "grid",
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
            paddingBottom: {
              xs: "100px",
              sm: "0px",
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
          <img src="/images/F695CAF106522D37.png" style={{ height: "350px" }} />
        </Box>
      </Box>
      <Box
        sx={{
          background: "#000",
          padding: "20px 0",
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
          Staking list
        </Typography>
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
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
              <Box>
                <Typography
                  variant="h6"
                  sx={{ marginTop: "10px", color: "#fff" }}
                >
                  {item.name}
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
                    Minimum purchase: {item.min}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", fontSize: "14px" }}
                  >
                    Maximum purchase : {item.max}
                  </Typography>
                  <Stakingdetail staking={item} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
