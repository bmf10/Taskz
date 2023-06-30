import Board from "@/models/Board"
import Card from "@/models/Card"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

interface Body {
  readonly name: string
}

interface Query {
  readonly boardId: string
}

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  const session = await getServerSession(req, res, authOptions)
  const { name } = req.body as Body
  const { boardId } = req.query as unknown as Query

  if (!session?.user?.id) {
    return res.status(403).end()
  }

  const board = await Board.findById(boardId).exec()

  if (!board) {
    return res.status(404).end()
  }

  const count = await Card.count({
    boardId: new ObjectId(boardId),
  })

  const card = await Card.create({
    name: name,
    boardId: new ObjectId(boardId),
    order: count + 1,
  })

  board.cards.push(card)

  await board.save()

  return res.status(201).json({ card })
}

export default postHandler
