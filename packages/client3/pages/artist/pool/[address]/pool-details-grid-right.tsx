import { BigNumber } from "ethers";

import { PoolDocuments } from "@/components/pool/pool-documents";
import { PoolTerms } from "@/components/pool/pool-terms";
import { Pool } from "@/lib/graphql/generated";

import ArtistCancelPool from "./artist-cancel-pool";

type Props = {
  poolData: Partial<Pool>;
  tranchedPoolData: any;
};

function PoolDetailsRightGrid({ poolData, tranchedPoolData }: Props) {
  const terms = poolData?.terms;
  return (
    <>
      <ArtistCancelPool
        poolData={poolData}
        deposited={tranchedPoolData?.juniorDeposited ?? BigNumber.from(0)}
        goalAmount={
          tranchedPoolData?.creditLine?.maxLimit ??
          BigNumber.from(poolData.goalAmount ?? 0)
        }
        numOfBackers={tranchedPoolData?.numBackers ?? 0}
      />

      <PoolTerms terms={terms} />

      <PoolDocuments />
    </>
  );
}

export default PoolDetailsRightGrid;
