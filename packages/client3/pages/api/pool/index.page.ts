import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

/**
 * This is a dummy api to save pool and need to be replaced by graphql at client side
 *  No typing or server side validation is done for the API methods since this being a dummy endpoint
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const pathname = path.resolve(
      `${process.cwd()}/pages/api/pool`,
      "./pools.json"
    );

    const newPoolData = req.body.params;
    let fileData;
    try {
      fileData = JSON.parse(fs.readFileSync(pathname, "utf-8"));
    } catch (error) {
      fs.writeFileSync(pathname, "{}");
      fileData = {};
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
  } else if (req.method === "GET") {
    const pathname = path.resolve(
      `${process.cwd()}/pages/api/pool`,
      "./pools.json"
    );
    let fileData;
    try {
      fileData = JSON.parse(fs.readFileSync(pathname, "utf-8"));
    } catch (error) {
      fs.writeFileSync(pathname, "{}");
      fileData = {};
    }
    res.status(200).json(fileData);
  }
}
