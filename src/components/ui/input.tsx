import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputVariants = cva(
  "flex h-12 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      error: {
        true: "!border-destructive focus-visible:!ring-destructive",
        false: "border-input focus-visible:ring-cyan-500",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={inputVariants({
          error,
          className,
        })}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
