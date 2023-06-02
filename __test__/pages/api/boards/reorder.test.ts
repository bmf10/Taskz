/**
 * @jest-environment node
 */

import {
  createMocks,
  createRequest,
  createResponse,
  RequestOptions,
} from "node-mocks-http"
import { getServerSession } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import Board, { IBoard } from "@/models/Board"
import dbConnect from "@/libs/mongoose"
import reorder from "@/pages/api/boards/reorder"

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock("next-auth")

interface MockBoard {
  readonly _id: ObjectId
  readonly order: number
}

describe("Boards Re-Order API Endpoint", () => {
  const id = new ObjectId("reorder12345")
  let boards = [] as MockBoard[]
  ;(getServerSession as jest.Mock).mockReturnValue({
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { id },
  })

  function mockRequestResponse(options: RequestOptions) {
    const { req, res }: { req: ApiRequest; res: APiResponse } =
      createMocks(options)
    return { req, res }
  }

  beforeAll(async () => {
    await dbConnect()
    const insertedBoards = await Board.insertMany(
      Array.from({ length: 3 }).map((_, i) => ({
        name: `Board ${i + 1}`,
        userId: id,
        order: i + 1,
      }))
    )

    boards = insertedBoards.map((v) => ({
      _id: new ObjectId(v._id),
      order: v.order,
    }))
  })

  test("Boards should be reversed", async () => {
    const reverseBoards = boards
      .reverse()
      .map((v, i) => ({ ...v, order: i + 1 }))

    const { req, res } = mockRequestResponse({
      body: { boards: reverseBoards },
      method: "PATCH",
    })

    await reorder(req, res)

    const data = res._getJSONData()

    const resultBoard = data.boards.map((v: IBoard) => ({
      _id: new ObjectId(v._id),
      order: v.order,
    }))

    expect(res.statusCode).toBe(200)
    expect(resultBoard).toEqual(reverseBoards)
  })

  afterAll(async () => {
    await dbConnect()
    await Board.deleteMany({})
  })
})
