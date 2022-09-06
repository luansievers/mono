import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LinkButton } from ".";

export default {
  title: "Components/Button",
  component: LinkButton,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} as ComponentMeta<typeof LinkButton>;

export const LinkButtonStory: ComponentStory<typeof LinkButton> = (args) => (
  <LinkButton {...args} />
);

LinkButtonStory.args = {
  children: "Button",
  disabled: false,
  buttonType: "primary",
  href: "www.google.com",
};
