import { FormState, UseFormRegister } from "react-hook-form";

import { Heading, BodyText, Input } from "@/components/design-system";
import { IPool } from "@/types/pool";

type Props = {
  formState: FormState<IPool>;
  register: UseFormRegister<IPool>;
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
        {...register("terms.raiseTarget", { required: true })}
        className="col-span-3"
        name="terms.raiseTarget"
        inputMode="text"
        placeholder="Revenue, Equity, etc."
        errorMessage={errors?.terms?.raiseTarget?.message}
      />
    </>
  );
}

export default CreatePoolTerms;
