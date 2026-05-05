"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const curtainVariants: Variants = {
  visible: {
    clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
    transition: {
      duration: 0.4,
      ease: [0.25, 1.5, 0.5, 1]
    }
  },

  hidden: {
    clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
    transition: {
      duration: 0.3,
      ease: [0.25, 1.5, 0.5, 1]
    }
  }
};

interface CardCurtainRevealContextValue {
  isOpen: boolean;
}

const CardCurtainRevealContext = React.createContext<CardCurtainRevealContextValue | undefined>(
  undefined
);

function useCardCurtainRevealContext() {
  const context = React.useContext(CardCurtainRevealContext);
  if (!context) {
    throw new Error("useCardCurtainRevealContext must be used within a CardCurtainReveal Component");
  }
  return context;
}

const CardCurtainReveal = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    const [hovered, setHovered] = React.useState(false);
    const [focusedWithin, setFocusedWithin] = React.useState(false);

    const isOpen = Boolean(reduceMotion || hovered || focusedWithin);

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true);
        onMouseEnter?.(e);
      },
      [onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        setHovered(false);
        onMouseLeave?.(e);
      },
      [onMouseLeave]
    );

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        setFocusedWithin(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLDivElement>) => {
        const next = e.relatedTarget as Node | null;
        if (!next || !e.currentTarget.contains(next)) {
          setFocusedWithin(false);
        }
        onBlur?.(e);
      },
      [onBlur]
    );

    return (
      <CardCurtainRevealContext.Provider value={{ isOpen }}>
        <div
          ref={ref}
          tabIndex={0}
          className={cn(
            "relative flex flex-col gap-2 overflow-hidden rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ink/35 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite/55",
            className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {children}
        </div>
      </CardCurtainRevealContext.Provider>
    );
  }
);
CardCurtainReveal.displayName = "CardCurtainReveal";

const CardCurtainRevealFooter = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useCardCurtainRevealContext();

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={curtainVariants}
        animate={isOpen ? "visible" : "hidden"}
        {...props}
      />
    );
  }
);
CardCurtainRevealFooter.displayName = "CardCurtainRevealFooter";

const CardCurtainRevealBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex-1 p-6", className)} {...props} />;
  }
);
CardCurtainRevealBody.displayName = "CardCurtainRevealBody";

const CardCurtainRevealTitle = React.forwardRef<HTMLHeadingElement, HTMLMotionProps<"h2">>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useCardCurtainRevealContext();
    const reduceMotion = useReducedMotion();

    return (
      <motion.h2
        ref={ref}
        className={className}
        animate={reduceMotion || isOpen ? { y: 0 } : { y: 170 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        {...props}
      />
    );
  }
);
CardCurtainRevealTitle.displayName = "CardCurtainRevealTitle";

const CardCurtain = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useCardCurtainRevealContext();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "pointer-events-none absolute inset-0 size-full mix-blend-difference",
          className
        )}
        variants={curtainVariants}
        animate={isOpen ? "visible" : "hidden"}
        {...props}
      />
    );
  }
);
CardCurtain.displayName = "CardCurtain";

const CardCurtainRevealDescription = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useCardCurtainRevealContext();

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={curtainVariants}
        animate={isOpen ? "visible" : "hidden"}
        {...props}
      />
    );
  }
);
CardCurtainRevealDescription.displayName = "CardCurtainRevealDescription";

export {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealDescription,
  CardCurtainRevealTitle,
  CardCurtain
};
