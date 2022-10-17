import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

import { Pool_Status_Type } from "@/lib/graphql/generated";

/**
 * This handler is used to get a pool by it's id and patch the pool with new data
 * TODO: Add necessary typings
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { poolId } = req.query;
  if (typeof poolId != "string") {
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }
  switch (method) {
    case "GET": {
      const pathname = path.resolve(
        `${process.cwd()}/pages/api/pool`,
        "./pools.json"
      );
      try {
        const fileDataList = JSON.parse(fs.readFileSync(pathname, "utf-8"));
        const fileData = fileDataList[poolId];
        res.status(200).json(fileData);
      } catch (error) {
        console.error(error);
        res.status(405).end(`Error occurred while fetching data`);
      }
      break;
    }
    case "PATCH": {
      const { transactionHash, status, token, borrowerContract } =
        req.body || {};
      const pathname = path.resolve(
        `${process.cwd()}/pages/api/pool`,
        "./pools.json"
      );
      if (!transactionHash && !status) {
        res.status(405).end(`Nothing to patch`);
        return;
      }
      try {
        const fileDataList = JSON.parse(fs.readFileSync(pathname, "utf-8"));
        const fileData = fileDataList[poolId];
        // TODO: check with vineeth
        if (transactionHash) {
          fileData.transactionHash = transactionHash;
        }
        /**
         * Checks if status exist in the enum. Also verifies the token passed in by user
         */
        if (status && Object.values(Pool_Status_Type).includes(status)) {
          if (
            !token &&
            token != (process.env.NEXT_PUBLIC_ADMIN_TOKEN_FOR_API || {})
          ) {
            res.status(405).end(`Invalid token or token mismatch`);
            return;
          }
          fileData.status = status;
          fileData.borrowerContract = borrowerContract;
        }
        fs.writeFileSync(pathname, JSON.stringify(fileDataList), {
          encoding: "utf8",
          flag: "w",
        });
        res.status(200).json(fileData);
      } catch (error) {
        console.error(error);
        res.status(405).end(`Error while saving data`);
      }

      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
