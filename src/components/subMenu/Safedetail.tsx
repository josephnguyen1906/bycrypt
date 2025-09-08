import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { Badge, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { CoinIcon } from "@/shared/Svgs/Svg.component";
import { toast } from "react-toastify";
import {
  buySubscribe,
  getSafeActive,
  getWebsiteConfig,
  SendSafe,
  WithdrawSafe,
} from "@/services/User.service";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export interface props {
  safe: any | null;
  user: any;
}

export default function Safedetail({ safe, user }: props) {
  const { t } = useTranslation();
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [websiteConfig, setWebsiteConfig] = React.useState<any>(null);
  const [amount, setAmount] = React.useState<number | null>(null);

  const [displayValue, setDisplayValue] = React.useState<string>("");
  const [listSafe, setListSafe] = React.useState<any>(null);

  const formatNumber = (value: number) => {
    return value.toLocaleString("vi-VN");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[,.]/g, "");

    const num = parseFloat(rawValue);

    if (!isNaN(num)) {
      setAmount(num); // state lưu số
      setDisplayValue(formatNumber(num)); // state hiển thị chuỗi có dấu phẩy
    } else {
      setAmount(null);
      setDisplayValue("");
    }
  };

  React.useEffect(() => {
    getlistSafe();
    const referral = async () => {
      try {
        const buySellConfig: any = await getWebsiteConfig();
        if (buySellConfig) {
          setWebsiteConfig(buySellConfig.data);
        }
      } catch (errors: any) {
        toast.error(errors?.message);
      }
    };
    referral();
  }, []);

  const getlistSafe = async () => {
    getSafeActive(safe?.jlcoin).then((res: any) => {
      if (res.status === true) {
        setListSafe(res.data.data);
      }
    });
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
  };
  console.log("listSafe", listSafe);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSubmit = async () => {
    if (!amount) {
      toast.error(t("Toast.staking1"));
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", safe?.id);
      formData.append("amount", String(amount));
      await SendSafe(formData);
      toast.success(t("Toast.Safe4"));
      await getlistSafe();
      setAmount(null);
    } catch (error: any) {
      toast.error(t("Toast.Safe5"));
    }
  };

  const handleSubmitWithdraw = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      await WithdrawSafe(formData);
      toast.success(t("Toast.Safe1"));
      await getlistSafe();
    } catch (error: any) {
      toast.error(t("Toast.Safe2"));
    }
  };

  const drawerList = () => {
    return (
      <Box
        sx={{
          width: {
            xs: "100vw",
            sm: "30vw",
          },
          background: "#000",
          color: "#fff",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            background: "#000",
            color: "#fff",
          }}
        >
          {/* <Typography sx={{ textAlign: "center" }}>Staking</Typography> */}
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: "white",
              background: "#909090",
              borderRadius: "50%",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Box>
        <TextField
          value={displayValue}
          onChange={handleChange}
          sx={{
            width: "90%",
            margin: "16px auto",
            background: "#909090",
            borderRadius: "10px",
            color: "white",
            border: "none",

            "& .MuiOutlinedInput-root": {
              color: "white",
              "&.Mui-focused fieldset": {
                // borderColor: "white",
                border: "none",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white",
              fontSize: { xs: "12px", sm: "14px" },
              opacity: 1, // để không bị mờ
            },
          }}
          placeholder={t("StakingPage.amount")}
          variant="outlined"
          InputProps={{
            startAdornment: <IconButton>{<CoinIcon />}</IconButton>,
          }}
        />
        {safe.jlcoin == "vnd" ? (
          <Box sx={{ display: "flex", gap: "10px", pl: "10%" }}>
            <Typography sx={{ color: "white" }}>
              {t("StakingPage.amont_VND")}
            </Typography>
            <Typography sx={{ color: "#fcd534" }}>
              {Number(user?.balance?.vnd || 0).toLocaleString()} VND
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: "10px", pl: "10%" }}>
            <Typography sx={{ color: "white" }}>
              {t("StakingPage.amont_USDT")}
            </Typography>
            <Typography sx={{ color: "#fcd534" }}>
              {Number(user?.balance?.usdt || 0).toLocaleString()} USDT
            </Typography>
          </Box>
        )}
        <Button
          type="button"
          sx={{
            background: "#fcd534",
            color: "black",
            width: "90%",
            margin: "16px auto",
            height: "45px",
            borderRadius: "15px",
            fontSize: { xs: "13px", sm: "14px" },
            textTransform: "capitalize",
            fontWeight: "bold",
            "&:hover": {
              background: "#fcd534",
            },
          }}
          onClick={handleSubmit}
        >
          {t("MiningPage.button")}
        </Button>
        <Box
          sx={{
            height: "60%",
            overflowY: "auto",
            width: "80%",
            margin: "auto",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "20px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {t("StakingPage.title1")} {safe?.jlcoin} {t("StakingPage.title2")}
          </Typography>
          <Box sx={{ pt: "10px" }}>
            {listSafe &&
              listSafe?.map((item: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    borderRadius: "10px",
                    width: {
                      xs: "100%",
                      sm: "100%",
                    },
                    border: "1px solid gray",
                    p: 1,
                    display: "flex",
                    mt: "10px",
                    gap: "5px",
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
                    {item.coin == "vnd" ? (
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
                      {t("MiningPage.rateM")}: {Number(item.rate_month)}%
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
                      {t("MiningPage.date_send")}: {item.day_progress}/
                      {item.cycle}
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
                      {t("MiningPage.amount_send")}:{" "}
                      {Number(item.amount).toLocaleString()}
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
                      {t("MiningPage.amount")}:{" "}
                      {(
                        Number(item.cashout) - Number(item.amount)
                      ).toLocaleString()}
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
                      {t("MiningPage.total_amount")}:{" "}
                      {Number(item.cashout).toLocaleString()}
                    </Typography>
                    {item.status == 1 ? (
                      <Button
                        type="button"
                        sx={{
                          width: "100%",
                          height: "30px",
                          background: "#fcd534",
                          color: "black",
                          borderRadius: "10px",
                          fontSize: "14px",
                          mt: "5px",
                          textTransform: "capitalize",
                          "&:hover": {
                            backgroundColor: "#fcd534",
                          },
                        }}
                        onClick={() => handleSubmitWithdraw(item.id)}
                      >
                        {t("DepositWithdrawPage.tab2")}
                      </Button>
                    ) : (
                      <Typography
                        sx={{
                          borderRadius: "5px",
                          textAlign: "center",
                          mt: "5px",
                          background: "green",
                          color: "white",
                          fontSize: {
                            xs: "14px",
                            sm: "18px",
                          },
                        }}
                      >
                        {t("MiningPage.status")}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <React.Fragment>
      <Box>
        <Button
          type="button"
          sx={{
            width: "100%",
            height: "40px",
            background: "#fcd534",
            color: "black",
            borderRadius: "10px",
            fontSize: "14px",
            mt: "5px",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#fcd534",
            },
          }}
          onClick={handleClick}
        >
          {t("MiningPage.button")}
        </Button>
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          zIndex: 9999999,
          "& .MuiDrawer-paper": {
            background: "#1a263f",
            border: "none",
            borderRadius: "0",
          },
        }}
      >
        {drawerList()}
      </Drawer>
    </React.Fragment>
  );
}
