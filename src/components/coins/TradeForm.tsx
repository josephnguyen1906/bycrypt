"use client";

import { getBuySellConfig } from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
import {
  Box,
  Button,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export interface ITypeTrade {
  type: number;
  hytime: string;
  hyykbl: string;
  price: number;
  selectTime: string;
  method: string;
}
interface InputProps {
  onSubmit: (e: ITypeTrade) => void;
  user: IUser | null;
  tradeYn: boolean;
  isSubmitting?: boolean;
}

export default function TradeForm({ onSubmit, user, tradeYn, isSubmitting = false }: InputProps) {
  const [buySellConfig, setBuySellConfig] = useState<any>(null);

  // STATE RIÊNG CHO TĂNG
  const [tradeUp, setTradeUp] = useState({
    type: 0,
    hytime: "",
    hyykbl: "",
    price: 0,
    selectTime: "",
    hy_min_per_frame: 0,
    hy_max_per_frame: 0,
    method: "1",
  });

  // STATE RIÊNG CHO GIẢM
  const [tradeDown, setTradeDown] = useState({
    type: 0,
    hytime: "",
    hyykbl: "",
    price: 0,
    hy_min_per_frame: 0,
    hy_max_per_frame: 0,
    selectTime: "",
    method: "2",
  });

  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getBuySellConfig();

        if (res.status === true) {
          const data = res.data;

          const processedData = {
            ...data,
            hy_time: data.hy_time?.split(",") || [],
            hy_ykbl: data.hy_ykbl?.split(",") || [],
            hy_tzed: data.hy_tzed?.split(",") || [],
            hy_min_per_frame: data.hy_min_per_frame?.split(",") || [],
            hy_max_per_frame: data.hy_max_per_frame?.split(",") || [],
            hy_min: Number(data.hy_min || 0),
            hy_max: Number(data.hy_max || 999999999),
          };

          setBuySellConfig(processedData);
          console.log(
            "hy_min_per_frame",
            processedData.hy_min_per_frame?.[0] || 0,
          );

          const defaultData = {
            type: 0,
            hytime: processedData.hy_time?.[0] || "",
            hyykbl: processedData.hy_ykbl?.[0] || "",
            price: 0,
            selectTime: processedData.hy_time?.[0] || "",
            hy_min_per_frame: Number(processedData.hy_min_per_frame?.[0] || 0),
            hy_max_per_frame: Number(processedData.hy_max_per_frame?.[0] || 0),
          };

          setTradeUp({ ...defaultData, method: "1" });
          setTradeDown({ ...defaultData, method: "2" });
        }
      } catch (error) {}
    };

    referral();
  }, []);

  // HANDLE CHANGE TIME
  const handleChangeTime = (event: any, mode: "up" | "down") => {
    const value = event.target.value;

    const index = buySellConfig.hy_time.findIndex(
      (item: any) => item === value,
    );

    const updateData = {
      type: index,
      hytime: value,
      hyykbl: buySellConfig.hy_ykbl[index],
      price: 0,
      hy_min_per_frame: buySellConfig.hy_min_per_frame[index],
      hy_max_per_frame: buySellConfig.hy_max_per_frame[index],
      selectTime: value,
    };

    if (mode === "up") {
      setTradeUp((prev) => ({
        ...prev,
        ...updateData,
      }));
    } else {
      setTradeDown((prev) => ({
        ...prev,
        ...updateData,
      }));
    }
  };

  // HANDLE CHANGE PRICE
  const handlePrice = (mode: "up" | "down", value: number) => {
    if (mode === "up") {
      setTradeUp((prev) => ({
        ...prev,
        price: Number(value),
      }));
    } else {
      setTradeDown((prev) => ({
        ...prev,
        price: Number(value),
      }));
    }
  };

  const hanldSubmit = (isUp: boolean) => {
    if (isUp) {
      onSubmit(tradeUp);
    } else {
      onSubmit(tradeDown);
    }
  };

  // COMPONENT FORM
  const renderTradeBox = (mode: "up" | "down", data: any) => {
    const isUp = mode === "up";
    const minPrice = Number(data?.hy_min_per_frame || 0);
    const maxPrice = Number(data?.hy_max_per_frame || 0);

    const isMinError = Number(data.price) < minPrice;
    const isMaxError = Number(data.price) > maxPrice;
    return (
      <Box
        sx={{
          background:
            "linear-gradient(90deg, rgba(16,22,30,1) 0%, rgba(9,14,20,1) 100%)",
          borderRadius: "12px",
          padding: "12px",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* SELECT */}
        <Select
          fullWidth
          value={data.selectTime}
          onChange={(e) => handleChangeTime(e, mode)}
          sx={{
            height: "46px",
            color: "#fff",
            borderRadius: "10px",
            background:
              "linear-gradient(90deg, rgba(23,30,38,1) 0%, rgba(14,20,27,1) 100%)",

            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "& .MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
        >
          {buySellConfig?.hy_time?.map((item: any, index: number) => (
            <MenuItem key={index} value={item}>
              {Number(item) * 60}s
            </MenuItem>
          ))}
        </Select>

        {/* INPUT */}
        <Box
          sx={{
            mt: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background:
              "linear-gradient(90deg, rgba(23,30,38,1) 0%, rgba(14,20,27,1) 100%)",
            borderRadius: "10px",
            padding: "5px 12px",
            gap: "12px",
          }}
        >
          <Button
            sx={{
              minWidth: "25px",
              width: "25px",
              height: "25px",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
            }}
            onClick={() =>
              handlePrice(mode, Math.max(0, Number(data.price ?? 0) - 100))
            }
          >
            -
          </Button>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#aaa",
                fontSize: "12px",
              }}
            >
              Giá(USDT)
            </Typography>

            <InputBase
              value={mode === "up" ? tradeUp.price : tradeDown.price}
              onChange={(e: any) => {
                const value = e.target.value.replace(/\D/g, "");
                handlePrice(mode, Number(value));
              }}
              sx={{
                width: "100%",

                "& input": {
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 700,
                },
              }}
            />
          </Box>

          <Button
            sx={{
              minWidth: "25px",
              width: "25px",
              height: "25px",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
            }}
            onClick={() => handlePrice(mode, Number(data.price) + 100)}
          >
            +
          </Button>
        </Box>

        {/* INFO */}
        <Box mt="16px">
          <Typography
            sx={{
              color: "#fff",
              mb: "8px",
              fontSize: "12px",
            }}
          >
            Số dư{" "}
            <b>{Number(user?.balance?.usdt ?? 0).toLocaleString()} USDT</b>
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              mb: "8px",
              fontSize: "12px",
            }}
          >
            Đầu tư hiện tại
          </Typography>

          <Typography
            sx={{
              color: "#aaa",
              mb: "8px",
              fontSize: "12px",
            }}
          >
            Hướng đầu tư{" "}
            <b style={{ color: "#fff" }}>{isUp ? "Mua lên" : "Mua xuống"}</b>
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              textAlign: "right",
              mb: "16px",
              fontSize: "12px",
            }}
          >
            Tỷ suất lợi nhuận đầu tư{" "}
            <b style={{ color: "#fff" }}>{data.hyykbl}%</b>
          </Typography>

          <Button
            fullWidth
            disabled={!user || tradeYn || isMaxError || isSubmitting}
            sx={{
              height: "46px",
              borderRadius: "999px",
              background: isUp ? "#02c173" : "#F20D3A",
              color: "#fff",
              fontWeight: 700,
              "&:disabled": {
                background: "gray",
              },
              "&:hover": {
                background: isUp ? "#02c173" : "#d10b32",
              },
            }}
            onClick={() => {
              hanldSubmit(isUp);
            }}
          >
            {isUp ? "Mua lên" : "Mua xuống"}
          </Button>

          {isMaxError && (
            <Typography
              sx={{
                color: "#ef4444",
                fontSize: "12px",
                mt: "8px",
              }}
            >
              Số tiền tối đa là {maxPrice.toLocaleString()} USDT
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        background: "#0D1117",
        padding: "16px",
      }}
    >
      {renderTradeBox("up", tradeUp)}
      {renderTradeBox("down", tradeDown)}
    </Box>
  );
}
