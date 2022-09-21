import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BigNumber } from "ethers";

import { SupportedCrypto } from "@/lib/graphql/generated";

import { PoolCard } from "./index";

export default {
  title: "FAD/Components/Dashboard/PoolCard",
  component: PoolCard,
  argTypes: {
    type: {
      options: ["completed", "failed", ""],
    },
  },
} as ComponentMeta<typeof PoolCard>;

export const PoolCardStory: ComponentStory<typeof PoolCard> = (args) => {
  return <PoolCard {...args} />;
};

PoolCardStory.args = {
  image:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAdUlEQVR42mNgGAWjAAj+48GUG37i92+cmFJL/hMDKLHkv1TeVYKYIgvwBQ81gommFvxHtqB0797/6BbCxMixAGzA7AcPUFyJzEcWI9sHxAQP1YIIGWPzCVUjeehbQLN8gK2wG1o+oElpSiiIqFoXUKuCoboFAP+MJG7jSOWlAAAAAElFTkSuQmCC",
  totalSuppliedAmount: {
    amount: BigNumber.from(0),
    token: SupportedCrypto.Usdc,
  },
  totalGoalAmount: {
    amount: BigNumber.from(0),
    token: SupportedCrypto.Usdc,
  },
  artistName: "Tom Smith",
  poolName: "Techno Collab",
  type: "completed",
};
