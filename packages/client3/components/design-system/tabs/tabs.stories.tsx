import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Heading } from "../typography";
import { TabButton, TabContent, TabGroup, TabList, TabPanels } from "./tabs";

export default {
  title: "FAD/Components/Tabs",
  component: TabGroup,
} as ComponentMeta<typeof TabGroup>;

export const StatStory: ComponentStory<typeof TabGroup> = () => {
  return (
    <TabGroup>
      <TabList>
        <TabButton>
          <Heading level={4}>Open</Heading>
        </TabButton>
        <TabButton>
          <Heading level={4}>Closed</Heading>
        </TabButton>
      </TabList>
      <TabPanels>
        <TabContent>Content 1</TabContent>
        <TabContent>Content 2</TabContent>
      </TabPanels>
    </TabGroup>
  );
};
