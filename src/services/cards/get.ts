import Card from "@/models/Card"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

interface Query {
  readonly boardId: string
}

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  const session = await getServerSession(req, res, authOptions)
  const { boardId } = req.query as unknown as Query

  if (!session?.user?.id) {
    return res.status(403).end()
  }

  const cards = await Card.find({
    boardId: new ObjectId(boardId),
  })
    .sort({ order: "asc" })
    .exec()

  return res.status(200).json({ cards })
}

export default getHandler
