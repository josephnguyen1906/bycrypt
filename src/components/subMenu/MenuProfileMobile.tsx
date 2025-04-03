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
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { userResponse } from "@/interface/user.interface";
import { Button } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import {
  AddIconMobile,
  NoticationIconMobile,
} from "@/shared/Svgs/Svg.component";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatMoney";
import FolderIcon from "@mui/icons-material/Folder";
export interface userProps {
  user: userResponse;
  message: any[];
}

export default function MenuProfileMobile(data: userProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const route = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          textAlign: "right",
          marginLeft: "4%",
        }}
      >
        <Typography
          sx={{
            borderRadius: 8,
            fontSize: 13,
            textAlign: "right",
            color: "#ebb039",
            position: "fixed",
            right: { xs: "38%", sm: "20%" },
          }}
        >
          {formatCurrency(data.user?.coin ?? 0)} USD
        </Typography>
        <IconButton
          size="small"
          sx={{ marginLeft: 5 }}
          onClick={() => route.replace("https://t.me/HitJuwa")}
        >
          <AddIconMobile />
        </IconButton>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick1}
            size="small"
            sx={{ background: "#283145", borderRadius: 8 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <NoticationIconMobile width="24px" height="24px" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src="/images/quyphai17.jpg"
              sx={{ width: 32, height: 32 }}
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
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
              background: "#0f192f",
              borderRadius: 6,
              mt: 1.5,
              color: "white",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                color: "#353d50",
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "#0f192f",
                borderTop: "1px solid #353d50",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => route.replace("/profile")}
          sx={{
            minWidth: "250px",
            "&:hover": {
              color: "#009c3b",
              background:
                "linear-gradient(90.08deg,rgba(0,156,59,.1) 3.8%,rgba(0,156,59,0) 97.33%)",
              "& .MuiSvgIcon-root": {
                color: "#353d50", // Change the icon color on hover
              },
            },
          }}
        >
          <ListItemIcon>
            <BarChartIcon
              fontSize="medium"
              sx={{
                color: "#353d50",
                "&:hover": {
                  color: "#353d50", // Icon color remains #353d50 on hover
                },
              }}
            />
          </ListItemIcon>
          Overview
        </MenuItem>
        <MenuItem
          onClick={() => route.replace("/profile/personal-detail")}
          sx={{
            minWidth: "250px",
            "&:hover": {
              color: "#009c3b",
              background:
                "linear-gradient(90.08deg,rgba(0,156,59,.1) 3.8%,rgba(0,156,59,0) 97.33%)",
              "& .MuiSvgIcon-root": {
                color: "#353d50",
              },
            },
          }}
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              fontSize="medium"
              sx={{
                color: "#353d50",
              }}
            />
          </ListItemIcon>
          Personal Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open(
              "https://t.me/HitJuwa",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          sx={{
            minWidth: "250px",
            "&:hover": {
              color: "#009c3b",
              background:
                "linear-gradient(90.08deg,rgba(0,156,59,.1) 3.8%,rgba(0,156,59,0) 97.33%)",
              "& .MuiSvgIcon-root": {
                color: "#353d50",
              },
            },
          }}
        >
          <ListItemIcon>
            <SavingsOutlinedIcon
              fontSize="medium"
              sx={{
                color: "#353d50",
              }}
            />
          </ListItemIcon>
          Deposit Money
        </MenuItem>
        <MenuItem
          onClick={() => route.replace("/profile/account-withdraw")}
          sx={{
            minWidth: "250px",
            "&:hover": {
              color: "#009c3b",
              background:
                "linear-gradient(90.08deg,rgba(0,156,59,.1) 3.8%,rgba(0,156,59,0) 97.33%)",
              "& .MuiSvgIcon-root": {
                color: "#353d50",
              },
            },
          }}
        >
          <ListItemIcon>
            <AccountBalanceWalletOutlinedIcon
              fontSize="medium"
              sx={{
                color: "#353d50",
              }}
            />
          </ListItemIcon>
          Withdraw money
        </MenuItem>
        <MenuItem
          onClick={() => route.replace("/profile/bank-account")}
          sx={{
            minWidth: "250px",
            "&:hover": {
              color: "#009c3b",
              background:
                "linear-gradient(90.08deg,rgba(0,156,59,.1) 3.8%,rgba(0,156,59,0) 97.33%)",
              "& .MuiSvgIcon-root": {
                color: "#353d50",
              },
            },
          }}
        >
          <ListItemIcon>
            <AccountBalanceOutlinedIcon
              fontSize="medium"
              sx={{
                color: "#353d50",
              }}
            />
          </ListItemIcon>
          Bank account
        </MenuItem>
        <MenuItem
          onClick={() => route.replace("/profile/account-promotion")}
          sx={{
            minWidth: "250px",
            "&:hover": {
              color: "#009c3b",
              background:
                "linear-gradient(90.08deg,rgba(0,156,59,.1) 3.8%,rgba(0,156,59,0) 97.33%)",
              "& .MuiSvgIcon-root": {
                color: "#353d50",
              },
            },
          }}
        >
          <ListItemIcon>
            <LoyaltyOutlinedIcon
              fontSize="medium"
              sx={{
                color: "#353d50",
              }}
            />
          </ListItemIcon>
          Promotion
        </MenuItem>
        <MenuItem
          onClick={() => route.replace("/profile/betting-history")}
          sx={{
            minWidth: "250px",
            "&:hover": {
              color: "#009c3b",
              background:
                "linear-gradient(90.08deg,rgba(0,156,59,.1) 3.8%,rgba(0,156,59,0) 97.33%)",
              "& .MuiSvgIcon-root": {
                color: "#353d50",
              },
            },
          }}
        >
          <ListItemIcon>
            <HistoryEduOutlinedIcon
              fontSize="medium"
              sx={{
                color: "#353d50",
              }}
            />
          </ListItemIcon>
          Betting history
        </MenuItem>
        <MenuItem
          onClick={() => route.replace("/profile/transaction-history")}
          sx={{
            minWidth: "250px",
            "&:hover": {
              color: "#009c3b",
              background:
                "linear-gradient(90.08deg,rgba(0,156,59,.1) 3.8%,rgba(0,156,59,0) 97.33%)",
              "& .MuiSvgIcon-root": {
                color: "#353d50",
              },
            },
          }}
        >
          <ListItemIcon>
            <PaymentsOutlinedIcon
              fontSize="medium"
              sx={{
                color: "#353d50",
              }}
            />
          </ListItemIcon>
          Transaction history
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.localStorage.removeItem("tokenreddy232");
            window.location.href = "/";
          }}
          sx={{
            minWidth: "250px",
            "&:hover": {
              color: "#009c3b",
              background:
                "linear-gradient(90.08deg,rgba(0,156,59,.1) 3.8%,rgba(0,156,59,0) 97.33%)",
              "& .MuiSvgIcon-root": {
                color: "#353d50",
              },
            },
          }}
        >
          <ListItemIcon>
            <Logout
              fontSize="medium"
              sx={{
                color: "#353d50",
              }}
            />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl1}
        id="account-menu"
        open={open1}
        onClose={handleClose1}
        onClick={handleClose1}
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
              background: "#0f192f",
              borderRadius: 6,
              mt: 1.5,
              color: "white",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                color: "#353d50",
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "#0f192f",
                borderTop: "1px solid #353d50",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{
            minWidth: "250px",
          }}
        >
          <Box>
            {data?.message?.length > 0 ? (
              <Box>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Notification
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "100px",
                    textAlign: "center",
                  }}
                >
                  <FolderIcon
                    sx={{
                      margin: "auto",
                      marginTop: "10px",
                      fontSize: "50px",
                      color: "#353D50",
                    }}
                    // className="icon-menu"
                  />
                  <Typography>{`You haven't announced yet!`}</Typography>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Notification
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "100px",
                    textAlign: "center",
                  }}
                >
                  <FolderIcon
                    sx={{
                      margin: "auto",
                      marginTop: "10px",
                      fontSize: "50px",
                      color: "#353D50",
                    }}
                    // className="icon-menu"
                  />
                  <Typography>{`You haven't announced yet!`}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
