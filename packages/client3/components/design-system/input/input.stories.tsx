import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Input } from ".";

export default {
  component: Input,
  title: "FAD/Components/Input",
} as ComponentMeta<typeof Input>;

export const InputStory: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
);

InputStory.args = {
  placeholder: "Text Here",
  textSize: "md",
};
