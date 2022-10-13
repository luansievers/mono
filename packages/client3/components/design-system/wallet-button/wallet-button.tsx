import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import { Button, ButtonType, Tooltip } from "@/components/design-system";
import { DESIRED_CHAIN_ID } from "@/constants";
import { useSetUser } from "@/hooks/user-hooks";
import { handleAddressFormat } from "@/lib/format/common";
import { useWallet } from "@/lib/wallet";
import { metaMask, metaMaskHooks } from "@/lib/wallet/connectors/metamask";
import { accountQuery } from "@/queries/user.queries";

import { ButtonStateText } from "./types";

type Props = {
  className?: string;
};

export function WalletButton({ className }: Props) {
  const { account } = useWallet();
  const setUser = useSetUser();
  const { data } = useQuery(accountQuery, {
    variables: {
      userAccount: account?.toLowerCase(),
      fetchPolicy: "network-only",
    },
  });
  useEffect(() => {
    if (data?.user) {
      setUser && setUser(data.user);
    }
  }, [data, setUser]);

  const isActive = metaMaskHooks.useIsActive();
  const isActivating = metaMaskHooks.useIsActivating();
  const error = metaMaskHooks.useError();
  const handleConnectMetaMask = () => {
    metaMask.activate(DESIRED_CHAIN_ID);
  };

  if (error) {
    return (
      <Tooltip content={error.message}>
        <Button
          iconLeft="Exclamation"
          buttonType={ButtonType.PRIMARY}
          className={className}
          onClick={
            error.name === "ChainIdNotAllowedError"
              ? () => handleConnectMetaMask()
              : undefined
          }
        >
          {error.name === "ChainIdNotAllowedError"
            ? ButtonStateText.WRONG_NETWORK
            : ButtonStateText.ERROR}
        </Button>
      </Tooltip>
    );
  } else if (!isActive) {
    return (
      <Button
        iconLeft="Exclamation"
        buttonType={ButtonType.PRIMARY}
        className={className}
        onClick={handleConnectMetaMask}
      >
        {ButtonStateText.CONNECT}
      </Button>
    );
  } else if (isActivating) {
    return (
      <Button buttonType={ButtonType.PRIMARY} className={className}>
        {ButtonStateText.CONNECTING}
      </Button>
    );
  } else if (account) {
    return (
      <Button
        iconLeft={"Wallet"}
        buttonType={ButtonType.SECONDARY}
        className={className}
      >
        {handleAddressFormat(account)}
      </Button>
    );
  } else {
    return (
      <Button
        onClick={handleConnectMetaMask}
        buttonType={ButtonType.PRIMARY}
        className={className}
      >
        {ButtonStateText.CONNECT}
      </Button>
    );
  }
}
