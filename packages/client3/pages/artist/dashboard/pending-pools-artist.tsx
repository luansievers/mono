import { gql } from "@apollo/client";
import { useRouter } from "next/router";

import { PendingPoolCard } from "@/components/dashboard/pool-card/pending-pool-card";
import { Heading } from "@/components/design-system";
import { CONTRACT_ADDRESSES } from "@/constants";
import { useContract } from "@/lib/contracts";
import { handleAddressFormat } from "@/lib/format/common";
import { useGetPendingPoolsQuery } from "@/lib/graphql/generated";
import { useWallet } from "@/lib/wallet";
import {
  createBorrowerContract,
  createPool,
  updatePoolTransactionHash,
} from "@/services/pool-services";

gql`
  query getPendingPoolsForArtists($walletAddress: String!) {
    pendingPools(walletAddress: $walletAddress)
      @rest(path: "pool", type: "PendingPools") {
      id
      poolName
      walletAddress
      projectCoverImage
      goalAmount
    }
  }
`;

function PendingPoolArtist() {
  const router = useRouter();
  const { account } = useWallet();
  const { data } = useGetPendingPoolsQuery({
    // variables: {
    //   ["walletAddress"]: account ?? "",
    // },
  });
  const pendingPools = data?.pendingPools ?? [];

  const goldfinchFactory = useContract(
    "GoldfinchFactory",
    CONTRACT_ADDRESSES.GoldFinchFactory
  );

  const onContractSubmit = async (pool: typeof pendingPools[0]) => {
    if (!goldfinchFactory) {
      console.error("Goldfinch factory couldn't be initialized");
      return;
    }

    const borrowerContract = await createBorrowerContract(
      goldfinchFactory,
      pool.walletAddress
    );

    const receipt = await createPool(
      goldfinchFactory,
      pool.goalAmount,
      borrowerContract
    );
    await updatePoolTransactionHash(pool.id, receipt);
  };
  const handleClick = (poolAddress: string) => {
    router.push(`/artist/pool/${poolAddress}`);
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
