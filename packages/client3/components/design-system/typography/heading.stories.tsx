import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Heading } from ".";

export default {
  title: "Components/Typography",
  component: Heading,
  argTypes: {
    as: {
      control: {
        type: null,
      },
    },
  },
} as ComponentMeta<typeof Heading>;

export const HeadingStory: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
);
HeadingStory.args = { level: 1, medium: false, children: "Some text" };
