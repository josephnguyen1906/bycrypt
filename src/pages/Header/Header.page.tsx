"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState, useRef } from "react";
import "./Header.css";
import dayjs from "dayjs";
import Link from "next/link";
import { userResponse } from "@/interface/user.interface";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { getMe } from "@/services/User.service";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  MenuProps,
  Skeleton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import TranslateContextComponent from "../../components/GgTranstale/TranslateContext.component";
import MenuProfile from "@/components/subMenu/MenuProfile";
import MenuProfileMobile from "@/components/subMenu/MenuProfileMobile";
import { getToken } from "@/configs/client-store";
import LoadingComponent from "@/components/Loading";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import { MenuWebsite } from "@/datafake/Menu";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  InternetIcon,
  NotiIcon,
  QuestionIcon,
} from "@/shared/Svgs/Svg.component";
import TranslateGoogle from "../../components/GgTranstale/TranslateContext.component";
import LanguageSwitcher from "@/components/Language/LanguageSwitcher";

interface propUser {
  user: userResponse | null;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100, // Tăng chiều rộng để hiển thị nội dung dài
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
        marginRight: theme.spacing(1.5),
      },
      padding: theme.spacing(1.5, 2), // Tăng padding để đẹp hơn
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

export default function HeaderPage(props: propUser) {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [user, setUser] = useState<any>(props.user);
  const [message, setMessage] = React.useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = React.useState<null | string>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref để lưu timeout
  const [langAnchorEl, setLangAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const isLangMenuOpen = Boolean(langAnchorEl);

  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };
  const handleMouseEnter = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    // Hủy timeout đóng menu nếu có
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleMouseLeave = () => {
    // Thêm độ trễ trước khi đóng menu
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
      setMenuId(null);
    }, 200); // Độ trễ 200ms
  };

  const handleMenuMouseEnter = () => {
    // Hủy timeout khi chuột vào menu con
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleSetActiveTab = useCallback((tabIndex: number) => {
    setActiveTab(tabIndex);
    setShow(true);
  }, []);

  const [device, setDevice] = useState("");
  useEffect(() => {
    const initialize = async () => {
      try {
        const res: any = await getMe();
        if (res?.data) {
          setUser(res.data);
          const updatedRes: any = await getMe();
          setUser(updatedRes?.data);
        }
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setDevice("iOS");
    } else if (/Android/i.test(userAgent)) {
      setDevice("Android");
    } else {
      setDevice("Khác");
    }
  }, []);
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
        <LanguageSwitcher />
      </Box>
    </Box>
  );
  return (
    <header>
      <div className="main-header">
        <div className="header-top">
          <div className="header-left">
            <div className="logo">
              <a
                href={"/"}
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontFamily: "sans-serif",
                  fontStyle: "italic",
                }}
              >
                <img
                  src="/images/photo_2025-06-18_15-01-46-removebg-preview.png"
                  width={120}
                  height={120}
                  alt=""
                />
              </a>
            </div>
          </div>
          <nav className="header-bottom">
            <ul>
              {MenuWebsite.map((item) => (
                <li key={item.id}>
                  <Button
                    id={`menu-button-${item.id}`}
                    aria-controls={
                      anchorEl && menuId === item.id
                        ? `menu-${item.id}`
                        : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={
                      anchorEl && menuId === item.id ? "true" : undefined
                    }
                    disableElevation
                    onMouseEnter={(e) => handleMouseEnter(e, item.id)}
                    onMouseLeave={handleMouseLeave}
                    href={item.link}
                    endIcon={item.item.length > 0 && <KeyboardArrowDownIcon />}
                  >
                    {item.title}
                  </Button>
                  {item.item.length > 0 && (
                    <StyledMenu
                      id={`menu-${item.id}`}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && menuId === item.id}
                      onClose={handleMouseLeave}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center", // Căn giữa theo chiều ngang
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center", // Căn giữa điểm gốc
                      }}
                      MenuListProps={{
                        onMouseEnter: handleMenuMouseEnter,
                        onMouseLeave: handleMouseLeave,
                      }}
                    >
                      {item.item.map(
                        (
                          subItem: any,
                          index // Sửa item.item thành item.items
                        ) => (
                          <MenuItem
                            key={index}
                            onClick={handleMouseLeave}
                            sx={{
                              width: 330,
                            }} // Đặt độ rộng tối thiểu và xuống dòng
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
                                style={{
                                  marginLeft: 8,
                                  width: "calc(100% - 24px)",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{
                                    width: "100%",
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    fontWeight: "600",
                                  }}
                                >
                                  {subItem.title}
                                </Typography>
                                {subItem.note && (
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      width: "100%",
                                      wordBreak: "break-word",
                                      overflowWrap: "anywhere",
                                      whiteSpace: "normal",
                                    }}
                                  >
                                    {subItem.note}
                                  </Typography>
                                )}
                              </div>
                            </Link>
                          </MenuItem>
                        )
                      )}
                    </StyledMenu>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-right">
            {user ? (
              <div className="header-right-menu">
                <input
                  type="text"
                  placeholder="Tìm kiếm tiền mã hoá"
                  className="search-bar"
                />

                <MenuProfile user={user} />
                <button
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <NotiIcon />
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <QuestionIcon />
                </button>
                <button
                  onClick={handleLangMenuOpen}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <InternetIcon />
                </button>
              </div>
            ) : (
              <div className="header-right">
                <div className="header-right-menu">
                  <input
                    type="text"
                    placeholder="Tìm kiếm tiền mã hoá"
                    className="search-bar"
                  />
                  <a
                    style={{
                      background: "none",
                      fontSize: "14px",
                      border: "none",
                      padding: 0,
                      color: "#fff",
                      width: "70px",
                    }}
                    href="/login"
                  >
                    Đăng nhập
                  </a>
                  <a
                    style={{
                      background: "none",
                      fontSize: "14px",
                      padding: "5px",
                      color: "#fff",
                      border: "1px solid #fff",
                      borderRadius: "10px",
                      width: "60px",
                    }}
                    href="/signup"
                  >
                    Đăng kí
                  </a>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <NotiIcon />
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <QuestionIcon />
                  </button>
                  <button
                    onClick={handleLangMenuOpen}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <InternetIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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
    </header>
  );
}
