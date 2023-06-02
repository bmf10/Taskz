import { NextApiHandler } from "next"
import dbConnect from "@/libs/mongoose"
import reorderHandler from "@/services/boards/reorder"

const requestHandler: NextApiHandler = async (req, res) => {
  try {
    await dbConnect()

    switch (req.method) {
      case "PATCH": {
        return await reorderHandler(req, res)
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
