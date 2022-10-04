import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TextArea } from ".";

export default {
  component: TextArea,
  title: "FAD/Components/General/Input",
} as ComponentMeta<typeof TextArea>;

export const TextAreaStory: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

TextAreaStory.args = {
  placeholder: "Text Here",
  textSize: "md",
};
