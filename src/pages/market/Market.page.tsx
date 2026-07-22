"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useTranslation } from "react-i18next";
import CoinTicker from "@/components/CoinTicker/CoinTicker";
import { COINS, MONEYCOIN } from "@/datafake/home";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import HeaderMobile from "@/components/PrimaryLayout/HeaderMobile";
import AccountDrawer from "@/components/subMenu/AccountDrawer";

export default function MarketPage() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [tab, setTab] = useState(0);
  const [searchText, setSearchText] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const coinList = useMemo(() => {
    return tab == 1 ? MONEYCOIN : COINS;
  }, [tab]);
  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "448px" },
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pb: "100px",
      }}
    >
      <HeaderMobile user={user} onClick={() => setOpen(true)} />
      <Box
        sx={{
          width: "95%",
          margin: "auto",
          mt: "20px",
        }}
      >
        <Box mb={2}>
          <TextField
            fullWidth
            placeholder="Tìm Kiếm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 40,
                borderRadius: "14px",
                background: "#1A1B24",
                color: "#fff",

                "& fieldset": {
                  borderColor: "#1A1B24",
                },

                "&:hover fieldset": {
                  borderColor: "#1A1B24",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#1A1B24",
                },
              },

              "& input": {
                fontSize: 16,
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ color: "#5e5e7a" }}
                      width="20"
                      height="20"
                    />
                  </InputAdornment>
                ),
                endAdornment: searchText ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchText("")}
                      edge="end"
                    >
                      <CloseIcon fontSize="small" sx={{ color: "#5e5e7a" }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
          <Box display={"flex"} alignItems={"center"} mt={2}>
            <Image
              width={30}
              height={30}
              alt=""
              src={"/images/market.png"}
              style={{ height: "20px", objectFit: "contain" }}
            />
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {t(`HomePage.title2`)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", mb: "20px" }}>
          <Button
            sx={{
              background: tab == 0 ? "#00A609" : "none",
              fontSize: 14,
              textTransform: "capitalize",
              color: "white",
              borderRadius: 20,
              border: "1px solid #3C3E53",
            }}
            onClick={() => setTab(0)}
          >
            {t(`HomePage.menu1`)}
          </Button>
          <Button
            sx={{
              background: tab == 1 ? "#00A609" : "none",
              fontSize: 14,
              textTransform: "capitalize",
              color: "white",
              borderRadius: 20,
              border: "1px solid #3C3E53",
            }}
            onClick={() => setTab(1)}
          >
            {t(`HomePage.menu2`)}
          </Button>
          <Button
            sx={{
              background: tab == 2 ? "#00A609" : "none",
              fontSize: 14,
              textTransform: "capitalize",
              color: "white",
              borderRadius: 20,
              border: "1px solid #3C3E53",
            }}
            onClick={() => setTab(2)}
          >
            {t(`HomePage.menu2`)}
          </Button>
        </Box>

        <CoinTicker
          key={tab}
          listCoin={coinList}
          tab={tab}
          search={searchText}
        />
      </Box>

      <AccountDrawer onClose={() => setOpen(false)} open={open} />
    </Box>
  );
}
