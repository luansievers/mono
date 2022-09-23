import clsx from "clsx";
import React, { forwardRef, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import { addFileToIPFS } from "@/ipfs/utils/services";

import { Icon } from "../icon";
import { Caption } from "../typography";
import { FileUploadProps } from "./types";

export const addFile = async (fileToUpload: any) => {
  await addFileToIPFS(fileToUpload);
};

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUpload({ name, errorMessage, disabled }, ref) {
    const [file, setFile] = useState([] as any);
    const formContext = useFormContext();

    let _errorMessage = errorMessage;
    if (formContext !== null) {
      _errorMessage = formContext.formState.errors[name]?.message;
    }
    const isError = !!_errorMessage;

    const { getRootProps, isDragActive } = useDropzone({
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
      },
      onDrop: (acceptedFile) => {
        setFile(
          acceptedFile.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        );
      },
    });

    const coverImage = file[0]?.preview;

    useEffect(() => {
      if (file.length > 0) {
        if (isError) {
          return;
        }
        addFile(file[0]);
      }
    });

    useEffect(
      () => () => {
        file.forEach((file: any) => URL.revokeObjectURL(file.preview));
      },
      [file]
    );

    return (
      <div {...getRootProps({ className: "dropZone" })}>
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="file"
            className={clsx(
              "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-dark-90 hover:bg-dark-80",
              "border border-dashed",
              isError ? "border-state-error" : "border-dark-70",
              disabled && "opacity-50"
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {file.length > 0 && !isError ? (
                <div className="h-96 w-96 flex-col overflow-hidden">
                  <img
                    src={coverImage}
                    alt="cover"
                    className="min-h-0 w-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Icon
                    name={isError ? "Exclamation" : "AddCircle"}
                    size="md"
                    className={clsx("my-[10px]", isError && "text-state-error")}
                  />
                  {isDragActive ? (
                    <span className="mb-2 text-sm font-semibold text-dark-50">
                      Drop
                    </span>
                  ) : (
                    <span
                      className={clsx(
                        "mb-2 text-sm font-semibold text-dark-50",
                        isError && "text-state-error"
                      )}
                    >
                      {isError ? "Error" : "Upload an Image here"}
                    </span>
                  )}
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    disabled={disabled}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (isError) {
                        return;
                      }
                      addFile(file);
                    }}
                  />
                </div>
              )}
            </div>
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
