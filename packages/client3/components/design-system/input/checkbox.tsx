import clsx from "clsx";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

import { Caption } from "../typography";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelDecoration?: ReactNode;
  id?: string;
  className?: string;
  errorLabel?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      labelDecoration,
      id,
      name,
      className,
      disabled,
      errorLabel,
      ...rest
    },
    ref
  ) {
    const _id = id ?? name;
    return (
      <div className={clsx("flex-col", className)}>
        <div className={clsx("relative flex h-6 w-6")}>
          <input
            {...rest}
            id={_id}
            name={name}
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className={clsx(
              "peer h-6 w-6  cursor-pointer appearance-none rounded",
              "border border-dark-80 disabled:bg-dark-70",
              "checked:border-0 checked:bg-theme-accent1 checked:disabled:bg-theme-accent1/40",
              errorLabel && "border-2 border-state-error"
            )}
          />
          <svg
            viewBox="0 0 17 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 peer-checked:block"
          >
            <path
              d="M6.364 9.193L15.556 0L16.971 1.414L6.364 12.021L0 5.657L1.414 4.243L6.364 9.193Z"
              className={clsx("fill-theme-dark", disabled && "opacity-50")}
            />
          </svg>
        </div>

        {label && (
          <div className="flex w-full items-center justify-between gap-1">
            <label htmlFor={_id} className="mt-0.5">
              {label}
            </label>
            {labelDecoration}
          </div>
        )}

        {errorLabel && (
          <Caption className="mt-0.5 text-state-error">{errorLabel}</Caption>
        )}
      </div>
    );
  }
);
