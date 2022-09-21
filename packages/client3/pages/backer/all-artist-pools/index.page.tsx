import { gql, useQuery } from "@apollo/client";
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
import { TRANCHED_POOL_STATUS_FIELDS } from "@/lib/pools";

const TRANCHED_POOL_CARD_FIELDS = gql`
  ${TRANCHED_POOL_STATUS_FIELDS}
  fragment TranchedPoolCardFieldsTemp on TranchedPool {
    id
    name @client
    category @client
    icon @client
    artist @client
    id
    creditLine {
      maxLimit
    }
    juniorTranches {
      id
      lockedUntil
      principalDeposited
    }
  }
`;

const query = gql`
  ${TRANCHED_POOL_CARD_FIELDS}
  query AllArtistPoolsPageSomething {
    tranchedPools(orderBy: createdAt, orderDirection: desc) {
      ...TranchedPoolCardFieldsTemp
    }
  }
`;

function AllArtistPoolPage() {
  const { data, error } = useQuery(query);

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
                        tranchedPool?.juniorTranches[0].principalDeposited, //not sure if this is the correct field
                    }}
                    totalGoalAmount={{
                      token: SupportedCrypto.Usdc,
                      amount: tranchedPool.creditLine.maxLimit, //90% - not sure if this is the correct field
                    }}
                    artistName={tranchedPool.artist}
                    // should be the artist picture
                    image={tranchedPool.icon}
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
                        tranchedPool?.juniorTranches[0].principalDeposited, //not sure if this is the correct field
                    }}
                    totalGoalAmount={{
                      token: SupportedCrypto.Usdc,
                      amount: tranchedPool.creditLine.maxLimit, //90% - not sure if this is the correct field
                    }}
                    artistName={tranchedPool.artist}
                    // should be the artist picture
                    image={tranchedPool.icon}
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
