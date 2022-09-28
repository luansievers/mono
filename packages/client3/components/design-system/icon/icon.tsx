import clsx from "clsx";
import { forwardRef } from "react";

import AddCircle from "./svg/add-circle.svg";
import ArrowDownCircle from "./svg/arrow-down-circle-solid.svg";
import ArrowDown from "./svg/arrow-down.svg";
import ArrowSmRight from "./svg/arrow-sm-right.svg";
import ArrowTopRight from "./svg/arrow-top-right.svg";
import ArrowUpCircle from "./svg/arrow-up-circle-solid.svg";
import ArrowUp from "./svg/arrow-up.svg";
import CaretLeft from "./svg/caret-left.svg";
import CheckmarkCircle from "./svg/checkmark-circle-solid.svg";
import Checkmark from "./svg/checkmark.svg";
import ChevronDown from "./svg/chevron-down.svg";
import ClipboardText from "./svg/clipboard-text.svg";
import Clock from "./svg/clock.svg";
import Copy from "./svg/copy.svg";
import DiscordLogoOutlined from "./svg/discord-logo-outlined.svg";
import Discord from "./svg/discord.svg";
import DotsHorizontal from "./svg/dots-horizontal.svg";
import Exclamation from "./svg/exclamation.svg";
import Gfi from "./svg/gfi.svg";
import InfoCircleOutlined from "./svg/info-circle-outlined.svg";
import InfoCircle from "./svg/info-circle-solid.svg";
import Link from "./svg/link.svg";
import LinkedIn from "./svg/linkedin.svg";
import Menu from "./svg/menu.svg";
import PlusCircle from "./svg/plus-circle.svg";
import TwitterLogoOutlined from "./svg/twitter-logo-outlined.svg";
import Twitter from "./svg/twitter.svg";
import Usdc from "./svg/usdc.svg";
import Wallet from "./svg/wallet.svg";
import XCircle from "./svg/x-circle.svg";
import X from "./svg/x.svg";

export const iconManifest = {
  AddCircle,
  ArrowDown,
  ArrowDownCircle,
  ArrowSmRight,
  ArrowTopRight,
  ArrowUp,
  ArrowUpCircle,
  Checkmark,
  CheckmarkCircle,
  ChevronDown,
  Copy,
  Discord,
  DotsHorizontal,
  Exclamation,
  Gfi,
  InfoCircle,
  Link,
  LinkedIn,
  Menu,
  Twitter,
  Usdc,
  Wallet,
  X,
  ClipboardText,
  XCircle,
  PlusCircle,
  CaretLeft,
  DiscordLogoOutlined,
  TwitterLogoOutlined,
  Clock,
  InfoCircleOutlined,
};

export type IconNameType = keyof typeof iconManifest;
export type IconSizeType = "xs" | "sm" | "md" | "lg" | "text";

export interface IconProps {
  name: keyof typeof iconManifest;
  size?: IconSizeType;
  className?: string;
  onClick?: () => void;
}

export function sizeToClassName(size: IconProps["size"]) {
  return size === "xs"
    ? "h-4 w-4"
    : size === "sm"
    ? "h-5 w-5"
    : size === "md"
    ? "h-6 w-6"
    : size === "lg"
    ? "h-8 w-8"
    : size === "text"
    ? "h-[1em] w-[1em]"
    : undefined;
}

export const Icon = forwardRef<SVGElement, IconProps>(function Icon(
  { name, size = "text", className, onClick }: IconProps,
  ref
) {
  const IconComponent = iconManifest[name];
  return (
    <IconComponent
      aria-hidden="true"
      ref={ref}
      className={clsx(sizeToClassName(size), "inline shrink-0", className)}
      onClick={onClick}
    />
  );
});
