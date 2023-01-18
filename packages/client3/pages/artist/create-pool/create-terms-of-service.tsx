//import { Control, Controller } from "react-hook-form";
import { FormState, UseFormRegister } from "react-hook-form";

import {
  Heading,
  BodyText,
  Caption,
  Icon,
  Link,
  Checkbox,
} from "@/components/design-system";
import { IPool } from "@/types/pool";

type Props = {
  formState: FormState<IPool>;
  register: UseFormRegister<IPool>;
};

function OnServiceAcceptance({ formState: { errors }, register }: Props) {
  // const onAcceptance = async (
  // ) => {
  // };
  return (
    <>
      <Heading className="text-white" level={4}>
        Terms
      </Heading>
      <BodyText className="col-span-3 my-auto text-white" size="normal">
        Please accept the{" "}
        <Link
          target="_blank"
          href="https://firebasestorage.googleapis.com/v0/b/free-artists.appspot.com/o/Terms%20of%20Service%20-%20Free-Artists.pdf?alt=media&token=1b9cabdb-dad5-43e8-9d18-9a1e549ee31d"
        >
          Terms of Service
        </Link>{" "}
        to create a pool.
      </BodyText>
      <Heading className="text-white" level={4}></Heading>
      <Caption className="col-span-3 my-auto text-dark-50">
        <Checkbox
          {...register("termAgreement", { required: true })}
          name="termAgreement"
          errorLabel={errors?.termAgreement?.message}
        />
        By accepting the Terms of Service, you are agreeing to the Free Artist{" "}
        <Link
          className="text-dark-50"
          href="https://firebasestorage.googleapis.com/v0/b/free-artists.appspot.com/o/Privacy%20Policy%20-%20Free-Artists.pdf?alt=media&token=a6ac66ef-781e-4dc6-9af3-d9a211cfabb7"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          className="text-dark-50"
          href="https://firebasestorage.googleapis.com/v0/b/free-artists.appspot.com/o/Risks%20-%20Free-Artists.pdf?alt=media&token=55b9330b-05d3-459d-ad46-8e9f4103eaf6"
        >
          Risks
        </Link>
        .
      </Caption>
    </>
  );
}

export default OnServiceAcceptance;
