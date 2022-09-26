import { create } from "ipfs-http-client";

export const ipfs = create({
  host: "localhost", //TODO check if this production mode or not
  port: 5001,
  protocol: "http",
});
