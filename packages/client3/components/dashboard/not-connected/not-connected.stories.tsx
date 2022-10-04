import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NotConnected } from "./index";

export default {
  title: "FAD/Components/Dashboard/States",
  component: NotConnected,
} as ComponentMeta<typeof NotConnected>;

export const NotConnectedStory: ComponentStory<typeof NotConnected> = () => {
  return <NotConnected />;
};
