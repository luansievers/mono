import axios from "axios";
import { ContractReceipt } from "ethers";

import { CONTRACT_ADDRESSES } from "@/constants";
import { Contract } from "@/lib/contracts";

const JUNIOR_FEE_PERCENT = "20";
const INTEREST_APR = "50000000000000000"; // 5% APR
const PAYMENT_PERIOD_IN_DAYS = "10";
const TERM_IN_DAYS = "365";
const LATE_FEE_APR = "0";
const PRINCIPAL_GRACE_PERIOD_IN_DAYS = "185";
const FUNDABLE_AT = "0";
const ALLOWED_UID = [0];

export const createPool = async (
  goldfinchFactory: Contract<"GoldfinchFactory">,
  limit: string,
  borrowerContract: string
) => {
  const receipt = await (
    await goldfinchFactory?.createPool(
      borrowerContract,
      // CONTRACT_ADDRESSES.Borrower,
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

export const updatePoolTransactionHash = async (
  poolId: string,
  receipt: ContractReceipt
) => {
  return (
    await axios.patch(`/api/pool/${poolId}`, {
      transactionHash: receipt.transactionHash,
    })
  ).data;
};
