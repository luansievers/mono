import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { KYC } from "@/components/dashboard/kyc";
import { ArtistPool } from "@/components/dashboard/my-open-pool";
import { NotConnected } from "@/components/dashboard/not-connected";
import { PoolCard } from "@/components/dashboard/pool-card";
import { DashboardTotal } from "@/components/dashboard/total";
import { Caption, Heading } from "@/components/design-system";
import { useUser } from "@/hooks/user-hooks";
import { SupportedCrypto } from "@/lib/graphql/generated";
import { useWallet } from "@/lib/wallet";
import { hasUid } from "@/services/user-services";

import DashboardArtistPool from "./dashboard-artist-pool";

const TempGetNumber = (value: number) => {
  return {
    amount: BigNumber.from(value * 1000000),
    token: SupportedCrypto.Usdc,
  };
};

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
