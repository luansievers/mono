import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FileUpload } from ".";

export default {
  title: "FAD/Components/File Upload",
  component: FileUpload,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} as ComponentMeta<typeof FileUpload>;

export const FileUploadStory: ComponentStory<typeof FileUpload> = (args) => (
  <FileUpload {...args} />
);

FileUploadStory.args = {
  errorMessage: "Error message",
};
