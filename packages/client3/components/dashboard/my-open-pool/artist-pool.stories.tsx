import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ArtistPool } from "./index";

export default {
  title: "FAD/Components/Dashboard/ArtistPool",
  component: ArtistPool,
} as ComponentMeta<typeof ArtistPool>;

export const UnverifiedStateStory: ComponentStory<typeof ArtistPool> = (
  args
) => {
  return <ArtistPool {...args} />;
};

UnverifiedStateStory.args = {
  isVerified: false,
  onButtonClick: () => {
    //Empty function comment to prevent eslint error
  },
};

export const VerifiedStateStory: ComponentStory<typeof ArtistPool> = (args) => {
  return <ArtistPool {...args} />;
};

VerifiedStateStory.args = {
  isVerified: true,
  onButtonClick: () => {
    //Empty function comment to prevent eslint error
  },
};
