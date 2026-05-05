"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import React, { useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";

export type LiquidGlassBlurIntensity = "sm" | "md" | "lg" | "xl";
export type LiquidGlassShadowIntensity = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type LiquidGlassGlowIntensity = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface LiquidGlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  draggable?: boolean;
  expandable?: boolean;
  /** Controlled expansion (used e.g. for accordion rows). */
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (next: boolean) => void;
  width?: string;
  height?: string;
  expandedWidth?: string;
  expandedHeight?: string;
  blurIntensity?: LiquidGlassBlurIntensity;
  shadowIntensity?: LiquidGlassShadowIntensity;
  borderRadius?: string;
  glowIntensity?: LiquidGlassGlowIntensity;
}

const FILTER_ID_PREFIX = "glass-blur-";

export function LiquidGlassCard({
  children,
  className = "",
  draggable = false,
  expandable = false,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = "xl",
  borderRadius = "12px",
  glowIntensity = "sm",
  shadowIntensity = "md",
  ...props
}: LiquidGlassCardProps) {
  const reactId = useId();
  const filterId = `${FILTER_ID_PREFIX}${reactId.replace(/:/g, "")}`;
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const [reduceMotion, setReduceMotion] = useState(false);

  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? Boolean(expanded) : uncontrolledExpanded;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function handleToggleExpansion(e: React.MouseEvent<HTMLDivElement>) {
    if (!expandable) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("a, button, input, select, textarea, summary")) return;
    const next = !isExpanded;
    if (isControlled) {
      onExpandedChange?.(next);
    } else {
      setUncontrolledExpanded(next);
    }
  }

  const blurClasses: Record<LiquidGlassBlurIntensity, string> = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl"
  };

  const shadowStyles: Record<LiquidGlassShadowIntensity, string> = {
    none: "inset 0 0 0 0 rgba(255, 255, 255, 0)",
    xs: "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.14), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.14)",
    sm: "inset 2px 2px 2px 0 rgba(255, 255, 255, 0.18), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.18)",
    md: "inset 3px 3px 3px 0 rgba(255, 255, 255, 0.22), inset -3px -3px 3px 0 rgba(255, 255, 255, 0.22)",
    lg: "inset 4px 4px 4px 0 rgba(255, 255, 255, 0.26), inset -4px -4px 4px 0 rgba(255, 255, 255, 0.26)",
    xl: "inset 6px 6px 6px 0 rgba(255, 255, 255, 0.28), inset -6px -6px 6px 0 rgba(255, 255, 255, 0.28)"
  };

  const glowStyles: Record<LiquidGlassGlowIntensity, string> = {
    none: "0 4px 4px rgba(0, 0, 0, 0.05), 0 0 12px rgba(0, 0, 0, 0.05)",
    xs: "0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 16px rgba(245, 242, 237, 0.04)",
    sm: "0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 24px rgba(245, 242, 237, 0.06)",
    md: "0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 32px rgba(245, 242, 237, 0.08)",
    lg: "0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 40px rgba(245, 242, 237, 0.1)",
    xl: "0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 48px rgba(245, 242, 237, 0.12)"
  };

  const expandTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  const containerVariants = expandable
    ? {
        collapsed: {
          width: width || "auto",
          height: height || "auto",
          transition: expandTransition
        },
        expanded: {
          width: expandedWidth || width || "auto",
          height: expandedHeight || "auto",
          transition: expandTransition
        }
      }
    : undefined;

  return (
    <>
      <svg className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden>
        <defs>
          <filter id={filterId} x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves="1" result="turbulence" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="200"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.div
        className={cn(
          "relative motion-reduce:!transform-none motion-reduce:transition-none",
          draggable ? "cursor-grab active:cursor-grabbing" : "",
          expandable ? "cursor-pointer" : "",
          className
        )}
        style={{
          borderRadius,
          ...(width && !expandable ? { width } : {}),
          ...(height && !expandable ? { height } : {})
        }}
        variants={containerVariants}
        initial={expandable ? "collapsed" : undefined}
        animate={expandable ? (isExpanded ? "expanded" : "collapsed") : undefined}
        onClick={expandable ? handleToggleExpansion : undefined}
        drag={draggable && !reduceMotion}
        dragConstraints={draggable ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined}
        dragElastic={draggable ? 0.3 : undefined}
        dragTransition={draggable ? { bounceStiffness: 300, bounceDamping: 10, power: 0.3 } : undefined}
        whileDrag={draggable && !reduceMotion ? { scale: 1.02 } : undefined}
        whileHover={
          reduceMotion ? undefined : expandable || draggable ? { scale: 1.01 } : undefined
        }
        whileTap={
          reduceMotion ? undefined : expandable || draggable ? { scale: 0.98 } : undefined
        }
        {...props}
      >
        <div
          className={cn(`absolute inset-0 z-0 ${blurClasses[blurIntensity]}`)}
          style={{
            borderRadius,
            filter: `url(#${filterId})`
          }}
          aria-hidden
        />

        <div
          className="absolute inset-0 z-10"
          style={{
            borderRadius,
            boxShadow: glowStyles[glowIntensity]
          }}
          aria-hidden
        />

        <div
          className="absolute inset-0 z-20"
          style={{
            borderRadius,
            boxShadow: shadowStyles[shadowIntensity]
          }}
          aria-hidden
        />

        <div className="relative z-30">{children}</div>
      </motion.div>
    </>
  );
}
