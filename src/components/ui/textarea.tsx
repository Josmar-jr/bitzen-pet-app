import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

const textAreaVariants = cva(
  "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50",
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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={textAreaVariants({
          error,
          className,
        })}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
