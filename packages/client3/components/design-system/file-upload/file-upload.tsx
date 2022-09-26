import clsx from "clsx";
import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

import { Icon } from "../icon";
import { Caption } from "../typography";

interface FileUploadProps {
  name: string;
  id?: string;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUpload({ name, errorMessage, disabled, className }) {
    const formContext = useFormContext();
    let _errorMessage = errorMessage;
    if (formContext !== null) {
      _errorMessage = formContext.formState.errors[name]?.message;
    }
    const isError = !!_errorMessage;

    return (
      <div className={className}>
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="file"
            className={clsx(
              "flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-dark-90 hover:bg-dark-80",
              "border border-dashed",
              isError ? "border-state-error" : "border-dark-70",
              disabled && "opacity-50"
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Icon name={"AddCircle"} size="md" className={clsx("my-2.5")} />
              <p className="mb-2 text-sm text-dark-50">
                <span className="font-semibold">Upload an Image here</span>
              </p>
            </div>
            <input
              id="file"
              type="file"
              className="hidden"
              disabled={disabled}
            />
          </label>
        </div>
        <Caption className={clsx("mt-1 leading-none")}>
          <div className={clsx("text-dark-50", "pt-[12px]")}>
            It must be a JPG, PNG, GIF, TIFF, or BMP, no larger than 200MB
          </div>
          <div className={clsx("text-state-error", "pt-[12px]")}>
            {_errorMessage}
          </div>
        </Caption>
      </div>
    );
  }
);
