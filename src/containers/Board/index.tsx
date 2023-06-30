import Button from "@/components/Button"
import Layout from "@/components/Layout"
import Head from "next/head"
import { useState } from "react"
import ModalForm from "./Modal"
import LoadingIcon from "@/components/Icons/Loading"
import List from "./List"
import { ICard } from "@/models/Card"
import DeleteConfirm from "./DeleteConfirm"
import { useBoard } from "./Context"

const Board = () => {
  const [modalDelete, setModalDelete] = useState<ICard>()
  const [card, setCard] = useState<ICard>()
  const [open, setOpen] = useState(false)
  const { board, card: cardContext } = useBoard()

  const handleEdit = (card: ICard) => {
    setCard(card)
    setOpen(true)
  }

  const handleClose = () => {
    setCard(undefined)
    setOpen(false)
  }

  const handleSuccess = () => {
    board?.refetch()
    cardContext?.refetch()
    setCard(undefined)
  }

  return (
    <>
      <Head>
        <title>{`Board: ${board?.data?.board?.name || ""}`}</title>
      </Head>
      <Layout
        className="!px-0"
        actions={
          <span className="text-white font-bold text-lg flex flex-row items-center gap-2">
            {board?.isInitialLoading ? <LoadingIcon fill="#fff" /> : undefined}
            {board?.data?.board?.name}
            {board?.isRefetching ? <LoadingIcon fill="#fff" /> : undefined}
          </span>
        }
      >
        <div className="flex flex-row justify-start items-start px-4 overflow-auto h-screen gap-4">
          <List onDelete={setModalDelete} onEdit={handleEdit} />
          <div className="w-72 my-2">
            <Button
              size="small"
              color="primary"
              className="w-72"
              onClick={() => setOpen(true)}
            >
              + Add Card
            </Button>
          </div>
        </div>
      </Layout>
      <ModalForm
        onClose={handleClose}
        open={open}
        onSuccess={handleSuccess}
        card={card}
      />
      <DeleteConfirm
        onClose={() => setModalDelete(undefined)}
        onSuccess={handleSuccess}
        modalDelete={modalDelete}
      />
    </>
  )
}

export default Board
