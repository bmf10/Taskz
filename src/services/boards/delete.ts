import Board from "@/models/Board"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

interface Query {
  readonly boardId: string
}

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  const session = await getServerSession(req, res, authOptions)
  const { boardId } = req.query as unknown as Query

  if (!session?.user?.id) {
    return res.status(403)
  }

  const board = await Board.findOneAndUpdate(
    { userId: new ObjectId(session!.user!.id), _id: new ObjectId(boardId) },
    { isDeleted: true },
    { new: true }
  ).exec()

  return res.status(201).json({ board })
}

export default deleteHandler
