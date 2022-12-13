import { BigNumber } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";

import { PoolDocuments } from "@/components/pool/pool-documents";
import { PoolTerms } from "@/components/pool/pool-terms";
import { useContract } from "@/lib/contracts";
import { Pool } from "@/lib/graphql/generated";
import { artistRepayment, drawdownArtists } from "@/services/artist-services";

import ArtistCancelPool from "./artist-cancel-pool";
import ArtistPoolInformation, { EventType } from "./artist-pool-information";

type Props = {
  poolData: Partial<Pool>;
  tranchedPoolData: any;
};

function PoolDetailsRightGrid({ poolData, tranchedPoolData }: Props) {
  const terms = poolData?.terms;

  const borrowerContract = useContract("Borrower", poolData.borrowerContract);

  const goldfinchConfig = useContract(
    "GoldfinchConfig",
    "0x9d64Ba30d699507BbC84628417B7A4fF4bdb8563"
  );

  const USDC = useContract(
    "USDC",
    "0x3E0B09aDf6171F5D1aefef567BA6Cf1fb364E080"
  );

  const CreditLine = useContract(
    "CreditLine",
    "0x229d85802a7f547770f6e51e36a7affed405ad15"
  );

  const disabled = !(
    tranchedPoolData?.estimatedTotalAssets - tranchedPoolData?.totalDeployed
  );

  const onArtistEvent = async (eventType: EventType) => {
    if (eventType == EventType.WITHDRAW) {
      await artistWithdraw();
    }
    if (eventType === EventType.DEPOSIT) {
      await artistDeposit(BigNumber.from(200000000));
    }
  };

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
    /** NOTE: Hardcode testing amount below
     * const amountToDrawdown = BigNumber.from(2);
     * **/

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

  const artistDeposit = async (amount: BigNumber) => {
    console.log(
      "Deposit button clicked",
      BigNumber.from(amount).toNumber(),
      poolData.poolAddress,
      borrowerContract
    );
    if (!goldfinchConfig) {
      console.error("Goldfinch Config contract couldn't be initialized");
      return;
    }

    // for (let i = 0; i <= 23; i++) {
    //   const receipt = await goldfinchConfig.getAddress(i);
    //   console.log(receipt);
    // }
    console.log("USDC", await goldfinchConfig.getAddress(5));

    if (!borrowerContract) {
      console.error("Borrower contract couldn't be initialized");
      return;
    }
    if (!poolData.poolAddress) {
      console.error("Pool address not found");
      return;
    }

    if (!CreditLine) {
      console.error("Credit line not found");
      return;
    }

    if (!USDC) {
      console.error("USDC not found");
      return;
    }
    console.log("admin", await CreditLine.isAdmin());

    const OWNER_ROLE = keccak256(toUtf8Bytes("OWNER_ROLE"));

    await CreditLine.grantRole(
      OWNER_ROLE,
      "0x108Cc3833CD49333A7908e4bB52f4CF8f4090425"
    );

    console.log(
      "owner role?",
      await CreditLine.hasRole(
        OWNER_ROLE,
        "0x108Cc3833CD49333A7908e4bB52f4CF8f4090425"
      )
    );

    await CreditLine.grantRole(
      OWNER_ROLE,
      "0x108Cc3833CD49333A7908e4bB52f4CF8f4090425"
    );

    console.log(
      "Credit Line balance",
      BigNumber.from(await CreditLine.balance()).toNumber()
    );

    // const creditLineAssess = await (await creditLine.assess()).wait();

    // console.log(creditLineAssess);

    // const balance = await USDC?.balanceOf(poolData?.poolAddress);

    // console.log("balance", BigNumber.from(balance).toNumber());
    const creditLineAmount = await CreditLine.balance();
    // amount.mul(2);

    await USDC.approve(borrowerContract.address, amount);

    // const balance1 = await USDC?.balanceOf(poolData.poolAddress);
    // const borrowerBalance2 = await USDC?.balanceOf(borrowerContract.address);

    // const allowed1 = await USDC?.allowance(
    //   "0x108Cc3833CD49333A7908e4bB52f4CF8f4090425",
    //   borrowerContract.address
    // );
    // console.log("balance", BigNumber.from(balance1).toNumber());
    // console.log("allowed", BigNumber.from(allowed1).toNumber());
    // console.log("borrowerBalance2", BigNumber.from(borrowerBalance2));

    // console.log(borrowerContract.address);

    // console.log("amount", BigNumber.from(amount).toNumber());
    console.log(await CreditLine.address);

    const receipt = await artistRepayment(
      borrowerContract,
      poolData.poolAddress,
      amount
    );
    console.log(receipt);

    console.log(await CreditLine.address);

    console.log(
      "balance of Pool Address",
      BigNumber.from(await USDC.balanceOf(poolData.poolAddress)).toString()
    );

    console.log(
      "Credit Line balance",
      BigNumber.from(await CreditLine.balance()).toNumber()
    );

    // console.log("assess credit line", await CreditLine.assess());
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
