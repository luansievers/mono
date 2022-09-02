import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Checkbox } from "./checkbox";

export default {
  component: Checkbox,
  title: "Components/Input/Checkbox",
} as ComponentMeta<typeof Checkbox>;

export const CheckboxStory: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

CheckboxStory.args = {
  name: "pug",
  disabled: false,
  checked: false,
};
