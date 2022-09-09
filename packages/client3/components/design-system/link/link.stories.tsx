import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Link } from ".";

export default {
  title: "FAD/Components/Link",
  component: Link,
  argTypes: {},
} as ComponentMeta<typeof Link>;

export const LinkStory: ComponentStory<typeof Link> = (args) => (
  <Link {...args} />
);
LinkStory.args = { href: "#", children: "Some link", noUnderline: false };
