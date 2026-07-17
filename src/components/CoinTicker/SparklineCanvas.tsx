"use client";

import { useEffect, useRef } from "react";

interface SparklineCanvasProps {
  data: number[];
  positive: boolean;
}

export default function SparklineCanvas({
  data,
  positive,
}: SparklineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const width = 120;
    const height = 55;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    if (data.length < 2) return;

    const min = Math.min(...data);
    const max = Math.max(...data);

    const range = max - min || 1;

    const color = positive ? "#16d5a8" : "#ff5b6b";

    // Chuyển dữ liệu thành điểm
    const points = data.map((value, index) => ({
      x: (index / (data.length - 1)) * width,
      y: height - ((value - min) / range) * (height - 6) - 3,
    }));

    // ===== Gradient =====
    const gradient = ctx.createLinearGradient(0, 0, 0, height);

    gradient.addColorStop(
      0,
      positive ? "rgba(22,213,168,.35)" : "rgba(255,91,107,.35)",
    );

    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.beginPath();

    ctx.moveTo(points[0].x, height);

    points.forEach((p) => {
      ctx.lineTo(p.x, p.y);
    });

    ctx.lineTo(points[points.length - 1].x, height);

    ctx.closePath();

    ctx.fillStyle = gradient;

    ctx.fill();

    // ===== Line =====

    ctx.beginPath();

    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.stroke();
  }, [data, positive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: 120,
        height: 55,
        display: "block",
      }}
    />
  );
}
