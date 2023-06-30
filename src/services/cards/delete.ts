import Card from "@/models/Card"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

interface Query {
  readonly boardId: string
  readonly cardId: string
}

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  const session = await getServerSession(req, res, authOptions)
  const { boardId, cardId } = req.query as unknown as Query

  if (!session?.user?.id) {
    return res.status(403).end()
  }

  const card = await Card.findOneAndUpdate(
    { boardId: new ObjectId(boardId), _id: new ObjectId(cardId) },
    { isDeleted: true },
    { new: true }
  ).exec()

  return res.status(201).json({ card })
}

export default deleteHandler
