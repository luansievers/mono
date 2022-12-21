import { BigNumber } from "ethers";

import { PoolDocuments } from "@/components/pool/pool-documents";
import { PoolTerms } from "@/components/pool/pool-terms";
import { CONTRACT_ADDRESSES } from "@/constants";
import { useContract } from "@/lib/contracts";
import { Pool } from "@/lib/graphql/generated";
import { artistRepayment, drawdownArtists } from "@/services/artist-services";

import ArtistCancelPool from "./artist-cancel-pool";
import ArtistPoolInformation from "./artist-pool-information";

type Props = {
  poolData: Partial<Pool>;
  tranchedPoolData: any;
};

function PoolDetailsRightGrid({ poolData, tranchedPoolData }: Props) {
  const terms = poolData?.terms;

  const borrowerContract = useContract("Borrower", poolData.borrowerContract);

  const USDC = useContract("USDC", CONTRACT_ADDRESSES.USDC);

  // Note: Basically reference to whether the pool is locked
  const lockedPool = !tranchedPoolData?.remainingCapacity;

  const artistWithdraw = async () => {
    if (!borrowerContract) {
      console.error("Borrower contract couldn't be initialized");
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

  const onArtistRepayment = async (amount: string) => {
    // ! TODO: KANE USDC FORMAT
    const amountToRepay = BigNumber.from(amount).mul(10 ** 6);

    if (!borrowerContract) {
      console.error("Borrower contract couldn't be initialized");
      return;
    }
    if (!poolData.poolAddress) {
      console.error("Pool address not found");
      return;
    }

    if (!USDC) {
      console.error("USDC not found");
      return;
    }
    await USDC.approve(borrowerContract.address, amountToRepay);

    await artistRepayment(
      borrowerContract,
      poolData.poolAddress,
      amountToRepay
    );
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
          balance={tranchedPoolData?.creditLine.balance ?? BigNumber.from(0)}
          numOfBackers={tranchedPoolData?.numBackers ?? 0}
          lockedPool={lockedPool}
          onButtonClick={(event) => {
            event.stopPropagation();
            artistWithdraw();
          }}
          onRepayment={(amount) => {
            onArtistRepayment(amount);
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
