import React, { cloneElement, forwardRef, isValidElement } from "react";

type Variant = "default" | "secondary" | "outline";
type Size = "sm" | "default" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
}

/**
 * small, pragmatic Button that supports asChild (cloning anchor children)
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { asChild = false, variant = "default", size = "default", className = "", children, ...rest },
  ref
) {
  const base = "inline-flex items-center gap-2 rounded-lg font-medium transition focus:outline-none";
  const variants: Record<Variant, string> = {
    default: "bg-amber-400 text-black",
    secondary: "bg-neutral-800 text-white border border-neutral-700",
    outline: "bg-transparent text-neutral-100 border border-neutral-700",
  };
  const sizes: Record<Size, string> = {
    sm: "px-3 py-1 text-sm",
    default: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
  };

  const merged = [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");

  if (asChild && isValidElement(children)) {
    // child is a react element (likely an <a>); coerce its props to `any` so TS stops screaming
    const child = children as React.ReactElement & { props: any };
    const childClass = [child.props?.className, merged].filter(Boolean).join(" ");
    return cloneElement(child, { className: childClass, ref, ...rest } as any);
  }

  return (
    <button ref={ref as any} className={merged} {...rest}>
      {children}
    </button>
  );
});

export default Button;
