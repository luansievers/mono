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
          "rounded-[100px]",
          "flex items-center",
          children && "px-6",
          {
            "bg-accent-1 text-green-90 hover:bg-accent-1-shade disabled:opacity-30 disabled:hover:bg-accent-1":
              buttonType == "primary",
            "border border-accent-1 bg-transparent text-accent-1 hover:bg-accent-1/10 disabled:border-dark-80 disabled:text-dark-80 disabled:hover:bg-transparent":
              buttonType == "secondary",
            "bg-transparent text-white hover:bg-dark-80 disabled:text-dark-80 disabled:hover:bg-transparent":
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
        {children && (
          <div className="py-4 text-button font-semibold">{children}</div>
        )}
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
