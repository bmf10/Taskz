import ConfirmModal from "@/components/ConfirmModal"
import { ICard } from "@/models/Card"
import axios from "@/utils/axios"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { FC } from "react"
import { toast } from "react-hot-toast"

interface Props {
  readonly modalDelete?: ICard
  readonly onClose: () => void
  readonly onSuccess: () => void
}

const DeleteConfirm: FC<Props> = ({ modalDelete, onClose, onSuccess }) => {
  const { query } = useRouter()
  const { mutate } = useMutation({
    mutationKey: ["deleteCard", modalDelete?.name],
    mutationFn: (v: ICard) =>
      toast.promise(axios.delete(`/cards/${query.id}/${v._id}`), {
        loading: "Deleting Your Board",
        success: "Board Deleted Successfully",
        error: "Something went wrong",
      }),
    onSuccess,
  })

  const handleDelete = () => {
    if (modalDelete) {
      mutate(modalDelete)
      onClose()
    }
  }

  return (
    <ConfirmModal
      text="Are you sure to delete this card?"
      isOpen={!!modalDelete}
      title={`Delete ${modalDelete?.name || "Card"}`}
      onClose={onClose}
      yesText="Yes, sure"
      noText="Cancel"
      onYes={handleDelete}
    />
  )
}

export default DeleteConfirm
