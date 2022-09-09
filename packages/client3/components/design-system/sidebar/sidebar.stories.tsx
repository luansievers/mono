import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SideBar } from ".";

export default {
  title: "FAD/Components/Sidebar",
  component: SideBar,
  argTypes: {
    labels: {
      control: {
        type: "array",
      },
    },
  },
} as ComponentMeta<typeof SideBar>;

export const SideBarStory: ComponentStory<typeof SideBar> = (args) => {
  return <SideBar {...args} />;
};

SideBarStory.args = {
  labels: ["All Artists Pools", "My Profile", "Transactions"],

  states: {
    selectedState: true,
    state1: "Artist",
    state2: "Backer",
  },
  pathName: "/My Profile",
  storyBookMode: "http://localhost:3001/free_artist_logo_full.png",
};
