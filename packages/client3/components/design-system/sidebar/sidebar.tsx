import clsx from "clsx";
import { useRouter } from "next/router";

import { FreeArtistsLogoFull } from "../logo";
import { Toggle, ToggleProps } from "../toggle";
import { Heading } from "../typography";

interface SideBarProps extends ToggleProps {
  /**
   * Sidebar Labels
   */
  labels: Array<string>;
  className?: string;
  pathName?: string;
  storyBookMode?: string;
}

export function SideBar({
  labels,
  className,
  value,
  states,
  pathName,
  storyBookMode,
}: SideBarProps) {
  const router = useRouter();
  const handleClick = (event: any, href: string, pathName?: string) => {
    if (pathName) {
      console.log("StoryBook mode", pathName);
      return;
    } else {
      event.preventDefault();
      router.push(href);
    }
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
              <FreeArtistsLogoFull storyBookMode={storyBookMode} />
            </div>
          </div>
        </a>
      </div>
      <div className="flex shrink-0 justify-center pb-10">
        <Toggle value={value} states={states} />
      </div>
      <ul className="relative ">
        {labels.map((label: string) => (
          <li key={label} className="relative">
            <a
              href={pathName ? "" : label}
              onClick={
                pathName
                  ? (event) => handleClick(event, label, pathName)
                  : (event) => handleClick(event, `/${label}`)
              }
              aria-current="page"
              className={clsx(
                "relative flex h-20 items-center text-sm font-medium text-light-10 hover:bg-green-80 active:bg-theme-primary active:text-theme-accent1",
                pathName
                  ? [
                      pathName === `/${label}`
                        ? "bg-green-80 text-theme-accent1"
                        : null,
                    ]
                  : [
                      router.pathname === `/${label}`
                        ? "bg-green-80 text-theme-accent1"
                        : null,
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
