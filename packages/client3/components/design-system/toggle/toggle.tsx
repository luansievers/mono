import clsx from "clsx";

export interface ToggleProps {
  onChange?: () => void;
  value: boolean;
  states: {
    true: string;
    false: string;
  };
}

export function Toggle({ onChange, value, states, ...props }: ToggleProps) {
  return (
    <div className="relative flex flex-col overflow-hidden">
      <div className="flex">
        <label className="full relative inline-flex cursor-pointer">
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
                className={clsx(value ? "text-light-10" : "text-theme-light")}
              >
                {states.true}
              </span>
              <span
                className={clsx(value ? "text-theme-light" : "text-light-10")}
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
