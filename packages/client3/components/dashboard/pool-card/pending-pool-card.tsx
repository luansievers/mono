import clsx from "clsx";
import { MouseEventHandler } from "react";

import { handleAddressFormat } from "@/lib/format/common";
import { Pool_Status_Type } from "@/lib/graphql/generated";

import { Avatar, BodyText, Button, Caption, Chip } from "../../design-system";

interface PoolCardProps {
  image?: string;
  artistName: string;
  poolName: string;
  statusType?: Pool_Status_Type;
  className?: string;
  onClick?: () => void;
  onLaunchProposal?: MouseEventHandler<HTMLButtonElement>;
}

export function PendingPoolCard({
  image,
  artistName,
  poolName,
  statusType,
  className,
  onClick,
  onLaunchProposal,
}: PoolCardProps) {
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
      <>
        <div className="flex-1 pt-[28px] text-center capitalize">
          <Chip
            type={
              statusType == Pool_Status_Type.InReview ? "pending" : "completed"
            }
          >
            {statusType == Pool_Status_Type.InReview ? "In Review" : "Approved"}
          </Chip>
        </div>
      </>
      <div className="lex-none pt-[20px]">
        <Button
          onClick={onLaunchProposal}
          disabled={statusType == Pool_Status_Type.InReview}
        >
          Launch Proposal
        </Button>
      </div>
    </div>
  );
}
