import { gql } from "@apollo/client";
import { useRouter } from "next/router";

import { Button, Heading } from "@/components/design-system";
import { PoolDetail } from "@/components/pool/pool-details";
import { useLayoutContext } from "@/hooks/sidebar-hooks";
import { useBackerPoolDetailsQuery } from "@/lib/graphql/generated";
import { TRANCHED_POOL_STATUS_FIELDS } from "@/lib/pools";

import PoolDetailsRightGrid from "./pool-details-grid-right";

gql`
  ${TRANCHED_POOL_STATUS_FIELDS}
  query backerPoolDetails($poolId: String!, $tranchedPoolAddress: ID!) {
    pool(poolId: $poolId) @rest(path: "pool/{args.poolId}", type: "Pool") {
      id
      poolName
      walletAddress
      projectCoverImage
      status
      goalAmount
      closingDate
    }
    tranchedPool(id: $tranchedPoolAddress) {
      id
      estimatedJuniorApy
      estimatedJuniorApyFromGfiRaw
      estimatedLeverageRatio
      fundableAt
      isPaused
      numBackers
      juniorTranches {
        lockedUntil
      }
      juniorDeposited
      creditLine {
        id
        limit
        maxLimit
        id
        termInDays
        paymentPeriodInDays
        nextDueTime
        interestAprDecimal
        borrower
        lateFeeApr
      }
      initialInterestOwed
      principalAmountRepaid
      interestAmountRepaid
      remainingJuniorCapacity
      allowedUidTypes
      ...TranchedPoolStatusFields
    }
  }
`;

function BackerPoolPage() {
  const { title } = useLayoutContext();
  const router = useRouter();
  const { address } = router.query;
  const { data } = useBackerPoolDetailsQuery({
    variables: {
      poolId: address as string,
      tranchedPoolAddress: "0xe03ac5bb90a545bf66ed93543ad24859797ae218",
    },
  });
  const { poolMetaData, tranchedPoolData } = {
    poolMetaData: data?.pool,
    tranchedPoolData: data?.tranchedPool,
  };

  if (poolMetaData === undefined || poolMetaData === null) {
    return null;
  }

  return (
    <>
      <Button
        buttonType="tertiary"
        onClick={() => router.back()}
        iconLeft="CaretLeft"
      >
        {title}
      </Button>
      <div className="mb-10 px-4">
        <Heading level={1} className="text-white">
          {poolMetaData?.poolName ?? ""}
        </Heading>
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-4 px-4">
            <PoolDetail poolData={poolMetaData} />
          </div>
          <div className="col-span-2">
            <PoolDetailsRightGrid
              poolData={poolMetaData}
              tranchedPoolData={tranchedPoolData}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BackerPoolPage;
