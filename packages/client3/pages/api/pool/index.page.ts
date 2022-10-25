import fs from "fs";
import path from "path";

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

//Added because ESlint import order was complaining. But this order works fine in pages
// eslint-disable-next-line import/order
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

const filterByPoolAddress = (poolData: Array<Pool>, poolAddress: string) => {
  return poolData.filter((pool: any) => pool.poolAddress === poolAddress);
};

const filterPoolDataByUsingFilters = (
  poolData: Array<Pool>,
  filters: PendingPoolFilters
) => {
  const { statusType, hasPoolAddress: _hasPoolAddress } = filters;

  return poolData.filter((pool) => {
    // Check if statusType filter is provided and current pool's status is matching with passed in statuses
    if (statusType && !statusType.includes(pool.status)) {
      return false;
    }
    if (_hasPoolAddress != undefined) {
      /**
       * Check if poolAddress param is provided
       * If it's value is true only pools with that pool address is returned
       * If it's value is false pools without the pool address are returned
       */
      const hasPoolAddress = _hasPoolAddress.toString().toLowerCase() == "true";
      if (hasPoolAddress && !pool.poolAddress) {
        return false;
      }
      if (!hasPoolAddress && !!pool.poolAddress) {
        return false;
      }
    }
    return true;
  });
};

import { IPool } from "@/types/pool";

/**
 * This method is used to fetch all pools and create a new pool
 * TODO: Add necessary typings
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
          poolAddress,
        }: {
          walletAddress?: string;
          filters?: PendingPoolFilters;
          poolAddress?: string;
        } = qs.parse(req.query as unknown as string);
        console.log(poolAddress);
        if (walletAddress != undefined) {
          fileData = filterByWalletAddress(fileData, walletAddress);
        }
        if (poolAddress != undefined) {
          console.log("poolAddress", poolAddress);
          fileData = filterByPoolAddress(fileData, poolAddress);
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

      await sendToDiscord(newPoolData);
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

  /**
   * Endpoint for Discord webhook
   *
   * @param {IPool} poolData - Pool data
   * @returns {Promise<void>}
   */

  async function sendToDiscord(poolData: IPool): Promise<void> {
    const discordURL = process.env.DISCORD_WEBHOOK_URL as string;
    const flame = String.fromCodePoint(0x1f525);

    const data = JSON.stringify({
      content: `@here New Free Artists Pool Proposal ${flame}`,
      embeds: [
        {
          color: 5174599,
          fields: [
            {
              name: "Pool name",
              value: poolData.poolName,
            },
            {
              name: "Project Detail",
              value: poolData.projectDetail,
            },
            {
              name: "Goal Amount",
              value: poolData.goalAmount,
            },
            { name: "Closing Date", value: poolData.closingDate },
            {
              name: "Project Goal",
              value: poolData.terms.projectGoal,
            },
            {
              name: "Project Raise Type",
              value: poolData.terms.raiseTarget,
            },
          ],
          footer: {
            text: `Artists Wallet: ${poolData.walletAddress}`,
          },
        },
      ],
    });

    return axios.post(discordURL, data, {
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
      responseType: "arraybuffer",
    });
  }
}
