import Button from "@/components/Button"
import Input from "@/components/Input"
import Modal from "@/components/Modal"
import { ICard } from "@/models/Card"
import axios from "@/utils/axios"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

interface Props {
  readonly open: boolean
  readonly onClose: () => void
  readonly onSuccess: () => void
  readonly card?: ICard
}

interface Value {
  readonly name: string
  readonly cardId?: string
}

const ModalForm: FC<Props> = ({ open, onClose, onSuccess, card }) => {
  const { query } = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Value>({
    defaultValues: {
      name: card?.name,
    },
    values: {
      name: card?.name ?? "",
    },
  })
  const { isLoading, mutate } = useMutation({
    mutationKey: [card ? "editCard" : "addCard"],
    mutationFn: (v: Value) => {
      return toast.promise(
        card
          ? axios.patch(`/cards/${query.id}`, v)
          : axios.post(`/cards/${query.id}`, v),
        {
          loading: card ? "Updating Your Card" : "Adding Your Card",
          success: card
            ? "Card Updated Successfully"
            : "Card Added Successfully",
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
    mutate({ ...values, cardId: card?._id })
  }

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="small"
      title={`${card ? "Edit" : "Add"} Card`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Card Name"
          error={errors.name && "You must input card name"}
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
