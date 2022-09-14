import { WalletButton } from "@/components/design-system/wallet-button/wallet-button";

import { BodyText } from "../../design-system";

export function NotConnected() {
  return (
    <div className="grid place-items-center bg-green-100 pt-[105px] pb-[101px]">
      <BodyText size="large" className="pb-[24px] text-dark-50">
        Please connect your wallet to view your dashboard
      </BodyText>
      <WalletButton />
    </div>
  );
}
