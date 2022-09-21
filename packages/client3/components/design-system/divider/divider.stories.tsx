import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Divider } from ".";

export default {
  title: "FAD/Components/Divider",
  component: Divider,
  argTypes: {},
} as ComponentMeta<typeof Divider>;

export const LinkStory: ComponentStory<typeof Divider> = () => <Divider />;
