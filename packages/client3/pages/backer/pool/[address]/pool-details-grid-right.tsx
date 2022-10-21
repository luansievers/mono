import { BigNumber } from "ethers";

import { BodyText, Heading, Icon } from "@/components/design-system";
import { PoolInformation } from "@/components/pool/pool-information";

import ArtistPoolDocuments from "./artist-pool-documents";

type Props = {
  projectGoal: string;
  raisedTarget: string;
  tranchedPoolAddress: string;
  totalBackers: number;
  totalGoalAmount: number;
  totalSuppliedAmount: number;
  remainingJuniorCapacity: BigNumber;
  allowedUidTypes: any;
  type?: "completed" | "failed" | undefined;
};

function PoolDetailsRightGrid({
  projectGoal,
  raisedTarget,
  tranchedPoolAddress,
  totalBackers,
  totalGoalAmount,
  totalSuppliedAmount,
  remainingJuniorCapacity,
  allowedUidTypes,
  type,
}: Props) {
  return (
    <>
      <PoolInformation
        tranchedPoolAddress={tranchedPoolAddress}
        totalBackers={totalBackers}
        totalGoalAmount={totalGoalAmount}
        totalSuppliedAmount={totalSuppliedAmount}
        remainingJuniorCapacity={remainingJuniorCapacity}
        allowedUidTypes={allowedUidTypes}
        // TODO: Change to date from metadata
        closingDate={new Date(2100, 1, 1)}
        type={type}
      />

      <div className="mt-9 rounded-lg border border-dark-90 p-6">
        <Heading className="text-white" level={5}>
          Terms
        </Heading>
        <div className="mt-6 flex items-center">
          <BodyText size="normal" className="text-dark-50">
            Project Goal
          </BodyText>
          <Icon className="ml-2" size="text" name="InfoCircleOutlined" />
        </div>
        <BodyText size="medium" semiBold className="mt-3 text-light-40">
          {projectGoal ?? "5-track EP"}
        </BodyText>
        <div className="mt-6 flex items-center">
          <BodyText size="normal" className="text-dark-50">
            Raised Target
          </BodyText>
          <Icon className="ml-2" size="text" name="InfoCircleOutlined" />
        </div>
        <BodyText size="medium" semiBold className="mt-3 text-light-40">
          {raisedTarget}
        </BodyText>
      </div>

      <ArtistPoolDocuments />
    </>
  );
}

export default PoolDetailsRightGrid;
