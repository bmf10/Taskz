import { NextApiHandler } from "next"
import dbConnect from "@/libs/mongoose"
import getHandler from "@/services/cards/get"
import postHandler from "@/services/cards/post"
import patchHandler from "@/services/cards/patch"

const requestHandler: NextApiHandler = async (req, res) => {
  try {
    await dbConnect()

    switch (req.method) {
      case "GET": {
        return await getHandler(req, res)
      }
      case "POST": {
        return await postHandler(req, res)
      }
      case "PATCH": {
        return await patchHandler(req, res)
      }
      default: {
        return res.status(404).end()
      }
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default requestHandler
