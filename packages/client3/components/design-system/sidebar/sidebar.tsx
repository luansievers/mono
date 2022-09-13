import clsx from "clsx";
import { useRouter } from "next/router";

import { FreeArtistsLogoFullSvg, FreeArtistsLogoProps } from "../logo";
import { Toggle, ToggleProps } from "../toggle";
import { Heading } from "../typography";

interface SideBarProps extends ToggleProps {
  /**
   * Sidebar Labels
   */
  labels: Array<string>;
  className?: string;
}

export function SideBar({
  labels,
  className,
  states,
  width,
  height,
}: SideBarProps & FreeArtistsLogoProps) {
  const router = useRouter();
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <div
      className={clsx("absolute h-full w-72 bg-green-90 shadow-md", className)}
      id="sideBar"
    >
      <div className="px-6 pt-4 pb-9">
        <a href="#!">
          <div className="flex justify-center">
            <div className="shrink-0">
              <FreeArtistsLogoFullSvg width={width} height={height} />
            </div>
          </div>
        </a>
      </div>
      <div className="flex shrink-0 justify-center pb-10">
        <Toggle states={states} />
      </div>
      <ul className="relative ">
        {labels.map((label: string) => (
          <li key={label} className="relative">
            <a
              href={label}
              onClick={(event) => handleClick(event, `/${label}`)}
              aria-current="page"
              className={clsx(
                "relative flex h-20 items-center text-sm font-medium hover:bg-green-80 active:bg-green-50 active:text-accent-1",
                [
                  router.pathname === `/${label}`
                    ? "bg-green-80 text-accent-1"
                    : "text-light-10",
                ]
              )}
            >
              <Heading level={6} medium={true} className="pl-8">
                {label}
              </Heading>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
