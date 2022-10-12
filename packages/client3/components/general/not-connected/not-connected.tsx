import { ReactNode } from "react";

import { WalletButton } from "@/components/design-system/wallet-button/wallet-button";

import { BodyText } from "../../design-system";

interface Props {
  children: ReactNode;
}

export function NotConnected({ children }: Props) {
  return (
    <div className="grid place-items-center bg-green-100 pt-[105px] pb-[101px]">
      <BodyText size="large" className="pb-[24px] text-dark-50">
        {children}
      </BodyText>
      <WalletButton />
    </div>
  );
}
