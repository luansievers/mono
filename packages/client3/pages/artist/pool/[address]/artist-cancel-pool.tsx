import { BigNumber } from "ethers";

import { Display, BodyText, Icon, Button } from "@/components/design-system";
import { Progress } from "@/components/design-system/progress";
import { formatCrypto } from "@/lib/format";
import { SupportedCrypto } from "@/lib/graphql/generated";

type Props = {
  poolData: any;
};
function ArtistCancelPool({ poolData }: Props) {
  const useDummy = !poolData;
  const totalSuppliedAmount = {
    token: SupportedCrypto.Usdc,
    amount: BigNumber.from(
      useDummy ? "250000000" : poolData.totalSuppliedAmount ?? 0
    ),
  };
  const totalGoalAmount = {
    token: SupportedCrypto.Usdc,
    amount: BigNumber.from(useDummy ? "1000000000" : poolData.goalAmount ?? 0), //90% - not sure if this is the correct field
  };
  let progressPercentage = 0;

  if (!totalSuppliedAmount.amount.isZero()) {
    progressPercentage =
      (totalSuppliedAmount.amount.toNumber() /
        totalGoalAmount.amount.toNumber()) *
      100;
  }

  return (
    <div className="rounded-lg border border-dark-90 p-6">
      <div className="flex justify-between">
        <Display className="text-accent-2" level={2}>
          {formatCrypto(totalSuppliedAmount)}
        </Display>
        <BodyText size="large" className=" text-dark-50">
          of {formatCrypto(totalGoalAmount)}
        </BodyText>
      </div>
      <Progress percentage={progressPercentage} />
      <div className="mt-9 flex items-center">
        <Display level={2} className="text-white">
          224
        </Display>
        <BodyText size="large" className="ml-4 text-dark-50">
          Backers
        </BodyText>
      </div>
      <div className="mt-8 flex items-center">
        <Display level={2} className="text-white">
          30
        </Display>
        <BodyText size="large" className="ml-4 text-dark-50">
          Days left
        </BodyText>
      </div>
      <div className="flex items-center">
        <Icon size="md" name="Clock" />
        <BodyText size="large" className="ml-3 text-dark-50">
          Closing on Sep 12, 2022
        </BodyText>
      </div>
      <Button buttonType="tertiary" className="mx-auto mt-10 text-accent-3">
        Cancel Pool
      </Button>
    </div>
  );
}

export default ArtistCancelPool;
