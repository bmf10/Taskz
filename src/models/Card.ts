import mongoose, { ObjectId } from "mongoose"

export interface ICard {
  readonly _id: string
  readonly name: string
  readonly isDeleted: boolean
  readonly order: number
  readonly boardId: ObjectId
  readonly createdAt: Date
  readonly updateAt: Date
}

const CardSchema = new mongoose.Schema<ICard>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    boardId: {
      type: mongoose.Types.ObjectId,
      ref: "Board",
    },
    order: { type: Number, required: true },
  },
  { timestamps: true }
)

CardSchema.pre("find", function () {
  this.where({ isDeleted: false })
})

CardSchema.pre("findOne", function () {
  this.where({ isDeleted: false })
})

export default mongoose.models.Card ||
  mongoose.model<ICard>("Card", CardSchema, "cards")
