import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Caption } from ".";

export default {
  title: "FAD/Components/General/Typography",
  component: Caption,
} as ComponentMeta<typeof Caption>;

export const CaptionStory: ComponentStory<typeof Caption> = (args) => {
  return <Caption {...args} />;
};
CaptionStory.args = {
  children: "Caption",
};
