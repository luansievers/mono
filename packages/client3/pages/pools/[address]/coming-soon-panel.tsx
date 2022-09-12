import { differenceInDays, format } from "date-fns";

import { LinkButton } from "@/components/design-system";
import type { TranchedPool } from "@/lib/graphql/generated";

interface ComingSoonPanelProps {
  fundableAt: TranchedPool["fundableAt"];
}

export default function ComingSoonPanel({ fundableAt }: ComingSoonPanelProps) {
  if (fundableAt.isZero()) {
    return <></>;
  }

  const date = new Date(fundableAt.toNumber() * 1000);
  const difference = differenceInDays(date, new Date());

  return (
    <div className="border-sand-200 flex flex-col rounded-xl border text-center ">
      <div className="px-5 py-10">
        <div className="mb-5 text-xl">
          This pool will open on{" "}
          <span className="font-semibold text-sky-700">
            {format(date, "MMMM d, y")}
          </span>
        </div>

        <div className="text-[7.5rem] font-semibold leading-none text-sky-700">
          {difference === 0 ? "Today" : difference}
        </div>

        {difference !== 0 && <div>{difference === 1 ? "Day" : "Days"}</div>}
      </div>

      <div className="border-sand-200 bg-sand-50 border-t px-5 py-10">
        <p className="mx-5 mb-5">
          Subscribe to be the first to hear about new pool launches
        </p>
        <LinkButton
          iconRight="ArrowTopRight"
          href="https://bit.ly/backer-updates"
          className="w-full"
        >
          Subscribe
        </LinkButton>
      </div>
    </div>
  );
}
