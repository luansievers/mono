import clsx from "clsx";

interface ToggleProps {
  onChange?: () => void;
  value: boolean;
  states: {
    true: string;
    false: string;
  };
}

export function Toggle({ onChange, value, states, ...props }: ToggleProps) {
  return (
    <div className="relative flex min-h-screen  flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="full relative mr-5 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={value}
            onChange={onChange}
            readOnly
            {...props}
          />
          <div
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
                className={clsx(value ? "text-light-1" : "text-theme-light")}
              >
                {states.true}
              </span>
              <span
                className={clsx(value ? "text-theme-light" : "text-light-1")}
              >
                {states.false}
              </span>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
