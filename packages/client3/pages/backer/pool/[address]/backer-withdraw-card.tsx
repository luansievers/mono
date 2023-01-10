import { BigNumber } from "ethers";

import { useContract } from "@/lib/contracts";

import { BackerEarningsInfo } from "./backer-earnings-info";
import { BackerRevenueCard } from "./backer-revenue-card";
import { BackerWithdrawCTA } from "./backer-withdraw-cta";

export type IBackerTokenInformation = [
  {
    id: string;
    principalAmount: string;
    principalRedeemed: string;
    principalRedeemable: string;
    interestRedeemed: string;
    interestRedeemable: string;
  }
];

type Props = {
  backerTokenInformation: IBackerTokenInformation;
  tranchedPoolData: any;
  poolAddress: string;
};

export function BackerWithdrawCard({
  backerTokenInformation,
  tranchedPoolData,
  poolAddress,
}: Props) {
  const poolContract = useContract("TranchedPool", poolAddress);

  if (!poolContract) {
    console.error("Pool contract couldn't be initialized");
    return null;
  }

  const onBackerWithdraw = async (tokenId: string, amount: string) => {
    poolContract.withdraw(
      BigNumber.from(tokenId).toNumber(),
      BigNumber.from(amount).toNumber()
    );
  };

  /** !Note: TBH, this doesn't make sense to me at all. Conceivably this could make sense if the pool's "value" were increasing over time.
   *
   * From Chris Creature January 4, 2023:
   * Earned = withdrawn + available to withdraw
   *
   **/
  const calculateBackerEarnings = () => {
    let totalEarnings = 0;

    for (let i = 0; i < backerTokenInformation.length; i++) {
      totalEarnings +=
        BigNumber.from(backerTokenInformation[i].principalRedeemed).toNumber() +
        BigNumber.from(backerTokenInformation[i].interestRedeemed).toNumber() +
        BigNumber.from(
          backerTokenInformation[i].principalRedeemable
        ).toNumber() +
        BigNumber.from(backerTokenInformation[i].interestRedeemable).toNumber();
    }
    return totalEarnings;
  };

  return (
    <div className="mt-6 rounded-lg border border-dark-90">
      <BackerRevenueCard
        totalRevenue={
          BigNumber.from(tranchedPoolData.principalAmountRepaid).toNumber() +
          BigNumber.from(tranchedPoolData.interestAmountRepaid).toNumber()
        }
      />
      <BackerWithdrawCTA
        backerTokenInformation={backerTokenInformation}
        onSubmit={onBackerWithdraw}
      />
      <BackerEarningsInfo totalRedeemedToDate={calculateBackerEarnings()} />
    </div>
  );
}
