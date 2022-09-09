import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React, { forwardRef } from "react";

import { Button } from "./button";

type LinkButtonProps = Pick<NextLinkProps, "href"> &
  React.ComponentProps<typeof Button>;

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  function LinkButton({ href, ...rest }, ref) {
    return (
      <NextLink passHref href={href}>
        <a>
          <Button {...rest} ref={ref} />
        </a>
      </NextLink>
    );
  }
);
