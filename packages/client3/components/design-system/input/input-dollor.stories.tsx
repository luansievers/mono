import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useForm } from "react-hook-form";

import { DollarInput } from "./dollar-input";

export default {
  component: DollarInput,
  title: "FAD/Components/DollarInput",
} as ComponentMeta<typeof DollarInput>;

export const DollarInputStory: ComponentStory<typeof DollarInput> = (args) => {
  const { control, setValue, handleSubmit } = useForm<{ amount: string }>();
  return (
    <form onSubmit={handleSubmit((data) => alert(`Amount: ${data.amount}`))}>
      <DollarInput
        control={control}
        onMaxClick={() => setValue("amount", "1000000")}
        {...args}
      />
    </form>
  );
};

DollarInputStory.args = {
  placeholder: "Enter goal amount",
  name: "amount",
};
