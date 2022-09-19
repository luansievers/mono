import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BigNumber } from "ethers";

import { SupportedCrypto } from "@/lib/graphql/generated";

import { PoolCard } from "./index";

export default {
  title: "FAD/Components/Dashboard/PoolCard",
  component: PoolCard,
  argTypes: {
    totalSuppliedAmount: {
      type: "number",
    },
    totalGoalAmount: {
      type: "number",
    },
    type: {
      options: ["completed", "failed", ""],
    },
  },
} as ComponentMeta<typeof PoolCard>;

export const PoolCardStory: ComponentStory<typeof PoolCard> = (args) => {
  const totalSuppliedAmountParam = args.totalSuppliedAmount;
  const totalGoalAmountParam = args.totalGoalAmount;
  return (
    <PoolCard
      {...args}
      totalSuppliedAmount={{
        token: SupportedCrypto.Usdc,
        amount: BigNumber.from(totalSuppliedAmountParam),
      }}
      totalGoalAmount={{
        token: SupportedCrypto.Usdc,
        amount: BigNumber.from(totalGoalAmountParam),
      }}
    />
  );
};
