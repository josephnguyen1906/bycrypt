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
import {
  getNotiDetail,
  getNotification,
  getWithdrawCancelled,
} from "@/services/User.service";
import { toast } from "react-toastify";

interface NotificationBellProps {
  notificationCount?: number;
}

type NotificationKind = "withdraw" | "notice";

interface Notification {
  id: string;
  kind: NotificationKind;
  title: string;
  time: string;
  content: string;
  contentIsHtml: boolean;
  isRead: boolean;
  rawData?: Record<string, unknown>;
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

function parseTime(value: string): number {
  const ts = Date.parse(value);
  return Number.isNaN(ts) ? 0 : ts;
}

function mapWithdrawNotifications(list: any[]): Notification[] {
  return list.map((item) => ({
    id: `withdraw-${item.id}`,
    kind: "withdraw" as const,
    title: `Rút ${Number(item.mum).toLocaleString("vi-VN")} VNĐ bị hủy`,
    time: item.endtime || item.addtime,
    content: `
      <div>
        <div><strong>Số tiền:</strong> ${Number(item.mum).toLocaleString("vi-VN")} VNĐ</div>
        <div><strong>Số coin:</strong> ${Number(item.num).toLocaleString()} USDT</div>
        <div><strong>Ngân hàng:</strong> ${item.address}</div>
      </div>
    `,
    contentIsHtml: true,
    isRead: Number(item.admin_view) !== 1,
    rawData: item,
  }));
}

function mapAdminNotifications(list: any[]): Notification[] {
  return list.map((item) => ({
    id: `notice-${item.id}`,
    kind: "notice" as const,
    title: item.title,
    time: item.addtime,
    content: item.content,
    contentIsHtml: false,
    isRead: Number(item.user_view) !== 1,
    rawData: item,
  }));
}

function mergeNotifications(
  withdrawItems: Notification[],
  noticeItems: Notification[],
): Notification[] {
  return [...withdrawItems, ...noticeItems].sort(
    (a, b) => parseTime(b.time) - parseTime(a.time),
  );
}

const TOASTED_KEY = "bycrypt_toasted_notice_ids";

function loadToastedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.sessionStorage.getItem(TOASTED_KEY);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function persistToastedIds(ids: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      TOASTED_KEY,
      JSON.stringify(Array.from(ids)),
    );
  } catch {
    // ignore quota
  }
}

function showNoticeToast(notification: Notification) {
  const title = String(notification.title || "");
  const body = String(notification.content || "").trim();
  const node = (
    <div>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
      {body ? <div style={{ fontSize: 13, opacity: 0.9 }}>{body}</div> : null}
    </div>
  );
  if (/thành công|success/i.test(title)) {
    toast.success(node, { toastId: notification.id });
  } else if (/đang xử lý|processing/i.test(title)) {
    toast.info(node, { toastId: notification.id });
  } else {
    toast.info(node, { toastId: notification.id });
  }
}

