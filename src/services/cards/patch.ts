import Card from "@/models/Card"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

interface Body {
  readonly name: string
  readonly cardId: string
}

interface Query {
  readonly boardId: string
}

const patchHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  const session = await getServerSession(req, res, authOptions)
  const { name, cardId } = req.body as Body
  const { boardId } = req.query as unknown as Query

  if (!session?.user?.id) {
    return res.status(403).end()
  }

  const card = await Card.findOneAndUpdate(
    { boardId: new ObjectId(boardId), _id: new ObjectId(cardId) },
    { name },
    { new: true }
  ).exec()

  return res.status(201).json({ card })
}

export default patchHandler
