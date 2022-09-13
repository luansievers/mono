import clsx from "clsx";
import React from "react";

import { Icon } from "../icon";
import { BodyText } from "../typography";
import { ISnackbar } from "./types";

export function Snackbar(props: ISnackbar, className?: string) {
  return (
    <div className={clsx("block min-w-[437px] max-w-[80%]", className)}>
      <div
        className={clsx(
          "flex items-center justify-between break-words rounded border px-[27px] py-[23px] text-center",
          [
            props.type === "error"
              ? "border-state-error bg-state-error-light text-state-error"
              : props.type === "success"
              ? "border-state-success bg-state-success-light text-state-success"
              : "border-state-process bg-state-process-light text-state-process",
          ]
        )}
      >
        <Icon
          name={
            props.type === "error"
              ? "WarningCircle"
              : props.type === "success"
              ? "CheckmarkCircle"
              : "InfoCircle"
          }
          size="md"
        />

        <BodyText size="normal" className="mx-[27px] inline-block">
          {props.message}
        </BodyText>
        <Icon
          name="X"
          size="md"
          onClick={props.onClose}
          className={clsx("cursor-pointer")}
        />
      </div>
    </div>
  );
}
