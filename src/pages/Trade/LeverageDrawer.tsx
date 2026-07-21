import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Grid,
  InputBase,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  leverage: number;
  onChange: (value: number) => void;
  available?: number;
}

const list = [1, 5, 10, 20, 30, 40, 50, 80, 100];

export default function LeverageDrawer({
  open,
  onClose,
  leverage,
  onChange,
  available = 0,
}: Props) {
  const { t } = useTranslation();
  const decrease = () => {
    if (leverage > 1) onChange(leverage - 1);
  };

  const increase = () => {
    if (leverage < 100) onChange(leverage + 1);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          width: {
            xs: "100%",
            sm: 448,
          },
          left: {
            xs: 0,
            sm: "calc(50% - 224px)",
          },
          right: "auto",
          height: "70vh",
          bgcolor: "#0E0F18",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          color: "#fff",
        },
      }}
    >
      <Box p={2}>
        {/* Header */}

        <Box sx={{ position: "relative", mb: 4 }}>
          <Box
            sx={{
              width: 36,
              height: 4,
              bgcolor: "#3A3D4A",
              borderRadius: 10,
              mx: "auto",
              mb: 2,
            }}
          />

          <Typography align="center" fontWeight={700} fontSize={14}>
            {t("DepositWithdrawPage.label1")}
          </Typography>

          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              color: "#7E8395",
              bgcolor: "#1A1C28",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Step */}
        <Box
          sx={{
            width: "40%",
            justifyContent: "center",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            bgcolor: "#0A0A0F",
            borderRadius: 2,
            p: 1,
            mb: 3,
            gap: 1,
          }}
        >
          <IconButton
            onClick={decrease}
            sx={{
              bgcolor: "#202432",
              color: "#fff",
              fontSize: 14,
              width: 34,
              height: 34,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#2A3042",
              },
            }}
          >
            <RemoveIcon sx={{ fontSize: 14 }} />
          </IconButton>

          <InputBase
            value={leverage}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              if (value === "") {
                onChange(1);
                return;
              }

              let number = Number(value);

              if (number < 1) number = 1;
              if (number > 100) number = 100;

              onChange(number);
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              style: {
                textAlign: "center",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
              },
            }}
            sx={{
              flex: 1,
            }}
          />

          <IconButton
            onClick={increase}
            sx={{
              bgcolor: "#202432",
              color: "#fff",
              fontSize: 14,
              width: 34,
              height: 34,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#2A3042",
              },
            }}
          >
            <AddIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>

        {/* Preset */}

        <Grid container spacing={1.5}>
          {list.map((item) => (
            <Grid size={3} key={item}>
              <Box
                onClick={() => onChange(item)}
                sx={{
                  cursor: "pointer",
                  height: 42,
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                  justifyContent: "center",
                  bgcolor: leverage === item ? "transparent" : "#0A0A0F",
                  border:
                    leverage === item
                      ? "1px solid #00D47E"
                      : "1px solid transparent",
                  color: "#fff",
                  fontWeight: 400,
                }}
              >
                {item}x
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Bottom */}

        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography fontWeight={400} fontSize={12} color="#fff">
            {t("DepositWithdrawPage.label2")}
          </Typography>

          <Typography fontWeight={400} fontSize={12} color="#fff">
            {available} {t("TradePage.title9")}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
