import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import Logout from "@mui/icons-material/Logout";
import FolderIcon from "@mui/icons-material/Folder";
import CloseIcon from "@mui/icons-material/Close";
import { userResponse } from "@/interface/user.interface";
import { Badge, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatMoney";
import Image from "next/image";
import {
  BankMenuIcon,
  DashboardIcon,
  GiftMenuIcon,
  HistoryBetMenuIcon,
  HistoryMenuIcon,
  InternetIcon,
  LiveChatMenuIcon,
  LogoutMenuIcon,
  MessageIcon,
  NapMenuIcon,
  P2PMenuIcon,
  ProfileIcon,
  RutMenuIcon,
  StarIcon,
  WarningIcon,
} from "@/shared/Svgs/Svg.component";
import NavigationGame from "@/hook/NavigationGame";
import {
  MenuAset,
  MenuAset2,
  menuItemMobile,
  menuItemMobile2,
  menuItems,
} from "@/datafake/Menu";

export interface userProps {
  staking: any | null;
}

export default function Stakingdetail(data: userProps) {
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const open1 = Boolean(anchorEl1);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleMenuItemClick = (onClick: () => void) => {
    onClick();
    handleDrawerClose();
  };

  const drawerList = () => (
    <Box
      sx={{
        width: "100vw",
        background: "#000",
        color: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          background: "#000",
          color: "#fff",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>Staking</Typography>
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            color: "white",
            background: "#909090",
            borderRadius: "50%",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "24px" }} />
        </IconButton>
      </Box>
      <TextField
        sx={{
          width: "90%",
          margin: "16px auto",
          background: "#909090",
          borderRadius: "10px",
          color: "white",
          border: "none",

          "& .MuiOutlinedInput-root": {
            color: "white",
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
        placeholder="Search"
        variant="outlined"
        InputProps={{
          startAdornment: <IconButton>{/* <SearchIcon /> */}</IconButton>,
        }}
      />
    </Box>
  );

  return (
    <React.Fragment>
      <Box>
        <Button
          type="button"
          sx={{
            width: "100px",
            height: "40px",
            background: "#fff",
            color: "black",
            borderRadius: "10px",

            "&:hover": {
              backgroundColor: "#fff",
            },
          }}
          onClick={handleClick}
        >
          Join now
        </Button>
      </Box>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          zIndex: 9999999,
          "& .MuiDrawer-paper": {
            background: "#1a263f",
            border: "none",
            borderRadius: "0",
          },
        }}
      >
        {drawerList()}
      </Drawer>
    </React.Fragment>
  );
}
