import detectEthereumProvider from "@metamask/detect-provider";
import React, { useCallback, useEffect, useState } from "react";

import { ButtonType, IconProps, Tooltip } from "@/components/design-system";
import { DESIRED_CHAIN_ID } from "@/constants";
import { useCurrentUserWalletInfoQuery } from "@/lib/graphql/generated";
import { useWallet } from "@/lib/wallet";
import { metaMask } from "@/lib/wallet/connectors/metamask";

import { Button } from "../design-system";
import { User, ButtonStateText, IWalletButtonStyles } from "./types";

export function WalletButton({
  getAccount: getAccount,
}: {
  getAccount: (account: User) => void;
}) {
  const { account, isActive, error } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const detectBrowser = useCallback(async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      return true;
    }
    return false;
  }, []);

  const handleWalletConnect = async () => {
    setIsLoading(true);
    if (await detectBrowser) {
      if (!isActive) {
        await metaMask.activate(DESIRED_CHAIN_ID);
      }
    }
    setIsLoading(false);
  };

  function handleAddressFormat(account: string) {
    return `${account.substring(0, 4)}...${account.substring(
      account.length - 4
    )}`;
  }

  const getButtonStyles = useCallback((): IWalletButtonStyles => {
    if (isLoading) {
      return {
        icon: "",
        type: ButtonType.PRIMARY,
        state: ButtonStateText.CONNECT,
      };
    } else if (error) {
      if (error.message.includes("MetaMask not installed")) {
        return {
          icon: "Exclamation",
          type: ButtonType.PRIMARY,
          state: ButtonStateText.INSTALL_METAMASK,
          tooltip: "MetaMask not installed",
        };
      }
      return {
        icon: "Exclamation",
        type: ButtonType.PRIMARY,
        state: ButtonStateText.ERROR,
        tooltip: error.message,
      };
    } else if (isActive) {
      return {
        icon: "Wallet",
        type: ButtonType.SECONDARY,
        state: handleAddressFormat(account as string),
      };
    } else {
      return {
        icon: "",
        type: ButtonType.PRIMARY,
        state: ButtonStateText.CONNECT,
      };
    }
  }, [account, error, isActive, isLoading]);

  const buttonStyles = getButtonStyles();

  const { data } = useCurrentUserWalletInfoQuery({
    variables: { userAccount: "" },
    fetchPolicy: "network-only",
  });
  const user = data?.user;

  useEffect(() => {
    if (user) {
      getAccount(user);
    }
  }, [getAccount, user]);

  return buttonStyles.tooltip ? (
    <>
      <Tooltip content={buttonStyles.tooltip}>
        <Button
          onClick={handleWalletConnect}
          isLoading={{ isLoading, position: "left" }}
          iconLeft={buttonStyles.icon as IconProps["name"]}
          buttonType={buttonStyles.type as ButtonType}
        >
          {buttonStyles.state}
        </Button>
      </Tooltip>
    </>
  ) : (
    <Button
      onClick={handleWalletConnect}
      isLoading={{ isLoading, position: "left" }}
      iconLeft={buttonStyles.icon as IconProps["name"]}
      buttonType={buttonStyles.type as ButtonType}
    >
      {buttonStyles.state}
    </Button>
  );
}
