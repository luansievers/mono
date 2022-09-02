import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RadioButton } from "./radiobutton";

export default {
  component: RadioButton,
  title: "Components/Input/RadioButton",
} as ComponentMeta<typeof RadioButton>;

export const RadioButtonStory: ComponentStory<typeof RadioButton> = (args) => (
  <RadioButton {...args} />
);

RadioButtonStory.args = {
  name: "rb",
  disabled: false,
  checked: false,
};
