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
import { IOrepoolIterm } from "@/shared/interfaces";

interface progs {
  open: boolean;
  data: IOrepoolIterm | null;
  onSubmit: () => void;
  onClose: () => void;
}
export default function InvestPopup({ data, onClose, open }: progs) {
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
            Invest in {data?.title}
          </Typography>

          <Typography fontSize="13px" color="#94a3b8">
            Amount (USDT)
          </Typography>

          <TextField
            placeholder="Enter amount"
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
            Price per token: {Number(data?.asknum).toLocaleString()} USDT
          </Typography>

          <Box display="flex" gap={2}>
            <Button
              fullWidth
              variant="contained"
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
              variant="contained"
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
              Invest
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
