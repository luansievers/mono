import clsx from "clsx";

import { handleAddressFormat } from "@/lib/format/common";
import { Pool_Status_Type } from "@/lib/graphql/generated";

import { Avatar, BodyText, Button, Caption, Chip } from "../../design-system";

interface PoolCardProps {
  image?: string;
  artistName: string;
  poolName: string;
  statusType?: Pool_Status_Type;
  className?: string;
  buttonText: string;
  onClick?: () => void;
  onButtonClick?: (approve: boolean) => void;
}

export function PendingPoolCard({
  image,
  artistName,
  poolName,
  statusType,
  className,
  buttonText,
  onClick,
  onButtonClick,
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
            // TODO type doesn't work
            type={
              statusType == Pool_Status_Type.InReview
                ? "pending"
                : Pool_Status_Type.Approved
                ? "completed"
                : "failed"
            }
          >
            {statusType == Pool_Status_Type.ReviewFailed
              ? "failed"
              : statusType == Pool_Status_Type.InReview
              ? "pending"
              : "approved"}
          </Chip>
        </div>
      </>
      <div className="flex justify-between pt-[20px]">
        <Button
          onClick={(event) => {
            event.stopPropagation();
            onButtonClick && onButtonClick(false);
          }}
          hidden={buttonText !== "Approve Pool"}
          className="mr-[10px]"
          buttonType="secondary"
        >
          Decline
        </Button>
        <Button
          onClick={() => {
            onButtonClick && onButtonClick(true);
          }}
          disabled={
            statusType == Pool_Status_Type.InReview &&
            buttonText != "Approve Pool"
          }
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
