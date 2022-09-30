import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { KYC } from "@/components/dashboard/kyc";
import { NotConnected } from "@/components/dashboard/not-connected";
import { DashboardTotal } from "@/components/dashboard/total";
import { useSelectedSidebarItem, useLayoutTitle } from "@/hooks/sidebar-hooks";
import { useUser } from "@/hooks/user-hooks";
import { SupportedCrypto } from "@/lib/graphql/generated";
import { useWallet } from "@/lib/wallet";
import { hasUid } from "@/services/user-services";

import DashboardArtistPool from "./dashboard-artist-pool";

const DummyDashboardData = {
  totalEarnedAmount: {
    amount: BigNumber.from(152305 * 10000),
    token: SupportedCrypto.Usdc,
  },
  totalRaisedAmount: {
    amount: BigNumber.from(232323 * 10000),
    token: SupportedCrypto.Usdc,
  },
};

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
  const router = useRouter();
  useSelectedSidebarItem("dashboard");
  useLayoutTitle("Artist Dashboard");
  const [dashBoardData, setDashboardData] = useState<
    typeof DummyDashboardDataEmpty
  >(DummyDashboardDataEmpty);

  const [isVerified, setIsVerified] = useState(false);
  const user = useUser();
  const { account } = useWallet();

  useEffect(() => {
    const isVerified = hasUid(user);
    setIsVerified(isVerified);
    setDashboardData(DummyDashboardData);
  }, [user]);

  if (isVerified) {
    return (
      <>
        <DashboardTotal
          totalEarnedAmount={dashBoardData.totalEarnedAmount}
          totalRaisedAmount={dashBoardData.totalRaisedAmount}
          onCreatePoolClicked={() => {
            /** */
          }}
        />
        {/* 
        // Ticket FAD-85 TODO
        
        <ArtistPool
          isVerified={isVerified}
          onButtonClick={() => {
            //TODO: Dummy function definition below
            if (isVerified) {
              router.push("/artist/create-pool");
            } else {
              setIsVerified(false);
            }
          }}
        /> */}
        <DashboardArtistPool />
      </>
    );
  }
  if (account && !isVerified) {
    return <KYC />;
  }
  return <NotConnected />;
}

export default Dashboard;
