import { IUser } from "@/shared/interfaces";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { getPerpBalance } from "@/services/User.service";
import { useRouter } from "next/navigation";

type ContractStats = {
  margin_balance: number;
  wallet_balance: number;
  unrealized_pnl: number;
};

export default function Tab3Page({ user }: { user: IUser | null }) {
  const [show, setShow] = useState(true);
  const [tab, setTab] = useState(0);
  const [stats, setStats] = useState<ContractStats>({
    margin_balance: 0,
    wallet_balance: 0,
    unrealized_pnl: 0,
  });
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res: any = await getPerpBalance();
        if (cancelled || res?.status !== true) return;
        const data = res.data ?? {};
        setStats({
          margin_balance: Number(data.margin_balance ?? data.frozen_margin_usdt ?? 0),
          wallet_balance: Number(data.wallet_balance ?? data.available_usdt ?? 0),
          unrealized_pnl: Number(data.unrealized_pnl ?? 0),
        });
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fmt = (n: number) => (show ? n.toLocaleString() : "*****");

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={2} mb={1}>
        <Button
          fullWidth
          sx={{
            bgcolor: tab == 0 ? "#08D27A" : "transparent",
            color: "#fff",
            borderRadius: "8px",
            height: 34,
            fontSize: 12,
            fontWeight: 700,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#08D27A",
            },
          }}
          onClick={() => setTab(0)}
        >
          {t("TradePage.title14")}
        </Button>

        <Button
          fullWidth
          sx={{
            bgcolor: tab == 1 ? "#08D27A" : "transparent",
            color: "#fff",
            borderRadius: "8px",
            height: 34,
            fontSize: 12,
            fontWeight: 700,
            textTransform: "none",
          }}
          onClick={() => setTab(1)}
        >
          {t("TradePage.title15")}
        </Button>
      </Stack>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography
              sx={{ color: "#868c9a", fontSize: 16, fontWeight: 600 }}
            >
              {t("AccountPage.title1")} (USDT)
            </Typography>
            <IconButton
              sx={{ background: "none", width: 25, height: 25 }}
              onClick={() => setShow(!show)}
            >
              {show ? (
                <Visibility fontSize="small" sx={{ color: "#868c9a" }} />
              ) : (
                <VisibilityOff fontSize="small" sx={{ color: "#868c9a" }} />
              )}
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ color: "white", fontSize: 25, fontWeight: 600 }}>
              {show
                ? Number(user?.balance?.usdt_total).toLocaleString()
                : "*****"}
            </Typography>
            <Typography sx={{ color: "#868c9a", fontSize: 16, mt: "-5px" }}>
              ≈${Number(user?.balance?.usdt).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Button sx={{ width: 39 }} onClick={() => router.push("/history")}>
          <Image
            src={"/images/icon-history.png"}
            width={39}
            height={22}
            alt=""
            style={{ objectFit: "contain" }}
          />
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ color: "white", fontSize: 16, fontWeight: 600 }}>
            {t("AccountPage.title7")} (USDT)
          </Typography>
          <Typography sx={{ color: "white", fontSize: 25, fontWeight: 600 }}>
            {fmt(stats.margin_balance)}
          </Typography>
          <Typography sx={{ color: "#868c9a", fontSize: 16, mt: "-5px" }}>
            ≈${fmt(stats.margin_balance)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ color: "white", fontSize: 16, fontWeight: 600 }}>
            {t("AccountPage.title8")} (USDT)
          </Typography>
          <Typography sx={{ color: "white", fontSize: 25, fontWeight: 600 }}>
            {fmt(stats.wallet_balance)}
          </Typography>
          <Typography sx={{ color: "#868c9a", fontSize: 16, mt: "-5px" }}>
            ≈${fmt(stats.wallet_balance)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", pt: 3 }}>
        <Typography sx={{ color: "white", fontSize: 16, fontWeight: 600 }}>
          {t("AccountPage.title9")} (USDT)
        </Typography>
        <Typography sx={{ color: "white", fontSize: 25, fontWeight: 600 }}>
          {fmt(stats.unrealized_pnl)}
        </Typography>
        <Typography sx={{ color: "#868c9a", fontSize: 16, mt: "-5px" }}>
          ≈${fmt(stats.unrealized_pnl)}
        </Typography>
      </Box>
    </Box>
  );
}
