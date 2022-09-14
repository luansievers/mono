import clsx from "clsx";

import { FreeArtistsLogoFullSvg, FreeArtistsLogoProps } from "../logo";
import { Toggle, ToggleProps } from "../toggle";
import { Heading } from "../typography";

export type SideBarMenuItemType = Array<{ label: string; key: string }>;

interface SideBarProps extends ToggleProps {
  /**
   * Sidebar Labels
   */
  labels: SideBarMenuItemType;
  className?: string;
  selectedPathName: string;
}

export function SideBar({
  labels,
  className,
  states,
  width,
  height,
  onChange: onToggle,
  selectedPathName,
}: SideBarProps & FreeArtistsLogoProps) {
  return (
    <div
      className={clsx("h-full w-72 bg-green-90 shadow-md", className)}
      id="sideBar"
    >
      <div className="px-12 pt-4 pb-12">
        <a href="#!">
          <div className="flex justify-center">
            <FreeArtistsLogoFullSvg width={width} height={height} />
          </div>
        </a>
      </div>
      <div className="flex justify-center pb-10">
        <Toggle states={states} onChange={onToggle} />
      </div>
      <ul className="relative ">
        {labels.map((label) => (
          <li key={label.key} className="relative">
            <a
              href={label.key}
              aria-current="page"
              className={clsx(
                "relative flex h-20 items-center text-sm font-medium hover:bg-green-80 active:bg-green-50 active:text-accent-1",
                [
                  selectedPathName === `${label.key}`
                    ? "bg-green-80 text-accent-1"
                    : "text-light-10",
                ]
              )}
            >
              <Heading level={6} medium={true} className="pl-8">
                {label.label}
              </Heading>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
