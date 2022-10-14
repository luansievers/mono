import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

import {
  PendingPoolFilters,
  Pool,
  Pool_Status_Type,
} from "@/lib/graphql/generated";

const mapSavePoolsToPoolArray = (poolData: any) => {
  const mappedData = Object.keys(poolData).map((key) => ({
    id: key,
    ...poolData[key],
  }));
  return mappedData as Pool[];
};

const filterByWalletAddress = (
  poolData: Array<Pool>,
  walletAddress: string
) => {
  return poolData.filter((pool: any) => pool.walletAddress === walletAddress);
};

const filterPoolDataByUsingFilters = (
  poolData: Array<Pool>,
  filters: PendingPoolFilters
) => {
  const { statusType, hasTransactionHash: _hasTransactionHash } = filters;
  return poolData.filter((pool) => {
    // Check if statusType filter is provided and current pool's status is matching with passed in statuses
    if (statusType && !statusType.includes(pool.status)) {
      return false;
    }
    /**
     * Check if transactionHash param is provided
     * If it's value is true only pools with transaction hash is returned
     * If it's value is false pools without transactionHash is returned
     */
    if (_hasTransactionHash != undefined) {
      const hasTransactionHash =
        _hasTransactionHash.toString().toLowerCase() == "true";
      if (hasTransactionHash && !pool.transactionHash) {
        return false;
      }
      if (!hasTransactionHash && !!pool.transactionHash) {
        return false;
      }
    }
    return true;
  });
};

/**
 * This method is used to fetch all pools and create a new pool
 * TODO: Add necessary typings
 *
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "GET": {
      let fileData: Pool[];
      const pathname = path.resolve(
        `${process.cwd()}/pages/api/pool`,
        "./pools.json"
      );
      try {
        fileData = mapSavePoolsToPoolArray(
          JSON.parse(fs.readFileSync(pathname, "utf-8"))
        );

        const {
          walletAddress,
          filters,
        }: { walletAddress?: string; filters?: PendingPoolFilters } = qs.parse(
          req.query as unknown as string
        );

        if (walletAddress != undefined) {
          fileData = filterByWalletAddress(fileData, walletAddress);
        }
        if (filters) {
          fileData = filterPoolDataByUsingFilters(fileData, filters);
        }
        res.status(200).json(fileData);
      } catch (error) {
        console.error(error);
        res.status(405).end("Error occurred during fetching");
      }
      break;
    }

    case "POST": {
      let fileData;
      const pathname = path.resolve(
        `${process.cwd()}/pages/api/pool`,
        "./pools.json"
      );
      const newPoolData = req.body.params;
      try {
        fileData = JSON.parse(fs.readFileSync(pathname, "utf-8"));
      } catch (error) {
        console.error(error);
      }
      const id = Date.now().toString(36);
      newPoolData.status = Pool_Status_Type.InReview;
      fileData[id] = newPoolData;
      fs.writeFileSync(pathname, JSON.stringify(fileData), {
        encoding: "utf8",
        flag: "w",
      });
      res.status(200).json({
        id: id,
        fileData,
      });
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
