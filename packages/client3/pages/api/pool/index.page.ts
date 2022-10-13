import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

import { Pool_Status_Type } from "@/lib/graphql/generated";

const mapSavePoolsToPoolArray = (poolData: any) => {
  const mappedData = Object.keys(poolData).map((key) => ({
    id: key,
    ...poolData[key],
  }));
  return mappedData;
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
      let fileData;
      const pathname = path.resolve(
        `${process.cwd()}/pages/api/pool`,
        "./pools.json"
      );
      try {
        fileData = JSON.parse(fs.readFileSync(pathname, "utf-8"));
        if (req.query.walletAddress) {
          fileData = Object.values(fileData).filter(
            (pool: any) => pool.walletAddress === req.query.walletAddress
          );
        }
        fileData = mapSavePoolsToPoolArray(
          JSON.parse(fs.readFileSync(pathname, "utf-8"))
        );
      } catch (error) {
        console.error(error);
      }
      res.status(200).json(fileData);
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
