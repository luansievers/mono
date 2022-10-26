import { gql } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/router";

import {
  Heading,
  TabButton,
  TabGroup,
  TabList,
  TabPanels,
} from "@/components/design-system";
import { useSelectedSidebarItem, useLayoutTitle } from "@/hooks/sidebar-hooks";
import { useBackerGetAllPoolsGraphDataQuery } from "@/lib/graphql/generated";

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
  query backerPoolAddressPoolMetadata($poolAddress: String!) {
    poolAddress(poolAddress: $poolAddress)
      @rest(path: "pool/{args.poolAddress}", type: "Pool") {
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

  const { data: { tranchedPools: tranchedPoolData } = {} } =
    useBackerGetAllPoolsGraphDataQuery({});

  console.log("here", tranchedPoolData);

  // set data for tranchedPool cards and get userBackerPoolAddress from metadata

  // const { data: { poolAddress: poolMetaData } = {} } =
  //   useBackerPoolAddressPoolMetadataQuery({
  //     variables: {
  //       poolAddress: tranchedPoolData?.map((pool) => pool.id),
  //     },
  //   });

  // console.log("poolMetaData", poolMetaData);

  // if (poolMetaData === undefined || poolMetaData === null) {
  //   return null;
  // }

  // const openTranchedPools =
  //   data?.tranchedPools?.filter((tranchedPool: any) =>
  //     (tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
  //   ) || [];

  // const closedTranchedPools =
  //   data?.tranchedPools?.filter(
  //     (tranchedPool: any) =>
  //       !(tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
  //   ) || [];

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
          {/* <TabContent className="mt-7">
            {poolMetaData
              ? poolMetaData.map((tranchedPool: any) => (
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
          </TabContent> */}
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
