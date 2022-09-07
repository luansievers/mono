import clsx from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Destination URL. This can be any valid URL, but it should be a relative URL if it's meant to link within the app
   */
  href: string;
  noUnderline?: boolean;
  /**
   * Advanced option for controlling props specific to Next.js' Link component
   */
  nextLinkProps?: NextLinkProps;
  className?: string;
}

export function Link({
  href,
  noUnderline = false,
  nextLinkProps,
  className,
  ...rest
}: LinkProps) {
  return (
    <NextLink passHref {...nextLinkProps} href={href}>
      <a
        className={clsx(
          noUnderline ? "no-underline" : "underline",
          "font-semibold",
          className
        )}
        {...rest}
      />
    </NextLink>
  );
}
