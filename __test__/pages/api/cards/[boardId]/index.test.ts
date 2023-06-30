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
import cards from "@/pages/api/cards/[boardId]"
import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import dbConnect from "@/libs/mongoose"
import Card from "@/models/Card"
import Board from "@/models/Board"

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock("next-auth")

describe("Card API Endpoint", () => {
  const id = new ObjectId("user12345678")
  let boardId: undefined | ObjectId
  let cardId: string
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
      body: { name: "Card Test" },
      query: { boardId },
    })
    await cards(req, res)

    const data = res._getJSONData()

    cardId = data.card._id

    expect(res.statusCode).toBe(201)
    expect(typeof data.card._id).toBe("string")
  })

  test("GET should return all boards", async () => {
    const { req, res } = mockRequestResponse({
      method: "GET",
      query: { boardId },
    })
    await cards(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(data.cards)).toBe(true)
  })

  test("PATCH should return different value", async () => {
    const { req, res } = mockRequestResponse({
      body: { name: "Card Edited", cardId: cardId },
      method: "PATCH",
      query: { boardId },
    })

    await cards(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(201)
    expect(data.card.name).toBe("Card Edited")
  })

  beforeAll(async () => {
    await dbConnect()
    boardId = (
      await Board.create({
        name: "Board Test",
        userId: new ObjectId("user12345678"),
        order: 1,
        _id: new ObjectId("board1234567"),
      })
    )._id
  })

  afterAll(async () => {
    await dbConnect()
    await Card.deleteMany({
      boardId: boardId,
    })
  })
})
