import { getCheck } from "@/services/User.service";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface CircleCountdownProps {
  radius?: number; // bán kính vòng tròn
  duration: number; // tổng thời gian đếm ngược (giây)
  id: string; // id để gọi API check
  onComplete?: () => void; // callback khi admin duyệt
}

export const CircleCountdown: React.FC<CircleCountdownProps> = ({
  radius = 60,
  duration,
  id,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progress = (duration - timeLeft) / duration;
  const strokeDashoffset = circumference - progress * circumference;

  const fetchStatus = useCallback(async () => {
    if (!id) return;
    try {
      const res: any = await getCheck(id);

      if (res?.data?.status == 2) {
        if (timerRef.current) clearInterval(timerRef.current);
        if (onComplete) onComplete();
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
    <svg height={radius * 2} width={radius * 2} style={{ fontWeight: "bold" }}>
      {/* Vòng nền */}
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Vòng tiến trình */}
      <circle
        stroke="#00d084"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      {/* Số đếm */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fill="black"
      >
        {timeLeft}s
      </text>
    </svg>
  );
};
