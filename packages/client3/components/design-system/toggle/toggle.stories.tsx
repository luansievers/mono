import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Toggle, UserType } from "./toggle";

export default {
  component: Toggle,
  title: "Components/Toggle",
} as ComponentMeta<typeof Toggle>;

export const ToggleStory: ComponentStory<typeof Toggle> = (args) => (
  <Toggle {...args} />
);

ToggleStory.args = {
  user: UserType.ARTIST,
};
