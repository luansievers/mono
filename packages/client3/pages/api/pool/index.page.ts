import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

import { API_BASE_URL } from "@/constants";
//Added because ESlint import order was complaining. But this order works fine in pages
// eslint-disable-next-line import/order
import {
  PendingPoolFilters,
  Pool,
  Pool_Status_Type,
} from "@/lib/graphql/generated";

export const POOL_CLOUD_URL = `${API_BASE_URL}/poolMetaData`;

const filterByWalletAddress = (
  poolData: Array<Pool>,
  walletAddress: string
) => {
  return poolData.filter((pool: any) => pool.walletAddress === walletAddress);
};

const filterByPoolAddress = (poolData: Array<Pool>, poolAddress: string) => {
  return poolData.filter((pool: any) => pool.poolAddress === poolAddress);
};

const filterByPoolIds = (poolData: Array<Pool>, poolIds: string[]) => {
  return poolData.filter((pool: any) => poolIds.includes(pool.poolAddress));
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
      try {
        const poolDataResponse = await axios.get(POOL_CLOUD_URL);
        let fileData = poolDataResponse.data;
        const {
          walletAddress,
          filters,
          poolAddress,
          poolIds,
        }: {
          walletAddress?: string;
          filters?: PendingPoolFilters;
          poolAddress?: string;
          poolIds?: string[];
        } = qs.parse(req.query as unknown as string);
        if (walletAddress != undefined) {
          fileData = filterByWalletAddress(fileData, walletAddress);
        }
        if (poolAddress != undefined) {
          fileData = filterByPoolAddress(fileData, poolAddress);
        }
        if (filters) {
          fileData = filterPoolDataByUsingFilters(fileData, filters);
        }
        if (poolIds) {
          fileData = filterByPoolIds(fileData, poolIds);
        }
        res.status(200).json(fileData);
      } catch (error) {
        console.error(error);
        res.status(405).end("Error occurred during fetching");
      }
      break;
    }

    case "POST": {
      const newPoolData = req.body.params;
      const id = Date.now().toString(36);
      newPoolData.status = Pool_Status_Type.InReview;
      newPoolData.id = id;
      await axios.post(POOL_CLOUD_URL, {
        poolData: {
          id: id,
          data: newPoolData,
        },
      });
      //await sendToDiscord(newPoolData);
      res.status(200).json(newPoolData);
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
