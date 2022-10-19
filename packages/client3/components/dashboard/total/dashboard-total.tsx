import clsx from "clsx";

import { BodyText, Heading, LinkButton } from "@/components/design-system";
import { formatCrypto } from "@/lib/format";
import { CryptoAmount } from "@/lib/graphql/generated";

type Props = {
  createPoolHref?: string;
  totalRaisedAmount: CryptoAmount;
  totalEarnedAmount: CryptoAmount;
};

export function DashboardTotal({
  createPoolHref,
  totalRaisedAmount,
  totalEarnedAmount,
}: Props) {
  const hasData = totalRaisedAmount.amount.toNumber() > 0;

  return (
    <div
      className={clsx(
        "grid grid-cols-4 gap-4 bg-green-100 px-7 py-12",
        "rounded-lg bg-img-free-artist bg-center bg-no-repeat"
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
      {createPoolHref ? (
        <div className="col-start-5 self-center">
          <LinkButton buttonType="secondary" href={createPoolHref}>
            Submit Pool Proposal
          </LinkButton>
        </div>
      ) : null}
    </div>
  );
}
