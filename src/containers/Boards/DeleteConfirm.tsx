import ConfirmModal from "@/components/ConfirmModal"
import { IBoard } from "@/models/Board"
import axios from "@/utils/axios"
import { useMutation } from "@tanstack/react-query"
import { FC } from "react"
import { toast } from "react-hot-toast"

interface Props {
  readonly modalDelete?: IBoard
  readonly onClose: () => void
  readonly onSuccess: () => void
}

const DeleteConfirm: FC<Props> = ({ modalDelete, onClose, onSuccess }) => {
  const { mutate } = useMutation({
    mutationKey: ["deleteBoard", modalDelete?.name],
    mutationFn: (v: IBoard) =>
      toast.promise(axios.delete(`/boards/${v._id}`), {
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
      text="Are you sure to delete this board?"
      isOpen={!!modalDelete}
      title={`Delete ${modalDelete?.name || "Board"}`}
      onClose={onClose}
      yesText="Yes, sure"
      noText="Cancel"
      onYes={handleDelete}
    />
  )
}

export default DeleteConfirm
