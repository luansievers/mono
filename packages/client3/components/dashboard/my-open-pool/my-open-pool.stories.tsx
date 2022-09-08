import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MyOpenPool } from "./index";

export default {
  title: "FAD/Components/Dashboard/MyOpenPool",
  component: MyOpenPool,
} as ComponentMeta<typeof MyOpenPool>;

export const UnverifiedStateStory: ComponentStory<typeof MyOpenPool> = (
  args
) => {
  return <MyOpenPool {...args} />;
};

UnverifiedStateStory.args = {
  isVerified: true,
  onButtonClick: () => {
    //Empty function comment to prevent eslint error
  },
};
