import { gql } from "@apollo/client";
import { useRouter } from "next/router";

import { Button, Heading } from "@/components/design-system";
import { PoolDetail } from "@/components/pool/pool-details";
import { useLayoutContext } from "@/hooks/sidebar-hooks";
import {
  useArtistPoolGraphDataQuery,
  useArtistPoolMetadataQuery,
} from "@/lib/graphql/generated";
import { TRANCHED_POOL_STATUS_FIELDS } from "@/lib/pools";

import PoolDetailsRightGrid from "./pool-details-grid-right";

gql`
  query artistPoolMetadata($poolId: String!) {
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
      borrowerContract
    }
  }
`;

gql`
  ${TRANCHED_POOL_STATUS_FIELDS}
  query artistPoolGraphData($tranchedPoolAddress: ID!) {
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
      initialInterestOwed
      principalAmountRepaid
      totalDeployed # Total amount withdraw from the pool
      estimatedTotalAssets # Total amount of assets in the pool
      interestAmountRepaid
      remainingJuniorCapacity
      allowedUidTypes
      ...TranchedPoolStatusFields
    }
  }
`;

function ArtistPoolPage() {
  const { title } = useLayoutContext();
  const router = useRouter();
  const { address } = router.query;

  const { data: { pool: poolMetaData } = {} } = useArtistPoolMetadataQuery({
    skip: !address,
    variables: {
      poolId: address as string,
    },
  });

  console.log(poolMetaData?.poolAddress);

  const { data: { tranchedPool: tranchedPoolData } = {} } =
    useArtistPoolGraphDataQuery({
      skip: !poolMetaData?.poolAddress,
      variables: {
        tranchedPoolAddress: "0xd010269dca2f8f958f3a498ce0fecc324c594e7d" || "",
      },
    });
  if (poolMetaData === undefined || poolMetaData === null) {
    return null;
  }
  console.log("tranchedPoolData", tranchedPoolData);

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
          {poolMetaData?.poolName}
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

export default ArtistPoolPage;
