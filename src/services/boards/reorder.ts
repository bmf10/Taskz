import Board, { IBoard } from "@/models/Board"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

interface Body {
  readonly boards: Pick<IBoard, "_id" | "order">[]
}

const reorderHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.id) {
    return res.status(403)
  }

  const { boards } = req.body as Body

  const updatedBoards = await Promise.all(
    boards.map(({ _id, order }) =>
      Board.findByIdAndUpdate(
        new ObjectId(_id),
        { order },
        { new: true }
      ).exec()
    )
  )

  return res.status(200).json({ boards: updatedBoards })
}

export default reorderHandler
