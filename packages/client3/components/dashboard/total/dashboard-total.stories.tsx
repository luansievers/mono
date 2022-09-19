import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BigNumber } from "ethers";

import { SupportedCrypto } from "@/lib/graphql/generated";

import { DashboardTotal } from "./index";

export default {
  title: "FAD/Components/Dashboard/Total",
  component: DashboardTotal,
} as ComponentMeta<typeof DashboardTotal>;

export const DashboardTotalWithButtonStory: ComponentStory<
  typeof DashboardTotal
> = (args) => {
  return <DashboardTotal {...args} />;
};

DashboardTotalWithButtonStory.args = {
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

export const DashboardTotalWithoutButtonStory: ComponentStory<
  typeof DashboardTotal
> = (args) => {
  return <DashboardTotal {...args} />;
};

DashboardTotalWithoutButtonStory.args = {
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
