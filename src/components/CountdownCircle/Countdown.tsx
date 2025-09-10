import { getCheck } from "@/services/User.service";
import { Typography } from "@mui/material";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface CircleCountdownProps {
  radius?: number; // bán kính vòng tròn
  duration: number; // tổng thời gian đếm ngược (giây)
  id: string; // id để gọi API check
  onComplete?: (status: number) => void; // callback khi admin duyệt
}

export const Countdown: React.FC<CircleCountdownProps> = ({
  radius = 60,
  duration,
  id,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  console.log("duration", duration);

  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progress = (duration - timeLeft) / duration;
  const strokeDashoffset = circumference - progress * circumference;

  const fetchStatus = useCallback(async () => {
    if (!id) return;
    try {
      const res: any = await getCheck(id);
      const status = res?.data?.status;

      if (status === 2 || status === 3) {
        if (timerRef.current) clearInterval(timerRef.current);
        if (onComplete) onComplete(status);
      }
    } catch (error) {
      console.error("Fetch status error:", error);
    }
  }, [id, onComplete]);

  // 📌 Countdown logic
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [duration]);

  useEffect(() => {
    const statusInterval = setInterval(fetchStatus, 60000);
    fetchStatus();

    return () => {
      clearInterval(statusInterval);
    };
  }, [fetchStatus]);

  return (
    <Typography
      variant="h6"
      sx={{
        fontSize: "16px",
        color: "white",
        textAlign: "center",
      }}
    >
      {timeLeft}s
    </Typography>
  );
};
