import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form";

import {
  BodyText,
  DollarInput,
  Icon,
  Input,
  TextArea,
  DatePicker,
} from "@/components/design-system";
import { FileUpload } from "@/components/design-system/file-upload";

import { FormFields } from "./create-pool-form";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FormFields, any>;
  register: UseFormRegister<FormFields>;
  formState: FormState<FormFields>;
};

function CreatePoolDetailEntry({
  control,
  register,
  formState: { errors },
}: Props) {
  return (
    <>
      <BodyText className="my-auto text-white" size="normal">
        Pool Name
      </BodyText>
      <Input
        {...register("poolName", { required: true })}
        className="col-span-3"
        name="poolName"
        inputMode="text"
        placeholder="Enter your pool name"
        errorMessage={errors.poolName?.message}
      />
      <BodyText className="my-auto text-white" size="normal">
        Goal Amount
      </BodyText>
      <DollarInput
        className="col-span-3"
        control={control}
        name="goalAmount"
        inputMode="text"
        placeholder="Enter goal amount"
      />
      <BodyText className="my-auto text-white" size="normal">
        Closing Date
      </BodyText>
      <Controller
        name={"closingDate"}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              className="col-span-3"
              onChange={onChange}
              selected={value}
              placeholderText="MM/DD/YYYY"
              errorMessage={errors.closingDate?.message}
            />
          );
        }}
      />
      <BodyText className="my-3 text-white" size="normal">
        Project Detail
      </BodyText>
      <TextArea
        {...register("projectDetail", { required: true })}
        outerClassName="col-span-3"
        className="resize-none"
        name="projectDetail"
        inputMode="text"
        placeholder="Describe your project details"
        textSize="md"
        rows={5}
        errorMessage={errors.projectDetail?.message}
      />
      <BodyText className="my-3 text-white" size="normal">
        Project Cover Image
      </BodyText>
      <div className="col-span-3">
        <FileUpload name="poolName" />
        <BodyText
          size="normal"
          className="mt-2 flex items-center gap-x-2 text-accent-1"
        >
          <Icon size="lg" name="PlusCircle" />
          Add Additional Media(Photo, Video or Audio)
        </BodyText>
      </div>
    </>
  );
}

export default CreatePoolDetailEntry;
