import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BigNumber } from "ethers";

import { SupportedCrypto } from "@/lib/graphql/generated";

import { DashBoardTotal } from "./index";

export default {
  title: "FAD/Components/Dashboard/Total",
  component: DashBoardTotal,
} as ComponentMeta<typeof DashBoardTotal>;

export const DashBoardTotalWithButtonStory: ComponentStory<
  typeof DashBoardTotal
> = (args) => {
  return <DashBoardTotal {...args} />;
};

DashBoardTotalWithButtonStory.args = {
  totalEarnedAmount: {
    amount: BigNumber.from(20000),
    token: SupportedCrypto.Usdc,
  },
  totalRaisedAmount: {
    amount: BigNumber.from(232323),
    token: SupportedCrypto.Usdc,
  },
  onCreatePoolClicked: () => {
    //Empty comment to prevent ESLint errors
  },
};

export const DashBoardTotalWithoutButtonStory: ComponentStory<
  typeof DashBoardTotal
> = (args) => {
  return <DashBoardTotal {...args} />;
};

DashBoardTotalWithoutButtonStory.args = {
  totalEarnedAmount: {
    amount: BigNumber.from(0),
    token: SupportedCrypto.Usdc,
  },
  totalRaisedAmount: {
    amount: BigNumber.from(0),
    token: SupportedCrypto.Usdc,
  },
  onCreatePoolClicked: undefined,
};
