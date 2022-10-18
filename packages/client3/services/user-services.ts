import type { Web3Provider } from "@ethersproject/providers";

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
