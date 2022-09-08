import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NotConnected } from "./index";

export default {
  title: "Components/NotConnected",
  component: NotConnected,
} as ComponentMeta<typeof NotConnected>;

export const NotConnectedStory: ComponentStory<typeof NotConnected> = () => {
  return (
    <NotConnected
      onConnectWalletClick={() => {
        //Empty function comment to prevent eslint error
      }}
    />
  );
};
