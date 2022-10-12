import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NotConnected } from "./index";

export default {
  title: "FAD/Components/General/States",
  component: NotConnected,
} as ComponentMeta<typeof NotConnected>;

export const NotConnectedStory: ComponentStory<typeof NotConnected> = (
  args
) => <NotConnected {...args} />;
NotConnectedStory.args = {
  children: "Please connect your wallet to view your dashboard",
};
