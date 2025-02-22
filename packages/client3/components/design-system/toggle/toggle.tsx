import clsx from "clsx";

export interface ToggleProps {
  onChange?: () => void;

  states: {
    isState1Selected: boolean;
    state1: string;
    state2: string;
  };
}

export function Toggle({ onChange, states, ...props }: ToggleProps) {
  const isChecked = Boolean(!states.isState1Selected);
  return (
    <div className="relative flex flex-col overflow-hidden">
      <div className="flex">
        <label className="full relative inline-flex cursor-pointer">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={isChecked}
            onChange={onChange}
            readOnly
            {...props}
          />
          <div
            className={clsx(
              "flex h-10 w-[14.4rem] rounded-full",
              "bg-green-80",
              "after:absolute after:top-0.5 after:left-[3px] after:h-9 after:w-28 after:rounded-full after:border after:border-green-50 after:bg-green-50 after:transition-all after:content-['']",
              "peer-checked:after:border-bg-green-80 peer peer-checked:bg-green-80 peer-checked:after:translate-x-full"
            )}
          >
            <div
              className={clsx(
                "z-10",
                "flex w-full flex-row items-center justify-around px-4",
                "text-sm font-medium"
              )}
            >
              <span className={isChecked ? "text-dark-50" : "text-light-10"}>
                {states.state1}
              </span>
              <span className={isChecked ? "text-light-10" : "text-dark-50"}>
                {states.state2}
              </span>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
