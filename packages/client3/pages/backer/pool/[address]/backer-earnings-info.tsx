import { BigNumber } from "ethers";

import { BodyText, Display, Icon, Link } from "@/components/design-system";
import { formatCrypto } from "@/lib/format";
import { SupportedCrypto } from "@/lib/graphql/generated";

type Props = {
  totalRedeemedToDate: number;
};

export function BackerEarningsInfo({ totalRedeemedToDate }: Props) {
  return (
    <div className="w-full items-center p-6">
      <BodyText size="normal" className="text-dark-70">
        My Earnings
      </BodyText>
      {totalRedeemedToDate > 0 ? (
        <>
          <div className="mt-4 mb-6 flex justify-between">
            <Display level={2} className="text-light-40">
              {formatCrypto({
                token: SupportedCrypto.Usdc,
                amount: BigNumber.from(totalRedeemedToDate ?? 0),
              })}{" "}
              USDC
            </Display>
          </div>
          <Link href="/artist/transactions" className=" text-accent-2">
            Earning History
            <Icon name="Link" className="ml-1 border-accent-2" />
          </Link>
        </>
      ) : null}
    </div>
  );
}
