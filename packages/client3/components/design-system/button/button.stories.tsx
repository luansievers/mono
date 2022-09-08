import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from ".";

export default {
  title: "FAD/Components/Button",
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
