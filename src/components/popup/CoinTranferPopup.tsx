"use client";

import {
  Drawer,
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Divider,
  TextField,
  IconButton,
  DialogTitle,
  List,
  ListItemButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { IFinaceBalace, IUser } from "@/shared/interfaces";
import {
  createOrder,
  getBuySellConfig,
  getListCoin,
} from "@/services/User.service";

interface Props {
  data: IFinaceBalace[];
  open: boolean;
  onClose: () => void;
  handleSelectCoin: (v: IFinaceBalace) => void;
  coin: IFinaceBalace | undefined;
}

export default function CoinTranferPopup({
  data,
  open,
  onClose,
  handleSelectCoin,
  coin,
}: Props) {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: "65vh",
          maxHeight: "90vh",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          background: "#0e0e0e",
          color: "white",

          zIndex: 999999999,
          borderRadius: "20px",
          borderTop: "1px solid #e5e7eb",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            background: "#fff3",
            width: "50px",
            height: "3px",
            margin: "auto",
            mt: "3px",
            borderRadius: "3px",
          }}
        ></Box>
        <DialogTitle sx={{ textAlign: "center" }}>Select coin</DialogTitle>
      </Box>

      <List
        sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          cursor: "pointer",
          pb: "120px",
        }}
      >
        {data.map((d) => (
          <ListItemButton
            key={d.id}
            onClick={() => handleSelectCoin(d)}
            sx={{
              background: d.id === coin?.id ? "#10b9811a" : "none",
              p: 2,
            }}
          >
            <Typography
              sx={{
                flex: 1,
                color: d.id === coin?.id ? "#22c55e" : "#fff",
              }}
            >
              {d.title}
            </Typography>

            {d.id === coin?.id && (
              <Typography color="#22c55e">● Current</Typography>
            )}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
