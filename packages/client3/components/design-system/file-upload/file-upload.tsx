import clsx from "clsx";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import { addFileToIPFS } from "@/ipfs/utils/services";

import { Icon } from "../icon";
import { Spinner } from "../spinners";
import { Caption } from "../typography";

interface FileUploadProps {
  name: string;
  id?: string;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUpload(
    { name, errorMessage, disabled, className, ...rest },
    ref
  ) {
    const [file, setFile] = useState([] as any);
    const [isLoading, setIsLoading] = useState(false);

    const formContext = useFormContext();

    const _errorMessage = errorMessage;
    if (formContext !== null) {
      //_errorMessage = formContext.formState.errors[name]?.message;
    }
    const isError = !!_errorMessage;

    const { getRootProps, isDragActive } = useDropzone({
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".bmp", ".gif", ".svg"],
      },
      maxSize: 200000000, //200MB
      onDrop: (acceptedFile) => {
        setFile(
          acceptedFile.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        );
      },
    });

    const addFile = useCallback(
      async (fileToUpload: any) => {
        setIsLoading(true);
        if (!(fileToUpload instanceof Blob)) {
          fileToUpload = new Blob([fileToUpload], { type: "application/json" });
        }
        const file = await addFileToIPFS(fileToUpload);
        if (formContext !== null) {
          if (file) {
            formContext.setValue("projectCoverImage", file);
          }
        }
        setIsLoading(false);
      },
      [formContext]
    );

    useEffect(() => {
      if (file.length > 0) {
        if (isError) {
          return;
        }
        addFile(file[0]);
      }
    }, [file, isError, addFile]);

    const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setFile(
          Array.from(event.target.files).map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        );
      }
      if (isError) {
        return console.log(isError);
      }
    };

    return (
      <div className={className}>
        <div {...getRootProps({ className: "dropZone" })}>
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="file"
              className={clsx(
                "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg ",
                "border border-dashed",
                isError ? "border-state-error" : "border-dark-70",
                disabled && "opacity-50",
                "bg-dark-90 hover:bg-dark-80"
              )}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                {file.length > 0 && !isError ? (
                  <div className="relative h-96 w-96 overflow-hidden ">
                    <Icon
                      name={isError ? "Exclamation" : "XCircle"}
                      size="lg"
                      className={clsx(
                        "my-[10px] ",
                        isError && "text-state-error",
                        "absolute top-0 right-0 cursor-pointer",
                        "z-10",
                        "stroke-light-10",
                        "bg-dark-90",
                        "rounded-full"
                      )}
                      onClick={() => {
                        setFile([]);
                      }}
                    />
                    <img
                      src={file.length > 0 ? file[0].preview : ""}
                      alt="cover image"
                      className={clsx(
                        "min-h-0 w-full object-cover",
                        "transform transition duration-500 ease-in-out hover:scale-105",
                        "absolute top-0 left-0 right-0 bottom-0 m-auto",
                        "rounded-lg"
                      )}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    {isLoading ? (
                      <Spinner className="text-dark-70" size="lg" />
                    ) : (
                      <Icon
                        name={isError ? "Exclamation" : "AddCircle"}
                        size="md"
                        className={clsx(
                          "my-[10px]",
                          isError && "text-state-error"
                        )}
                      />
                    )}

                    {isDragActive ? (
                      <span className="mb-2 text-sm font-semibold text-dark-50">
                        Drop
                      </span>
                    ) : isLoading ? (
                      <span className="mb-2 text-sm font-semibold text-dark-50">
                        Uploading to IPFS
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
                        handleEvent(event);
                      }}
                      ref={ref}
                      {...rest}
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
      </div>
    );
  }
);
