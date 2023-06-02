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
import Board from "@/models/Board"
import dbConnect from "@/libs/mongoose"
import deleteHandler from "@/pages/api/boards/[boardId]"
import board from "@/pages/api/boards"

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock("next-auth")

interface MockBoard {
  readonly _id: ObjectId
  readonly order: number
}

describe("Boards DELETE API Endpoint", () => {
  const id = new ObjectId("delete123456")
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

  test("Boards should be deleted", async () => {
    const { req, res } = mockRequestResponse({
      method: "DELETE",
      url: `/api/boards/${boards[0]._id.toString()}`,
      query: {
        boardId: boards[0]._id.toString(),
      },
    })

    await deleteHandler(req, res)

    const getData = mockRequestResponse({
      method: "GET",
    })

    await board(getData.req, getData.res)

    const data = getData.res._getJSONData()

    expect(data.boards.length).toBe(2)
    expect(res.statusCode).toBe(201)
  })

  afterAll(async () => {
    await dbConnect()
    await Board.deleteMany({})
  })
})
