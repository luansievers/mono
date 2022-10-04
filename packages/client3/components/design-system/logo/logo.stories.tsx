import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FreeArtistsLogo } from ".";

export default {
  title: "FAD/Components/General/Logo",
  component: FreeArtistsLogo,
} as ComponentMeta<typeof FreeArtistsLogo>;

export const LogoStory: ComponentStory<typeof FreeArtistsLogo> = (args) => {
  return <FreeArtistsLogo {...args} />;
};

LogoStory.args = {
  width: 100,
  height: 100,
  className: "",
};
