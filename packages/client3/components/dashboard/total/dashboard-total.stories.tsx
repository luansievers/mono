import { ComponentStory, ComponentMeta } from "@storybook/react";

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
  totalEarned: 20000,
  totalRaised: 232323,
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
  totalEarned: 0,
  totalRaised: 0,
  onCreatePoolClicked: undefined,
};
