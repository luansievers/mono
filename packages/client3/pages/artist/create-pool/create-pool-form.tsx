import axios from "axios";
import { utils } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Form } from "@/components/design-system";
import { Divider } from "@/components/design-system/divider";
import { USDC_DECIMALS } from "@/constants";
import { useWallet } from "@/lib/wallet"; // add wallet address
import { IPool } from "@/types/pool";

import CreatePoolDetailEntry from "./create-pool-detail-entry";
import CreatePoolDocumentUpload from "./create-pool-document-upload";
import CreatePoolTerms from "./create-pool-terms";
import OnServiceAcceptance from "./create-terms-of-service";

export enum ReviewStatus {
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
        goalAmount: utils.parseUnits(data.goalAmount, USDC_DECIMALS).toString(),
        reviewStatus: ReviewStatus.PENDING,
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

        <OnServiceAcceptance formState={formState} register={register} />

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
