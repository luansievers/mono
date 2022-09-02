import clsx from "clsx";
import { HTMLAttributes } from "react";

export function Caption({
  className,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  const Component = "small";
  return <Component className={clsx(className)} {...rest} />;
}
