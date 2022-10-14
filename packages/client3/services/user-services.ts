import type { Web3Provider } from "@ethersproject/providers";

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
  account: string
) => {
  const wallet = "0x45848cE6fEDcb22923E5DeB1f582Ba6fbABa242f";

  try {
    const borrowerContract = await (
      await goldfinchFactory.createBorrower(wallet)
    ).wait();
    console.log("borrowerContract", borrowerContract);
    return borrowerContract.events?.[3].args?.borrower.toLowerCase();
  } catch (error) {
    console.log(error);
  }
};
