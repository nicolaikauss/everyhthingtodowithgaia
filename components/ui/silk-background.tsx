"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type SilkBackgroundProps = {
  className?: string;
};

function noise(x: number, y: number) {
  const G = 2.71828;
  const rx = G * Math.sin(G * x);
  const ry = G * Math.sin(G * y);
  return (rx * ry * (1 + x)) % 1;
}

function paintFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  time: number,
  reduceMotion: boolean
) {
  const speed = reduceMotion ? 0 : 0.02;
  const scale = 2;
  const noiseIntensity = 0.8;

  const { width, height } = canvas;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#14181c");
  gradient.addColorStop(0.5, "#1a1f24");
  gradient.addColorStop(1, "#14181c");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  const t = reduceMotion ? 0 : time;

  for (let x = 0; x < width; x += 2) {
    for (let y = 0; y < height; y += 2) {
      const u = (x / width) * scale;
      const v = (y / height) * scale;

      const tOffset = speed * t;
      const texX = u;
      const texY = v + 0.03 * Math.sin(8.0 * texX - tOffset);

      const pattern =
        0.6 +
        0.4 *
          Math.sin(
            5.0 *
              (texX +
                texY +
                Math.cos(3.0 * texX + 5.0 * texY) +
                0.02 * tOffset) +
              Math.sin(20.0 * (texX + texY - 0.1 * tOffset))
          );

      const rnd = noise(x, y);
      const intensity = Math.max(0, pattern - (rnd / 15.0) * noiseIntensity);

      const base = Math.floor(110 * intensity);
      const r = base;
      const g = base;
      const b = base;
      const a = 255;

      const index = (y * width + x) * 4;
      if (index < data.length) {
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = a;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const overlayGradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    Math.max(width, height) / 2
  );
  overlayGradient.addColorStop(0, "rgba(8, 10, 13, 0.35)");
  overlayGradient.addColorStop(1, "rgba(8, 10, 13, 0.72)");

  ctx.fillStyle = overlayGradient;
  ctx.fillRect(0, 0, width, height);
}

export function SilkBackground({ className }: SilkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reduceMotionRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);

    const canvas = canvasRef.current;
    if (!canvas) {
      return () => mq.removeEventListener("change", update);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return () => mq.removeEventListener("change", update);
    }

    let time = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w));
      canvas.height = Math.max(1, Math.floor(h));
      paintFrame(canvas, ctx, time, reduceMotionRef.current);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      if (reduceMotionRef.current) {
        return;
      }
      paintFrame(canvas, ctx, time, false);
      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (!reduceMotionRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      paintFrame(canvas, ctx, 0, true);
    }

    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full silk-canvas", className)}
      aria-hidden
    />
  );
}
