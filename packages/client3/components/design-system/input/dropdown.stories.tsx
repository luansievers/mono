import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DropDown } from "./dropdown";

export default {
  component: DropDown,
  title: "FAD/Components/General/Input",
} as ComponentMeta<typeof DropDown>;

export const DropDownStory: ComponentStory<typeof DropDown> = (args) => {
  return <DropDown {...args} />;
};

DropDownStory.args = {
  placeHolder: "Enter NFT Number",
  options: ["Option 1", "Option 2", "Option 3"],
  onChange: (value) => console.log(value),
};
