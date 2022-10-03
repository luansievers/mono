import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Form } from "@/components/design-system";
import { Divider } from "@/components/design-system/divider";
import { UploadedFileType } from "@/components/upload-pdf";
import { useContract } from "@/lib/contracts";
import { useWallet } from "@/lib/wallet"; // add wallet address

import CreatePoolDetailEntry from "./create-pool-detail-entry";
import CreatePoolDocumentUpload from "./create-pool-document-upload";
import CreatePoolTerms from "./create-pool-terms";

export interface FormFields {
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
    raisedTarget: string;
  };
}

function CreatePoolForm() {
  const rhfMethods = useForm<FormFields>({
    mode: "onSubmit",
    shouldFocusError: true,
  });
  const { control, register, formState } = rhfMethods;
  const router = useRouter();
  const { account } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const BORROWER = "0x2D0113824068e9c5fc106772abC583BF8e19597A";
  const GOLDFINCH_FACTORY = "0xc2872Dc1AC3da8e8074685b86Fb80522182Ef564";
  const JUNIOR_FEE_PERCENT = "20";
  const LIMIT = "10000000000";
  const INTEREST_APR = "50000000000000000"; // 5% APR
  const PAYMENT_PERIOD_IN_DAYS = "10";
  const TERM_IN_DAYS = "365";
  const LATE_FEE_APR = "0";
  const PRINCIPAL_GRACE_PERIOD_IN_DAYS = "185";
  const FUNDABLE_AT = "0";
  const ALLOWED_UID = [0];
  const goldfinchFactory = useContract(
    "GoldfinchFactory",
    "0xd20508E1E971b80EE172c73517905bfFfcBD87f9"
  );

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsLoading(true);
    const receipt = await goldfinchFactory?.createPool(
      BORROWER,
      JUNIOR_FEE_PERCENT,
      LIMIT,
      INTEREST_APR,
      PAYMENT_PERIOD_IN_DAYS,
      TERM_IN_DAYS,
      LATE_FEE_APR,
      PRINCIPAL_GRACE_PERIOD_IN_DAYS,
      FUNDABLE_AT,
      ALLOWED_UID
    );
    console.log("Receipt", receipt);
    // await axios.post(`/api/pool`, {
    //   params: {
    //     ...data,
    //     walletAddress: account,
    //     closingDate: new Date(data.closingDate.setHours(0, 0, 0, 0)),
    //   },
    // });
    router.push("/artist/dashboard");
    setIsLoading(false);
  };

  return (
    <Form rhfMethods={rhfMethods} onSubmit={onSubmit}>
      {/* <div className="grid grid-cols-4 gap-y-6 px-64">
        <CreatePoolDetailEntry
          control={control}
          register={register}
          formState={formState}
        />

        <Divider className="col-span-4" />

        <CreatePoolDocumentUpload control={control} />

        <Divider className="col-span-4" />

        <CreatePoolTerms formState={formState} register={register} />
      </div> */}

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
