import { BigNumber } from "ethers";

import { PoolDocuments } from "@/components/pool/pool-documents";
import { PoolTerms } from "@/components/pool/pool-terms";
import { CONTRACT_ADDRESSES } from "@/constants";
import { useContract } from "@/lib/contracts";
import { Pool } from "@/lib/graphql/generated";
import { drawdownArtists } from "@/services/artist-services";

import ArtistCancelPool from "./artist-cancel-pool";
import ArtistWithdrawPool from "./artist-withdraw-pool";

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
    tranchedPoolData.estimatedTotalAssets - tranchedPoolData.totalDeployed
  );

  const onArtistWithdraw = async () => {
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
      console.log("Must be borrower to drawdown");
      return;
    }

    const amountToDrawdown = BigNumber.from(
      tranchedPoolData.estimatedTotalAssets - tranchedPoolData.totalDeployed
    );

    // NOTE: Hardcode testing amount below
    // const amountToDrawdown = BigNumber.from(2);

    await drawdownArtists(
      borrowerContract,
      tranchedPoolData.remainingCapacity,
      poolData.poolAddress,
      amountToDrawdown,
      poolData.walletAddress.toLowerCase(),
      poolData.poolName
    );
  };

  return (
    <>
      {poolData.status !== "completed" || "failed" ? (
        <ArtistWithdrawPool
          poolData={poolData}
          deposited={tranchedPoolData?.juniorDeposited ?? BigNumber.from(0)}
          goalAmount={
            tranchedPoolData?.creditLine?.maxLimit ??
            BigNumber.from(poolData.goalAmount ?? 0)
          }
          numOfBackers={tranchedPoolData?.numBackers ?? 0}
          disabled={disabled}
          onButtonClick={(event) => {
            event.stopPropagation();
            onArtistWithdraw();
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
