import { ButtonType } from "@/components/design-system";
export interface IWalletButtonStyles {
  icon: string;
  type: ButtonType;
  state: string;
  tooltip?: string;
}

export const enum ButtonStateText {
  CONNECT = "Connect Wallet",
  CONNECTING = "Processing...",
  INSTALL_METAMASK = "Install MetaMask",
  WRONG_NETWORK = "Wrong Network",
  ERROR = "Error",
}
