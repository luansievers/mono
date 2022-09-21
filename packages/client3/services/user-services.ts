import type { Web3Provider } from "@ethersproject/providers";
import axios from "axios";

import { fetchKycStatus, getSignatureForKyc, IKYCStatus } from "@/lib/verify";
import { baseUrl } from "@/pages/api";
import { IAccount } from "@/pages/api/accounts/account.types";
import { User } from "@/types/user";

export const hasUid = (user?: User) => {
  return Boolean(
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

export const checkWalletAddress = async (
  wallet?: string,
  isState1Selected?: boolean
): Promise<IAccount | undefined> => {
  if (wallet) {
    const response = await axios.get(`${baseUrl}/accounts`, {
      params: { account: wallet, applicationState: isState1Selected },
    });
    return response.data;
  }
};
