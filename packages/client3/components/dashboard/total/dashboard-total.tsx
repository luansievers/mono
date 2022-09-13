import clsx from "clsx";

import { BodyText, Button, Heading } from "@/components/design-system";
import { formatCrypto } from "@/lib/format";
import { CryptoAmount } from "@/lib/graphql/generated";

type Props = {
  onCreatePoolClicked?: () => void;
  totalRaisedAmount: CryptoAmount;
  totalEarnedAmount: CryptoAmount;
};

export function DashBoardTotal({
  onCreatePoolClicked,
  totalRaisedAmount,
  totalEarnedAmount,
}: Props) {
  const hasData = totalRaisedAmount.amount.toNumber() > 0;

  return (
    <div
      className={clsx(
        "grid grid-cols-4 gap-4 bg-green-100 px-7 py-12",
        "bg-img-free-artist bg-center bg-no-repeat"
      )}
    >
      <div>
        <BodyText size="normal" className="text-white/30">
          Total Raised
        </BodyText>
        <Heading level={2} className={hasData ? "text-white" : "text-dark-70"}>
          {formatCrypto(totalRaisedAmount)}
        </Heading>
      </div>
      <div>
        <BodyText size="normal" className="text-white/30">
          Total Earned
        </BodyText>
        <Heading level={2} className={hasData ? "text-white" : "text-dark-70"}>
          {formatCrypto(totalEarnedAmount)}
        </Heading>
      </div>
      {onCreatePoolClicked ? (
        <div className="col-start-5 self-center">
          <Button buttonType="secondary">Create Pool</Button>
        </div>
      ) : null}
    </div>
  );
}
