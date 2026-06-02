"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Badge,
  Paper,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { keyframes } from "@mui/system";

import { useUserStore } from "@/stores/useUserStore";
import { getWithdrawCancelled } from "@/services/User.service";

interface NotificationBellProps {
  notificationCount?: number;
}

interface Notification {
  id: string;
  title: string;
  time: string;
  content: string;
  isRead: boolean;
  rawData?: any;
}

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  50% { transform: rotate(-15deg); }
  75% { transform: rotate(15deg); }
  100% { transform: rotate(0deg); }
`;

const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

const formatNotificationCount = (count: number): string =>
  count > 9 ? "9+" : count.toString();

export default function NotificationBell({
  notificationCount: initialCount = 0,
}: NotificationBellProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [unreadCount, setUnreadCount] = useState(initialCount);

  const { user, fetchUser } = useUserStore();

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getWithdrawCancelled();

      const list = response?.data || [];

      const mappedNotifications: Notification[] = list.map((item: any) => ({
        id: item.id.toString(),

        title: `Rút ${Number(item.mum).toLocaleString("vi-VN")} VNĐ bị hủy`,

        time: item.endtime || item.addtime,

        content: `
            <div>
              <div><strong>Số tiền:</strong> ${Number(item.mum).toLocaleString(
                "vi-VN",
              )} VNĐ</div>
               <div><strong>Số coin:</strong> ${Number(
                 item.num,
               ).toLocaleString()} USDT</div>
              <div><strong>Ngân hàng:</strong> ${item.address}</div>
           
            </div>
          `,

        isRead: Number(item.admin_view) !== 1,
        rawData: item,
      }));

      setNotifications(mappedNotifications);

      const unread = list.filter(
        (item: any) => Number(item.admin_view) === 1,
      ).length;

      setUnreadCount(unread);
    } catch (err: any) {
      setError(err?.message || "Không thể tải thông báo");
    } finally {
      setIsLoading(false);
      setIsLoaded(true);
    }
  }, [user]);

  useEffect(() => {
    if (isModalOpen && !isLoaded && user) {
      fetchNotifications();
    }
  }, [isModalOpen, isLoaded, user, fetchNotifications]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    setIsModalOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const handleDetailClick = (id: string) => {
    const notification = notifications.find((item) => item.id === id);

    if (!notification) return;

    localStorage.setItem(
      "notificationDetail",
      JSON.stringify(notification.rawData),
    );

    if (!notification.isRead) {
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                isRead: true,
              }
            : item,
        ),
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));
    }

    setIsModalOpen(false);

    router.push(`/notification?notificationID=${id}`);
  };

  return (
    <Box
      sx={{ position: "relative" }}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      <Badge
        // badgeContent={
        //   unreadCount > 0 ? formatNotificationCount(unreadCount) : null
        // }
        color="error"
      >
        <Box
          onClick={() => {
            if (isMobile) {
              setIsModalOpen((prev) => !prev);
            }
          }}
          sx={{
            width: {
              xs: 25,
              sm: 35,
            },
            height: {
              xs: 25,
              sm: 35,
            },
            cursor: "pointer",
            animation: `${shake} 0.5s ease-in-out infinite`,
            animationDelay: "3s",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g id="style=fill">
                <g id="notification-bell">
                  <path
                    id="vector (Stroke)"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.802 19.8317C15.4184 19.7699 15.8349 20.4242 15.5437 20.9539C15.3385 21.3271 15.0493 21.6529 14.7029 21.9197C14.3496 22.1918 13.9397 22.4006 13.5 22.5408C13.0601 22.6812 12.593 22.7522 12.1242 22.7522C11.6554 22.7522 11.1883 22.6812 10.7484 22.5408C10.3087 22.4006 9.89883 22.1918 9.54556 21.9197C9.1991 21.6529 8.90988 21.3271 8.70472 20.9539C8.41354 20.4242 8.83002 19.7699 9.44644 19.8317C9.63869 19.851 11.1433 19.9981 12.1242 19.9981C13.1051 19.9981 14.6097 19.851 14.802 19.8317Z"
                    fill="#fff"
                  ></path>
                  <path
                    id="vector (Stroke)_2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.52901 2.08755C10.7932 1.00445 13.4465 0.967602 15.7423 1.98737L15.9475 2.07851C18.3532 3.14707 19.8934 5.4622 19.8934 8.0096L19.8934 9.27297C19.8934 10.2885 20.1236 11.2918 20.5681 12.213L20.8335 12.7632C22.0525 15.29 20.465 18.2435 17.6156 18.7498L17.455 18.7783C13.93 19.4046 10.3154 19.4046 6.79044 18.7783C3.90274 18.2653 2.37502 15.1943 3.77239 12.7115L3.99943 12.3082C4.55987 11.3124 4.85335 10.1981 4.85335 9.06596L4.85335 7.79233C4.85335 5.3744 6.27704 3.16478 8.52901 2.08755Z"
                    fill="#fff"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </Box>
      </Badge>

      {isModalOpen && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: 40,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid #1c402a",
              zIndex: 1001,
            }}
          />

          <Paper
            sx={{
              position: {
                xs: "fixed",
                sm: "absolute",
              },
              top: {
                xs: 60,
                sm: 45,
              },
              left: "50%",
              transform: "translateX(-50%)",

              width: {
                xs: "calc(90vw - 20px)",
                sm: 445,
              },

              height: {
                xs: notifications.length > 0 ? 200 : 100,
                sm: notifications.length > 0 ? 300 : 100,
              },

              bgcolor: "#fff",
              color: "#000",
              borderRadius: 2,
              zIndex: 999999,

              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: {
                  xs: 1,
                  sm: 2,
                },

                "&::-webkit-scrollbar": {
                  width: 6,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#555",
                  borderRadius: 10,
                },
              }}
            >
              {!user ? (
                <Typography align="center">Vui lòng đăng nhập</Typography>
              ) : isLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress size={20} />
                </Box>
              ) : error ? (
                <Typography align="center">{error}</Typography>
              ) : notifications.length === 0 ? (
                <Typography align="center">Không có thông báo</Typography>
              ) : (
                notifications.map((notification) => (
                  <Box
                    key={notification.id}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      cursor: "pointer",
                      mb: {
                        xs: 1,
                        sm: 2,
                      },
                      py: {
                        xs: 1,
                        sm: 0,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="https://staticda88.com/images/item-notif.svg?v=1f70d39"
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                    />

                    <Box flex={1}>
                      <Typography
                        fontWeight={notification.isRead ? 500 : 700}
                        color={notification.isRead ? "#666" : "#d32f2f"}
                        sx={{
                          fontSize: {
                            xs: "13px",
                            sm: "16px",
                          },
                          display: "-webkit-box",
                          WebkitLineClamp: {
                            xs: 2,
                            sm: "unset",
                          },
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {notification.title}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          display: {
                            xs: "none",
                            sm: "block",
                          },
                          fontSize: "13px",
                        }}
                      >
                        {formatDate(notification.time)}
                      </Typography>

                      <Box
                        dangerouslySetInnerHTML={{
                          __html: notification.content,
                        }}
                        sx={{
                          mt: 1,
                          fontSize: "12px",
                        }}
                      />
                    </Box>
                  </Box>
                ))
              )}
            </Box>
            <Box
              sx={{
                textAlign: "center",
                pb: 2,
                pt: 1,
                borderTop: "1px solid #eee",
                fontSize: 12,
              }}
            >
              Thông báo các lệnh rút tiền bị hủy
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}
