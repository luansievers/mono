import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Toggle } from "./toggle";

export default {
  title: "FAD/Components/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

export const ToggleStory: ComponentStory<typeof Toggle> = (args) => (
  <Toggle {...args} />
);

let value = true;
ToggleStory.args = {
  onChange: () => {
    value = !value;
  },
  states: {
    isState1Selected: value,
    state1: "Backer",
    state2: "Artist",
  },
};
