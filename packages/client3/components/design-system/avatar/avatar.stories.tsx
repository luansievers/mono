import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Avatar } from ".";

export default {
  title: "FAD/Components/Avatar",
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

export const AvatarStory: ComponentStory<typeof Avatar> = (args) => {
  return <Avatar {...args} />;
};

AvatarStory.args = {
  image:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAdUlEQVR42mNgGAWjAAj+48GUG37i92+cmFJL/hMDKLHkv1TeVYKYIgvwBQ81gommFvxHtqB0797/6BbCxMixAGzA7AcPUFyJzEcWI9sHxAQP1YIIGWPzCVUjeehbQLN8gK2wG1o+oElpSiiIqFoXUKuCoboFAP+MJG7jSOWlAAAAAElFTkSuQmCC",
  link: "https://goldfinch.finance/",
  size: 11,
};
