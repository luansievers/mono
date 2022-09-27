import { useQuery } from "@apollo/client";
import { BigNumber } from "ethers";

import { PoolCard } from "@/components/dashboard/pool-card";
import {
  TabButton,
  TabContent,
  TabGroup,
  TabList,
  TabPanels,
} from "@/components/design-system";
import { SupportedCrypto } from "@/lib/graphql/generated";
import { backerAllArtistPools } from "@/queries/backer.queries";

function AllArtistPoolPage() {
  const { data, error } = useQuery(backerAllArtistPools);

  const openTranchedPools = data?.tranchedPools?.filter((tranchedPool: any) =>
    (tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
  );

  const closedTranchedPools = data?.tranchedPools?.filter(
    (tranchedPool: any) =>
      !(tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
  );

  return (
    <>
      TODO: Search box TODO: Sort
      <TabGroup>
        <TabList>
          <TabButton>Open</TabButton>
          <TabButton>Closed</TabButton>
        </TabList>
        <TabPanels>
          <TabContent>
            {openTranchedPools
              ? openTranchedPools.map((tranchedPool: any) => (
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
                  />
                ))
              : undefined}
          </TabContent>
          <TabContent>
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
