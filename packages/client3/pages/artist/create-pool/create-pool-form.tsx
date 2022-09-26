import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Form } from "@/components/design-system";
import { Divider } from "@/components/design-system/divider";
import { UploadedFileType } from "@/components/upload-pdf";

import CreatePoolDetailEntry from "./create-pool-detail-entry";
import CreatePoolDocumentUpload from "./create-pool-document-upload";
import CreatePoolTerms from "./create-pool-terms";

export interface FormFields {
  poolName: string;
  goalAmount: string;
  closingDate: Date;
  projectDetail: string;
  projectCoverImage: string;
  pdfDocuments: {
    poolContractPdf: UploadedFileType;
    termSheetPdf: UploadedFileType;
    proposalPdf: UploadedFileType;
  };
  terms: {
    projectGoal: string;
    raisedTarget: string;
  };
}

function CreatePoolForm() {
  const rhfMethods = useForm<FormFields>({ mode: "onSubmit" });
  const { control, register, formState } = rhfMethods;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    //Dummy method
    const response = await axios.post(`/api/pool`, {
      params: data,
    });
  };
  console.log(formState);

  return (
    <Form rhfMethods={rhfMethods} onSubmit={onSubmit}>
      <div className="grid grid-cols-4 gap-y-6 px-64">
        <CreatePoolDetailEntry
          control={control}
          register={register}
          formState={formState}
        />

        <Divider className="col-span-4" />

        <CreatePoolDocumentUpload control={control} />

        <Divider className="col-span-4" />

        <CreatePoolTerms formState={formState} register={register} />
      </div>

      <div className="float-right my-10 flex gap-x-2 px-64">
        <Button buttonType="tertiary">Cancel</Button>
        <Button type="submit">Submit Proposal</Button>
      </div>
    </Form>
  );
}

export default CreatePoolForm;
