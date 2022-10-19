/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { addDays } from "date-fns";
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form";

import {
  BodyText,
  DollarInput,
  Input,
  TextArea,
  DatePicker,
  Caption,
} from "@/components/design-system";
import { FileUpload } from "@/components/design-system/file-upload";
import { IPool } from "@/types/pool";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IPool, any>;
  register: UseFormRegister<IPool>;
  formState: FormState<IPool>;
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
        {...register("poolName", { required: "Pool name is required" })}
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
        errorMessage={errors.poolName?.message}
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
              minDate={addDays(new Date(), 1)}
              maxDate={addDays(new Date(), 365)}
            />
          );
        }}
      />
      <BodyText className="my-3 text-white" size="normal">
        Project Detail
      </BodyText>
      <TextArea
        {...register("projectDetail", {
          required: "Project Details is required",
        })}
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
        <FileUpload
          className="col-span-3"
          name="projectCoverImage"
          errorMessage={errors.projectCoverImage?.message}
        />
        <Caption className="text-dark-50">
          Default image if no image is uploaded
        </Caption>
        <img
          src="https://dweb.link/ipfs/QmduRx2iWPj7ychRb8r8Y9ru9BvY8FJKuuDsrzu9ZjjRbM"
          className={clsx("rounded-md", "h-[90px] w-[150px]", "object-fill")}
          alt=""
        />
      </div>
    </>
  );
}

export default CreatePoolDetailEntry;
