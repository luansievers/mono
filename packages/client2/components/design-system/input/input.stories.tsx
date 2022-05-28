import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useForm } from "react-hook-form";

import { Input, DollarInput } from ".";
import { Listbox } from "./listbox";

export default {
  component: Input,
  title: "Components/Input",
} as ComponentMeta<typeof Input>;

export const InputStory: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
);

InputStory.args = {
  label: "Name",
  placeholder: "John Doe",
  colorScheme: "light",
  textSize: "md",
};

export const DollarInputStory: ComponentStory<typeof DollarInput> = (args) => {
  const { control, setValue, handleSubmit } = useForm<{ amount: string }>();
  return (
    <form onSubmit={handleSubmit((data) => alert(`Amount: ${data.amount}`))}>
      <div className="mb-4">
        It is important to keep in mind that the DollarInput component is an
        adapted controlled input, and as such it can only be used alongside
        React Hook Form, not by itself. This is considered a best-practice for
        input elements in this project regardless.
      </div>
      <DollarInput
        control={control}
        onMaxClick={() => setValue("amount", "1000000")}
        {...args}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

DollarInputStory.args = {
  label: "Dollar amount",
  name: "amount",
};

const options = [
  { value: "iams", label: "Iams" },
  { value: "tlc", label: "TLC Pet Food" },
  { value: "pugsnax", label: "Pugsnax" },
];

export const ListboxStory: ComponentStory<typeof Listbox> = (args) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    petfood: string;
  }>(); // You can set { defaultValues: { petfood: "tlc" } } here if you want a default value
  const food = watch("petfood");
  // eslint-disable-next-line no-console
  console.log({ food });
  return (
    <form
      onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
      className={
        args.colorScheme === "light"
          ? "bg-white"
          : "dark"
          ? "bg-black text-white"
          : undefined
      }
    >
      <p>
        This story is meant to illustrate how to use this Listbox component with
        React Hook Form. Please refer to the source code.
      </p>
      <Listbox
        {...args}
        options={options}
        control={control}
        rules={{ required: "Required" }}
        errorMessage={errors?.petfood?.message}
        name="petfood"
        placeholder="Choose a pet food..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

ListboxStory.args = {
  label: "Pet food",
};
