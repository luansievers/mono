import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RadioButton } from "./radiobutton";

export default {
  component: RadioButton,
  title: "FAD/Components/Input",
} as ComponentMeta<typeof RadioButton>;

export const RadioButtonStory: ComponentStory<typeof RadioButton> = (args) => (
  <RadioButton {...args} />
);

RadioButtonStory.args = {
  name: "radioButton",
  disabled: false,
  checked: false,
};
