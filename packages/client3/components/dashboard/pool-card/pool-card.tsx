import clsx from "clsx";

import { Progress } from "@/components/design-system/progress";
import { formatCrypto } from "@/lib/format";
import { CryptoAmount } from "@/lib/graphql/generated";

import { Avatar, BodyText, Caption, Chip } from "../../design-system";

interface PoolCardProps {
  image?: string;
  artistName: string;
  poolName: string;
  totalSuppliedAmount: CryptoAmount;
  totalGoalAmount: CryptoAmount;
  type?: "completed" | "failed";
}

export function PoolCard({
  image,
  artistName,
  poolName,
  totalSuppliedAmount,
  totalGoalAmount,
  type,
}: PoolCardProps) {
  return (
    <div className="flex gap-4 rounded-lg bg-green-100 px-6 py-4">
      <div className="flex-none">
        <Avatar size={20} image={image} />
      </div>
      <div className="flex-1 pt-[18.5px]">
        <BodyText size="normal" className="text-light-40">
          {artistName}
        </BodyText>
        <Caption className="pt-[3px] text-dark-50">{poolName}</Caption>
      </div>
      {type ? (
        <>
          <div className="flex-1 pt-[28px] text-center">
            <BodyText size="normal" className="text-light-40">
              {formatCrypto(totalSuppliedAmount)}
            </BodyText>
          </div>
          <div className="flex-1 pt-[28px] text-center capitalize">
            <Chip type={type}>{type}</Chip>
          </div>
        </>
      ) : undefined}
      <div className="flex-1 pt-[20px]">
        <Progress percentage={50} type={type ? type : undefined} />
        <div className="grid grid-cols-2 pt-[11px]">
          <BodyText
            size="normal"
            semiBold={true}
            className={clsx("h-3 rounded-full", {
              "text-accent-2": type == "completed" || !type,
              "text-accent-3": type == "failed",
            })}
          >
            {formatCrypto(totalSuppliedAmount)}
          </BodyText>
          <BodyText size="normal" className="text-right text-dark-50">
            of {formatCrypto(totalGoalAmount)}
          </BodyText>
        </div>
      </div>
    </div>
  );
}
