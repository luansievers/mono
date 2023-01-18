import clsx from "clsx";
import { ComponentProps, useState } from "react";
import {
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

import { Input } from "./input";
import { Icon } from "../icon";

type DropDownProps = ComponentProps<typeof Input> &
  UseControllerProps<any> & {
    placeHolder: string;
    options: string[];
  };

export function DropDown({
  placeHolder,
  options,
  name,
  rules,
  control,
  shouldUnregister,
  defaultValue,
  errorMessage,
}: DropDownProps) {
  const {
    field: { onChange },
  } = useController({
    name,
    rules,
    control,
    shouldUnregister,
    defaultValue,
  });

  const formContext = useFormContext();
  const _errorMessage = errorMessage;
  if (formContext !== null) {
    // _errorMessage = formContext.formState.errors[name]?.message;
  }
  const isError = !!_errorMessage;

  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownPlaceHolder, setDropDownPlaceHolder] = useState(placeHolder);

  const handleDropDownClick = () => {
    setShowDropDown(!showDropDown);
  };

  const handleOptionClick = (value: string) => {
    setDropDownPlaceHolder(value);
    onChange(value);
    setShowDropDown(false);
  };

  return (
    <div className="relative m-1 rounded">
      <div>
        <button
          className={clsx(
            "flex items-center justify-between",
            "rounded-md border",
            isError ? "border-state-error" : "border-dark-80",
            "bg-green-90",
            "text-light-40",
            "py-2 px-4"
          )}
          onClick={handleDropDownClick}
        >
          <Icon name="ChevronDown" className="h-4 w-4" />
          {dropDownPlaceHolder}
        </button>
        <div>
          {showDropDown && (
            <div className="origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="none">
                {options.map((option) => (
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    key={option}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
