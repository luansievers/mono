import { Web3Provider } from "@ethersproject/providers";
import { ContractReceipt, ContractTransaction } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";

import { Contract } from "@/lib/contracts";
import { fetchKycStatus, getSignatureForKyc, IKYCStatus } from "@/lib/verify";
import { User } from "@/types/user";

const BORROWER_ROLE = keccak256(toUtf8Bytes("BORROWER_ROLE"));

// ! NOTE: Below is the code to grant owner privileges:
const OWNER_ROLE = keccak256(toUtf8Bytes("OWNER_ROLE"));

export const hasUid = (user?: User) => {
  return Boolean(
    user?.isGoListed ||
      user?.isUsNonAccreditedIndividual ||
      user?.isNonUsIndividual ||
      user?.isUsEntity ||
      user?.isNonUsEntity ||
      user?.isUsAccreditedIndividual
  );
};

/**
 *
 * @param account - GoldfinchFactory contract
 * @param provider - address of borrower
 * @param user - user object
 * @Promise ContractReceipt - transaction receipt of granting borrower privileges
 */
export const getKYCStatus = async (
  account: string,
  provider: Web3Provider,
  user: User
): Promise<User | IKYCStatus> => {
  if (hasUid(user)) {
    return user;
  } else {
    const signature = await getSignatureForKyc(provider);
    const kycStatus: IKYCStatus = await fetchKycStatus(
      account,
      signature.signature,
      signature.signatureBlockNum
    );
    return kycStatus;
  }
};

/**
 * @param goldfinchFactory - GoldfinchFactory contract
 * @param account - address of borrower
 * @Promise ContractTransaction - transaction receipt of granting borrower privileges
 */
export const grantAccountBorrowerPrivileges = async (
  goldfinchFactory: Contract<"GoldfinchFactory">,
  account: string
): Promise<ContractTransaction> => {
  // ! NOTE: Below is the code to grant owner privileges:
  // return await goldfinchFactory.grantRole(
  //   OWNER_ROLE,
  //   account
  // );
  return await goldfinchFactory.grantRole(BORROWER_ROLE, account);
};
