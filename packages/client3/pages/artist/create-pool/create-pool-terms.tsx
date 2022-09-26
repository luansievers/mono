import { FormState, UseFormRegister } from "react-hook-form";

import { Heading, BodyText, Input } from "@/components/design-system";

import { FormFields } from "./create-pool-form";

type Props = {
  formState: FormState<FormFields>;
  register: UseFormRegister<FormFields>;
};

function CreatePoolTerms({ formState: { errors }, register }: Props) {
  return (
    <>
      <Heading className="my-auto text-white" level={4}>
        Terms
      </Heading>
      <BodyText size="medium" className="col-span-3 my-auto text-light-40">
        This term has to be match with your term sheet
      </BodyText>

      <BodyText className="my-auto text-white" size="normal">
        Project Goal
      </BodyText>
      <Input
        {...register("terms.projectGoal", { required: true })}
        className="col-span-3"
        name="terms.projectGoal"
        inputMode="text"
        placeholder="Single, EP, Album, ect."
        errorMessage={errors?.terms?.projectGoal?.message}
      />
      <BodyText className="my-auto text-white" size="normal">
        Raised Target
      </BodyText>
      <Input
        {...register("terms.raisedTarget", { required: true })}
        className="col-span-3"
        name="terms.raisedTarget"
        inputMode="text"
        placeholder="Revenue, Equity, etc."
        errorMessage={errors?.terms?.raisedTarget?.message}
      />
    </>
  );
}

export default CreatePoolTerms;
