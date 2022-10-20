import axios from "axios";

import { Contract } from "@/lib/contracts";
import { UIDType } from "@/lib/verify";

const JUNIOR_FEE_PERCENT = "20";
const INTEREST_APR = "50000000000000000"; // 5% APR
const PAYMENT_PERIOD_IN_DAYS = "10";
const TERM_IN_DAYS = "365";
const LATE_FEE_APR = "0";
const PRINCIPAL_GRACE_PERIOD_IN_DAYS = "185";
const FUNDABLE_AT = "0";
const ALLOWED_UID = [
  UIDType.NonUSIndividual,
  UIDType.NonUSEntity,
  UIDType.USEntity,
  UIDType.USNonAccreditedIndividual,
  UIDType.USAccreditedIndividual,
];

/**
 * @param goldfinchFactory - GoldfinchFactory contract
 * @param limit - string - limit of pool
 * @param borrowerContract - string - borrower contract address
 * @Promise void
 */
export const createPool = async (
  goldfinchFactory: Contract<"GoldfinchFactory">,
  limit: string,
  borrowerContract: string
) => {
  const receipt = await (
    await goldfinchFactory?.createPool(
      borrowerContract,
      JUNIOR_FEE_PERCENT,
      limit,
      INTEREST_APR,
      PAYMENT_PERIOD_IN_DAYS,
      TERM_IN_DAYS,
      LATE_FEE_APR,
      PRINCIPAL_GRACE_PERIOD_IN_DAYS,
      FUNDABLE_AT,
      ALLOWED_UID
    )
  )?.wait();
  return receipt;
};

/**
 * @param poolId - string - pool id
 * @param receipt - ContractReceipt - transaction receipt
 * @Promise void
 */
export const updatePoolAddress = async (
  poolId: string,
  poolAddress: string
) => {
  return await axios.patch(`/api/pool/${poolId}`, {
    poolAddress: poolAddress,
  });
};

/**
 * @param poolId - poolId - pool id
 * @param borrowerContractAddress string - transaction receipt
 * @Promise ContractReceipt - transaction receipt of granting borrower privileges
 */
export const updatePoolBorrowerContractAddress = async (
  poolId: string,
  borrowerContractAddress: string
): Promise<void> => {
  return (
    await axios.patch(`/api/pool/${poolId}`, {
      borrowerContractAddress: borrowerContractAddress,
    })
  ).data;
};

/**
 * @param goldfinchFactory - GoldfinchFactory contract
 * @param account - address of borrower
 * @Promise ContractReceipt - transaction receipt of granting borrower privileges
 */
export const createBorrowerContract = async (
  goldfinchFactory: Contract<"GoldfinchFactory">,
  account: string
): Promise<string> => {
  const role = await goldfinchFactory.isBorrower();

  if (!role) {
    throw new Error("You are not an admin or borrower");
  }

  const borrowerContract = await (
    await goldfinchFactory.createBorrower(account)
  ).wait();

  return borrowerContract.events?.[3].args?.borrower.toLowerCase();
};
