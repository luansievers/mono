import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BackersList } from "./index";
/**
 * Dummy Data to be used for now
 * Needs to be replaced with proper data
 */
const DummyBackersListData = [
  {
    name: "Wilson Herwitz",
    profileImageUrl: "string",
  },
  {
    name: "0xzasdsdsd23a7",
    profileImageUrl: "string",
  },
  {
    name: "0x11343423d9",
    profileImageUrl: "string",
  },
  {
    name: "Nolan Philips",
    profileImageUrl: "string",
  },
  {
    name: "Madelyn Bothman",
    profileImageUrl: "string",
  },
  {
    name: "0x11343423d9",
    profileImageUrl: "string",
  },
].flatMap((backer) => {
  return Array.from(Array(10).keys()).map(() => {
    return {
      ...backer,
      name: `${backer.name} ${(
        Date.now() + Math.floor(Math.random() * 10000)
      ).toString(36)}`,
    };
  });
});
export default {
  title: "FAD/Components/Pool/Backers List",
  component: BackersList,
} as ComponentMeta<typeof BackersList>;

export const BackerListStory: ComponentStory<typeof BackersList> = (args) => {
  return <BackersList {...args} />;
};

BackerListStory.args = {
  backersList: DummyBackersListData,
};
