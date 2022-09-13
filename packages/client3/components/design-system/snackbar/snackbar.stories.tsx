import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Snackbar } from ".";
import { SnackbarType } from "./types";

export default {
  title: "FAD/Components/Snackbar",
  component: Snackbar,
} as ComponentMeta<typeof Snackbar>;

export const SnackbarStory: ComponentStory<typeof Snackbar> = (args) => {
  return <Snackbar {...args} />;
};

SnackbarStory.args = {
  message: "Snackbar message",
  type: SnackbarType.PROCESS,
  onClose: handleClose,
};

function handleClose() {
  console.log("Snackbar closed");
}
