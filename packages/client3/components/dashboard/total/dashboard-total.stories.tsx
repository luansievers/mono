import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DashBoardTotal } from "./index";

export default {
  title: "Components/Dashboard/Total",
  component: DashBoardTotal,
} as ComponentMeta<typeof DashBoardTotal>;

export const DashBoardTotalStory: ComponentStory<typeof DashBoardTotal> = (
  args
) => {
  return <DashBoardTotal {...args} />;
};

DashBoardTotalStory.args = {
  totalEarned: 20000,
  totalRaised: 232323,
  onCreatePoolClicked: undefined,
};
