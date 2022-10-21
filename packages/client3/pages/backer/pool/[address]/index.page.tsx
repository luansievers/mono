import { useQuery } from "@apollo/client";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";

import { Button, Heading } from "@/components/design-system";
import { useLayoutContext } from "@/hooks/sidebar-hooks";
import { cryptoToFloat } from "@/lib/format";
import { SupportedCrypto } from "@/lib/graphql/generated";
import { backerPool } from "@/queries/backer.queries";

import PoolDetail from "./pool-details";
import PoolDetailsRightGrid from "./pool-details-grid-right";

function ArtistPoolPage() {
  const { title } = useLayoutContext();
  const router = useRouter();
  const { address } = router.query;

  const { data, error, loading } = useQuery(backerPool, {
    variables: {
      address: (address as string) + "-2",
      fetchPolicy: "network-only",
    },
  });
  if (error || loading) {
    return (
      <div className="text-2xl">
        Unable to load the specified tranched pool.
      </div>
    );
  }

  const poolType = (data?.juniorTrancheInfo.lockedUntil as BigNumber).isZero()
    ? undefined
    : data?.juniorTrancheInfo.principalDeposited.gte(
        data?.juniorTrancheInfo.tranchedPool.creditLine.maxLimit
      )
    ? "completed"
    : "failed";
  let totalSuppliedAmount = data?.juniorTrancheInfo.principalDeposited;
  totalSuppliedAmount = {
    token: SupportedCrypto.Usdc,
    amount: totalSuppliedAmount,
  };
  totalSuppliedAmount = cryptoToFloat(totalSuppliedAmount);
  let totalGoalAmount =
    data?.juniorTrancheInfo.tranchedPool.creditLine.maxLimit;
  totalGoalAmount = {
    token: SupportedCrypto.Usdc,
    amount: totalGoalAmount,
  };
  totalGoalAmount = cryptoToFloat(totalGoalAmount);

  return (
    <>
      <Button
        buttonType="tertiary"
        onClick={() => router.back()}
        iconLeft="CaretLeft"
      >
        {title}
      </Button>
      <div className="mb-10 px-4">
        <Heading level={1} className="text-white">
          {data?.juniorTrancheInfo.tranchedPool.name}
        </Heading>
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-4 px-4">
            <PoolDetail
              artistDesc={data?.juniorTrancheInfo.tranchedPool.borrower.bio}
              artistImage={data?.juniorTrancheInfo.tranchedPool.borrower.logo}
              artistName={data?.juniorTrancheInfo.tranchedPool.borrower.name}
              discordURL={""}
              twitterURL={data?.juniorTrancheInfo.tranchedPool.borrower.twitter}
              poolDetail={data?.juniorTrancheInfo.tranchedPool.description}
              poolImage={data?.juniorTrancheInfo.tranchedPool.icon}
              backers={data?.juniorTrancheInfo.tranchedPool.backers}
            />
          </div>
          <div className="col-span-2">
            {/* TODO: Not sure what info to put in projectGoal and raisedTarget */}
            <PoolDetailsRightGrid
              projectGoal="11"
              raisedTarget="21"
              tranchedPoolAddress={address as string}
              totalBackers={data?.juniorTrancheInfo.tranchedPool.numBackers}
              totalGoalAmount={totalGoalAmount}
              totalSuppliedAmount={totalSuppliedAmount}
              remainingJuniorCapacity={
                data?.juniorTrancheInfo.tranchedPool.remainingJuniorCapacity
              }
              allowedUidTypes={
                data?.juniorTrancheInfo.tranchedPool.allowedUidTypes
              }
              type={poolType}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistPoolPage;
