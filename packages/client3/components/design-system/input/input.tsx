import clsx from "clsx";
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Icon, IconNameType, HelperText } from "@/components/design-system";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label text that will appear above the input
   */
  label: string;
  /**
   * Visually hide the label. Screen readers will still read it.
   */
  hideLabel?: boolean;
  /**
   * The `name` attribute of the input element. This is important to the functionality of standard HTML forms.
   */
  name: string;
  /**
   * The `id` attribute of the input element. This is optional because it will match the `name` prop if not given.
   */
  id?: string;
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
  /**
   * Class that goes specifically on the label element, not on the wrapper. Makes it easier to override label-specific styles.
   */
  labelClassName?: string;
  disabled?: boolean;
  /**
   * An element that will render on the right side of the input. Can be used to create things like a "reveal password" button, or a "max" button
   */
  decoration?: IconNameType | ReactNode;
  /**
   * An element that will render on the right side of the label. Can be used to add extra contextual information like a tooltip.
   */
  labelDecoration?: ReactNode;
  textSize?: "sm" | "md" | "lg" | "xl";
  money?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hideLabel = !label,
    name,
    id,
    type = "text",
    helperText,
    errorMessage,
    disabled = false,
    decoration,
    labelDecoration,
    inputClassName,
    labelClassName,
    className,
    autoComplete = "off",
    textSize = "md",
    money,
    onBlur,
    ...rest
  },
  ref
) {
  const formContext = useFormContext();
  const [focus, setFocus] = useState(false);
  let _errorMessage = errorMessage;
  if (formContext !== null) {
    _errorMessage = formContext.formState.errors[name]?.message;
  }

  const _id = id ?? name;
  const isError = !!_errorMessage;
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
      <div
        className={clsx(
          "mb-1.5 flex w-full items-end justify-between gap-4 leading-none",
          hideLabel && "sr-only",
          labelClassName
        )}
      >
        <label htmlFor={_id}>{label}</label>
        {labelDecoration ? labelDecoration : null}
      </div>

      <div
        className={clsx(
          "relative mt-1 w-full rounded",
          money ? "border" : null,
          focus
            ? [isError ? "ring-2 ring-state-error" : "ring ring-theme-primary"]
            : "ring-theme-primary",
          isError && money ? "border-state-error" : null
        )}
      >
        <div>
          <div
            className={clsx(
              money
                ? "pointer-events-none absolute inset-y-0 left-0 flex items-center border-r px-3"
                : null,
              isError
                ? [
                    focus
                      ? "border-r-2 border-state-error"
                      : "border-state-error",
                  ]
                : "border-r"
            )}
          >
            <span className="text-dark-80 sm:text-sm">
              {(() => {
                if (money) return <span>$</span>;
              })()}
            </span>
          </div>
          <input
            className={clsx(
              "unfocused w-full rounded",
              money ? "mx-10" : "border",
              "bg-transparent",
              "placeholder:text-dark-80",
              "text-dark-80",

              isError ? "border-state-error" : null,

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
            onClick={() => {
              setFocus(true);
            }}
            onBlur={(event) => {
              onBlur && onBlur(event);
              setFocus(false);
            }}
            name={name}
            id={_id}
            type={type}
            disabled={disabled}
            autoComplete={autoComplete}
            {...rest}
          />
          <div
            className={clsx(
              money ? "absolute right-14 top-1/2 -translate-y-1/2" : null
            )}
          >
            <span className=" text-dark-80 sm:text-sm">
              {(() => {
                if (money) return <span>USDC</span>;
              })()}
            </span>
          </div>
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
      {helperText || _errorMessage ? (
        <HelperText
          className={clsx(
            isError ? "text-state-error" : "text-dark-80",
            "mt-1 text-sm leading-none"
          )}
        >
          {_errorMessage ? _errorMessage : helperText}
        </HelperText>
      ) : null}
    </div>
  );
});
