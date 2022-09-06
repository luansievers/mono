import clsx from "clsx";
import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { Icon, IconProps, Spinner } from "@/components/design-system";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Content within the button
   */
  children?: ReactNode;
  disabled?: boolean;
  buttonType?: "primary" | "secondary" | "tertiary";
  iconLeft?: IconProps["name"];
  iconRight?: IconProps["name"];
  isLoading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      iconLeft,
      iconRight,
      disabled,
      type,
      buttonType = "primary",
      isLoading = false,
      className,
      ...rest
    },
    ref
  ) {
    const formContext = useFormContext();
    let _disabled = disabled;
    let _isLoading = isLoading;
    if (formContext !== null && type === "submit") {
      const {
        formState: { isSubmitting, errors },
      } = formContext;
      // Can't use the built-in isValid on formState because that only updates when the mode is set to onChange/onBlur/whatever
      const isValid = Object.keys(errors).length === 0;
      _disabled = disabled || isSubmitting || !isValid;
      _isLoading = isSubmitting;
    }
    const spinnerOnLeft = _isLoading && iconLeft;
    const spinnerOnRight = _isLoading && !spinnerOnLeft;
    return (
      <button
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={clsx(
          "rounded-[100px] ",
          "flex items-center px-6 py-4",
          {
            "bg-theme-accent1 text-theme-dark hover:bg-accent1-100 disabled:opacity-40 disabled:hover:bg-theme-accent1":
              buttonType == "primary",
            "bg-white disabled:hover:bg-white border border-accent1-100 text-theme-accent1 hover:bg-accent1-100/10 disabled:border-dark-80 disabled:text-dark-80":
              buttonType == "secondary",
            "text-white disabled:hover:bg-white  hover:bg-dark-80 disabled:text-dark-80":
              buttonType == "tertiary",
          },
          className
        )}
        disabled={_disabled}
        type={type}
        {...rest}
      >
        {spinnerOnLeft ? (
          <Spinner size="sm" className={clsx(children && "mr-1")} />
        ) : iconLeft ? (
          <Icon
            name={iconLeft}
            size="sm"
            className={clsx(children && "mr-1")}
          />
        ) : null}
        {children && <div className="text-sm font-semibold">{children}</div>}
        {spinnerOnRight ? (
          <Spinner size="sm" className={clsx(children && "ml-1")} />
        ) : iconRight ? (
          <Icon
            name={iconRight}
            size="sm"
            className={clsx(children && "ml-1")}
          />
        ) : null}
      </button>
    );
  }
);
