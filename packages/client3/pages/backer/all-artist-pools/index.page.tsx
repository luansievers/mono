import { useQuery } from "@apollo/client";
import axios from "axios";
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
  const router = useRouter();

  const { data } = useQuery(backerAllArtistPools);

  console.log("data", data);

  const openTranchedPools =
    data?.tranchedPools?.filter((tranchedPool: any) =>
      (tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
    ) || [];

  const closedTranchedPools =
    data?.tranchedPools?.filter(
      (tranchedPool: any) =>
        !(tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
    ) || [];

  const handleClick = async (poolAddress: string) => {
    const response = await axios.get(`/api/pool?poolAddress=${poolAddress}`);
    router.push(`/backer/pool/${response.data[0].id}`);
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
            {openTranchedPools
              ? openTranchedPools.map((tranchedPool: any) => (
                  <PoolCard
                    key={tranchedPool.id}
                    className="mb-10"
                    poolName={tranchedPool.poolName}
                    totalSuppliedAmount={{
                      token: SupportedCrypto.Usdc,
                      amount: BigNumber.from(
                        tranchedPool?.juniorTranches[0].principalDeposited
                      ),
                    }}
                    totalGoalAmount={{
                      token: SupportedCrypto.Usdc,
                      amount: tranchedPool.creditLine.maxLimit, //90% - not sure if this is the correct field
                    }}
                    artistName={tranchedPool.borrower?.name}
                    image={tranchedPool.borrower?.logo}
                    onClick={() => handleClick(tranchedPool.id)}
                  />
                ))
              : undefined}
          </TabContent>
          <TabContent className="mt-7">
            {closedTranchedPools
              ? closedTranchedPools.map((tranchedPool: any) => (
                  <PoolCard
                    key={tranchedPool.id}
                    className="mb-10"
                    poolName={tranchedPool.name}
                    totalSuppliedAmount={{
                      token: SupportedCrypto.Usdc,
                      amount:
                        tranchedPool?.juniorTranches[0].principalDeposited,
                    }}
                    totalGoalAmount={{
                      token: SupportedCrypto.Usdc,
                      amount: tranchedPool.creditLine.maxLimit, //90% - not sure if this is the correct field
                    }}
                    artistName={tranchedPool.borrower.name}
                    image={tranchedPool.borrower.logo}
                    type={
                      (
                        tranchedPool?.juniorTranches[0]
                          .principalDeposited as BigNumber
                      ).gte(tranchedPool.creditLine.maxLimit)
                        ? "completed"
                        : "failed"
                    }
                  />
                ))
              : undefined}
          </TabContent>
        </TabPanels>
      </TabGroup>
    </>
  );
}

export default AllArtistPoolPage;
