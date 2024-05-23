import * as React from "react";

import * as RPNInput from "react-phone-number-input";

import { Input, type InputProps } from "@/components/ui/input";

import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
    error?: boolean;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, error, ...props }, ref) => {
  return (
    <div data-error={error} className="group w-full">
      <RPNInput.default
        ref={ref}
        className={cn("flex", className)}
        flagComponent={undefined}
        countrySelectComponent={() => null}
        inputComponent={InputComponent}
        /**
         * Handles the onChange event.
         *
         * react-phone-number-input might trigger the onChange event as undefined
         * when a valid phone number is not entered. To prevent this,
         * the value is coerced to an empty string.
         *
         * @param {E164Number | undefined} value - The entered value
         */
        onChange={(value) => onChange?.(value as RPNInput.Value)}
        {...props}
      />
    </div>
  );
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn(
        "group-data-[error=true]:border-destructive group-data-[error=true]:focus-visible:ring-destructive",
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
);
InputComponent.displayName = "InputComponent";

export { PhoneInput };
