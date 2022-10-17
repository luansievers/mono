import axios from "axios";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { KYC } from "@/components/dashboard/kyc";
import { ArtistPool } from "@/components/dashboard/my-open-pool";
import { NotConnected } from "@/components/dashboard/not-connected";
import { DashboardTotal } from "@/components/dashboard/total";
import { useApplicationState } from "@/hooks/application-hooks";
import { useSelectedSidebarItem, useLayoutTitle } from "@/hooks/sidebar-hooks";
import { useUser } from "@/hooks/user-hooks";
import { SupportedCrypto } from "@/lib/graphql/generated";
import { useWallet } from "@/lib/wallet";
import { hasUid } from "@/services/user-services";

import DashboardArtistPool from "./dashboard-artist-pool";

const DummyDashboardDataEmpty = {
  totalEarnedAmount: {
    amount: BigNumber.from(0),
    token: SupportedCrypto.Usdc,
  },
  totalRaisedAmount: {
    amount: BigNumber.from(0),
    token: SupportedCrypto.Usdc,
  },
};

function Dashboard() {
  useSelectedSidebarItem("dashboard");
  useLayoutTitle("Artist Dashboard");
  const [dashBoardData, setDashboardData] = useState<
    typeof DummyDashboardDataEmpty
  >(DummyDashboardDataEmpty);
  const [isVerified, setIsVerified] = useState(false);
  const [openPoolData, setOpenPoolData] = useState<any[]>([]);

  const state = useApplicationState();
  const router = useRouter();
  const user = useUser();
  const { account } = useWallet();

  useEffect(() => {
    const isVerified = hasUid(user);
    setIsVerified(isVerified);
  }, [user]);

  /**
   * Below code(useEffect) and it's usages need to be replaced by openTranchedPools when create pool insertion is done
   */
  useEffect(() => {
    const fetchData = async () => {
      let mappedData = [];
      const response = await axios.get(`/api/pool?walletAddress=${account}`);
      const test = await axios.get(`/api/pool`);
      console.log("test", test);
      mappedData = Object.keys(response.data).map((key) => ({
        id: key,
        ...response.data[key],
      }));
      setOpenPoolData(mappedData);
    };
    fetchData();
  }, [state, account]);

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

  if (!isVerified) {
    //change back to (isVerified)
    if (openPoolData.length > 0) {
      return (
        <>
          <DashboardTotal
            totalEarnedAmount={dashBoardData.totalEarnedAmount}
            totalRaisedAmount={dashBoardData.totalRaisedAmount}
            createPoolHref={"/artist/create-pool"}
          />
          <DashboardArtistPool
            setEarnedAndRaisedAmount={onSetEarnedAndRaisedAmount}
            openPoolData={openPoolData}
          />
        </>
      );
    }
    return (
      <ArtistPool
        isVerified={isVerified}
        onButtonClick={() => {
          router.push("/artist/create-pool");
        }}
      />
    );
  }

  if (account && !isVerified) {
    return <KYC />;
  }
  return <NotConnected />;
}

export default Dashboard;
