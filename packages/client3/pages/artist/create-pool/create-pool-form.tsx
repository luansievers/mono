import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Form } from "@/components/design-system";
import { Divider } from "@/components/design-system/divider";

import CreatePoolDetailEntry from "./create-pool-detail-entry";
import CreatePoolDocumentUpload from "./create-pool-document-upload";
import CreatePoolTerms from "./create-pool-terms";

export interface FormFields {
  poolName: string;
  goalAmount: string;
  closingDate: Date;
  projectDetail: string;
}

function CreatePoolForm() {
  const rhfMethods = useForm<FormFields>({ mode: "onSubmit" });
  const { control, register, formState } = rhfMethods;

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    //TODO
    data;
  };

  return (
    <Form rhfMethods={rhfMethods} onSubmit={onSubmit}>
      <div className="grid grid-cols-4 gap-y-6 px-64">
        <CreatePoolDetailEntry
          control={control}
          register={register}
          formState={formState}
        />

        <Divider className="col-span-4" />

        <CreatePoolDocumentUpload />

        <Divider className="col-span-4" />

        <CreatePoolTerms />
      </div>

      <div className="float-right my-10 flex gap-x-2 px-64">
        <Button buttonType="tertiary">Cancel</Button>
        <Button type="submit">Submit Proposal</Button>
      </div>
    </Form>
  );
}

export default CreatePoolForm;
