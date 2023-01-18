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
  buttonType?: "primary" | "secondary" | "tertiary" | "accent2" | "custom";
  iconLeft?: IconProps["name"];
  iconRight?: IconProps["name"];
  isLoading?: { isLoading: boolean; position?: "left" | "right" };
  childrenClassName?: string;
};

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      iconLeft,
      iconRight,
      disabled,
      type,
      buttonType = "primary",
      isLoading = { isLoading: false, spinnerPosition: "left" }, //because the IconProps does not have a loading icon
      className,
      childrenClassName,
      ...rest
    },
    ref
  ) {
    const formContext = useFormContext();
    let _disabled = disabled;
    let _isLoading = isLoading.isLoading;
    if (formContext !== null && type === "submit") {
      const {
        formState: { isSubmitting, errors },
      } = formContext;
      const filteredOutWarnings = Object.fromEntries(
        Object.entries(errors).filter(([, value]) => value?.type !== "warn")
      );
      const isValid = Object.keys(filteredOutWarnings).length === 0;
      _disabled = disabled || isSubmitting || !isValid;
      _isLoading = isSubmitting;
    }
    const spinnerOnLeft = _isLoading && isLoading.position === "left";
    const spinnerOnRight = _isLoading && !spinnerOnLeft;
    return (
      <button
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={clsx(
          buttonType != "custom" && "rounded-[100px]",
          "flex items-center",
          children && "px-6",
          {
            "bg-accent-1 text-green-90 hover:bg-accent-1-shade disabled:opacity-40 disabled:hover:bg-accent-1":
              buttonType == "primary",
            "border border-accent-1 bg-dark-100 text-accent-1 hover:bg-dark-90 disabled:border-dark-80 disabled:text-dark-80 disabled:hover:bg-white":
              buttonType == "secondary",
            "bg-transparent text-white hover:bg-dark-80 disabled:text-dark-80 disabled:hover:bg-transparent":
              buttonType == "tertiary",
            "bg-accent-2 text-green-90 hover:bg-accent-2-opacity disabled:text-dark-80 disabled:hover:bg-transparent":
              buttonType == "accent2",
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
            className={clsx(children && "mr-2.5")}
          />
        ) : null}
        {children && (
          <div
            className={clsx(
              "w-full text-center text-button font-semibold",
              childrenClassName || "py-4"
            )}
          >
            {children}
          </div>
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
