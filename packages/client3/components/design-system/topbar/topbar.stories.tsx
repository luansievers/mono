import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TopBar } from "./index";

export default {
  title: "FAD/Components/General/TopBar",
  component: TopBar,
  argTypes: {
    topBarTitle: {
      control: {
        type: "text",
      },
    },
  },
} as ComponentMeta<typeof TopBar>;

export const TopBarStory: ComponentStory<typeof TopBar> = (args) => {
  return <TopBar {...args} />;
};

TopBarStory.args = {
  topBarTitle: "All Artist Pools",
  avatarUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAdUlEQVR42mNgGAWjAAj+48GUG37i92+cmFJL/hMDKLHkv1TeVYKYIgvwBQ81gommFvxHtqB0797/6BbCxMixAGzA7AcPUFyJzEcWI9sHxAQP1YIIGWPzCVUjeehbQLN8gK2wG1o+oElpSiiIqFoXUKuCoboFAP+MJG7jSOWlAAAAAElFTkSuQmCC",
};
