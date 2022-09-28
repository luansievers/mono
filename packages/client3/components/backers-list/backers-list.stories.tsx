import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BackersList, DummyBackersListData } from "./index";

export default {
  title: "FAD/Components/Pool/BackersList",
  component: BackersList,
} as ComponentMeta<typeof BackersList>;

export const BackerListStory: ComponentStory<typeof BackersList> = (args) => {
  return <BackersList {...args} />;
};

BackerListStory.args = {
  backersList: DummyBackersListData,
};
