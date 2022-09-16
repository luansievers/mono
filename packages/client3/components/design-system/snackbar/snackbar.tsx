import clsx from "clsx";
import React from "react";
import { ToastContainer } from "react-toastify";

import { SnackbarType } from "./types";

interface ISnackbar {
  message: string;
  type: SnackbarType;
}

export function Snackbar(props: ISnackbar) {
  return (
    <ToastContainer
      toastClassName={clsx(
        `stroke-current`,
        `bg-state-${props.type}-light`,
        `text-state-${props.type}`,
        `border-state-${props.type}`
      )}
      className="text-center"
      position="top-center"
      autoClose={3000}
    />
  );
}
