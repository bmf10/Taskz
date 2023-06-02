import { NextApiHandler } from "next"
import dbConnect from "@/libs/mongoose"
import deleteHandler from "@/services/boards/delete"

const requestHandler: NextApiHandler = async (req, res) => {
  try {
    await dbConnect()

    switch (req.method) {
      case "DELETE": {
        return await deleteHandler(req, res)
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
