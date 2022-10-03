import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

/**
 * This is a dummy api to save pool and need to be replaced by graphql at client side
 *  No typing or server side validation is done for the API methods since this being a dummy endpoint
 *
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
}
