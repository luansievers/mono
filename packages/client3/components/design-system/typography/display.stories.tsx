import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Display } from ".";

export default {
  title: "FAD/Components/General/Typography",
  component: Display,
} as ComponentMeta<typeof Display>;

export const DisplayStory: ComponentStory<typeof Display> = (args) => (
  <Display {...args} />
);
DisplayStory.args = { level: 1, children: "Some text" };
