import { BodyText, Button } from "../../design-system";

type Props = {
  onConnectWalletClick: () => void;
};

export function NotConnected({ onConnectWalletClick }: Props) {
  return (
    <div className="grid place-items-center bg-green-100 pt-[105px] pb-[101px]">
      <BodyText size="large" className="text-dark-50">
        Please connect your wallet to view your dashboard
      </BodyText>
      <Button className="mt-4" onClick={onConnectWalletClick}>
        Connect Wallet
      </Button>
    </div>
  );
}
