import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BodyText } from ".";

export default {
  title: "Components/Typography",
  component: BodyText,
} as ComponentMeta<typeof BodyText>;

export const BodyTextStory: ComponentStory<typeof BodyText> = (args) => (
  <BodyText {...args} />
);
BodyTextStory.args = { size: "large", children: "Some text" };
