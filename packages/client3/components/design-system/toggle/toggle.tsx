import clsx from "clsx";
import { InputHTMLAttributes, useState } from "react";

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * State of the toggle - either Artists or Backers
   */
  user: UserType;
}

export enum UserType {
  BACKER = "backer",
  ARTIST = "artist",
}

export function Toggle({ user, ...props }: ToggleProps) {
  const value = user === UserType.ARTIST ? true : false;
  const [toggleState, setToggleState] = useState(value);

  return (
    <div className="relative flex min-h-screen  flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="full relative mr-5 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={toggleState}
            readOnly
            {...props}
          />
          <div
            onClick={() => {
              setToggleState(!toggleState);
            }}
            className={clsx(
              "flex h-10 w-[14.4rem] rounded-full",
              "bg-theme-accent5",
              "after:absolute after:top-0.5 after:left-[3px] after:h-9 after:w-28 after:rounded-full after:border after:border-theme-primary after:bg-theme-primary after:transition-all after:content-['']",
              "peer peer-checked:bg-theme-accent5 peer-checked:after:translate-x-full peer-checked:after:border-theme-primary"
            )}
          >
            <div
              className={clsx(
                "z-10",
                "flex w-full flex-row items-center justify-around px-4",
                "text-sm font-medium"
              )}
            >
              <span
                className={clsx(
                  toggleState ? "text-light-1" : "text-theme-light"
                )}
              >
                Backer
              </span>
              <span
                className={clsx(
                  toggleState ? "text-theme-light" : "text-light-1"
                )}
              >
                Artists
              </span>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
