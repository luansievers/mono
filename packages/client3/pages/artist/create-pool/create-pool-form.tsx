import axios from "axios";
import BN from "bn.js";
import { BigNumber, ContractReceipt } from "ethers";
import { Result } from "ethers/lib/utils";
import hre, { ethers } from "hardhat";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "@nomiclabs/hardhat-ethers";

import { Button, Form } from "@/components/design-system";
import { Divider } from "@/components/design-system/divider";
import { UploadedFileType } from "@/components/upload-pdf";
import { useContract } from "@/lib/contracts";
import { useWallet } from "@/lib/wallet"; // add wallet address
import { TranchedPool } from "@/types/ethers-contracts";

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
// export type Log = {
//   blockNumber: number;
//   blockHash: string;
//   transactionHash: string;
//   transactionIndex: number;
//   logIndex: number;
//   removed: boolean;
//   address: string;
//   topics: string[];
//   data: string;
// };
// export type Receipt = {
//   from: string;
//   transactionHash: string;
//   blockHash: string;
//   blockNumber: number;
//   transactionIndex: number;
//   cumulativeGasUsed: BigNumber | string | number;
//   gasUsed: BigNumber | string | number;
//   contractAddress?: string;
//   to?: string;
//   logs?: Log[];
//   events?: any[];
//   logsBloom?: string;
//   byzantium?: boolean;
//   status?: number;
//   confirmations?: number;
// };

// export type Libraries = { [libraryName: string]: string };

// export type Facet = {
//   facetAddress: string;
//   functionSelectors: string[];
// };

// export type FacetCut = Facet & {
//   action: FacetCutAction;
// };

// export enum FacetCutAction {
//   Add,
//   Replace,
//   Remove,
// }
// export interface Deployment {
//   address: string;
//   abi: any[];
//   receipt?: Receipt;
//   transactionHash?: string;
//   history?: Deployment[];
//   implementation?: string;
//   args?: any[];
//   linkedData?: any;
//   solcInputHash?: string;
//   metadata?: string;
//   bytecode?: string;
//   deployedBytecode?: string;
//   libraries?: Libraries;
//   userdoc?: any;
//   devdoc?: any;
//   methodIdentifiers?: any;
//   diamondCut?: FacetCut[];
//   facets?: Facet[];
//   storageLayout?: any;
//   gasEstimates?: any;
// }

export function assertNonNullable<T>(
  val: T | null | undefined,
  errorMessage?: string
): asserts val is NonNullable<T> {
  if (val === null || val === undefined) {
    console.log("Pool is undefined", errorMessage);
    throw new Error(errorMessage);
  }
}
// function isTestEnv() {
//   return process.env.NODE_ENV === "test";
// }

// async function getDeployedAsEthersContractOrNull<T>(
//   getter: (name: string) => Promise<Deployment | null>,
//   name: string
// ): Promise<T | null> {
//   const {
//     deployments: { log: logger },
//   } = hre;

//   logger("📡 Trying to get the deployed version of...", name);
//   let deployed = await getter(name);
//   if (!deployed && isTestEnv()) {
//     deployed = await getter(`Test${name}`);
//   }
//   if (deployed) {
//     return await toEthers<T>(deployed as Parameters<typeof toEthers>[0]);
//   } else {
//     return null;
//   }
// }

// async function getDeployedAsEthersContract<T>(
//   getter: (name: string) => Promise<Deployment | null>,
//   name: string
// ): Promise<T> {
//   const deployed = await getDeployedAsEthersContractOrNull<T>(getter, name);
//   if (deployed) {
//     return deployed;
//   } else {
//     throw new Error("Contract is not deployed");
//   }
// }

function getLastEventArgs(result: ContractReceipt): Result {
  const events = result.events;
  assertNonNullable(events);
  const lastEvent = events[events.length - 1];
  assertNonNullable(lastEvent);
  assertNonNullable(lastEvent.args);
  return lastEvent.args;
}
const INTEREST_DECIMALS = new BN(String(1e18));

function interestAprAsBN(interestPercentageString: string): BN {
  const interestPercentageFloat = parseFloat(interestPercentageString);
  return new BN(String(interestPercentageFloat * 100000))
    .mul(INTEREST_DECIMALS)
    .div(new BN(10000000));
}
const USDCDecimals = new BN(String(1e6));

// async function getProtocolOwner(): Promise<string> {
//   const chainId = 31337;
//   const { protocol_owner } = await getNamedAccounts();
//   if (isMainnetForking()) {
//     return SAFE_CONFIG[MAINNET_CHAIN_ID].safeAddress;
//   } else if (chainId === LOCAL_CHAIN_ID) {
//     assertIsString(protocol_owner);
//     return protocol_owner;
//   } else if (SAFE_CONFIG[chainId]) {
//     return SAFE_CONFIG[chainId].safeAddress;
//   } else {
//     throw new Error(`Unknown owner for chain id ${chainId}`);
//   }
// }

function CreatePoolForm() {
  const rhfMethods = useForm<FormFields>({
    mode: "onSubmit",
    shouldFocusError: true,
  });
  const { control, register, formState } = rhfMethods;
  const router = useRouter();
  const { account } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const BORROWER = "0x108cc3833cd49333a7908e4bb52f4cf8f4090425";
  const juniorFeePercent = String(new BN(20));
  const limit = String(new BN(10000).mul(USDCDecimals));
  const interestApr = String(interestAprAsBN("5.00"));
  const paymentPeriodInDays = String(new BN(30));
  const termInDays = String(new BN(360));
  const lateFeeApr = String(new BN(0));
  const principalGracePeriodInDays = String(new BN(185));
  const fundableAt = String(new BN(0));
  // const protocol_owner = await getProtocolOwner();
  // const underwriterSigner = ethers.provider.getSigner(underwriter);
  const goldfinchFactory = useContract(
    "GoldfinchFactory",
    "0xd20508E1E971b80EE172c73517905bfFfcBD87f9"
  );

  const onSubmit: SubmitHandler<FormFields> = async (data): Promise<void> => {
    setIsLoading(true);

    try {
      const receipt = await (
        await goldfinchFactory!
          // .connect(underwriterSigner)
          .createPool(
            BORROWER,
            juniorFeePercent,
            limit,
            interestApr,
            paymentPeriodInDays,
            termInDays,
            lateFeeApr,
            principalGracePeriodInDays,
            fundableAt,
            [0]
          )
      ).wait();
      console.log("Receipt", receipt);
      const lastEventArgs = getLastEventArgs(receipt);
      console.log("Last event args", lastEventArgs);
      const poolAddress = lastEventArgs[0];
      console.log("Pool address", poolAddress);

      // const poolContract = await getDeployedAsEthersContract<TranchedPool>(
      //   getOrNull,
      //   "TranchedPool"
      // );
    } catch (error) {
      console.log(error);
    }

    // await axios.post(`/api/pool`, {
    //   params: {
    //     ...data,
    //     walletAddress: account,
    //     closingDate: new Date(data.closingDate.setHours(0, 0, 0, 0)),
    //   },
    // });
    // router.push("/artist/dashboard");
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
