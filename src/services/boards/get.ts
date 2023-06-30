import Board from "@/models/Board"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.id) {
    return res.status(403).end()
  }

  const boards = await Board.find({
    userId: new ObjectId(session!.user!.id),
  })
    .sort({ order: "asc" })
    .exec()

  return res.status(200).json({ boards })
}

export default getHandler
