import clsx from "clsx";
import { HTMLAttributes } from "react";

export interface BodyTextProps extends HTMLAttributes<HTMLHeadingElement> {
  size: "large" | "medium" | "normal" | "small";
  semiBold?: boolean;
}

export function BodyText({
  size,
  semiBold = false,
  className,
  ...rest
}: BodyTextProps) {
  const Component = "p";
  return (
    <Component
      className={clsx(
        `body-text-${size}`,
        semiBold ? "font-semibold" : "font-normal",
        className
      )}
      {...rest}
    />
  );
}
