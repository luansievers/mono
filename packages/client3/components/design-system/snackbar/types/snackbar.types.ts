export interface ISnackbar {
  message: string;
  type: SnackbarType;
  className?: string;
  onClose: () => void;
}

export enum SnackbarType {
  ERROR = "error",
  PROCESS = "process",
  SUCCESS = "success",
}
