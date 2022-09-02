import clsx from "clsx";
import { HTMLAttributes, ComponentType } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** This option is only valid for level 5 and 6 */
  medium?: boolean;
  as?: string | ComponentType<{ className: string }>;
}

export function Heading({
  level,
  medium = false,
  as,
  className,
  ...rest
}: HeadingProps) {
  const Component = as ?? `h${level}`;

  return (
    <Component
      className={clsx(
        level === 1
          ? "font-bold"
          : level < 5
          ? "font-semibold"
          : medium
          ? "font-medium"
          : "font-semibold",
        className
      )}
      {...rest}
    />
  );
}
