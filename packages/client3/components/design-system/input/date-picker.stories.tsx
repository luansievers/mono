import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Controller, useForm } from "react-hook-form";

import { DatePicker } from "./date-picker";

export default {
  component: DatePicker,
  title: "FAD/Components/General/Input",
} as ComponentMeta<typeof DatePicker>;

export const DatePickerInputStory: ComponentStory<typeof DatePicker> = (
  args
) => {
  const { control } = useForm<{
    closingDate: Date;
  }>();
  return (
    <Controller
      name={"closingDate"}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <DatePicker
            className="col-span-3"
            {...args}
            onChange={onChange}
            selected={value}
            placeholderText="MM/DD/YYYY"
          />
        );
      }}
    />
  );
};
DatePickerInputStory.args = {
  helperText: "This is a test helper text",
};
