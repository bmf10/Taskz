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
import handler from "@/pages/api/cards/[boardId]/[cardId]"
import card from "@/pages/api/cards/[boardId]"
import Card from "@/models/Card"

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock("next-auth")

interface MockCard {
  readonly _id: ObjectId
  readonly order: number
}

describe("Cards DELETE API Endpoint", () => {
  const id = new ObjectId("delete123456")
  let board: undefined | { _id: ObjectId }
  let cards = [] as MockCard[]
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
    board = await Board.create({ name: "Board", userId: id, order: 1 })

    const insertedCards = await Card.insertMany(
      Array.from({ length: 3 }).map((_, i) => ({
        name: `Card ${i + 1}`,
        userId: id,
        order: i + 1,
        boardId: board!._id,
      }))
    )

    cards = insertedCards.map((v) => ({
      _id: new ObjectId(v._id),
      order: v.order,
    }))
  })

  test("Card should be deleted", async () => {
    const { req, res } = mockRequestResponse({
      method: "DELETE",
      url: `/api/cards/${board!._id.toString()}/${cards[0]._id.toString()}`,
      query: {
        boardId: board!._id.toString(),
        cardId: cards[0]._id.toString(),
      },
    })

    await handler(req, res)

    const getData = mockRequestResponse({
      method: "GET",
      url: `/api/cards/${board!._id.toString()}`,
      query: {
        boardId: board!._id.toString(),
      },
    })

    await card(getData.req, getData.res)

    const data = getData.res._getJSONData()

    expect(data.cards.length).toBe(2)
    expect(res.statusCode).toBe(201)
  })

  test("Card should be returned", async () => {
    const { req, res } = mockRequestResponse({
      method: "GET",
      url: `/api/cards/${board!._id.toString()}/${cards[1]._id.toString()}`,
      query: {
        boardId: board!._id.toString(),
        cardId: cards[1]._id.toString(),
      },
    })

    await handler(req, res)

    const data = res._getJSONData()

    expect(res.statusCode).toBe(200)
    expect(typeof data.card._id).toBe("string")
  })

  afterAll(async () => {
    await dbConnect()
    await Board.deleteMany({
      userId: new ObjectId(id),
    })
    await Card.deleteMany({ boardId: new ObjectId(board!._id) })
  })
})
