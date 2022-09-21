import { gql, useQuery } from "@apollo/client";

import { PoolCard } from "@/components/dashboard/pool-card";
import {
  TabButton,
  TabContent,
  TabGroup,
  TabList,
  TabPanels,
} from "@/components/design-system";
import { SupportedCrypto, useEarnPageQuery } from "@/lib/graphql/generated";
import { TRANCHED_POOL_STATUS_FIELDS } from "@/lib/pools";

const TRANCHED_POOL_CARD_FIELDS = gql`
  ${TRANCHED_POOL_STATUS_FIELDS}
  fragment TranchedPoolCardFieldsTemp on TranchedPool {
    id
    name @client
    category @client
    icon @client
    artistName @client
    creditLine {
      id
      maxLimit
    }
    juniorTranches {
      lockedUntil
      principalDeposited
    }
  }
`;

const testequery = gql`
  ${TRANCHED_POOL_CARD_FIELDS}
  query AllArtistPoolsPageSomething {
    tranchedPools(orderBy: createdAt, orderDirection: desc) {
      ...TranchedPoolCardFieldsTemp
    }
  }
`;

function AllArtistPoolPage() {
  const { data, error } = useQuery(testequery);
  console.log(data);

  const openTranchedPools = data?.tranchedPools?.filter(
    (tranchedPool: any) => tranchedPool.name !== null
  );

  return (
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
                    amount: tranchedPool?.juniorTranches[0].principalDeposited, //not sure if this is the correct field
                  }}
                  totalGoalAmount={{
                    token: SupportedCrypto.Usdc,
                    amount: tranchedPool.creditLine.maxLimit, //90% - not sure if this is the correct field
                  }}
                  // figure out artist name
                  artistName={tranchedPool.name}
                  // should be the artist picture
                  image={tranchedPool.icon}
                />
              ))
            : undefined}
        </TabContent>
        <TabContent>Content 2</TabContent>
      </TabPanels>
    </TabGroup>
  );
}

export default AllArtistPoolPage;
