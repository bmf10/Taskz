import Card, { ICard } from "@/models/Card"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

interface Body {
  readonly cards: Pick<ICard, "_id" | "order">[]
}

interface Query {
  readonly boardId: string
}

const reorderHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.id) {
    return res.status(403).end()
  }

  const { cards } = req.body as Body
  const { boardId } = req.query as unknown as Query

  const updatedCards = await Promise.all(
    cards.map(({ _id, order }) =>
      Card.findOneAndUpdate(
        { _id: new ObjectId(_id), boardId: new ObjectId(boardId) },
        { order },
        { new: true }
      ).exec()
    )
  )

  return res.status(200).json({ cards: updatedCards })
}

export default reorderHandler
