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
import dbConnect from "@/libs/mongoose"
import reorder from "@/pages/api/cards/[boardId]/reorder"
import Card, { ICard } from "@/models/Card"

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

jest.mock("next-auth")

interface MockBoard {
  readonly _id: ObjectId
  readonly order: number
}

describe("Card Re-Order API Endpoint", () => {
  const id = new ObjectId("reorder12345")
  let cards = [] as MockBoard[]
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
    const insertedCards = await Card.insertMany(
      Array.from({ length: 3 }).map((_, i) => ({
        name: `Card ${i + 1}`,
        boardId: id,
        order: i + 1,
      }))
    )

    cards = insertedCards.map((v) => ({
      _id: new ObjectId(v._id),
      order: v.order,
    }))
  })

  test("Card should be reversed", async () => {
    const reverseCards = cards.reverse().map((v, i) => ({ ...v, order: i + 1 }))

    const { req, res } = mockRequestResponse({
      body: { cards: reverseCards },
      method: "PATCH",
      query: { boardId: id.toString() },
      url: `/api/cards/${id.toString()}/reorder`,
    })

    await reorder(req, res)

    const data = res._getJSONData()

    const resultCard = data.cards.map((v: ICard) => ({
      _id: new ObjectId(v._id),
      order: v.order,
    }))

    expect(res.statusCode).toBe(200)
    expect(resultCard).toEqual(reverseCards)
  })

  afterAll(async () => {
    await dbConnect()
    await Card.deleteMany({
      boardId: new ObjectId(id),
    })
  })
})
