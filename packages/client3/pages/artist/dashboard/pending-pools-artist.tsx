import { gql } from "@apollo/client";
import { useRouter } from "next/router";

import { PendingPoolCard } from "@/components/dashboard/pool-card";
import { Heading } from "@/components/design-system";
import { CONTRACT_ADDRESSES } from "@/constants";
import { useContract } from "@/lib/contracts";
import { handleAddressFormat } from "@/lib/format/common";
import {
  Pool_Status_Type,
  usePendingPoolsQuery,
} from "@/lib/graphql/generated";
import { useWallet } from "@/lib/wallet";
import {
  createPool,
  updatePoolTransactionHash,
} from "@/services/pool-services";

gql`
  query pendingPools($walletAddress: String!, $filters: PendingPoolFilters) {
    pendingPools(walletAddress: $walletAddress, filters: $filters)
      @rest(path: "pool?{args}", type: "PendingPools") {
      id
      poolName
      walletAddress
      projectCoverImage
      status
      goalAmount
    }
  }
`;

function PendingPoolArtist() {
  const router = useRouter();
  const { account } = useWallet();
  const { data, error, loading, refetch } = usePendingPoolsQuery({
    variables: {
      walletAddress: account || "",
      filters: {
        statusType: [Pool_Status_Type.Approved, Pool_Status_Type.InReview],
        hasTransactionHash: false,
      },
    },
  });

  const goldfinchFactory = useContract(
    "GoldfinchFactory",
    CONTRACT_ADDRESSES.GoldFinchFactory
  );

  const pendingPools = data?.pendingPools ?? [];

  const onContractSubmit = async (pool: typeof pendingPools[0]) => {
    if (!goldfinchFactory) {
      console.error("Goldfinch factory couldn't be initialized");
      return;
    }
    const receipt = await createPool(goldfinchFactory, pool.goalAmount);
    await updatePoolTransactionHash(pool.id, receipt);
    refetch();
  };
  const handleClick = (poolAddress: string) => {
    /**
     * TODO: Pool details screen requires some refactoring to handle pending pool
     */
    //router.push(`/artist/pool/${poolAddress}`);
  };

  return (
    <>
      <div className="mb-5 mt-10 flex">
        <Heading className="flex-1 text-white" level={5}>
          Pending Pools
        </Heading>
      </div>
      {pendingPools
        ? pendingPools.map((tranchedPool) => (
            <PendingPoolCard
              key={tranchedPool.id}
              className="mb-10"
              poolName={tranchedPool.poolName}
              artistName={handleAddressFormat(tranchedPool.walletAddress)}
              image={""}
              statusType={tranchedPool.status}
              onClick={() => handleClick(tranchedPool.id)}
              onLaunchProposal={(event) => {
                event.stopPropagation();
                onContractSubmit(tranchedPool);
              }}
            />
          ))
        : null}
    </>
  );
}

export default PendingPoolArtist;
