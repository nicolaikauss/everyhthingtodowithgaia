"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-night";

export const buttonVariants = {
  ghost: cn(
    "inline-flex min-h-11 min-w-[44px] cursor-pointer items-center justify-center rounded-sm border border-ink/30 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-ink transition-colors duration-200 hover:border-ink/55 hover:bg-white/[0.03]",
    focusRing
  ),
  subtle: cn(
    "inline-flex min-h-11 min-w-[44px] cursor-pointer items-center justify-center rounded-sm border border-white/18 bg-white/[0.03] px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-ink backdrop-blur-sm transition-colors duration-200 hover:border-white/28 hover:bg-white/[0.06]",
    focusRing
  ),
  linkArrow: cn(
    "group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm px-1 py-2 text-xs uppercase tracking-[0.14em] text-ink/80 transition-colors duration-200 hover:text-ink",
    "border-0 bg-transparent hover:bg-transparent",
    focusRing
  )
} as const;

export type GaiaButtonVariant = keyof typeof buttonVariants;

export function LinkArrowDecor({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "h-px w-8 bg-ink/45 transition-[width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-10 group-hover:bg-ink/80",
        className
      )}
      aria-hidden
    />
  );
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: GaiaButtonVariant;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "ghost", type = "button", children, ...props }, ref) => {
    const content =
      variant === "linkArrow" ? (
        <>
          {children}
          <LinkArrowDecor />
        </>
      ) : (
        children
      );

    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants[variant], className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";

export type ButtonLinkProps = Omit<React.ComponentProps<typeof Link>, "className"> & {
  variant?: GaiaButtonVariant;
  className?: string;
};

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "ghost", children, ...props }, ref) => {
    const content =
      variant === "linkArrow" ? (
        <>
          {children}
          <LinkArrowDecor />
        </>
      ) : (
        children
      );

    return (
      <Link ref={ref} className={cn(buttonVariants[variant], className)} {...props}>
        {content}
      </Link>
    );
  }
);
ButtonLink.displayName = "ButtonLink";
