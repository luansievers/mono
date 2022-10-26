import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { Pool_Status_Type } from "@/lib/graphql/generated";

import { POOL_CLOUD_URL } from "../index.page";

/**
 * This handler is used to get a pool by it's id and patch the pool with new data
 * TODO: Add necessary typings
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { poolId } = req.query;
  if (typeof poolId != "string") {
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }
  switch (method) {
    case "GET": {
      try {
        //TODO: Cloud function can be modified to retrieve by id and thus unnecessary iteration can be avoided
        const poolDataResponse = await axios.get(POOL_CLOUD_URL);
        const fileData = poolDataResponse.data.find(
          (data: any) => data.id === poolId
        );
        res.status(200).json(fileData);
      } catch (error) {
        console.error(error);
        res.status(405).end(`Error occurred while fetching data`);
      }
      break;
    }
    case "PATCH": {
      const { poolAddress, status, token, borrowerContractAddress } =
        req.body || {};
      const changes: any = {};
      if (!poolAddress && !status && !borrowerContractAddress) {
        res.status(405).end(`Nothing to patch`);
        return;
      }
      try {
        changes.id = poolId;
        if (poolAddress) {
          changes.poolAddress = poolAddress;
        }
        if (borrowerContractAddress) {
          changes.borrowerContract = borrowerContractAddress;
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
          changes.status = status;
        }
        await axios.post(POOL_CLOUD_URL, {
          poolData: {
            id: changes.id,
            data: changes,
          },
        });
        res.status(200).json({ message: "success" });
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
