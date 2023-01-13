import axios from "axios";

import { Contract } from "@/lib/contracts";
import { UIDType } from "@/lib/verify";
import { getLastEventArgs } from "@/utilities/contract.util";

const JUNIOR_FEE_PERCENT = "20";
const INTEREST_APR = "50000000000000000000000";
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
  UIDType.isGoListed,
];

/**
 * @param goldfinchFactory - GoldfinchFactory contract
 * @param limit - string - limit of pool
 * @param borrowerContract - string - borrower contract address
 * @Promise void
 */
export const createPool = async (
  goldfinchFactory: Contract<"GoldFinchFactory">,
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
 * @param account - address of account for which the borrower contract will be created for.
 * @Promise ContractReceipt - transaction receipt of granting borrower privileges
 */
export const createBorrowerContract = async (
  goldfinchFactory: Contract<"GoldFinchFactory">,
  account: string
): Promise<string> => {
  const role = await goldfinchFactory.isBorrower();

  if (!role) {
    throw new Error("You are not an admin or borrower");
  }

  const borrowerContract = await (
    await goldfinchFactory.createBorrower(account)
  ).wait();

  const lastEvent = getLastEventArgs(borrowerContract);

  return lastEvent.borrower;
};

export const mergeGraphAndMetaData = (graphDatas: any, metaData: any) => {
  return metaData.map((poolData: any) => {
    const graphData = graphDatas.find(
      (pool: any) => pool.id == poolData.poolAddress
    );
    return {
      ...graphData,
      ...poolData,
    };
  });
};

/**
 * Locks the Junior Capital of the Tranched Pool
 * @param borrowerFactory - Borrower contract
 * @param poolAddress - string - pool address
 * @Promise ContractReceipt - transaction receipt of locking junior capital
 */
export const lockJuniorCapital = async (
  borrowerFactory: Contract<"Borrower">,
  poolAddress: string
) => {
  const receipt = await (
    await borrowerFactory?.lockJuniorCapital(poolAddress)
  ).wait();
  return receipt;
};

/**
 * Locks the Tranched Pool so money can be withdrawn.
 * @param borrowerFactory - Borrower contract
 * @param poolAddress - string - pool address
 * @Promise ContractReceipt - transaction receipt of locking junior capital
 */
export const lockPool = async (
  borrowerFactory: Contract<"Borrower">,
  poolAddress: string
) => {
  const receipt = await (await borrowerFactory?.lockPool(poolAddress)).wait();
  return receipt;
};
