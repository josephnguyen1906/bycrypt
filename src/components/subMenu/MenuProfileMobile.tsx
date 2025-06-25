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
import { Badge, Button, Dialog } from "@mui/material";
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
  NotiIcon,
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
import TranslateGoogle from "../GgTranstale/TranslateContext.component";
import LanguageSwitcher from "../Language/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import AddToHomeScreenButton from "../Button/AddToHomeScreenButton";

export interface userProps {
  user: userResponse | null;
  noti: any | null;
}

export default function MenuProfileMobile(data: userProps) {
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [langAnchorEl, setLangAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const isLangMenuOpen = Boolean(langAnchorEl);
  const { t, i18n } = useTranslation();
  const open1 = Boolean(anchorEl1);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickLang = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleClickPopup = (event: React.MouseEvent<HTMLElement>) => {
    setPopupOpen(true);
  };

  const handleDrawerPopupClose = () => {
    setPopupOpen(false);
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
      {data.user ? (
        <Box>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              background: "#000",
              color: "#fff",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Avatar
                src="/images/avatar-4.webp"
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: "bold", color: "white" }}
                >
                  {data.user?.username || "huyn19e6bffa5"}
                </Typography>
                <Typography sx={{ fontSize: "13px", color: "white" }}>
                  {t("MenuMobile.title1")}
                </Typography>
              </Box>
            </Box>
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
          <Typography
            sx={{ fontSize: "18px", fontWeight: "600", padding: "10px" }}
          >
            {t("MenuMobile.title2")}
          </Typography>
          {/* Menu Items */}
          <List sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {menuItemMobile2.map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "30%",
                  justifyContent: "center",
                }}
              >
                <ListItemButton
                  onClick={() => {
                    if (item.link === "/logout") {
                      window.localStorage.removeItem("tokenStaking");
                      window.location.href = "/";
                      handleDrawerClose();
                    } else {
                      router.push(item.link || "/");
                      handleDrawerClose();
                    }
                  }}
                  sx={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    justifyItems: "center",
                    margin: "auto",
                    borderRadius: "10px",
                    "&:hover": {
                      background: "none",
                    },
                  }}
                >
                  {item.icon}
                  <Typography sx={{ fontSize: "13px", textAlign: "center" }}>
                    {t(`MenuMobile.Shortcuts.menu` + index)}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              padding: "10px",
              borderTop: "1px solid lightgrey",
            }}
          >
            {t("MenuMobile.title3")}
          </Typography>
          {/* Menu Items */}
          <List sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {MenuAset2.map((item, index) => (
              <ListItem
                key={item.title}
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "30%",
                  justifyContent: "center",
                }}
              >
                <ListItemButton
                  onClick={() => {
                    if (item.link === "/logout") {
                      window.localStorage.removeItem("tokenStaking");
                      window.location.href = "/";
                      handleDrawerClose();
                    } else {
                      router.push(item.link || "/");
                      handleDrawerClose();
                    }
                  }}
                  sx={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    justifyItems: "center",
                    margin: "auto",
                    borderRadius: "10px",
                    "&:hover": {
                      background: "none",
                    },
                  }}
                >
                  {item.icon}
                  <Typography sx={{ fontSize: "13px", textAlign: "center" }}>
                    {t(`MenuMobile.assets.menu` + index)}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Sign Out Button */}
          <Box
            sx={{
              padding: "16px",
              position: "fixed",
              bottom: 0,
              width: "100%",
            }}
          >
            <Button
              onClick={() =>
                handleMenuItemClick(() => {
                  window.localStorage.removeItem("tokenStaking");
                  window.location.href = "/";
                })
              }
              sx={{
                width: "100%",
                background: "transparent",
                color: "white",
                border: "1px solid #2f3b56",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "14px",
                padding: "8px 0",
                "&:hover": {
                  background: "#2f3b56",
                },
              }}
            >
              <LogoutMenuIcon fill="#fff" />
              {t("MenuMobile.title7")}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          {/* Header Section */}
          <Box
            sx={{
              display: "grid",
              alignItems: "center",
              padding: "100px 20px",
              background: "#000",
              color: "white",
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: "30px", fontWeight: "600", color: "white" }}
            >
              {t("MenuMobile.title4")}
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "#fff" }}>
              {t("MenuMobile.title5")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                marginTop: "15px",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <Button
                href="/login"
                sx={{
                  width: "45%",
                  height: "40px",
                  borderRadius: "15px",
                  background: "#fff",
                  border: "1px solid #000",
                  textTransform: "capitalize",
                  color: "black",
                  "&:hover": {
                    background: "white",
                  },
                }}
              >
                {t("HomePage.mobile_login")}
              </Button>
              <Button
                href="/signup"
                sx={{
                  width: "45%",
                  height: "40px",
                  borderRadius: "15px",
                  background: "#909090",
                  border: "1px solid #000",
                  textTransform: "capitalize",
                  color: "black",
                  "&:hover": {
                    background: "#909090",
                  },
                }}
              >
                {t("HomePage.mobile_signup")}
              </Button>
            </Box>
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                position: "fixed",
                width: "40px",
                height: "40px",
                color: "white",
                background: "#909090",
                borderRadius: "50%",
                top: "20px",
                right: "20px",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <CloseIcon sx={{ fontSize: "24px" }} />
            </IconButton>
          </Box>
          {/* Sign Out Button */}
          <Box
            sx={{
              padding: "16px",
              position: "fixed",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <WarningIcon width="25px" height="25px" fill="#fff" />
              <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                {t("MenuMobile.title6")}
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: "16px", fontWeight: 400, color: "#909090" }}
            >
              v6.123.0
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );

  const menuTranslate = () => (
    <Box
      sx={{
        width: "100%",
        background: "#909090",
        color: "#fff",
        height: "200px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "200px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
          Select language
        </Typography>
      </Box>
    </Box>
  );
  const popupNotication = () => (
    <Box
      sx={{
        width: "100vw",
        background: "#000",
        color: "#fff",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          padding: "16px",
          background: "#000",
          color: "#fff",
          position: "relative",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: "bold", color: "white" }}
        >
          {t("ProfilePage.noti")}
        </Typography>

        <IconButton
          onClick={handleDrawerPopupClose}
          sx={{
            color: "white",
            background: "#909090",
            borderRadius: "50%",
            position: "absolute",
            right: "20px",
            top: "10px",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "24px" }} />
        </IconButton>
      </Box>
      <Box
        sx={{ width: "90%", height: "90%", margin: "auto", padding: "10px 0" }}
      >
        {data.noti ? (
          data.noti.map((announcement: any, index: number) => (
            <Box key={index}>
              {/* <Divider sx={{ my: 1 }} /> */}
              <Box
                sx={{
                  padding: "15px 0px",
                  borderTop: index !== 0 ? "1px solid gray" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <Typography variant="body2" color="white">
                  {announcement.title}
                </Typography>
                <Typography variant="body2" color="white">
                  {new Date(announcement.addtime).toLocaleString()}
                </Typography>

                <Typography
                  color="gray"
                  sx={{ fontSize: "14px", fontWeight: "400" }}
                >
                  {announcement.content}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                marginTop: "15px",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <Button
                href="/login"
                sx={{
                  width: "50%",
                  height: "40px",
                  borderRadius: "15px",
                  background: "#fff",
                  border: "1px solid #000",
                  textTransform: "capitalize",
                  color: "black",
                  "&:hover": {
                    background: "white",
                  },
                }}
              >
                {t("HomePage.mobile_login")}
              </Button>
              <Button
                href="/signup"
                sx={{
                  width: "50%",
                  height: "40px",
                  borderRadius: "15px",
                  background: "#909090",
                  border: "1px solid #000",
                  textTransform: "capitalize",
                  color: "black",
                  "&:hover": {
                    background: "#909090",
                  },
                }}
              >
                {t("HomePage.mobile_signup")}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <React.Fragment>
        <Box
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "none",
            },
            gap: "8px",
            height: "50px",
            lineHeight: "50px",
            padding: "8px 8px",
            background: "#000",
            border: "none",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={drawerOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={drawerOpen ? "true" : undefined}
              >
                <DashboardIcon fill="#fff" />
              </IconButton>
            </Tooltip>
            <AddToHomeScreenButton />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              paddingRight: "10px",
            }}
          >
            <Tooltip title="Hot">
              <IconButton
                onClick={handleClickPopup}
                size="small"
                aria-controls={popupOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={popupOpen ? "true" : undefined}
              >
                <NotiIcon fill="#fff" width="25px" height="25px" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Notification"
              onClick={() => router.push("https://direct.lc.chat/19194779/")}
            >
              <img src="/images/live-chat.png" width="24px" height="24px" />
            </Tooltip>
            <Tooltip title="Language">
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickLang}
              >
                <InternetIcon width="24px" height="24px" />
              </IconButton>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                width: "120px",
              }}
            >
              <LanguageSwitcher onLanguageChange={handleClose} />
            </Menu>
          </Box>
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

        <Drawer
          anchor="right"
          open={popupOpen}
          onClose={handleDrawerPopupClose}
          sx={{
            zIndex: 9999999,
            "& .MuiDrawer-paper": {
              background: "#1a263f",
              border: "none",
              borderRadius: "0",
            },
          }}
        >
          {popupNotication()}
        </Drawer>

        <Dialog
          open={isLangMenuOpen}
          onClose={handleLangMenuClose}
          PaperProps={{
            style: {
              width: "80%",
              backgroundColor: "#909090",
              color: "#fff",
              borderRadius: "8px",
              marginTop: "10%",
            },
          }}
        >
          {menuTranslate()}
        </Dialog>
      </React.Fragment>
    </>
  );
}
