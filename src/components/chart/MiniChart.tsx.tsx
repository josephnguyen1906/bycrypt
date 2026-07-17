"use client";

import { useEffect, useRef } from "react";

interface MiniChartProps {
  width?: number;
  height?: number;
  id: number;
}

export default function MiniChart({
  width = 217,
  height = 55,
  id,
}: MiniChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, width, height);

    const seed = id * 20;

    const points = Array.from({ length: 14 }, (_, i) => {
      return 18 + Math.sin((i + seed) * 0.8) * 10 + Math.random() * 8;
    });

    const step = width / (points.length - 1);

    // Gradient vùng dưới
    const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
    fillGradient.addColorStop(0, "rgba(0,255,170,.35)");
    fillGradient.addColorStop(1, "rgba(0,255,170,0)");

    ctx.beginPath();

    points.forEach((p, i) => {
      const x = i * step;
      const y = height - p;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    ctx.fillStyle = fillGradient;
    ctx.fill();

    // Đường line
    ctx.beginPath();

    points.forEach((p, i) => {
      const x = i * step;
      const y = height - p;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#19E6C2";
    ctx.shadowColor = "#19E6C2";
    ctx.shadowBlur = 8;
    ctx.stroke();
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        display: "block",
      }}
    />
  );
}
