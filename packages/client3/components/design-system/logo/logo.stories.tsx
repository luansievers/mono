import { Story, Meta } from "@storybook/react";

import { FreeArtistsLogo } from ".";

export default {
  title: "Components/Logo",
  component: FreeArtistsLogo,
} as Meta;

export const LogoStory: Story<typeof FreeArtistsLogo> = () => {
  return <FreeArtistsLogo className="h-10 w-10" />;
};
