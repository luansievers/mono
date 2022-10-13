import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import {
  Button,
  ButtonProps,
  ButtonType,
  Tooltip,
} from "@/components/design-system";
import { DESIRED_CHAIN_ID } from "@/constants";
import { useSetUser } from "@/hooks/user-hooks";
import { handleAddressFormat } from "@/lib/format/common";
import { useWallet } from "@/lib/wallet";
import { metaMask, metaMaskHooks } from "@/lib/wallet/connectors/metamask";
import { accountQuery } from "@/queries/user.queries";

type Props = {
  className?: string;
};

enum ButtonStates {
  CONNECT = "Connect Wallet",
  CONNECTING = "Processing...",
  INSTALL_METAMASK = "Install MetaMask",
  WRONG_NETWORK = "Wrong Network",
  ERROR = "Error",
}

type IWalletButton = Pick<
  ButtonProps,
  "onClick" | "isLoading" | "iconLeft" | "buttonType" | "className" | "children"
>;

export function WalletButton({ className }: Props) {
  const { account } = useWallet();

  const isActivating = metaMaskHooks.useIsActivating();
  const error = metaMaskHooks.useError();

  const setUser = useSetUser();

  const { data } = useQuery(accountQuery, {
    variables: {
      userAccount: account?.toLowerCase(),
      fetchPolicy: "network-only",
    },
  });

  const handleConnectMetaMask = () => {
    metaMask.activate(DESIRED_CHAIN_ID);
  };

  useEffect(() => {
    if (data?.user) {
      setUser && setUser(data.user);
    }
  }, [data, setUser]);

  const getButton = (): IWalletButton => {
    if (error) {
      return {
        iconLeft: "Exclamation",
        buttonType: ButtonType.PRIMARY,
        children:
          error.name === "ChainIdNotAllowedError"
            ? ButtonStates.WRONG_NETWORK
            : ButtonStates.ERROR,
        onClick: handleConnectMetaMask,
      };
    } else if (isActivating) {
      return {
        buttonType: ButtonType.PRIMARY,
        children: ButtonStates.CONNECTING,
      };
    } else if (account) {
      return {
        iconLeft: "Wallet",
        buttonType: ButtonType.SECONDARY,
        children: handleAddressFormat(account),
      };
    }
    return {
      buttonType: ButtonType.PRIMARY,
      onClick: handleConnectMetaMask,
      children: ButtonStates.CONNECT,
    };
  };

  const button = <Button {...getButton()} className={className} />;

  return error?.message ? (
    <Tooltip content={error.message}>{button}</Tooltip>
  ) : (
    button
  );
}
