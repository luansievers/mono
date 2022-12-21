import clsx from "clsx";
import { BigNumber } from "ethers";

import {
  BodyText,
  Button,
  Display,
  Icon,
  Link,
} from "@/components/design-system";
import { formatCrypto } from "@/lib/format";
import { SupportedCrypto } from "@/lib/graphql/generated";

type Props = {
  deposited: BigNumber;
  lockedPool: boolean;
  onButtonClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};
function ArtistWithdrawalCard({ deposited, lockedPool, onButtonClick }: Props) {
  return (
    <div
      className={clsx(
        "flex items-center rounded-b-lg",
        lockedPool ? "bg-transparent" : "bg-green-80"
      )}
    >
      <div className="w-full items-center p-6">
        <BodyText
          size="normal"
          className={clsx(lockedPool ? "text-dark-70" : "text-light-40")}
        >
          Withdraw
        </BodyText>
        <BodyText size="small" className="mt-2 text-light-40">
          {lockedPool
            ? "Funds have been withdrawn"
            : "Withdraw funds from your pool"}
        </BodyText>
        <div className="mt-6 flex">
          <Display level={2} className="text-light-40">
            {formatCrypto({
              token: SupportedCrypto.Usdc,
              amount: BigNumber.from(lockedPool ? 0 : deposited ?? 0),
            })}
          </Display>
          <BodyText
            size="medium"
            className="align-center ml-2 pt-2	text-light-40"
          >
            USDC
          </BodyText>
        </div>
        <div className="mt-6 flex">
          {lockedPool ? (
            <Link href="/artist/transactions" className="text-accent-2">
              Transaction
              <Icon name="Link" className="ml-1 border-accent-2" />
            </Link>
          ) : (
            <Button
              buttonType="accent2"
              className={clsx("mx-auto mt-4 w-full text-center")}
              onClick={(event) => {
                onButtonClick && onButtonClick(event);
              }}
            >
              Withdraw
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistWithdrawalCard;
