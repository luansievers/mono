import { gql } from "@apollo/client";
import { useRouter } from "next/router";

import { PendingPoolCard } from "@/components/dashboard/pool-card";
import { Heading } from "@/components/design-system";
import { AURORA_CONTRACTS } from "@/constants/contract-addresses/aurora_contracts";
import { useContract } from "@/lib/contracts";
import { handleAddressFormat } from "@/lib/format/common";
import {
  Pool_Status_Type,
  usePendingPoolsQuery,
} from "@/lib/graphql/generated";
import { useWallet } from "@/lib/wallet";
import {
  createBorrowerContract,
  createPool,
  updatePoolAddress,
  updatePoolBorrowerContractAddress,
} from "@/services/pool-services";
import { getLastEventArgs } from "@/utilities/contract.util";

gql`
  query pendingPools($walletAddress: String!, $filters: PendingPoolFilters) {
    pendingPools(walletAddress: $walletAddress, filters: $filters)
      @rest(path: "pool?{args}", type: "PendingPools") {
      id
      poolName
      walletAddress
      projectCoverImage
      goalAmount
      status
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
        hasPoolAddress: false,
      },
    },
  });

  const pendingPools = data?.pendingPools ?? [];

  const goldfinchFactory = useContract(
    "GoldfinchFactory",
    AURORA_CONTRACTS.GoldfinchFactory
  );

  const onContractSubmit = async (pool: typeof pendingPools[0]) => {
    if (!goldfinchFactory) {
      console.error("Goldfinch factory couldn't be initialized");
      return;
    }

    const borrowerContract = await createBorrowerContract(
      goldfinchFactory,
      pool.walletAddress.toLowerCase()
    );
    console.log(`Borrower contract ${borrowerContract} for ${account}`);

    await updatePoolBorrowerContractAddress(
      pool.id,
      borrowerContract.toLowerCase()
    );

    const receipt = await createPool(
      goldfinchFactory,
      pool.goalAmount,
      borrowerContract
    );
    const event = getLastEventArgs(receipt);

    await updatePoolAddress(pool.id, event.pool.toLowerCase());
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
              onButtonClick={(event) => {
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
