export interface ISnackbar {
  message: string;
  type: SnackbarType;
}

export enum SnackbarType {
  ERROR = "error",
  PROCESS = "process",
  SUCCESS = "success",
}
