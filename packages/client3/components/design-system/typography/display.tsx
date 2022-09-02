import clsx from "clsx";
import { HTMLAttributes } from "react";

export interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2;
}

export function Display({ level, className, ...rest }: DisplayProps) {
  const Component = `div`;

  return (
    <Component
      className={clsx(`display-${level}`, "font-semibold", className)}
      {...rest}
    />
  );
}
