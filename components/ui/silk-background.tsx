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
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduceMotion = () => {
      reduceMotionRef.current = mq.matches;
    };
    syncReduceMotion();

    let time = 0;

    const stopLoop = () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };

    const tick = () => {
      animationRef.current = undefined;
      if (reduceMotionRef.current || !isVisibleRef.current || document.hidden) {
        return;
      }
      paintFrame(canvas, ctx, time, false);
      time += 1;
      animationRef.current = requestAnimationFrame(tick);
    };

    const startLoopIfNeeded = () => {
      if (reduceMotionRef.current || !isVisibleRef.current || document.hidden) {
        return;
      }
      if (animationRef.current !== undefined) {
        return;
      }
      animationRef.current = requestAnimationFrame(tick);
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w));
      canvas.height = Math.max(1, Math.floor(h));
      paintFrame(canvas, ctx, time, reduceMotionRef.current);
    };

    const onMqChange = () => {
      syncReduceMotion();
      stopLoop();
      resizeCanvas();
      if (!reduceMotionRef.current && isVisibleRef.current && !document.hidden) {
        startLoopIfNeeded();
      }
    };

    mq.addEventListener("change", onMqChange);

    const observerRoot = canvas.parentElement ?? canvas;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !reduceMotionRef.current && !document.hidden) {
          startLoopIfNeeded();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "200px", threshold: 0 }
    );
    observer.observe(observerRoot);

    const onVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisibleRef.current && !reduceMotionRef.current) {
        startLoopIfNeeded();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (!reduceMotionRef.current && isVisibleRef.current && !document.hidden) {
      startLoopIfNeeded();
    }

    return () => {
      mq.removeEventListener("change", onMqChange);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resizeCanvas);
      stopLoop();
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
