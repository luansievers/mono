import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SideBar } from ".";

export default {
  title: "Components/Sidebar",
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
  value: true,
  states: {
    true: "Artist",
    false: "Backer",
  },
  pathName: "/artistprofile",
  storyBookMode: "http://localhost:3001/free_artist_logo_full.png",
};
