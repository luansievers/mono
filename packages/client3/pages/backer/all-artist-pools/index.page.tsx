import { gql } from "@apollo/client";
import axios from "axios";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useMemo } from "react";

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
import {
  useBackerPoolAddressPoolMetadataQuery,
  useBackerGetAllPoolsGraphDataQuery,
  SupportedCrypto,
} from "@/lib/graphql/generated";
import { mergeGraphAndMetaData } from "@/services/pool-services";

gql`
  query backerGetAllPoolsGraphData {
    tranchedPools {
      id
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
      }
    }
  }
`;

gql`
  query backerPoolAddressPoolMetadata($ids: [ID!]!) {
    poolsByIds(poolIds: $ids) @rest(path: "pool?{args}", type: "pools") {
      id
      poolName
      walletAddress
      status
      goalAmount
      closingDate
      poolAddress
    }
  }
`;

function AllArtistPoolPage() {
  useSelectedSidebarItem("all-artist-pools");
  useLayoutTitle("All Artist Pools");
  const router = useRouter();
  const { data: { tranchedPools: poolGraphData } = {} } =
    useBackerGetAllPoolsGraphDataQuery();

  const { data: { poolsByIds: backerPoolMetaData } = {} } =
    useBackerPoolAddressPoolMetadataQuery({
      variables: {
        ids: poolGraphData?.map((pool) => pool.id) ?? [],
      },
      skip: !poolGraphData,
    });
  const mergedData = useMemo(() => {
    if (backerPoolMetaData && poolGraphData) {
      return mergeGraphAndMetaData(poolGraphData, backerPoolMetaData);
    } else {
      return [];
    }
  }, [backerPoolMetaData, poolGraphData]);

  if (poolGraphData === undefined || poolGraphData === null) {
    return null;
  }

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
            {mergedData
              ? mergedData.map((tranchedPool: any) => (
                  <PoolCard
                    key={tranchedPool.id}
                    className="mb-10"
                    poolName={tranchedPool.poolName}
                    totalSuppliedAmount={{
                      token: SupportedCrypto.Usdc,
                      amount: BigNumber.from(
                        tranchedPool?.juniorDeposited ?? BigNumber.from(0)
                      ),
                    }}
                    totalGoalAmount={{
                      token: SupportedCrypto.Usdc,
                      amount:
                        tranchedPool.creditLine?.maxLimit ?? BigNumber.from(0), //90% - not sure if this is the correct field
                    }}
                    artistName={tranchedPool.walletAddress}
                    image={""}
                    onClick={() => handleClick(tranchedPool.id)}
                  />
                ))
              : undefined}
          </TabContent>
          {/* <TabContent className="mt-7">
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
          </TabContent> */}
        </TabPanels>
      </TabGroup>
    </>
  );
}

export default AllArtistPoolPage;
