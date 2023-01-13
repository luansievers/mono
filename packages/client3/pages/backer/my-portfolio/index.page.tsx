import { useQuery } from "@apollo/client";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";

import { PoolCard } from "@/components/dashboard/pool-card";
import {
  BodyText,
  ButtonType,
  Caption,
  Heading,
  Link,
  LinkButton,
  Tooltip,
} from "@/components/design-system";
import { NotConnected } from "@/components/general/not-connected";
import { PortfolioTotal } from "@/components/portfolio/total";
import { useSelectedSidebarItem, useLayoutTitle } from "@/hooks/sidebar-hooks";
import { SupportedCrypto } from "@/lib/graphql/generated";
import { useWallet } from "@/lib/wallet";
import { MyPortfolioPools } from "@/queries/backer.queries";

const ToolTipInformation = () => (
  <div className="max-w-xs">
    <div className="mb-4 text-xl font-bold text-dark-80">
      Why do I need to KYC?
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

function BackerPortfolioPage() {
  useSelectedSidebarItem("my-portfolio");
  useLayoutTitle("My Portfolio");
  const router = useRouter();

  const totalEarnedAmount = {
    amount: BigNumber.from(20000), //TODO: Not sure what this value should be
    token: SupportedCrypto.Usdc,
  };
  const totalRaisedAmount = {
    amount: BigNumber.from(232323), //TODO: Not sure what this value should be
    token: SupportedCrypto.Usdc,
  };

  const { account } = useWallet();

  const { data } = useQuery(MyPortfolioPools, {
    variables: {
      userAccount: account?.toLowerCase(),
      fetchPolicy: "network-only",
    },
  });

  const pools = data?.user?.tranchedPoolTokens;

  const openTranchedPools =
    pools?.filter((pool: any) =>
      (pool.tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
    ) || [];

  const closedTranchedPools =
    pools?.filter(
      (pool: any) =>
        !(pool.tranchedPool.juniorTranches[0].lockedUntil as BigNumber).isZero()
    ) || [];

  if (!account) {
    return (
      <NotConnected>
        Please connect your wallet to view your portfolio
      </NotConnected>
    );
  }

  const handleClick = (poolAddress: string) => {
    router.push(`/backer/pool/${poolAddress}`);
  };

  return (
    <>
      <Heading level={5} medium={true} className="mb-6 text-white">
        My contributed pool progress
      </Heading>
      <PortfolioTotal
        totalContributedPools={
          openTranchedPools.length + closedTranchedPools.length
        }
        totalEarnedAmount={totalEarnedAmount}
        totalRaisedAmount={totalRaisedAmount}
      />

      <div className="mb-5 mt-10 flex">
        <Tooltip placement="bottom-start" content={<ToolTipInformation />}>
          <button>
            <Heading className="w-96 flex-1 text-white" level={5} medium={true}>
              My Open Pools TEST
            </Heading>
          </button>
        </Tooltip>

        <Caption className="ml-32 flex-1 text-center">
          Total Contributed
        </Caption>
        <Caption className="flex-1 text-center">Status</Caption>
        <Caption className="mr-11 w-60 flex-none text-right">Progress</Caption>
      </div>
      {openTranchedPools.length == 0 ? (
        <div className="grid place-items-center rounded-[10px] bg-green-100 py-16">
          <BodyText size="large" className="pb-[24px] text-dark-50">
            Your open pool is empty, explore Artists pools to contribute!
          </BodyText>
          <LinkButton
            buttonType={ButtonType.SECONDARY}
            href="/backer/all-artist-pools"
          >
            Explore Artist Pools
          </LinkButton>
        </div>
      ) : (
        <>
          {openTranchedPools.map((pool: any) => (
            <PoolCard
              key={pool.tranchedPool.id}
              className="mb-10"
              poolName={pool.tranchedPool.name}
              totalSuppliedAmount={{
                token: SupportedCrypto.Usdc,
                amount: BigNumber.from(
                  pool.tranchedPool?.juniorTranches[0].principalDeposited
                ),
              }}
              totalGoalAmount={{
                token: SupportedCrypto.Usdc,
                amount: pool.tranchedPool.creditLine.maxLimit, //90% - not sure if this is the correct field
              }}
              artistName={pool.tranchedPool.borrower.name}
              image={pool.tranchedPool.borrower.logo}
              onClick={() => handleClick(pool.tranchedPool.id)}
            />
          ))}
        </>
      )}

      {closedTranchedPools.length > 0 ? (
        <>
          <div className="mb-5 mt-10 flex">
            <Heading className="w-96 flex-1 text-white" level={5} medium={true}>
              My Closed Pools
            </Heading>
            <Caption className="ml-32 flex-1 text-center">
              Total Contributed
            </Caption>
            <Caption className="flex-1 text-center">Status</Caption>
            <Caption className="mr-11 w-60 flex-none text-right">
              Progress
            </Caption>
          </div>
          {closedTranchedPools.map((pool: any) => (
            <PoolCard
              key={pool.tranchedPool.id}
              className="mb-10"
              poolName={pool.tranchedPool.name}
              type="completed"
              totalSuppliedAmount={{
                token: SupportedCrypto.Usdc,
                amount: BigNumber.from(
                  pool.tranchedPool?.juniorTranches[0].principalDeposited
                ),
              }}
              totalGoalAmount={{
                token: SupportedCrypto.Usdc,
                amount: pool.tranchedPool.creditLine.maxLimit, //90% - not sure if this is the correct field
              }}
              artistName={pool.tranchedPool.borrower.name}
              image={pool.tranchedPool.borrower.logo}
              onClick={() => handleClick(pool.tranchedPool.id)}
            />
          ))}
        </>
      ) : undefined}
    </>
  );
}

export default BackerPortfolioPage;