export default function NotificationBell({
  notificationCount: initialCount = 0,
}: NotificationBellProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [unreadCount, setUnreadCount] = useState(initialCount);

  const { user, fetchUser } = useUserStore();

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toastedIdsRef = useRef<Set<string>>(loadToastedIds());

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchNotifications = useCallback(
    async (opts?: { silent?: boolean; toastNew?: boolean }) => {
      if (!user) return;

      const silent = Boolean(opts?.silent);
      const toastNew = Boolean(opts?.toastNew);

      if (!silent) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const [withdrawResult, noticeResult] = await Promise.allSettled([
          getWithdrawCancelled(),
          getNotification(),
        ]);

        let withdrawItems: Notification[] = [];
        let noticeItems: Notification[] = [];
        let withdrawUnread = 0;
        let noticeUnread = 0;
        const errors: string[] = [];

        if (withdrawResult.status === "fulfilled") {
          const response = withdrawResult.value as any;
          const list = Array.isArray(response?.data) ? response.data : [];
          withdrawItems = mapWithdrawNotifications(list);
          withdrawUnread = list.filter(
            (item: any) => Number(item.admin_view) === 1,
          ).length;
        } else {
          errors.push("Không thể tải thông báo rút tiền bị hủy");
        }

        if (noticeResult.status === "fulfilled") {
          const response = noticeResult.value as any;
          if (response?.status === true) {
            const list = response?.data?.notices ?? [];
            noticeItems = mapAdminNotifications(list);
            noticeUnread = Number(response?.data?.unread_count ?? 0);

            if (toastNew) {
              const fresh = noticeItems
                .filter(
                  (n) =>
                    !n.isRead &&
                    !toastedIdsRef.current.has(n.id) &&
                    /(nạp|rút|gửi tiền|deposit|withdraw|thành công|đang xử lý)/i.test(
                      String(n.title || ""),
                    ),
                )
                .slice(0, 3);

              fresh.forEach((n) => {
                toastedIdsRef.current.add(n.id);
                showNoticeToast(n);
              });
              if (fresh.length > 0) {
                persistToastedIds(toastedIdsRef.current);
              }
            }
          } else {
            errors.push(response?.message || "Không thể tải thông báo hệ thống");
          }
        } else {
          errors.push("Không thể tải thông báo hệ thống");
        }

        const merged = mergeNotifications(withdrawItems, noticeItems);
        setNotifications(merged);
        setUnreadCount(withdrawUnread + noticeUnread);

        if (!silent && merged.length === 0 && errors.length === 2) {
          setError(errors[0]);
        }
      } catch (err: any) {
        if (!silent) {
          setError(err?.message || "Không thể tải thông báo");
        }
      } finally {
        if (!silent) {
          setIsLoading(false);
        }
      }
    },
    [user],
  );

  useEffect(() => {
    if (!user) return;
    void fetchNotifications({ toastNew: true });
    const timer = window.setInterval(() => {
      void fetchNotifications({ silent: true, toastNew: true });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [user, fetchNotifications]);

  useEffect(() => {
    if (isModalOpen && user) {
      void fetchNotifications({ silent: true });
    }
  }, [isModalOpen, user, fetchNotifications]);

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

  const handleDetailClick = async (notification: Notification) => {
    if (notification.kind === "withdraw") {
      localStorage.setItem(
        "notificationDetail",
        JSON.stringify(notification.rawData),
      );

      if (!notification.isRead) {
        setNotifications((prev) =>
          prev.map((item) =>
            item.id === notification.id ? { ...item, isRead: true } : item,
          ),
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      }

      setIsModalOpen(false);
      const withdrawId = String(notification.rawData?.id ?? "");
      router.push(`/notification?notificationID=${withdrawId}`);
      return;
    }

    const noticeId = String(notification.rawData?.id ?? "");
    if (!notification.isRead) {
      try {
        if (noticeId) {
          await getNotiDetail(noticeId);
        }
      } catch {
        // Still update UI if mark-read fails silently
      }

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notification.id ? { ...item, isRead: true } : item,
        ),
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));
    }

    const body = String(notification.content || "").trim();
    if (body) {
      toast.info(
        <div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>
            {notification.title}
          </div>
          <div style={{ fontSize: 13 }}>{body}</div>
        </div>,
        { autoClose: 8000 },
      );
    } else {
      toast.info(notification.title);
    }

    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{ position: "relative" }}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      <Badge
        badgeContent={
          unreadCount > 0 ? formatNotificationCount(unreadCount) : null
        }
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
              borderBottom: "10px solid #1A1B24",
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
                xs: notifications.length > 0 ? 280 : 120,
                sm: notifications.length > 0 ? 360 : 120,
              },

              bgcolor: "#1A1B24",
              color: "#fff",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 2,
              zIndex: 999999,
              boxShadow: "0 12px 40px rgba(0,0,0,.55)",

              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: {
                  xs: 1.5,
                  sm: 2,
                },

                "&::-webkit-scrollbar": {
                  width: 6,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#3a3d4d",
                  borderRadius: 10,
                },
              }}
            >
              {!user ? (
                <Typography align="center" color="#8D93A6">
                  Vui lòng đăng nhập
                </Typography>
              ) : isLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress size={20} sx={{ color: "#00A609" }} />
                </Box>
              ) : error ? (
                <Typography align="center" color="#EF4444">
                  {error}
                </Typography>
              ) : notifications.length === 0 ? (
                <Typography align="center" color="#8D93A6">
                  Không có thông báo
                </Typography>
              ) : (
                notifications.map((notification) => (
                  <Box
                    key={notification.id}
                    onClick={() => handleDetailClick(notification)}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      cursor: "pointer",
                      mb: {
                        xs: 1,
                        sm: 1.5,
                      },
                      py: 1.2,
                      px: 1,
                      borderRadius: 1.5,
                      bgcolor: notification.isRead
                        ? "transparent"
                        : "rgba(0,166,9,.12)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,.04)",
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

                    <Box flex={1} minWidth={0}>
                      <Typography
                        fontWeight={notification.isRead ? 500 : 700}
                        sx={{
                          color: notification.isRead
                            ? "#8D93A6"
                            : /thành công|success/i.test(notification.title)
                              ? "#22C55E"
                              : /đang xử lý|processing/i.test(
                                    notification.title,
                                  )
                                ? "#FFD84D"
                                : "#fff",
                          fontSize: {
                            xs: "13px",
                            sm: "15px",
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
                          fontSize: "12px",
                          color: "#6B7280",
                        }}
                      >
                        {formatDate(notification.time)}
                      </Typography>

                      {notification.contentIsHtml ? (
                        <Box
                          dangerouslySetInnerHTML={{
                            __html: notification.content,
                          }}
                          sx={{
                            mt: 0.8,
                            fontSize: "12px",
                            color: "#8D93A6",
                            "& *": { color: "#8D93A6 !important" },
                          }}
                        />
                      ) : (
                        <Typography
                          sx={{
                            mt: 0.8,
                            fontSize: "12px",
                            color: "#8D93A6",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {notification.content}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))
              )}
            </Box>
            <Box
              component="button"
              type="button"
              onClick={() => {
                setIsModalOpen(false);
              }}
              sx={{
                textAlign: "center",
                pb: 2,
                pt: 1.2,
                fontSize: 12,
                background: "none",
                border: "none",
                borderTop: "1px solid rgba(255,255,255,.08)",
                cursor: "pointer",
                width: "100%",
                color: "#8D93A6",
              }}
            >
              Thông báo hệ thống
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}
