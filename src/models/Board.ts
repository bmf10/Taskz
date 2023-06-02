import mongoose, { ObjectId } from "mongoose"

export interface IBoard {
  readonly _id: string
  readonly name: string
  readonly isDeleted: boolean
  readonly order: number
  readonly userId: ObjectId
  readonly createdAt: Date
  readonly updateAt: Date
}

const BoardSchema = new mongoose.Schema<IBoard>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    order: { type: Number, required: true },
  },
  { timestamps: true }
)

BoardSchema.pre("find", function () {
  this.where({ isDeleted: false })
})

BoardSchema.pre("findOne", function () {
  this.where({ isDeleted: false })
})

export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", BoardSchema, "boards")
