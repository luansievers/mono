import clsx from "clsx";

import { Progress } from "@/components/design-system/progress";
import { cryptoToFloat, formatCrypto, formatFiat } from "@/lib/format";
import { handleAddressFormat } from "@/lib/format/common";
import { CryptoAmount, SupportedFiat } from "@/lib/graphql/generated";

import { Avatar, BodyText, Caption, Chip } from "../../design-system";

interface PoolCardProps {
  image?: string;
  artistName: string;
  poolName: string;
  totalSuppliedAmount: CryptoAmount;
  totalGoalAmount: CryptoAmount;
  type?: "completed" | "failed";
  className?: string;
  onClick?: () => void;
}

export function PoolCard({
  image,
  artistName,
  poolName,
  totalSuppliedAmount,
  totalGoalAmount,
  type,
  className,
  onClick,
}: PoolCardProps) {
  const totalSuppliedAmountFloat = cryptoToFloat(totalSuppliedAmount);

  let supplied = "-";
  let progressPercentage = 0;

  if (!totalSuppliedAmount.amount.isZero()) {
    progressPercentage =
      (totalSuppliedAmount.amount.toNumber() /
        totalGoalAmount.amount.toNumber()) *
      100;
    if (type != "failed") {
      supplied = formatCrypto(totalSuppliedAmount);
    }
  }

  return (
    <div
      className={clsx(
        "flex gap-4 rounded-lg bg-green-100 px-6 py-4",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex-none">
        <Avatar size={20} image={image} />
      </div>
      <div className="flex-1 pt-[18.5px]">
        <BodyText size="normal" className="text-light-40">
          {artistName?.startsWith("0x")
            ? handleAddressFormat(artistName)
            : artistName}
        </BodyText>
        <Caption className="pt-[3px] text-dark-50">{poolName}</Caption>
      </div>
      {type ? (
        <>
          <div className="flex-1 pt-[28px] text-center">
            <BodyText size="normal" className="text-light-40">
              {supplied}
            </BodyText>
          </div>
          <div className="flex-1 pt-[28px] text-center capitalize">
            <Chip type={type}>{type}</Chip>
          </div>
        </>
      ) : undefined}
      <div className="w-60 flex-none pt-[20px]">
        <Progress
          percentage={progressPercentage}
          type={type ? type : undefined}
        />
        <div className="grid grid-cols-2 pt-[11px]">
          <BodyText
            size="normal"
            semiBold={true}
            className={clsx("h-3 rounded-full", {
              "text-accent-2": !type,
              "text-light-40": type == "completed",
              "text-accent-3": type == "failed",
            })}
          >
            {/* Supplied is format fiat */}
            {formatFiat({
              symbol: SupportedFiat.Usd,
              amount: totalSuppliedAmountFloat,
            })}
          </BodyText>
          <BodyText size="normal" className="text-right text-dark-50">
            {/* Goal is format crypto */}
            of {formatCrypto(totalGoalAmount)}
          </BodyText>
        </div>
      </div>
    </div>
  );
}
