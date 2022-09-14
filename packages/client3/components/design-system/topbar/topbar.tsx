import clsx from "clsx";
import { ReactNode } from "react";

import { useSideBarMenuItem } from "@/hooks/sidebar-hooks";

import { Avatar } from "../avatar";
import { Button } from "../button";
import { Heading } from "../typography";

interface TopBarProps {
  className?: string;
  topBarTitle?: ReactNode;
  avatarUrl?: string;
}

export function TopBar({
  className,
  topBarTitle: _topBarTitle,
  avatarUrl,
}: TopBarProps) {
  const { sideBarMenuItems, selectedMenuItem } = useSideBarMenuItem();
  const topBarTitle =
    (_topBarTitle ||
      sideBarMenuItems.find((menuItem) => menuItem.key === selectedMenuItem)
        ?.label) ??
    "";

  return (
    <div className={clsx("w-full bg-dark-100 shadow-top-bar", className)}>
      <div className="mx-auto px-9 py-7">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Heading level={2} className="text-light-40">
                {topBarTitle}
              </Heading>
            </div>
          </div>
          <div className="float-right flex items-center pr-2 ">
            {/* TODO - REPLACE FOR CONNECT WALLET BUTTON */}
            <Button>Connect Wallet</Button>
            <Avatar image={avatarUrl} size={11} className="pl-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
