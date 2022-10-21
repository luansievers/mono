import { useQuery } from "@apollo/client";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";

import { PoolCard } from "@/components/dashboard/pool-card";
import {
  Heading,
  TabButton,
  TabContent,
  TabGroup,
  TabList,
  TabPanels,
} from "@/components/design-system";
import { useSelectedSidebarItem, useLayoutTitle } from "@/hooks/sidebar-hooks";
import { SupportedCrypto } from "@/lib/graphql/generated";
import { backerAllArtistPools } from "@/queries/backer.queries";

function AllArtistPoolPage() {
  useSelectedSidebarItem("all-artist-pools");
  useLayoutTitle("All Artist Pools");

  const { data } = useQuery(backerAllArtistPools);
  const router = useRouter();

  const openTranchedPools =
    data?.tranchedPools?.filter((tranchedPool: any) =>
      (tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
    ) || [];

  const closedTranchedPools =
    data?.tranchedPools?.filter(
      (tranchedPool: any) =>
        !(tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
    ) || [];
  const handleClick = (poolAddress: string) => {
    router.push(`/backer/pool/${poolAddress}`);
  };

  const PoolComponent = (tranchedPool: any) => {
    return (
      <PoolCard
        key={tranchedPool.id}
        className="mb-10"
        poolName={tranchedPool.name}
        totalSuppliedAmount={{
          token: SupportedCrypto.Usdc,
          amount: tranchedPool?.juniorTranches[0].principalDeposited,
        }}
        totalGoalAmount={{
          token: SupportedCrypto.Usdc,
          amount: tranchedPool.creditLine.maxLimit,
        }}
        artistName={tranchedPool.borrower.name}
        image={tranchedPool.borrower.logo}
        onClick={() => handleClick(tranchedPool.id)}
        type={
          (tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
            ? undefined
            : tranchedPool?.juniorTranches[0].principalDeposited.gte(
                tranchedPool.creditLine.maxLimit
              )
            ? "completed"
            : "failed"
        }
      />
    );
  };

  return (
    <>
      <TabGroup>
        <TabList>
          <TabButton>
            <Heading level={4}>Open</Heading>
          </TabButton>
          <TabButton>
            <Heading level={4}>Closed</Heading>
          </TabButton>
        </TabList>
        <TabPanels>
          <TabContent className="mt-7">
            {openTranchedPools.map((tranchedPool: unknown) =>
              PoolComponent(tranchedPool)
            )}
          </TabContent>
          <TabContent className="mt-7">
            {closedTranchedPools.map((tranchedPool: unknown) =>
              PoolComponent(tranchedPool)
            )}
          </TabContent>
        </TabPanels>
      </TabGroup>
    </>
  );
}

export default AllArtistPoolPage;
