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
import board from "../../../../src/pages/api/boards"
import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import Board from "@/models/Board"
import dbConnect from "@/libs/mongoose"

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock("next-auth")

describe("Boards API Endpoint", () => {
  const id = new ObjectId("user12345678")
  let boardId: string
  ;(getServerSession as jest.Mock).mockReturnValue({
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { id },
  })

  function mockRequestResponse(options: RequestOptions) {
    const { req, res }: { req: ApiRequest; res: APiResponse } =
      createMocks(options)
    return { req, res }
  }

  test("POST should create new boards", async () => {
    const { req, res } = mockRequestResponse({
      method: "POST",
      body: { name: "Board Test" },
    })
    await board(req, res)

    const data = res._getJSONData()

    boardId = data.board._id

    expect(res.statusCode).toBe(201)
    expect(typeof data.board._id).toBe("string")
  })

  test("GET should return all boards", async () => {
    const { req, res } = mockRequestResponse({
      method: "GET",
    })
    await board(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(data.boards)).toBe(true)
  })

  test("PATCH should return different value", async () => {
    const { req, res } = mockRequestResponse({
      body: { name: "Board Edited", boardId: boardId },
      method: "PATCH",
    })

    await board(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(201)
    expect(data.board.name).toBe("Board Edited")
  })

  afterAll(async () => {
    await dbConnect()
    await Board.deleteMany({})
  })
})
