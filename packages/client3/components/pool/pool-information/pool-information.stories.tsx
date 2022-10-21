import { ComponentStory, ComponentMeta } from "@storybook/react";
import { utils } from "ethers";

import { USDC_DECIMALS } from "@/constants";

import { PoolInformation } from "./index";

export default {
  title: "FAD/Components/Pool/Pool Information",
  component: PoolInformation,
} as ComponentMeta<typeof PoolInformation>;

export const PoolInformationStory: ComponentStory<typeof PoolInformation> = (
  args
) => {
  return <PoolInformation {...args} />;
};

PoolInformationStory.args = {
  closingDate: new Date(2100, 1, 1),
  totalBackers: 2,
  totalGoalAmount: 10000,
  totalSuppliedAmount: 1000,
  tranchedPoolAddress: "0xeabdc184471a6edba7b4a9a4c94ad2343b70fd8b",
  remainingJuniorCapacity: utils.parseUnits("200000", USDC_DECIMALS),
};
