import { BigNumber } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";

import { ArtistPool } from "@/components/dashboard/my-open-pool";
import { NotConnected } from "@/components/dashboard/not-connected";
import { DashBoardTotal } from "@/components/dashboard/total";
import { Heading } from "@/components/design-system";
import { SupportedCrypto } from "@/lib/graphql/generated";
import { UserContext } from "@/pages/_app.page";
import { User } from "@/types/user";

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
    typeof DummyDashboardDataEmpty
  >(DummyDashboardDataEmpty);

  const [isVerified, setIsVerified] = useState(false);
  const { user } = useContext(UserContext);

  const hasUid = useCallback(() => {
    if (
      user?.isUsNonAccreditedIndividual ||
      user?.isNonUsIndividual ||
      user?.isUsEntity ||
      user?.isNonUsEntity ||
      user?.isUsAccreditedIndividual
    ) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [user]);

  useEffect(() => {
    hasUid();
  }, [hasUid]);

  if (isVerified) {
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
      <NotConnected />
    </div>
  );
}

export default DashBoard;
