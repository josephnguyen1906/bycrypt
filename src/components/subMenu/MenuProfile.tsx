import * as React from "react";
import Box from "@mui/material/Box";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { Button, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  GiftMenuIcon,
  HistoryMenuIcon,
  InvoiceMenuIcon,
  LiveChatMenuIcon,
  LogoutMenuIcon,
  NapIcon,
  OverviewIcon,
  ProfileIcon,
  RutIcon,
  UserIcon,
} from "@/shared/Svgs/Svg.component";
import NavigationGame from "@/hook/NavigationGame";
import { MenuAset, menuItems } from "@/datafake/Menu";
import Link from "next/link";

export interface UserProps {
  user: {
    coin: number;
    username: string;
  };
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 200,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: "14px",
        color: theme.palette.text.secondary,
        // marginRight: theme.spacing(1.5),
      },
      padding: theme.spacing(1.5, 2),
      "& p": {
        margin: 0,
        fontSize: "14px",
        color: theme.palette.text.secondary,
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function MenuProfile({ user }: UserProps) {
  const [profileAnchorEl, setProfileAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = React.useState<null | string>(null);
  const router = useRouter();

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    type: "profile" | "submenu",
    id?: string
  ) => {
    if (type === "profile") {
      if (profileAnchorEl) {
        setProfileAnchorEl(null);
      } else {
        setProfileAnchorEl(event.currentTarget);
        setSubMenuAnchorEl(null);
        setMenuId(null);
      }
    } else if (type === "submenu" && id) {
      if (subMenuAnchorEl && menuId === id) {
        setSubMenuAnchorEl(null);
        setMenuId(null);
      } else {
        setSubMenuAnchorEl(event.currentTarget);
        setProfileAnchorEl(null);
        setMenuId(id);
      }
    }
  };

  const handleClose = () => {
    setProfileAnchorEl(null);
    setSubMenuAnchorEl(null);
    setMenuId(null);
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
        {MenuAset.map((item) => (
          <Box key={item.id}>
            <a
              id={`menu-button-${item.id}`}
              aria-controls={
                subMenuAnchorEl && menuId === item.id
                  ? `menu-${item.id}`
                  : undefined
              }
              aria-haspopup="true"
              aria-expanded={
                subMenuAnchorEl && menuId === item.id ? "true" : undefined
              }
              onClick={(e) => handleClick(e, "submenu", item.id)}
              href={item.item.length === 0 ? item.link : undefined}
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "80px",
                justifyContent: "center",
              }}
            >
              {item.title}
              <KeyboardArrowDownIcon />
            </a>
            {item.item.length > 0 && (
              <StyledMenu
                id={`menu-${item.id}`}
                anchorEl={subMenuAnchorEl}
                open={Boolean(subMenuAnchorEl) && menuId === item.id}
                onClose={handleClose}
              >
                {item.item.map((subItem: any, index: number) => (
                  <MenuItem
                    key={index}
                    onClick={handleClose}
                    sx={{ width: 250 }}
                  >
                    <Link
                      href={subItem.link}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      {subItem.icon}
                      <div
                        style={{ marginLeft: 8, width: "calc(100% - 24px)" }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            width: "100%",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            fontWeight: "550",
                            fontSize: "14px",
                          }}
                        >
                          {subItem.title}
                        </Typography>
                      </div>
                    </Link>
                  </MenuItem>
                ))}
              </StyledMenu>
            )}
          </Box>
        ))}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <button
            onClick={(e) => handleClick(e, "profile")}
            style={{
              border: "none",
              borderRadius: "0",
              background: "none",
              cursor: "pointer",
            }}
            aria-controls={profileAnchorEl ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={profileAnchorEl ? "true" : undefined}
          >
            <UserIcon />
          </button>
          <StyledMenu
            anchorEl={profileAnchorEl}
            id="account-menu"
            open={Boolean(profileAnchorEl)}
            onClose={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  border: "1px solid #353d50",
                  background: "white",
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
            {menuItems.map((item: any, index) => (
              <MenuItem
                onClick={() => {
                  if (item.link === "/logout") {
                    window.localStorage.removeItem("tokenokx");
                    window.location.href = "/";
                    handleClose();
                  } else {
                    router.push(item.link || "/");
                    handleClose();
                  }
                }}
                sx={menuItemStyles}
                key={index}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {item.text}
              </MenuItem>
            ))}
          </StyledMenu>
        </Box>
      </Box>
    </React.Fragment>
  );
}
