import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from ".";
import { SocialMediaButton } from "./social-media-button";

export default {
  title: "FAD/Components/General/Button",
  component: Button,
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
} as ComponentMeta<typeof Button>;

export const ButtonStory: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

ButtonStory.args = {
  children: "Button",
  disabled: false,
  buttonType: "primary",
};

export const SocialMediaButtonStory: ComponentStory<typeof Button> = (args) => (
  <SocialMediaButton {...args} />
);

SocialMediaButtonStory.args = {
  children: "Button",
};
