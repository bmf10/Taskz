import { ICard } from "@/models/Card"
import { FC, useEffect, useId, useState } from "react"
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd"
import Card from "./Card"
import { useBoard } from "../Context"
import { useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/router"

interface Props {
  readonly onEdit: (card: ICard) => void
  readonly onDelete: (card: ICard) => void
}

interface Items extends ICard {
  readonly id: string
}

interface Value {
  readonly cards: Pick<ICard, "_id" | "order">[]
}

const List: FC<Props> = ({ onDelete, onEdit }) => {
  const router = useRouter()
  const [items, setItems] = useState<Items[]>([])
  const { card } = useBoard()
  const id = useId()
  const { mutate } = useMutation({
    mutationKey: ["reorder"],
    mutationFn: (v: Value) =>
      toast.promise(axios.patch(`/cards/${router.query.id}/reorder`, v), {
        success: "Cards re-order successfully",
        error: "Something went wrong with re-order!",
        loading: "Save re-order cards",
      }),
    onSuccess: () => {
      card.refetch()
    },
    retry: 3,
  })

  useEffect(() => {
    if (card?.data?.cards && items.length === 0) {
      setItems(card?.data.cards.map((v) => ({ ...v, id: v.order.toString() })))
    }
  }, [card?.data?.cards, items])

  const handlerReOrder: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return
    }

    const newItems = Array.from(items)
    const [remove] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination?.index, 0, remove)

    mutate({ cards: newItems.map((v, i) => ({ _id: v._id, order: i + 1 })) })

    setItems(newItems)
  }

  return (
    <>
      <DragDropContext onDragEnd={handlerReOrder}>
        <Droppable droppableId={id} direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`flex flex-row gap-4  transition-shadow ${
                snapshot.isDraggingOver ? "bg-gray-50 rounded shadow-md" : ""
              } ${items.length > 0 ? "py-2" : ""}`}
            >
              {items.map((v, index) => (
                <Draggable key={v._id} draggableId={v.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      onDelete={onDelete}
                      onEdit={onEdit}
                      style={provided.draggableProps.style}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={v._id}
                      className={`w-80 ${
                        snapshot.isDragging ? "bg-blue-100" : "bg-white"
                      }`}
                      card={v}
                    />
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default List
