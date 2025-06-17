import useAuth from "@/hook/useAuth";
import { getBuySellConfig } from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
interface TabProps {
  user: IUser | null;
}

export default function SellComponent(progs: TabProps) {
  const [valueAmount, setValueAmount] = useState(0);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(0);
  const [hytime, setHytime] = useState("");
  const [hyykbl, setHyykbl] = useState("");
  const [buySellConfig, setBuySellConfig] = useState<any>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timeButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    if (timeButtonRefs.current[type]) {
      timeButtonRefs.current[type]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [type]);
  useEffect(() => {
    if (buttonRefs.current[valueAmount]) {
      buttonRefs.current[valueAmount]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [valueAmount]);
  useEffect(() => {
    const referral = async () => {
      try {
        const buySellConfig: any = await getBuySellConfig();

        if (buySellConfig.status === true) {
          const data = buySellConfig.data;

          const processedData = {
            ...data,
            hy_time: data.hy_time?.split(",") || [],
            hy_ykbl: data.hy_ykbl?.split(",") || [],
            hy_tzed: data.hy_tzed?.split(",") || [],
            hy_min: data.hy_min?.split(",") || [],
          };
          setAmount(processedData.hy_tzed?.[0] || "100");
          setBuySellConfig(processedData);
        }
      } catch (errors: any) {
        // toast.error(errors?.message);
      }
    };
    referral();
  }, []);
  return (
    <div>
      {progs.user ? (
        <Box sx={{ width: "100%", height: "100%", overflowY: "auto" }}>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "14px", sm: "14px" },
              marginTop: "10px",
            }}
          >
            Type
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "5px",
              overflowX: "auto",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
            }}
          >
            {buySellConfig &&
              buySellConfig.hy_time.map((item: string, index: number) => (
                <Button
                  key={index}
                  ref={(el) => (timeButtonRefs.current[index] = el)}
                  sx={{
                    background: type === index ? "#fff" : "#909090",
                    color: "black",
                    width: "400px",
                    height: "65px",
                    borderRadius: "15px",
                    fontWeight: 600,
                    fontSize: { xs: "10px", sm: "14px" },
                    "&:hover": {
                      background: type === index ? "#fff" : "#909090",
                    },
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                  onClick={() => {
                    setType(index);
                    setHytime(item);
                    setHyykbl(buySellConfig.hy_ykbl?.[index] || "0");
                    setValueAmount(index);
                    setAmount(buySellConfig.hy_tzed?.[index] || "100");
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", sm: "14px" },
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  >
                    Time end
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", sm: "14px" },
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {item} minute
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", sm: "14px" },
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  >
                    Profit {buySellConfig.hy_ykbl?.[index]}%
                  </Typography>
                </Button>
              ))}
          </Box>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "14px", sm: "14px" },
              marginTop: "10px",
            }}
          >
            Amount
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "5px",
              overflowX: "auto",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
            }}
          >
            {buySellConfig &&
              buySellConfig.hy_tzed.map((item: string, index: number) => (
                <Button
                  key={index}
                  ref={(el) => (buttonRefs.current[index] = el)}
                  sx={{
                    background: valueAmount === index ? "#fff" : "#909090",
                    color: "black",
                    width: "55px",
                    height: "55px",
                    borderRadius: "15px",
                    fontWeight: 600,
                    fontSize: { xs: "10px", sm: "14px" },
                    "&:hover": {
                      background: valueAmount === index ? "#fff" : "#909090",
                    },
                  }}
                  onClick={() => {
                    if (index < type) {
                      toast.error("The value does not correspond to the type");
                      return;
                    } else {
                      setValueAmount(index);
                      setAmount(item);
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
          </Box>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "14px", sm: "14px" },
              padding: "10px 0",
            }}
          >
            Custom amount
          </Typography>
          <TextField
            id="outlined-basic"
            placeholder="Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;

              if (value < amount) {
                toast.error("The value does not correspond to the type");
              } else {
                setAmount(e.target.value);
              }
            }}
            sx={{
              width: "100%",

              "& .MuiInputBase-input": {
                color: "white",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                height: "100%",
                boxSizing: "border-box",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                height: {
                  xs: "45px",
                  sm: "45px",
                },
                fontSize: { xs: "12px", sm: "14px" },
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },

              "& .MuiInputBase-input::placeholder": {
                color: "white",
                fontSize: { xs: "12px", sm: "14px" },
                opacity: 1, // để không bị mờ
              },
            }}
          />
          <Typography
            sx={{
              color: "white",
              padding: "10px 0",
              fontSize: {
                xs: "10px",
                sm: "14px",
              },
            }}
          >
            Current balance: {progs.user?.balance.usdt} USDT
          </Typography>
          <Button
            type="button"
            sx={{
              background: "#fff",
              color: "black",
              width: "100%",
              height: "45px",
              borderRadius: "15px",
              fontSize: { xs: "10px", sm: "14px" },
              fontWeight: "bold",
              "&:hover": {
                background: "#fff",
              },
            }}
            // onClick={handleSubmitSell}
          >
            Sell
          </Button>
        </Box>
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
              sx={{
                color: "white",
                fontSize: { xs: "16px", sm: "24px" },
                fontWeight: 600,
              }}
            >
              You are not logged in
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: "14px", sm: "20px" },
                fontWeight: 600,
              }}
            >
              Please log in to buy / sell coins.
            </Typography>
            <Button
              type="button"
              href="/login"
              sx={{
                background: "#fff",
                color: "black",
                width: "150px",
                height: "35px",
                borderRadius: "15px",
                marginTop: "20px",
                fontSize: { xs: "14px", sm: "20px" },
                fontWeight: 600,
                "&:hover": {
                  background: "#fff",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
}
