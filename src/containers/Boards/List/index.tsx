import { IBoard } from "@/models/Board"
import Card from "./Card"
import { FC, useEffect, useId, useState } from "react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "react-beautiful-dnd"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import axios from "@/utils/axios"

interface Props {
  readonly boards: IBoard[]
  readonly onEdit: (board: IBoard) => void
  readonly onDelete: (board: IBoard) => void
  readonly onSuccess: () => void
}

interface Items extends IBoard {
  readonly id: string
}

interface Value {
  readonly boards: Pick<IBoard, "_id" | "order">[]
}

const List: FC<Props> = ({ boards, onEdit, onSuccess, onDelete }) => {
  const { mutate } = useMutation({
    mutationKey: ["reorder"],
    mutationFn: (v: Value) =>
      toast.promise(axios.patch("/boards/reorder", v), {
        success: "Boards re-order successfully",
        error: "Something went wrong with re-order!",
        loading: "Save re-order boards",
      }),
    onSuccess: onSuccess,
  })
  const id = useId()
  const [items, setItems] = useState<Items[]>([])

  useEffect(() => {
    setItems(boards.map((v) => ({ ...v, id: v.order.toString() })))
  }, [boards])

  const handlerReOrder: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return
    }

    const newItems = Array.from(items)
    const [remove] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination?.index, 0, remove)

    mutate({ boards: newItems.map((v, i) => ({ _id: v._id, order: i + 1 })) })

    setItems(newItems)
  }

  return (
    <DragDropContext onDragEnd={handlerReOrder}>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`mb-4 flex flex-col gap-2 ${
              snapshot.isDraggingOver ? "bg-gray-100 rounded shadow-md" : ""
            }`}
          >
            {items.map((v, index) => (
              <Draggable key={v.id} draggableId={v.id} index={index}>
                {(provided, snapshot) => (
                  <Card
                    onDelete={onDelete}
                    onEdit={onEdit}
                    style={provided.draggableProps.style}
                    ref={provided.innerRef}
                    className={`${
                      snapshot.isDragging ? "bg-blue-300" : "bg-white"
                    }`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={v._id}
                    board={v}
                  />
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default List
