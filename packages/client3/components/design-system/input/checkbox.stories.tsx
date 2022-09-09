import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Checkbox } from "./checkbox";

export default {
  component: Checkbox,
  title: "FAD/Components/Input",
} as ComponentMeta<typeof Checkbox>;

export const CheckboxStory: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

CheckboxStory.args = {
  name: "checkbox",
  disabled: false,
  checked: false,
};
