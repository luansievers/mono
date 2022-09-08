import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Avatar } from ".";

export default {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {},
} as ComponentMeta<typeof Avatar>;

export const AvatarStory: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);
AvatarStory.args = {
  size: 44,
  src: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
