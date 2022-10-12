import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Form } from "@/components/design-system";
import { Divider } from "@/components/design-system/divider";
import { UploadedFileType } from "@/components/upload-pdf";
import { useWallet } from "@/lib/wallet"; // add wallet address

import CreatePoolDetailEntry from "./create-pool-detail-entry";
import CreatePoolDocumentUpload from "./create-pool-document-upload";
import CreatePoolTerms from "./create-pool-terms";

export interface IPool {
  walletAddress: string;
  poolAddress: string;
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
    raiseTarget: string;
  };
}

export enum reviewStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
}

function CreatePoolForm() {
  const rhfMethods = useForm<IPool>({
    mode: "onSubmit",
    shouldFocusError: true,
  });
  const { control, register, formState } = rhfMethods;
  const router = useRouter();
  const { account } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<IPool> = async (data) => {
    setIsLoading(true);
    await axios.post(`/api/pool`, {
      params: {
        ...data,
        reviewStatus: reviewStatus.PENDING,
        walletAddress: account,
        closingDate: new Date(data.closingDate.setHours(0, 0, 0, 0)),
      },
    });
    router.push("/artist/dashboard");
    setIsLoading(false);
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

        <CreatePoolDocumentUpload control={control} />

        <Divider className="col-span-4" />

        <CreatePoolTerms formState={formState} register={register} />
      </div>

      <div className="float-right my-10 flex gap-x-2 px-64">
        <Button
          buttonType="tertiary"
          onClick={() => {
            router.push("/artist/dashboard");
          }}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={{ isLoading }}>
          Submit Proposal
        </Button>
      </div>
    </Form>
  );
}

export default CreatePoolForm;
