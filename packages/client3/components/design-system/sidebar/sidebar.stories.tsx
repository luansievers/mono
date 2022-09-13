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

const Template: ComponentStory<typeof SideBar> = (args) => {
  return <SideBar {...args} />;
};

export const SideBarWithArtistPoolSelectedStory: ComponentStory<
  typeof SideBar
> = Template.bind({});

SideBarWithArtistPoolSelectedStory.args = {
  labels: ["All Artists Pools", "My Profile", "Transactions"],

  states: {
    isState1Selected: true,
    state1: "Artist",
    state2: "Backer",
  },

  width: 176,
  height: 59.66,
};

SideBarWithArtistPoolSelectedStory.parameters = {
  nextRouter: {
    pathname: "/All Artists Pools",
  },
};

export const SideBarWithMyProfileSelectedStory: ComponentStory<typeof SideBar> =
  Template.bind({});

SideBarWithMyProfileSelectedStory.args = {
  ...SideBarWithArtistPoolSelectedStory.args,
};

SideBarWithMyProfileSelectedStory.parameters = {
  nextRouter: {
    pathname: "/My Profile",
  },
};

export const SideBarWithTransactionsSelectedStory: ComponentStory<
  typeof SideBar
> = Template.bind({});

SideBarWithTransactionsSelectedStory.args = {
  ...SideBarWithArtistPoolSelectedStory.args,
};

SideBarWithTransactionsSelectedStory.parameters = {
  nextRouter: {
    pathname: "/Transactions",
  },
};

export const SideBarWithNoSelectionStory: ComponentStory<typeof SideBar> =
  Template.bind({});

SideBarWithNoSelectionStory.args = {
  ...SideBarWithArtistPoolSelectedStory.args,
};
