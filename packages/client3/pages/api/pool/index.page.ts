import fs from "fs";
import path from "path";

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { IPool } from "@/types/pool";

/**
 * This is a dummy api to save pool and need to be replaced by graphql at client side
 *  No typing or server side validation is done for the API methods since this being a dummy endpoint
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let fileData;
    const pathname = path.resolve(
      `${process.cwd()}/pages/api/pool`,
      "./pools.json"
    );
    const newPoolData = req.body.params;
    try {
      fileData = JSON.parse(fs.readFileSync(pathname, "utf-8"));
    } catch (error) {
      console.log(error);
    }
    const id = Date.now().toString(36);
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
  } else if (req.query.walletAddress && req.method === "GET") {
    let fileData;
    const pathname = path.resolve(
      `${process.cwd()}/pages/api/pool`,
      "./pools.json"
    );
    try {
      fileData = JSON.parse(fs.readFileSync(pathname, "utf-8"));
      fileData = Object.values(fileData).filter(
        (pool: any) => pool.walletAddress === req.query.walletAddress
      );
    } catch (error) {
      console.log(error);
    }
    res.status(200).json(fileData);
  } else if (req.method === "GET") {
    let fileData;
    const pathname = path.resolve(
      `${process.cwd()}/pages/api/pool`,
      "./pools.json"
    );
    try {
      fileData = JSON.parse(fs.readFileSync(pathname, "utf-8"));
    } catch (error) {
      console.log(error);
    }
    res.status(200).json(fileData);
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
