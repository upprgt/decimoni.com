import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary";
}

export const Badge: React.FC<BadgeProps> = ({ children, className = "", variant = "default", ...rest }) => {
  const base = "inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full";
  const vclass = variant === "secondary" ? "bg-neutral-800 text-neutral-200" : "bg-amber-400 text-black";
  return (
    <span {...rest} className={`${base} ${vclass} ${className}`}>
      {children}
    </span>
  );
};