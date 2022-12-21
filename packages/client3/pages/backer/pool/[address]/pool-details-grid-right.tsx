import { PoolDocuments } from "@/components/pool/pool-documents";
import { PoolInformation } from "@/components/pool/pool-information";
import { PoolTerms } from "@/components/pool/pool-terms";
import { Pool } from "@/lib/graphql/generated";

type Props = {
  poolData: Partial<Pool>;
  tranchedPoolData?: any; //TODO: Typing needs to be added later
};

function PoolDetailsRightGrid({ poolData, tranchedPoolData }: Props) {
  const terms = poolData?.terms;
  return (
    <>
      {tranchedPoolData ? (
        <PoolInformation
          totalSuppliedAmount={tranchedPoolData.juniorDeposited.toNumber()}
          totalGoalAmount={tranchedPoolData.creditLine.maxLimit.toNumber()}
          totalBackers={tranchedPoolData.numBackers}
          totalEarned={tranchedPoolData.juniorDeposited.toNumber()}
          closingDate={new Date(poolData.closingDate ?? "")}
          allowedUidTypes={tranchedPoolData.allowedUidTypes}
          remainingJuniorCapacity={tranchedPoolData.remainingJuniorCapacity}
          tranchedPoolAddress={tranchedPoolData.id}
        />
      ) : null}

      <PoolTerms terms={terms} />

      <PoolDocuments />
    </>
  );
}

export default PoolDetailsRightGrid;
