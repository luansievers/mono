import { gql } from "@apollo/client";
import { useRouter } from "next/router";

import { Button, Heading } from "@/components/design-system";
import { PoolDetail } from "@/components/pool/pool-details";
import {
  useLayoutContext,
  useSelectedSidebarItem,
} from "@/hooks/sidebar-hooks";
import {
  useBackerPoolGraphDataQuery,
  useBackerPoolMetadataQuery,
} from "@/lib/graphql/generated";
import { TRANCHED_POOL_STATUS_FIELDS } from "@/lib/pools";

import PoolDetailsRightGrid from "./pool-details-grid-right";
gql`
  query backerPoolMetadata($poolId: String!) {
    pool(poolId: $poolId) @rest(path: "pool/{args.poolId}", type: "Pool") {
      id
      poolName
      projectDetail
      walletAddress
      projectCoverImage
      status
      goalAmount
      terms {
        projectGoal
        raiseTarget
      }
      closingDate
      poolAddress
    }
  }
`;
gql`
  ${TRANCHED_POOL_STATUS_FIELDS}
  query backerPoolGraphData($tranchedPoolAddress: ID!) {
    tranchedPool(id: $tranchedPoolAddress) {
      id
      remainingCapacity
      estimatedJuniorApy
      estimatedJuniorApyFromGfiRaw
      estimatedLeverageRatio
      fundableAt
      isPaused
      numBackers
      backers {
        id
      }
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
      totalDeployed # Total amount withdraw from the pool
      estimatedTotalAssets # Total amount of assets in the pool
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
  useSelectedSidebarItem("all-artist-pools");
  const { title } = useLayoutContext();
  const router = useRouter();
  const { address } = router.query;

  const { data: { pool: poolMetaData } = {} } = useBackerPoolMetadataQuery({
    skip: !address,
    variables: {
      poolId: address as string,
    },
  });
  const { data: { tranchedPool: tranchedPoolData } = {} } =
    useBackerPoolGraphDataQuery({
      skip: !poolMetaData?.poolAddress,
      variables: {
        tranchedPoolAddress: poolMetaData?.poolAddress || "",
      },
    });

  if (poolMetaData === undefined || poolMetaData === null) {
    return null;
  }

  return (
    <>
      {poolMetaData}
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
            <PoolDetail
              poolData={poolMetaData}
              backerList={tranchedPoolData?.backers?.map((backer) => ({
                name: backer.id,
                profileImageUrl: "",
              }))}
            />
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
