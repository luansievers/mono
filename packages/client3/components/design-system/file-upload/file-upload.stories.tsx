import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FileUpload } from ".";

export default {
  title: "FAD/Components/File Upload",
  component: FileUpload,
} as ComponentMeta<typeof FileUpload>;

export const FileUploadStory: ComponentStory<typeof FileUpload> = (args) => (
  <FileUpload {...args} />
);

FileUploadStory.args = {
  errorMessage: "Error message",
};
