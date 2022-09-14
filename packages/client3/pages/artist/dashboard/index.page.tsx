import { BigNumber } from "ethers";
import { useState } from "react";

import { ArtistPool } from "@/components/dashboard/my-open-pool";
import { NotConnected } from "@/components/dashboard/not-connected";
import { DashBoardTotal } from "@/components/dashboard/total";
import { Heading } from "@/components/design-system";
import { SupportedCrypto } from "@/lib/graphql/generated";

const DummyDashboardData = {
  totalEarnedAmount: {
    amount: BigNumber.from(20000),
    token: SupportedCrypto.Usdc,
  },
  totalRaisedAmount: {
    amount: BigNumber.from(232323),
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

function DashBoard() {
  const [dashBoardData, setDashBoardData] = useState<
    typeof DummyDashboardDataEmpty | null
  >(null);
  const [isVerified, setIsVerified] = useState(false);

  if (dashBoardData) {
    return (
      <>
        <DashBoardTotal
          totalEarnedAmount={dashBoardData.totalEarnedAmount}
          totalRaisedAmount={dashBoardData.totalRaisedAmount}
        />
        <Heading className="mt-10 mb-5 text-white" level={5}>
          My Open Pool
        </Heading>
        <ArtistPool
          isVerified={isVerified}
          onButtonClick={() => {
            //TODO: Dummy function definition below
            if (isVerified) {
              setDashBoardData(DummyDashboardData);
            } else {
              setIsVerified(true);
            }
          }}
        />
      </>
    );
  }

  return (
    <div>
      <NotConnected
        onConnectWalletClick={() => {
          //TODO ; Implement On Click, currently dummy function is being used
          setDashBoardData(DummyDashboardDataEmpty);
        }}
      />
    </div>
  );
}

export default DashBoard;
