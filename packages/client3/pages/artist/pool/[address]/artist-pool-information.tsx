import { BigNumber } from "ethers";

import { Display, BodyText, Heading, Chip } from "@/components/design-system";
import { Progress } from "@/components/design-system/progress";
import { formatCrypto } from "@/lib/format";
import { Pool, SupportedCrypto } from "@/lib/graphql/generated";

import ArtistDepositCard from "./artist-deposit-card";
import ArtistWithdrawalCard from "./artist-withdrawal-card";

export enum EventType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

type Props = {
  poolData: Partial<Pool>;
  deposited: BigNumber;
  goalAmount: BigNumber;
  numOfBackers: number;
  lockedPool: boolean;
  onButtonClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: EventType
  ) => void;
};

function ArtistPoolInformation({
  poolData,
  deposited,
  goalAmount,
  numOfBackers,
  lockedPool,
  onButtonClick,
}: Props) {
  let progressPercentage = 0;
  if (!deposited.isZero()) {
    progressPercentage = (deposited.toNumber() / goalAmount.toNumber()) * 100;
  }
  const closingDate = new Date(poolData.closingDate ?? "").toLocaleDateString(
    "en-us",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <>
      <div className="rounded-lg border border-dark-90">
        <div className="p-6">
          <div className="flex justify-between">
            <Heading level={5} className="text-light-40">
              Raise
            </Heading>
            <Chip
              type={poolData.status === "completed" ? "completed" : "failed"}
            >
              {poolData.status === "completed" ? "Completed" : "Failed"}
            </Chip>
          </div>
          <BodyText size="large" className="text-light-40">
            {poolData.status === "completed"
              ? `Successfully funded and closed on ${closingDate}`
              : `Failed to fund and closed on ${closingDate}`}
          </BodyText>
          <div className="my-4 w-full border border-dark-90" />
          <div className="flex justify-between">
            <Display className="text-accent-2" level={2}>
              {formatCrypto({
                token: SupportedCrypto.Usdc,
                amount: BigNumber.from(deposited ?? 0),
              })}
            </Display>
            <BodyText size="large" className=" text-dark-50">
              {"of "}
              {formatCrypto({
                token: SupportedCrypto.Usdc,
                amount: BigNumber.from(goalAmount ?? 0),
              })}
            </BodyText>
          </div>
          <Progress percentage={progressPercentage} />
          <div className="mt-9 flex items-center">
            <BodyText size="large" className="text-light-40">
              {numOfBackers ?? 0}
            </BodyText>
            <BodyText size="large" className="ml-4 text-dark-50">
              {numOfBackers > 1 ? "Backers" : "Backer"}
            </BodyText>
          </div>
          {!lockedPool ? (
            <div className="mt-8 w-full border border-dark-90" />
          ) : (
            <></>
          )}
        </div>
        {/* NOTE: TESTING --- {poolData.status == "approved" ? ( otherwise it should be "completed"*/}
        {poolData.status == "approved" ? (
          <ArtistWithdrawalCard
            deposited={deposited}
            lockedPool={lockedPool}
            onButtonClick={onButtonClick}
          />
        ) : (
          <> </>
        )}
      </div>
      {lockedPool ? ( // Note: If (disabled) then the pool has been locked and withdrawn maximally from.
        <div className="mt-8">
          <ArtistDepositCard
            repayed={deposited} // TODO: Change to repayed amount not deposited - FAD-172
            onButtonClick={onButtonClick}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ArtistPoolInformation;
