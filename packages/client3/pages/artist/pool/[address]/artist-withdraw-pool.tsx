import { BigNumber } from "ethers";

import {
  Display,
  BodyText,
  Heading,
  Chip,
  Icon,
  Button,
} from "@/components/design-system";
import { Progress } from "@/components/design-system/progress";
import { formatCrypto } from "@/lib/format";
import { Pool, SupportedCrypto } from "@/lib/graphql/generated";

type Props = {
  poolData: Partial<Pool>;
  deposited: BigNumber;
  goalAmount: BigNumber;
  numOfBackers: number;
};

function ArtistWithdrawPool({
  poolData,
  deposited,
  goalAmount,
  numOfBackers,
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
        </div>
        {poolData.status == "completed" ? (
          <div className="mt-2 flex items-center rounded-b-lg bg-green-80">
            <div className="w-full items-center p-6">
              <BodyText size="normal" className="text-light-40">
                Withdraw
              </BodyText>
              <BodyText size="small" className="mt-2 text-light-40">
                Withdraw funds from your pool
              </BodyText>
              <div className="mt-6 flex">
                <Display level={2} className="text-light-40">
                  {formatCrypto({
                    token: SupportedCrypto.Usdc,
                    amount: BigNumber.from(deposited ?? 0),
                  })}
                </Display>
                <BodyText
                  size="medium"
                  className="align-center ml-1	text-light-40"
                >
                  USDC
                </BodyText>
              </div>
              <div className="text-center">
                <Button
                  buttonType="accent2"
                  className="mx-auto mt-4 w-full text-center"
                >
                  Withdraw
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ArtistWithdrawPool;
