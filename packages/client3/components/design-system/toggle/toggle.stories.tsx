import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Toggle } from "./toggle";

export default {
  component: Toggle,
  title: "Components/Toggle",
} as ComponentMeta<typeof Toggle>;

export const ToggleStory: ComponentStory<typeof Toggle> = (args) => (
  <Toggle {...args} />
);

let value = true;
ToggleStory.args = {
  onChange: () => {
    value = !value;
  },
  value: value,
  states: {
    true: "Backer",
    false: "Artist",
  },
};
