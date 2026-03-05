"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  TextField,
} from "@mui/material";
import { IOrepoolIterm, IStaking } from "@/shared/interfaces";

interface progs {
  open: boolean;
  data: IStaking | null;
  onSubmit: () => void;
  onClose: () => void;
}
export default function StakingPopup({ data, onClose, open, onSubmit }: progs) {
  const handleInvest = () => {
    console.log("Invest clicked");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "white",
          width: "420px",
        },
      }}
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography fontWeight="bold" fontSize="18px">
            Purchase {data?.open} day
          </Typography>

          <Typography fontSize="13px" color="#94a3b8">
            Amount (USDT)
          </Typography>

          <TextField
            placeholder={"Min: " + Number(data?.min).toLocaleString() + " USDT"}
            fullWidth
            size="small"
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                background: "#0f172a",
              },
            }}
          />

          <Typography fontSize="12px" color="#94a3b8">
            Daily return: {data?.percent}%
          </Typography>

          <Box display="flex" gap={2}>
            <Button
              fullWidth
              onClick={onClose}
              sx={{
                background: "#374151",
                borderRadius: "10px",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#374151",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              onClick={handleInvest}
              sx={{
                background: "#22c55e",
                borderRadius: "10px",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#22c55e",
                },
              }}
            >
              Purchase
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
