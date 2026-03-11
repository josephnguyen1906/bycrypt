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
import { Icoin, IcoinFinace, userResponse } from "@/interface/user.interface";
import { Badge, Button, Dialog } from "@mui/material";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatMoney";
import Image from "next/image";
import {
  BankMenuIcon,
  DashboardIcon,
  DownIcon,
  GiftMenuIcon,
  HistoryBetMenuIcon,
  HistoryMenuIcon,
  InternetIcon,
  LiveChatMenuIcon,
  LogoutMenuIcon,
  MenuIcon,
  MessageIcon,
  NapMenuIcon,
  NotiIcon,
  P2PMenuIcon,
  ProfileIcon,
  RutMenuIcon,
  StarIcon,
  UpIcon,
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
import TranslateGoogle from "../GgTranstale/TranslateContext.component";
import LanguageSwitcher from "../Language/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import AddToHomeScreenButton from "../Button/AddToHomeScreenButton";
import { Visibility } from "@mui/icons-material";
import { formatDateTime } from "@/utils/formatDateTime";
import {
  getFinaceCoin,
  getListCoin,
  getWebsiteConfig,
} from "@/services/User.service";
import CoinMenuMobile from "../coins/CoinMenuMobile";
interface props {
  data: (string: string) => void;
  changeCoin: (v: IcoinFinace) => void;
}

export default function MenuCoin({ data, changeCoin }: props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const [configs, setConfigs] = React.useState<any>();
  const [listCoin, setListCoin] = React.useState<IcoinFinace[]>([]);
  const [percent, setPercent] = React.useState<string>();
  const [interval, setInterval] = React.useState("1m");
  const [menu, setMenu] = React.useState("btcusdt");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
  };
  React.useEffect(() => {
    data(menu);
  }, []);

  React.useEffect(() => {
    const data = listCoin.find((e) => e.name == menu.replace("usdt", ""));
    if (data) {
      changeCoin(data);
    }
  }, [menu]);
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  React.useEffect(() => {
    const referral = async () => {
      try {
        const config: any = await getWebsiteConfig();

        const listCoin: any = await getFinaceCoin();

        if (config.status === true) {
          setConfigs(config.data);
        }
        if (listCoin.status === true) {
          setListCoin(listCoin.data);
          const data = listCoin.data.find(
            (e: any) => e.name == menu.replace("usdt", ""),
          );
          if (data) {
            changeCoin(data);
          }
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    referral();
  }, []);

  return (
    <>
      <React.Fragment>
        <Box
          sx={{
            maxWidth: "448px",
            width: "100%",
            margin: "auto",
            left: 0,
            right: 0,
            position: "fixed",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            top: 0,
            textAlign: "center",
            padding: "0px 20px",
            background: "#111827",
            boxShadow: "0px -2px 5px rgba(37, 37, 37, 0.1)",
            p: 2,
          }}
        >
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={drawerOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={drawerOpen ? "true" : undefined}
          >
            <MenuIcon fill="#fff" width="20px" height="20px" />
          </IconButton>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography fontWeight="500" fontSize={18} color="#fff">
              {menu.toUpperCase().replace("USDT", "/USDT")}
            </Typography>
            <Typography
              fontWeight="500"
              fontSize={18}
              sx={{
                color: Number(percent) >= 0 ? "#00C853" : "#FF3D00",
              }}
            >
              {Number(percent).toFixed(2)}
              {Number(percent) < 0 ? (
                <DownIcon width="16px" height="16px" fill="#ef4444" />
              ) : (
                <UpIcon width="16px" height="16px" fill="#22c55e" />
              )}
            </Typography>
          </Box>
          <Tooltip title="Language">
            <IconButton onClick={() => router.push("/language")}>
              <InternetIcon width="20px" height="20px" />
            </IconButton>
          </Tooltip>
        </Box>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          sx={{
            zIndex: 9,
            padding: 0,
            "& .MuiDrawer-paper": {
              width: "60%",
              background: "#111827",
              border: "none",
              borderRadius: 0,
              p: 0,
              pb: "200px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            },
          }}
        >
          {CoinMenuMobile({
            menu: menu,
            listCoin,
            interval,
            changePercent: (v) => {
              setPercent(v);
            },
            setMenu: (v) => {
              setMenu(v);
              data(v);
              handleDrawerClose();
            },
          })}
        </Drawer>
      </React.Fragment>
    </>
  );
}
