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
import { IUser } from "@/shared/interfaces";
import { getListCoin } from "@/services/User.service";
import { Icoin } from "@/interface/user.interface";

interface Props {
  open: boolean;
  onClose: () => void;
  handleSelectCoin: (v: Icoin) => void;
  coin: string;
}

export default function CoinPopup({
  open,
  onClose,
  handleSelectCoin,
  coin,
}: Props) {
  const [listCoin, setListCoin] = useState<Icoin[]>([]);

  useEffect(() => {
    const referral = async () => {
      try {
        const listCoin: any = await getListCoin();

        if (listCoin.status === true) {
          setListCoin(listCoin.data);
        }
      } catch (errors: any) {
        // console.log(errors?.message);
      }
    };
    referral();
  }, []);
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
          maxWidth: "448px",
          margin: "auto",
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
        {listCoin.map((d) => (
          <ListItemButton
            key={d.coinname}
            onClick={() => handleSelectCoin(d)}
            sx={{
              background: d.coinname === coin ? "#10b9811a" : "none",
              p: 2,
            }}
          >
            <Typography
              sx={{
                flex: 1,
                color: d.coinname === coin ? "#22c55e" : "#fff",
              }}
            >
              {d.coinname.toUpperCase()}
            </Typography>

            {d.coinname === coin && (
              <Typography color="#22c55e">● Current</Typography>
            )}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
