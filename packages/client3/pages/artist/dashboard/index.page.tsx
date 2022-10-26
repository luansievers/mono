import { gql } from "@apollo/client";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { KYC } from "@/components/dashboard/kyc";
import { ArtistPool } from "@/components/dashboard/my-open-pool";
import { DashboardTotal } from "@/components/dashboard/total";
import { NotConnected } from "@/components/general/not-connected";
import { useSelectedSidebarItem, useLayoutTitle } from "@/hooks/sidebar-hooks";
import { useUser } from "@/hooks/user-hooks";
import {
  SupportedCrypto,
  useArtistGetAllPoolsGraphDataQuery,
  useArtistPoolMetadataListQuery,
} from "@/lib/graphql/generated";
import { useWallet } from "@/lib/wallet";
import { mergeGraphAndMetaData } from "@/services/pool-services";
import { hasUid } from "@/services/user-services";

import DashboardArtistPool from "./dashboard-artist-pool";
import PendingPoolArtist from "./pending-pools-artist";

const DashboardDataEmpty = {
  totalEarnedAmount: {
    amount: BigNumber.from(0),
    token: SupportedCrypto.Usdc,
  },
  totalRaisedAmount: {
    amount: BigNumber.from(0),
    token: SupportedCrypto.Usdc,
  },
};

gql`
  query artistGetAllPoolsGraphData {
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
  query artistPoolMetadataList($ids: [ID!]!, $walletAddress: String!) {
    poolsByIds(poolIds: $ids, walletAddress: $walletAddress)
      @rest(path: "pool?{args}", type: "pools") {
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

function Dashboard() {
  useSelectedSidebarItem("dashboard");
  useLayoutTitle("Artist Dashboard");
  const [dashBoardData, setDashboardData] =
    useState<typeof DashboardDataEmpty>(DashboardDataEmpty);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const user = useUser();
  const { account } = useWallet();

  useEffect(() => {
    const isVerified = hasUid(user);
    setIsVerified(isVerified);
  }, [user]);

  const { data: { tranchedPools: poolGraphData } = {} } =
    useArtistGetAllPoolsGraphDataQuery();

  const { data: { poolsByIds: artistPoolMetaData } = {} } =
    useArtistPoolMetadataListQuery({
      variables: {
        ids: poolGraphData?.map((pool) => pool.id) ?? [],
        walletAddress: account ?? " ",
      },
      skip: !poolGraphData || !account,
    });
  const mergedData = useMemo(() => {
    if (artistPoolMetaData && poolGraphData) {
      return mergeGraphAndMetaData(poolGraphData, artistPoolMetaData);
    } else {
      return [];
    }
  }, [artistPoolMetaData, poolGraphData]);

  const onSetEarnedAndRaisedAmount = useCallback(
    (earnedAmount: number, raisedAmount: number) => {
      const dashBoardData = {
        totalEarnedAmount: {
          amount: BigNumber.from(earnedAmount),
          token: SupportedCrypto.Usdc,
        },
        totalRaisedAmount: {
          amount: BigNumber.from(raisedAmount),
          token: SupportedCrypto.Usdc,
        },
      };
      setDashboardData(dashBoardData);
    },
    [setDashboardData]
  );

  if (poolGraphData === undefined || poolGraphData === null) {
    return null;
  }

  if (isVerified) {
    if (mergedData.length > 0) {
      return (
        <>
          <DashboardTotal
            totalEarnedAmount={dashBoardData.totalEarnedAmount}
            totalRaisedAmount={dashBoardData.totalRaisedAmount}
            createPoolHref={"/artist/create-pool"}
          />

          <PendingPoolArtist />
          <DashboardArtistPool
            setEarnedAndRaisedAmount={onSetEarnedAndRaisedAmount}
            openPoolData={mergedData}
          />
        </>
      );
    }

    return (
      <>
        <ArtistPool
          isVerified={isVerified}
          onButtonClick={() => {
            router.push("/artist/create-pool");
          }}
        />
        <PendingPoolArtist />
      </>
    );
  }

  if (account && !isVerified) {
    return <KYC />;
  }
  return (
    <NotConnected>
      Please connect your wallet to view your dashboard
    </NotConnected>
  );
}

export default Dashboard;
