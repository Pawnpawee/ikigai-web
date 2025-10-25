"use client";
import React, { forwardRef } from "react";

type Appearance = "outline" | "solid" | "ghost";
type Intent = "primary" | "danger" | "neutral";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: Appearance;
  intent?: Intent;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: "button" | "a" | "div"; // simple polymorphic
  href?: string; // when as="a"
}

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-base",
  lg: "h-16 px-8 text-lg", // ~64px height like Figma (160x64)
};

function computeClasses(appearance: Appearance, intent: Intent) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full font-semibold select-none transition-colors disabled:opacity-50 disabled:pointer-events-none";

  const outline =
    "bg-transparent border-4 border-[var(--btn-color)] text-[var(--btn-color)] hover:bg-[var(--btn-color)] hover:text-[var(--color-black)]";

  const solidBase = "text-[var(--color-black)] hover:opacity-90";
  const solidByIntent: Record<Intent, string> = {
    primary: "bg-gradient-primary",
    danger: "bg-[var(--btn-color)]",
    neutral: "bg-[var(--btn-color)]",
  };

  const ghost = "bg-transparent text-[var(--btn-color)] hover:bg-[color:rgba(255,255,255,0.06)]";

  if (appearance === "outline") return `${base} ${outline}`;
  if (appearance === "ghost") return `${base} ${ghost}`;
  // solid
  return `${base} ${solidBase} ${solidByIntent[intent]}`;
}

// Map intent to a CSS var value for --btn-color
function intentColorVar(intent: Intent): string {
  switch (intent) {
    case "primary":
      return "var(--color-blue-500)"; 
    case "danger":
      return "var(--color-red-500)";
    case "neutral":
    default:
      return "var(--color-foreground)";
  }
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement, ButtonProps>(
  (
    {
      appearance = "outline",
      intent = "primary",
      size = "lg",
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = "",
      as = "button",
      href,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const classes = [computeClasses(appearance, intent), sizeClasses[size], fullWidth ? "w-full" : "", className]
      .filter(Boolean)
      .join(" ");

    const styleWithColor = { ...(style || {}), ["--btn-color" as any]: intentColorVar(intent) } as React.CSSProperties;

    if (as === "a") {
      return (
        <a ref={ref as any} href={href} className={classes} style={styleWithColor} {...(rest as any)}>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </a>
      );
    }

    if (as === "div") {
      return (
        <div ref={ref as any} className={classes} style={styleWithColor} {...(rest as any)}>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </div>
      );
    }

    return (
      <button ref={ref as any} className={classes} style={styleWithColor} {...rest}>
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
