import clsx from "clsx";

import { BodyText, Button, Heading } from "@/components/design-system";

type Props = {
  onCreatePoolClicked?: () => void;
  totalRaised: number;
  totalEarned: number;
};

export function DashBoardTotal({
  onCreatePoolClicked,
  totalEarned,
  totalRaised,
}: Props) {
  return (
    <div
      className={clsx(
        "grid grid-cols-4 gap-4 bg-green-100 px-7 py-12",
        "bg-img-free-artist bg-center bg-no-repeat"
      )}
    >
      <div>
        <BodyText size="normal" className="text-dark-70">
          Total Raised
        </BodyText>
        <Heading level={2} className="text-dark-70">
          ${totalRaised ?? 0}
        </Heading>
      </div>
      <div>
        <BodyText size="normal" className="text-dark-70">
          Total Earned
        </BodyText>
        <Heading level={2} className="text-dark-70">
          ${totalEarned ?? 0}
        </Heading>
      </div>
      {onCreatePoolClicked ? (
        <div className="col-start-4 self-center">
          <Button>Create Pool</Button>
        </div>
      ) : null}
    </div>
  );
}
