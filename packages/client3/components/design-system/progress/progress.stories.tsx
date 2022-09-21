import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Progress } from "./index";

export default {
  title: "FAD/Components/Progress",
  component: Progress,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
} as ComponentMeta<typeof Progress>;

export const ProgressStory: ComponentStory<typeof Progress> = (args) => {
  return <Progress {...args} />;
};

ProgressStory.args = {
  type: "completed",
  percentage: 50,
};
