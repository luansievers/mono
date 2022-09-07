import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FreeArtistsLogo } from ".";

export default {
  title: "Components/Logo",
  component: FreeArtistsLogo,
  argTypes: {
    storyBookMode: {
      control: {
        type: "text",
      },
    },
    src: {
      control: {
        type: "text",
      },
    },
    width: {
      control: {
        type: "text",
      },
    },
    height: {
      control: {
        type: "text",
      },
    },
    alt: {
      control: {
        type: "text",
      },
    },
  },
} as ComponentMeta<typeof FreeArtistsLogo>;

export const LogoStory: ComponentStory<typeof FreeArtistsLogo> = () => {
  return <FreeArtistsLogo className="h-10 w-10" />;
};
