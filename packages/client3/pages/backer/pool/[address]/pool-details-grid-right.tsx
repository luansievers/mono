import { Button, Icon, Link, Tooltip } from "@/components/design-system";
import { PoolDocuments } from "@/components/pool/pool-documents";
import { PoolInformation } from "@/components/pool/pool-information";
import { PoolTerms } from "@/components/pool/pool-terms";
import { Pool } from "@/lib/graphql/generated";

import { BackerWithdrawCard } from "./backer-withdraw-card";

type Props = {
  poolData: Partial<Pool>;
  tranchedPoolData?: any; //TODO: Typing needs to be added later
};

const ToolTipInformation = () => (
  <div className="max-w-xs">
    <div className="mb-4 text-xl font-bold text-dark-80">
      How do I get the revenue and perks promised?
    </div>
    <div>
      KYC verifies everyone’s identity & reduces fraud in the platform. Learn
      more&nbsp;
      <Link
        href={
          "https://drive.google.com/file/d/1K0CAAACatYbfRkx4IRMwYa1ZNg9_RAf0/view"
        }
      >
        here
      </Link>
    </div>
  </div>
);

function PoolDetailsRightGrid({ poolData, tranchedPoolData }: Props) {
  const terms = poolData?.terms;
  return (
    <>
      {tranchedPoolData ? (
        <>
          <PoolInformation
            totalSuppliedAmount={tranchedPoolData.juniorDeposited.toNumber()}
            totalGoalAmount={tranchedPoolData.creditLine.maxLimit.toNumber()}
            totalBackers={tranchedPoolData.numBackers}
            totalEarned={tranchedPoolData.juniorDeposited.toNumber()}
            closingDate={new Date(poolData.closingDate ?? "")}
            allowedUidTypes={tranchedPoolData.allowedUidTypes}
            remainingJuniorCapacity={tranchedPoolData.remainingJuniorCapacity}
            tranchedPoolAddress={tranchedPoolData.id}
          />

          {tranchedPoolData.tokens ? (
            <BackerWithdrawCard
              backerTokenInformation={tranchedPoolData.tokens}
              tranchedPoolData={tranchedPoolData}
              poolAddress={tranchedPoolData.id}
            />
          ) : null}
        </>
      ) : null}

      <Tooltip placement="bottom-start" content={<ToolTipInformation />}>
        <button className="w-full text-left">
          <PoolTerms terms={terms} />
          <Icon name="InfoCircleOutlined" className="ml-2" />
        </button>
      </Tooltip>

      <PoolDocuments />
    </>
  );
}

export default PoolDetailsRightGrid;
