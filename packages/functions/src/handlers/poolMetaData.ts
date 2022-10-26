import {Response} from "@sentry/serverless/dist/gcpfunction/general"
import {getPools} from "../db"
import {genRequestHandler} from "../helpers"
import * as admin from "firebase-admin"

export const poolMetaData = genRequestHandler({
  requireAuth: "none",
  cors: true,
  handler: async (req, res: Response): Promise<Response> => {
    switch (req.method) {
      case "GET": {
        const pools = getPools(admin.firestore())
        const response = await pools.get()
        return res.status(200).send(response)
      }
      case "POST": {
        const {poolData} = req.body
        const pools = getPools(admin.firestore())
        const poolRef = pools.doc(`${poolData.id}`)
        await poolRef.set(poolData.data, {
          merge: true,
        })
        return res.status(200).send({status: "success"})
      }
      default:
        return res.status(500).send({error: "Not a valid method"})
    }
  },
})
