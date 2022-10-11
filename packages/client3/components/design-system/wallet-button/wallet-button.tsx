import {
  Button,
  ButtonType,
  Popover,
  Tooltip,
} from "@/components/design-system";
import { WalletStatus } from "@/components/nav/wallet-status";
import { DESIRED_CHAIN_ID } from "@/constants";
import { handleAddressFormat } from "@/lib/format/common";
import { openWalletModal } from "@/lib/state/actions";
import { useWallet } from "@/lib/wallet";

import { ButtonStateText } from "./types";

type Props = {
  className?: string;
};

export function WalletButton({ className }: Props) {
  const { account, error, connector } = useWallet();

  return error ? (
    <Tooltip content={error.message}>
      <Button
        iconLeft="Exclamation"
        buttonType={ButtonType.PRIMARY as ButtonType}
        className={className}
        onClick={
          error.name === "ChainIdNotAllowedError"
            ? () => connector.activate(DESIRED_CHAIN_ID)
            : openWalletModal
        }
      >
        {error.name === "ChainIdNotAllowedError"
          ? ButtonStateText.WRONG_NETWORK
          : ButtonStateText.ERROR}
      </Button>
    </Tooltip>
  ) : account ? (
    <Popover
      placement="bottom-end"
      content={({ close }) => <WalletStatus onWalletDisconnect={close} />}
    >
      <Button
        iconLeft={"Wallet"}
        buttonType={ButtonType.SECONDARY as ButtonType}
        className={className}
      >
        {handleAddressFormat(account)}
      </Button>
    </Popover>
  ) : (
    <Button
      onClick={openWalletModal}
      buttonType={ButtonType.PRIMARY as ButtonType}
      className={className}
    >
      {ButtonStateText.CONNECT}
    </Button>
  );
}
