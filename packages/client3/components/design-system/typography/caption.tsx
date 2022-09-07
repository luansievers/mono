import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Caption({
  className,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  return <small className={clsx(className)} {...rest} />;
}
