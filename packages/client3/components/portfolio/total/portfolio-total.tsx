import clsx from "clsx";

import { Caption, Heading } from "@/components/design-system";
import { formatCrypto } from "@/lib/format";
import { CryptoAmount } from "@/lib/graphql/generated";

type Props = {
  totalContributedPools: number;
  totalRaisedAmount: CryptoAmount;
  totalEarnedAmount: CryptoAmount;
};

export function PortfolioTotal({
  totalContributedPools,
  totalRaisedAmount,
  totalEarnedAmount,
}: Props) {
  return (
    <div
      className={clsx(
        "grid grid-cols-3 bg-green-100",
        "rounded-[10px] bg-img-my-portfolio bg-[length:111px] bg-[right_3rem_bottom] bg-no-repeat"
      )}
    >
      <div className="border-r-[1px] border-dark-90 pr-8">
        <div className="px-8 py-7">
          <Caption className="text-white/30">Total Raised</Caption>
          <Heading level={4} className="pt-1 text-white">
            {formatCrypto(totalRaisedAmount)}
          </Heading>
        </div>
      </div>
      <div className="border-r-[1px] border-dark-90 pr-8">
        <div className="px-8 py-7">
          <Caption className="text-white/30">Total Earned</Caption>
          <Heading level={4} className="pt-1 text-white">
            {formatCrypto(totalEarnedAmount)}
          </Heading>
        </div>
      </div>
      <div>
        <div className="px-8 py-7">
          <Caption className="text-white/30">Total Contributed Pools</Caption>
          <Heading level={4} className="pt-1 text-white">
            {totalContributedPools}
          </Heading>
        </div>
      </div>
    </div>
  );
}
