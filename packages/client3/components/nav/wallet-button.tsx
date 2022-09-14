import detectEthereumProvider from "@metamask/detect-provider";
import React, { useEffect, useState } from "react";

import { ButtonType, IconProps, Tooltip } from "@/components/design-system";
import { DESIRED_CHAIN_ID } from "@/constants";
import { handleAddressFormat } from "@/lib/format/common";
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

  const detectBrowser = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      return true;
    }
    return false;
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);
    if (await detectBrowser()) {
      if (!isActive) {
        await metaMask.activate(DESIRED_CHAIN_ID);
      }
    }
    setIsLoading(false);
  };

  const getButtonStyles = (): IWalletButtonStyles => {
    if (isLoading) {
      return {
        icon: "",
        type: ButtonType.PRIMARY,
        state: ButtonStateText.CONNECTING,
      };
    }
    if (error) {
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
    }
    if (isActive) {
      return {
        icon: "Wallet",
        type: ButtonType.SECONDARY,
        state: handleAddressFormat(account as string),
      };
    }
    return {
      icon: "",
      type: ButtonType.PRIMARY,
      state: ButtonStateText.CONNECT,
    };
  };
  const buttonStyles = getButtonStyles();

  return buttonStyles.tooltip ? (
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
