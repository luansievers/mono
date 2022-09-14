import clsx from "clsx";
import { forwardRef, ReactNode, TextareaHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Caption } from "../typography";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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

  disabled?: boolean;
  /**
   * An element that will render on the right side of the input. Can be used to create things like a "reveal password" button, or a "max" button
   */
  textSize?: "sm" | "md" | "lg" | "xl";
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      name,
      id,
      helperText,
      errorMessage,
      disabled = false,
      className,
      autoComplete = "off",
      textSize = "md",
      onBlur,
      ...rest
    },
    ref
  ) {
    {
      const formContext = useFormContext();
      const [focus, setFocus] = useState(false);
      let _errorMessage = errorMessage;
      if (formContext !== null) {
        _errorMessage = formContext.formState.errors[name]?.message;
      }
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
              : null
          )}
        >
          <div
            className={clsx(
              "relative mt-1 w-full rounded",
              focus ? null : "ring ring-dark-80",
              isError ? "ring ring-state-error" : null,

              focus
                ? [isError ? "ring-2 ring-state-error" : "ring ring-green-50"]
                : "ring-green-50"
            )}
          >
            <textarea
              className={clsx(
                "unfocused w-full rounded",
                "bg-transparent",
                "placeholder:text-dark-80",
                "text-light-40",
                "min-h-20",
                disabled && "opacity-50",
                textSize === "sm"
                  ? "py-1.5 px-3"
                  : textSize === "md"
                  ? "py-2 px-3"
                  : textSize === "lg"
                  ? "px-4 py-3"
                  : textSize === "xl"
                  ? "px-5 py-4"
                  : null,

                className
              )}
              onClick={() => {
                setFocus(true);
              }}
              onBlur={(event) => {
                onBlur && onBlur(event);
                setFocus(false);
              }}
              disabled={disabled}
              autoComplete={autoComplete}
              {...rest}
              ref={ref}
              placeholder={focus ? "" : rest.placeholder}
            />
          </div>

          {helperText || _errorMessage ? (
            <Caption
              className={clsx(
                isError ? "text-state-error" : "text-dark-50",
                "mt-1 text-sm leading-none"
              )}
            >
              {_errorMessage ? _errorMessage : helperText}
            </Caption>
          ) : null}
        </div>
      );
    }
  }
);
