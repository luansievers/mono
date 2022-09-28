import clsx from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";
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
  useNextLink?: boolean; // Defaults to true. Use this when we need to use underlying a tag. NextLinkProps will be ignored if this prop is used
}

export function Link({
  href,
  noUnderline = false,
  nextLinkProps,
  className,
  useNextLink = true,
  ...rest
}: LinkProps) {
  const ChildComponent = (
    <a
      className={clsx(
        noUnderline ? "no-underline" : "underline",
        "font-semibold",
        className
      )}
      {...rest}
    />
  );

  if (useNextLink) {
    return (
      <NextLink passHref {...nextLinkProps} href={href}>
        {ChildComponent}
      </NextLink>
    );
  }
  return <>{ChildComponent}</>;
}
