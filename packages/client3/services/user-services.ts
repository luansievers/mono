import type { Web3Provider } from "@ethersproject/providers";
import { ContractReceipt, ContractTransaction } from "ethers";
import { keccak256 } from "ethers/lib/utils";

import { Contract } from "@/lib/contracts";
import { fetchKycStatus, getSignatureForKyc, IKYCStatus } from "@/lib/verify";
import { User } from "@/types/user";

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

export const getKYCStatus = async (
  account: string,
  provider: Web3Provider,
  user?: User
) => {
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

export const createBorrower = async (
  goldfinchFactory: Contract<"GoldfinchFactory">,
  uniqueIdentity: Contract<"UniqueIdentity">,
  account: string
): Promise<ContractReceipt> => {
  const role = await goldfinchFactory.isBorrower();

  console.log("role", role);

  // if (!role) {
  //   const roleGranted = setBorrowerPrivileges(account, uniqueIdentity);
  //   console.log("Grant Role", roleGranted);
  // }
  const borrowerContract = await (
    await goldfinchFactory.createBorrower(account)
  ).wait();
  console.log("borrowerContract", borrowerContract);
  const privileges = borrowerContract.events?.[3].args?.borrower.toLowerCase();

  const BORROWER_ROLE =
    "0x2344277e405079ec07749d374ba0b5862a4e45a6a05ac889dbb4a991c6f9354d";

  const test = await goldfinchFactory.hasRole(BORROWER_ROLE, privileges);
  console.log("priviliges on borrowerCon", test);

  return privileges;
};

const setBorrowerPrivileges = async (
  account: string,
  uniqueIdentity: Contract<"UniqueIdentity">
): Promise<ContractTransaction> => {
  // const owner = keccak256("OWNER_ROLE");
  const owner =
    "0xfc60f80c32b1eaf365f39007547e312cdd7cf2b845eea32f74dfdba1b99a1c22";

  const privileges = await uniqueIdentity.grantRole(owner, account);

  console.log("privileges", privileges);
  return privileges;
};
