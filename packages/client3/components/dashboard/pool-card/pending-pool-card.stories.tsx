import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Pool_Status_Type } from "@/lib/graphql/generated";

import { PendingPoolCard } from "./index";

export default {
  title: "FAD/Components/Dashboard/Pool List",
  component: PendingPoolCard,
} as ComponentMeta<typeof PendingPoolCard>;

const Template: ComponentStory<typeof PendingPoolCard> = (args) => {
  return <PendingPoolCard {...args} />;
};

export const ApprovedPoolCardStory: ComponentStory<typeof PendingPoolCard> =
  Template.bind({});

ApprovedPoolCardStory.args = {
  artistName: "x23223sdjs23423mxfnmdsfn",
  poolName: "Approved Pool",
  statusType: Pool_Status_Type.Approved,
};

export const InReviewPoolCardStory: ComponentStory<typeof PendingPoolCard> =
  Template.bind({});

InReviewPoolCardStory.args = {
  artistName: "x23223sdjs23423mxfnmdsfn",
  poolName: "In Review Pool",
  statusType: Pool_Status_Type.InReview,
};
