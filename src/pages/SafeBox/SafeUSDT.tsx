import { getSafeActive, WithdrawSafe } from "@/services/User.service";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function SafeUSDT() {
  const { t } = useTranslation();
  const [listSafe, setListSafe] = useState<any>(null);
  useEffect(() => {
    getlistSafe();
  }, []);

  const getlistSafe = async () => {
    getSafeActive("usdt").then((res: any) => {
      if (res.status === true) {
        setListSafe(res.data.data);
      }
    });
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
  return (
    <Box sx={{ pt: "10px" }}>
      {listSafe && listSafe.length > 0 ? (
        listSafe?.map((item: any, index: number) => (
          <Box
            key={index}
            sx={{
              borderRadius: "10px",
              width: {
                xs: "100%",
                sm: "30%",
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
                {t("MiningPage.amount")}:{" "}
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
        ))
      ) : (
        <Box
          sx={{
            width: {
              xs: "90%",
              sm: "55%",
            },
            textAlign: "center",
            boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.24)",
            borderRadius: "15px",
            height: "400px",
            margin: "0 auto",
            display: "grid",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ color: "white", fontSize: "25px", fontWeight: 600 }}
            >
              {t("SafeBox.safe_not_found")}
            </Typography>
            <Typography
              sx={{ color: "white", fontSize: "16px", fontWeight: 600 }}
            >
              {t("SafeBox.safe_amount")}
            </Typography>
            <Button
              type="button"
              href="/excavator"
              sx={{
                background: "#fcd534",
                color: "black",
                width: "250px",
                height: "45px",
                borderRadius: "15px",
                marginTop: "20px",
                fontWeight: 600,
                "&:hover": {
                  background: "#fcd534",
                },
              }}
            >
              {t("SafeBox.safe_send")}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
