import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  function Checkbox({ id, name, label, ...rest }, ref) {
    const _id = id ?? name;
    return (
      <div className={clsx("flex items-center")}>
        <div className="relative flex justify-center">
          <input
            {...rest}
            className={clsx(
              "peer h-4 w-4 cursor-pointer appearance-none rounded-full", //base style
              "border border-dark-80 bg-white", //enabled state style
              "checked:border-theme-accent1 checked:bg-theme-accent1", //checked state style
              "disabled:border-0 disabled:bg-dark-70 checked:disabled:bg-theme-accent1/40" //disabled state styles
            )}
            type="radio"
            ref={ref}
            name={name}
            id={_id}
          />
          <span className="absolute top-1/2 left-1/2 hidden h-2 w-2  -translate-y-1/2 -translate-x-1/2 rounded-full bg-white peer-checked:block peer-disabled:bg-white/40" />
        </div>

        {label && (
          <label
            className="form-check-label text-gray-800 inline-block"
            htmlFor={_id}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
