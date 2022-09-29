import "react-datepicker/dist/react-datepicker.css";

import clsx from "clsx";
import { forwardRef, ReactNode } from "react";
import ReactDatePicker from "react-datepicker";

import { Icon, IconNameType } from "@/components/design-system";

import { Caption } from "../typography/caption";

interface DatePickerProps extends React.ComponentProps<typeof ReactDatePicker> {
  /**
   * Helper text that will appear below the input.
   */
  helperText?: string;
  /**
   * Error message that replaces the `helperText` when supplied. Please note that this component has special behaviour when it appears inside of a `<Form>` component: it will automatically display error messages associated with its `name`
   */
  errorMessage?: string;
  /**
   * Class that goes specifically on the input element, not on the wrapper. Makes it easier to override input-specific styles like placeholder
   */
  inputClassName?: string;
  disabled?: boolean;
  /**
   * An element that will render on the right side of the input. Can be used to create things like a "reveal password" button, or a "max" button
   */
  decoration?: IconNameType | ReactNode;
  textSize?: "sm" | "md" | "lg" | "xl";
}

export const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>(
  function Input(
    {
      helperText,
      errorMessage,
      disabled = false,
      decoration,
      inputClassName,
      className,
      autoComplete = "off",
      textSize = "md",
      ...rest
    },
    ref
  ) {
    const isError = !!errorMessage;
    return (
      <div
        className={clsx(
          "flex flex-col items-start justify-start",
          "text-white",
          textSize === "sm"
            ? "text-sm"
            : textSize === "lg"
            ? "text-lg"
            : textSize === "xl"
            ? "text-2xl"
            : null,
          className
        )}
      >
        <div className={clsx("relative mt-1 w-full rounded", "ring-green-50")}>
          <div>
            <ReactDatePicker
              className={clsx(
                "unfocused w-full rounded",
                "bg-transparent",
                "placeholder:text-dark-80",
                "text-light-40",
                isError ? "border border-state-error" : "border border-dark-80",
                disabled && "opacity-50",
                decoration ? "pr-8" : null,
                textSize === "sm"
                  ? "py-1.5 px-3"
                  : textSize === "md"
                  ? "py-2 px-3"
                  : textSize === "lg"
                  ? "px-4 py-3"
                  : textSize === "xl"
                  ? "px-5 py-4"
                  : null,
                inputClassName
              )}
              ref={ref}
              disabled={disabled}
              autoComplete={autoComplete}
              {...rest}
            />
            {typeof decoration === "string" ? (
              <Icon
                name={decoration as IconNameType}
                className="absolute right-3.5 top-1/2 -translate-y-1/2"
              />
            ) : decoration ? (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                {decoration}
              </div>
            ) : null}
          </div>
        </div>
        {helperText || errorMessage ? (
          <Caption
            className={clsx(
              isError ? "text-state-error" : "text-dark-50",
              "mt-1 text-sm leading-none"
            )}
          >
            {errorMessage ? errorMessage : helperText}
          </Caption>
        ) : null}
      </div>
    );
  }
);
