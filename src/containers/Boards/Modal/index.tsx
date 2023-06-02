import Button from "@/components/Button"
import Input from "@/components/Input"
import Modal from "@/components/Modal"
import { IBoard } from "@/models/Board"
import axios from "@/utils/axios"
import { useMutation } from "@tanstack/react-query"
import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

interface Props {
  readonly open: boolean
  readonly onClose: () => void
  readonly onSuccess: () => void
  readonly board?: IBoard
}

interface Value {
  readonly name: string
  readonly boardId?: string
}

const ModalForm: FC<Props> = ({ open, onClose, onSuccess, board }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Value>({
    defaultValues: {
      name: board?.name,
    },
    values: {
      name: board?.name ?? "",
    },
  })
  const { isLoading, mutate } = useMutation({
    mutationKey: [board ? "editBoard" : "addBoard"],
    mutationFn: (v: Value) => {
      return toast.promise(
        board ? axios.patch("/boards", v) : axios.post("/boards", v),
        {
          loading: board ? "Updating Your Board" : "Adding Your Board",
          success: board
            ? "Board Updated Successfully"
            : "Board Added Successfully",
          error: "Something went wrong",
        }
      )
    },
    onSuccess: () => {
      onSuccess()
      onClose()
      reset()
    },
  })

  const onSubmit: SubmitHandler<Value> = (values) => {
    mutate({ ...values, boardId: board?._id })
  }

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="small"
      title={`${board ? "Edit" : "Add"} Board`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Board Name"
          error={errors.name && "You must input board name"}
          inputProps={register("name", { required: true })}
        />
        <Button type="submit" block color="primary" loading={isLoading}>
          Submit
        </Button>
      </form>
    </Modal>
  )
}

export default ModalForm
