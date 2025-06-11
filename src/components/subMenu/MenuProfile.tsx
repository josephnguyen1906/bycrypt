import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import HistoryIcon from "@mui/icons-material/History";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatMoney";
import {
  GiftMenuIcon,
  HistoryMenuIcon,
  InvoiceMenuIcon,
  LiveChatMenuIcon,
  LogoutMenuIcon,
  NapIcon,
  NapMenuIcon,
  OverviewIcon,
  ProfileIcon,
  RutIcon,
  RutMenuIcon,
  UserIcon,
} from "@/shared/Svgs/Svg.component";
import Image from "next/image";
import NavigationGame from "@/hook/NavigationGame";

export interface UserProps {
  user: {
    coin: number;
    username: string;
  };
}

export default function MenuProfile({ user }: UserProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItemStyles = {
    minWidth: "200px",
    color: "#000",
    fontSize: "14px",
    "&:hover": {
      background: "lightgrey",
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    },
  };
  const menuItems = [
    {
      text: "Overview",
      icon: <OverviewIcon />,
      onClick: () => router.push("/overview"),
    },
    {
      text: "Account",
      icon: <ProfileIcon />,
      onClick: () => router.push("/profile"),
    },
    {
      text: "Security settings",
      icon: <NapIcon />,
      onClick: () => router.push("/profile/account-deposit"),
    },
    {
      text: "Account verification",
      icon: <RutIcon />,
      onClick: () => router.push("/profile/account-withdraw"),
    },
    {
      text: "Invitation to join",
      icon: <GiftMenuIcon />,
      onClick: () => router.push("/promotion"),
    },
    {
      text: "Notification",
      icon: <HistoryMenuIcon />,
      onClick: () => router.push("/profile/transaction-history"),
    },

    {
      text: "Live chat 24/7",
      icon: <LiveChatMenuIcon />,
      onClick: () => NavigationGame("https://t.me/HitJuwa"),
    },
    {
      text: "My invoice",
      icon: <InvoiceMenuIcon />,
      onClick: () => NavigationGame("https://t.me/HitJuwa"),
    },
    {
      text: "Log out",
      icon: <LogoutMenuIcon />,
      onClick: () => {
        window.localStorage.removeItem("tokenku99");
        window.location.href = "/";
      },
    },
  ];
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          textAlign: "center",
        }}
      >
        {/* Nút Rút, Nạp và Icon Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Nút Rút */}
          {/* Icon mở menu */}
          <Tooltip title="">
            <button
              onClick={handleClick}
              style={{
                border: "none",
                borderRadius: "0",
                background: "none",
                cursor: "pointer",
              }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <UserIcon />
            </button>
          </Tooltip>
        </Box>

        {/* Menu thả xuống */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{
            zIndex: 9999999,
          }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                border: "1px solid #353d50",
                background: "#fff",
                borderRadius: 2,
                mt: 1.5,
                color: "#000",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "#fff",
                  borderTop: "1px solid #353d50",
                  borderLeft: "1px solid #353d50",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {menuItems.map((item, index) => {
            return (
              <MenuItem onClick={item.onClick} sx={menuItemStyles} key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {item.text}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </React.Fragment>
  );
}
