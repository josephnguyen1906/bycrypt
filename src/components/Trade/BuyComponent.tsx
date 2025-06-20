import useAuth from "@/hook/useAuth";
import { useDebounce } from "@/hook/useDebounce";
import {
  createOrder,
  getBuySellConfig,
  getOrderResult,
} from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CircleCountdown } from "../CountdownCircle/CountdownCircle";
import { formatCurrency } from "@/utils/formatMoney";
import { CloseOutlined } from "@mui/icons-material";
interface TabProps {
  user: IUser | null;
  value: string;
}

export default function BuyComponent(progs: TabProps) {
  const [valueAmount, setValueAmount] = useState(0);
  const [amount, setAmount] = useState("100");
  const [price, setPrice] = useState<Number | null>(100);
  const [type, setType] = useState(0);
  const [hytime, setHytime] = useState("5");
  const [hyykbl, setHyykbl] = useState("15");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [trade, setTrade] = useState<any>(null);

  const router = useRouter();
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
  const handleSubmit = async () => {
    if (!hytime || !amount) {
      toast.error("Please select time and amount");
      return;
    }
    if (Number(price) < Number(amount)) {
      toast.error("The value does not correspond to the type");
      return;
    }
    if (parseFloat(amount) > parseFloat(progs.user?.balance.usdt || "0")) {
      router.push("/asset");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("ctime", hytime);
      formData.append("amount", amount);
      formData.append("coinname", progs.value);
      formData.append("method", "1");
      formData.append("uprate", hyykbl);

      await createOrder(formData).then((res) => {
        setTrade(res.data);
        setCountdown(res.data.time);
        setShowPopup(true);
      });
      // toast.success("Order created successfully");
    } catch (error: any) {
      toast.error(error.message || "Order created failed, please check again!");
    }
  };

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev && prev <= 1) {
          clearInterval(interval);
          fetchResult(); // khi countdown = 0 thì gọi API
          return 0;
        }
        return (prev ?? 0) - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const fetchResult = async () => {
    try {
      // Gọi API lấy kết quả
      const res = await getOrderResult(trade?.id); // bạn cần tạo service API này
      setResult(res.data);
      // toast.success("Result received");
    } catch (error: any) {
      toast.error("Failed to fetch result");
    }
  };

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
                    minWidth: { xs: "95px", sm: "130px" },
                    padding: "2px",
                    borderRadius: "10px",
                    fontWeight: 600,
                    fontSize: { xs: "10px", sm: "14px" },
                    "&:hover": {
                      background: type === index ? "#fff" : "#909090",
                    },
                    display: "flex",
                    flexDirection: "column",
                    // gap: "1px",
                  }}
                  onClick={() => {
                    setType(index);
                    setHytime(item);
                    setHyykbl(buySellConfig.hy_ykbl?.[index] || "0");
                    setValueAmount(index);
                    setAmount(buySellConfig.hy_tzed?.[index] || "100");
                    setPrice(Number(buySellConfig.hy_tzed?.[index]) || 100);
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "13px", sm: "16px" },
                      fontWeight: 800,
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
                    Profit
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "13px", sm: "16px" },
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {buySellConfig.hy_ykbl?.[index]}%
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
                    fontSize: { xs: "13px", sm: "16px" },
                    "&:hover": {
                      background: valueAmount === index ? "#fff" : "#909090",
                    },
                  }}
                  onClick={() => {
                    if (index < type) {
                      toast.error("The value does not correspond to the type");
                    } else {
                      setValueAmount(index);
                      setAmount(item);
                      setPrice(Number(item));
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
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            sx={{
              width: "100%",
              background: "#5e5e5e",
              borderRadius: "10px",
              outline: "none",
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
                  xs: "52px",
                  sm: "45px",
                },

                fontSize: { xs: "16px", sm: "14px" },
                "& fieldset": {
                  color: "white",
                  outline: "none",
                },
                "&:hover fieldset": {
                  // borderColor: "white",
                },
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
          />
          <Typography
            sx={{
              color: "white",
              padding: "10px 0",
              fontSize: {
                xs: "13px",
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
              fontSize: { xs: "14px", sm: "14px" },
              textTransform: "capitalize",
              fontWeight: "bold",
              "&:hover": {
                background: "#fff",
              },
            }}
            onClick={handleSubmit}
          >
            Buy
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
            }}
          >
            {result ? (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    padding: "5px",
                  }}
                >
                  Notification
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    paddingBottom: "5px",
                  }}
                >
                  The results are out, Staking announces the results as follows:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgray",
                    padding: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Status
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    {result.is_win === 1 ? "You Win" : "You Lose"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgray",
                    padding: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Bet amount
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    {formatCurrency(result.num, "USD", "USD")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgray",
                    padding: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Amount profit or loss
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    {formatCurrency(result.ploss, "USD", "USD")}
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
                    setResult(null);
                  }}
                >
                  <CloseOutlined style={{ fontSize: "20px" }} />
                </Button>
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    padding: "5px",
                  }}
                >
                  Notification
                </Typography>
                <Box sx={{ width: "50%", margin: "auto" }}>
                  <CircleCountdown
                    duration={trade.time}
                    timeLeft={countdown ?? 0}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "black",
                    textTransform: "capitalize",
                    textAlign: "left",
                    paddingBottom: "5px",
                  }}
                >
                  Order placed successfully, the order information is as
                  follows:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgray",
                    padding: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Type:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    {trade.hyzd === 1 ? "Buy" : "Sell"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgray",
                    padding: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Price now:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    {formatCurrency(trade.buyprice, "USD", "USD")}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid lightgray",
                    padding: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Quantity:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    {Number(amount)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    Expected profit:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  >
                    {hyykbl}%
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
                    setResult(null);
                  }}
                >
                  <CloseOutlined style={{ fontSize: "20px" }} />
                </Button>
                <Button
                  sx={{
                    width: "100%",
                    height: "40px",
                    color: "black",
                    background: "#00d084",
                    marginTop: "10px",
                    fontSize: "15px",
                    "&:hover": {
                      background: "#00d084",
                    },
                  }}
                  onClick={() => {
                    setShowPopup(false);
                    setResult(null);
                  }}
                >
                  Continue to place the order
                </Button>
              </>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
}
