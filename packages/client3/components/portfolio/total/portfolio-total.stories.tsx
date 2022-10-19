import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BigNumber } from "ethers";

import { SupportedCrypto } from "@/lib/graphql/generated";

import { PortfolioTotal } from "./index";

export default {
  title: "FAD/Components/Portfolio/Total",
  component: PortfolioTotal,
} as ComponentMeta<typeof PortfolioTotal>;

export const PortfolioTotalStory: ComponentStory<typeof PortfolioTotal> = (
  args
) => {
  return <PortfolioTotal {...args} />;
};

PortfolioTotalStory.args = {
  totalEarnedAmount: {
    amount: BigNumber.from(20000),
    token: SupportedCrypto.Usdc,
  },
  totalRaisedAmount: {
    amount: BigNumber.from(232323),
    token: SupportedCrypto.Usdc,
  },
  totalContributedPools: 10,
};
