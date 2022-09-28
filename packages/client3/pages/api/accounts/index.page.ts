import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

import { AccountRole, IAccountMetadata } from "./account.types";

type ExpectedQuery = {
  account: string;
  applicationState: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const account = (req.query as ExpectedQuery).account;
  const applicationState = (req.query as ExpectedQuery).applicationState;

  if (!account) {
    res.status(500).json({
      message: "You must provide an 'account' parameter in the query string.",
      req: req.query,
    });
    return;
  }

  try {
    const payload = await findAccount(account, applicationState);

    const isAccountCorrectState = await isAccountInCorrectState(
      payload.role,
      applicationState
    );

    res.status(200).json({
      accountMetadata: payload,
      isAccountCorrectState: isAccountCorrectState,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error searching accounts: ${(error as Error).message}`,
    });
  }
};

async function findAccount(
  wallet: string,
  applicationState: string
): Promise<IAccountMetadata> {
  return new Promise((resolve) => {
    const pathname = path.resolve(
      `${process.cwd()}/pages/api/accounts`,
      "./accounts.json"
    );

    const accountMetadata = JSON.parse(fs.readFileSync(pathname, "utf-8"));

    const matchingAccount = accountMetadata.accounts.find(
      (accountData: IAccountMetadata) => accountData.wallet === wallet
    );

    if (!matchingAccount) {
      const newAccount = {
        wallet: wallet,
        role:
          applicationState === "true" ? AccountRole.BACKER : AccountRole.ARTIST,
      };
      accountMetadata.accounts.push(newAccount);
      fs.writeFileSync(pathname, JSON.stringify(accountMetadata));
      resolve(newAccount);
    }

    resolve(matchingAccount);
  });
}

async function isAccountInCorrectState(
  role: AccountRole,
  applicationState: string
): Promise<boolean> {
  if (role === "Backer" && applicationState === "true") {
    return true;
  } else if (role === "Artist" && applicationState === "false") {
    return true;
  }
  return false;
}

export default handler;
