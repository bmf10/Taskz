import Board from "@/models/Board"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

interface Body {
  readonly name: string
}

const postHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  const session = await getServerSession(req, res, authOptions)
  const userId = session!.user!.id
  const { name } = req.body as Body

  if (!session?.user?.id) {
    return res.status(403)
  }

  const count = await Board.count({
    userId: new ObjectId(userId),
  })

  const board = await Board.create({
    name: name,
    userId: new ObjectId(userId),
    order: count + 1,
  })

  return res.status(201).json({ board })
}

export default postHandler
