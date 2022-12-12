import { BigNumber } from "ethers";

import { PoolDocuments } from "@/components/pool/pool-documents";
import { PoolTerms } from "@/components/pool/pool-terms";
import { CONTRACT_ADDRESSES } from "@/constants";
import { useContract } from "@/lib/contracts";
import { Pool } from "@/lib/graphql/generated";
import { drawdownArtists } from "@/services/artist-services";

import ArtistCancelPool from "./artist-cancel-pool";
import ArtistPoolInformation, { EventType } from "./artist-pool-information";

type Props = {
  poolData: Partial<Pool>;
  tranchedPoolData: any;
};

function PoolDetailsRightGrid({ poolData, tranchedPoolData }: Props) {
  const terms = poolData?.terms;

  // Note: Need to use Borrower.sol to interact with TranchedPool.sol
  const borrowerContract = useContract("Borrower", poolData.borrowerContract);

  const goldfinchFactory = useContract(
    "GoldfinchFactory",
    CONTRACT_ADDRESSES.GoldfinchFactory
  );

  const disabled = !(
    tranchedPoolData?.estimatedTotalAssets - tranchedPoolData?.totalDeployed
  );

  const onArtistEvent = async (eventType: EventType) => {
    if (eventType !== EventType.WITHDRAW) {
      await artistWithdraw();
    }
    if (eventType === EventType.DEPOSIT) {
      await artistDeposit();
    }
  };

  const artistWithdraw = async () => {
    if (!borrowerContract) {
      console.error("Borrower contract couldn't be initialized");
      return;
    }
    if (!goldfinchFactory) {
      console.error("Goldfinch Factory contract couldn't be initialized");
      return;
    }
    if (!poolData.poolAddress) {
      console.error("Pool address not found");
      return;
    }
    if (!poolData.walletAddress) {
      console.error("Wallet address not found");
      return;
    }
    if (!poolData.poolName) {
      console.error("Pool Name not found");
      return;
    }
    const role = await goldfinchFactory.isBorrower();
    if (!role) {
      console.error("Must be borrower to drawdown");
      return;
    }

    // NOTE: Hardcode testing amount below
    // const amountToDrawdown = BigNumber.from(2);
    const amountToDrawdown = BigNumber.from(
      tranchedPoolData.estimatedTotalAssets - tranchedPoolData.totalDeployed
    );

    await drawdownArtists(
      borrowerContract,
      tranchedPoolData.remainingCapacity,
      poolData.poolAddress,
      amountToDrawdown,
      poolData.walletAddress.toLowerCase(),
      poolData.poolName
    );
  };

  const artistDeposit = async () => {
    console.log("Deposit button clicked");
  };

  return (
    <>
      {poolData.status !== "completed" || "failed" ? (
        <ArtistPoolInformation
          poolData={poolData}
          deposited={tranchedPoolData?.juniorDeposited ?? BigNumber.from(0)}
          goalAmount={
            tranchedPoolData?.creditLine?.maxLimit ??
            BigNumber.from(poolData.goalAmount ?? 0)
          }
          numOfBackers={tranchedPoolData?.numBackers ?? 0}
          disabled={disabled}
          onButtonClick={(event, EventType) => {
            event.stopPropagation();
            onArtistEvent(EventType);
          }}
        />
      ) : (
        <ArtistCancelPool
          poolData={poolData}
          deposited={tranchedPoolData?.juniorDeposited ?? BigNumber.from(0)}
          goalAmount={
            tranchedPoolData?.creditLine?.maxLimit ??
            BigNumber.from(poolData.goalAmount ?? 0)
          }
          numOfBackers={tranchedPoolData?.numBackers ?? 0}
        />
      )}

      <PoolTerms terms={terms} />

      <PoolDocuments />
    </>
  );
}

export default PoolDetailsRightGrid;
