import { useUserStore } from "@/stores/useUserStore";
import {
  AccessTime,
  AccountBalanceWallet,
  AccountBalance,
  AddCard,
  ArrowForwardIos,
  ExitToApp,
  Home,
  Info,
  Language,
  Lock,
  PieChart,
  Security,
  Share,
  Shield,
  SwapHoriz,
  Inventory2,
  ContentCopy,
} from "@mui/icons-material";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Avatar,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface AccountDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function AccountDrawer({ open, onClose }: AccountDrawerProps) {
  const [openTransaction, setOpenTransaction] = useState(false);
  const router = useRouter();
  const [openFinance, setOpenFinance] = useState(false);
  const { user, fetchUser } = useUserStore();
  const { t } = useTranslation();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const menuItems = [
    {
      id: 1,
      name: "Menu.home",
      icon: <Home />,
      link: "/",
      isLogin: false,
    },
    {
      id: 2,
      name: "Menu.deposit",
      icon: <AccountBalanceWallet />,
      link: "/deposit",
      isLogin: true,
    },
    {
      id: 3,
      name: "Menu.trading",
      icon: <PieChart />,
      hasChildren: true,
      isLogin: false,
      children: [
        {
          name: "Menu.tradingOption",
          link: "/futures",
        },
        {
          name: "Menu.tradingPoint",
          link: "/futures",
        },
        {
          name: "Menu.tradingContract",
          link: "/futures",
        },
      ],
    },
    {
      id: 4,
      name: "Menu.financialManagement",
      icon: <SwapHoriz />,
      hasChildren: true,
      isLogin: true,
      children: [
        {
          name: "Menu.finance",
          link: "/loan",
        },
        {
          name: "Menu.history",
          link: "/loan/history",
        },
      ],
    },
    {
      id: 5,
      name: "Menu.assets",
      icon: <Inventory2 />,
      link: "/account",
      isLogin: true,
    },
    {
      id: 6,
      name: "Menu.fundPassword",
      icon: <Lock />,
      link: "/change-tran-pass/",
      isLogin: true,
    },
    {
      id: 8,
      name: "Menu.security",
      icon: <Shield />,
      link: "/change-login-pass",
      isLogin: true,
    },
    {
      id: 9,
      name: "Menu.verification",
      icon: <Security />,
      link: "/verified",
      isLogin: true,
    },
    {
      id: 10,
      name: "Menu.referral",
      icon: <Share />,
      link: "/referral",
      isLogin: true,
    },
    {
      id: 11,
      name: "Menu.support",
      icon: <Info />,
      link: "/support",
      isLogin: false,
    },
    {
      id: 12,
      name: "Menu.language",
      icon: <Language />,
      link: "/language",
      isLogin: false,
    },
  ];

  const handleNavigate = (link: string, isLogin: boolean) => {
    onClose();
    if (isLogin) {
      router.push("/login");
    } else {
      router.push(link);
    }
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        zIndex: 999,
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        "& .MuiPaper-root": {
          width: {
            xs: "80%",
            sm: 448,
          },
          maxWidth: "448px",
          height: "100vh",
          bgcolor: "#0E0F18",
          color: "#fff",
          borderRadius: {
            xs: "0 20px 20px 0",
            sm: "0 20px 20px 0",
          },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#292C38",
            borderRadius: 10,
          },
        },
      }}
    >
      {/* ================= HEADER ================= */}

      <Box
        sx={{
          px: 5,
          pt: 5,
          pb: 3,
        }}
      >
        <Box
          component="img"
          src="/images/loll.png"
          sx={{
            width: "auto",
            height: "30px",
            objectFit: "contain",
          }}
        />

        {/* User Info */}
        {user && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              pt: 3,
            }}
          >
            <Avatar
              src="/images/avatar-6917774b.png"
              alt="avatar"
              sx={{
                width: "44px",
                height: "44px",
                objectFit: "cover",
              }}
            />

            {/* Info */}

            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  mb: 1,
                }}
              >
                {user?.fullname}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  ID: {user?.invit}
                </Typography>

                <ContentCopy
                  sx={{
                    fontSize: 14,
                    color: "#8A8FA8",
                    cursor: "pointer",
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: 14,
                  mt: 1,
                }}
              >
                Credit score:{" "}
                <span
                  style={{
                    marginLeft: 8,
                  }}
                >
                  100
                </span>
              </Typography>
            </Box>
          </Box>
        )}

        {/* Status */}

        {user && user.rzstatus !== 2 && (
          <Box
            sx={{
              display: "inline-flex",
              mt: 2,
              px: 1.5,
              py: 1,
              borderRadius: "10px",
              background: "linear-gradient(180deg, #8C302A, #4D2020)",
            }}
          >
            <Typography
              sx={{
                color: "#FF5B4D",
                fontSize: 14,
              }}
            >
              Chưa được chứng nhận
            </Typography>
          </Box>
        )}
      </Box>

      {/* ================= MENU ================= */}

      <List
        sx={{
          px: 3,
          pb: 10,
        }}
      >
        {menuItems.map((item) => {
          const isTransaction = item.id === 3;

          const isFinance = item.id === 4;

          const isOpen = isTransaction
            ? openTransaction
            : isFinance
              ? openFinance
              : false;

          return (
            <Box key={item.id}>
              <ListItemButton
                onClick={() => {
                  if (isTransaction) {
                    setOpenTransaction(!openTransaction);
                    return;
                  }

                  if (isFinance) {
                    setOpenFinance(!openFinance);
                    return;
                  }

                  if (item.link) {
                    handleNavigate(item.link, item.isLogin);
                  }
                }}
                sx={{
                  minHeight: 68,
                  px: 2,
                  borderRadius: "10px",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 20,
                    color: "#fff",
                    pr: "10px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={t(item.name)}
                  primaryTypographyProps={{
                    fontSize: 17,
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                />

                {item.hasChildren && (
                  <ArrowForwardIos
                    sx={{
                      fontSize: 14,
                      color: "#777",
                      transform: isOpen ? "rotate(90deg)" : "none",
                      transition: "0.2s",
                    }}
                  />
                )}
              </ListItemButton>

              {/* Submenu */}

              {item.hasChildren && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.children?.map((child) => (
                      <ListItemButton
                        key={child.link}
                        onClick={() => handleNavigate(child.link, item.isLogin)}
                        sx={{
                          minHeight: 45,
                          color: "#9CA0B2",
                        }}
                      >
                        <ListItemText
                          primary={t(child.name)}
                          primaryTypographyProps={{
                            fontSize: 15,
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}

        {/* ================= LOGOUT ================= */}
        {user && (
          <ListItemButton
            onClick={() => {
              onClose();
              window.localStorage.removeItem("token");
              window.location.href = "/";
            }}
            sx={{
              minHeight: 40,
              px: 2,
              color: "#fff",
              borderRadius: "10px",

              "&:hover": {
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: "#fff",
              }}
            >
              <ExitToApp />
            </ListItemIcon>

            <ListItemText
              primary={t("Menu.logout")}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
}
