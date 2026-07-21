import * as React from "react";
import Box from "@mui/material/Box";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { Button, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import TranslateGoogle from "../GgTranstale/TranslateContext.component";

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

export default function MenuTranslate({ user }: UserProps) {
  const [profileAnchorEl, setProfileAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = React.useState<null | string>(null);
  const router = useRouter();

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    type: "profile" | "submenu",
    id?: string,
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
        <TranslateGoogle />
      </Box>
    </React.Fragment>
  );
}
