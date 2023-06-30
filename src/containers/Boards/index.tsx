import ButtonSecondary from "@/components/ButtonSecondary"
import Layout from "@/components/Layout"
import Paper from "@/components/Paper"
import axios from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import Modal from "./Modal"
import List from "./List"
import { IBoard } from "@/models/Board"
import LoadingIcon from "@/components/Icons/Loading"
import DeleteConfirm from "./DeleteConfirm"

interface QueryReturn {
  readonly boards: IBoard[]
}

const Boards = () => {
  const [modalDelete, setModalDelete] = useState<IBoard>()
  const [board, setBoard] = useState<IBoard>()
  const [open, setOpen] = useState(false)
  const { data, refetch, isInitialLoading, isFetched } = useQuery<QueryReturn>({
    queryKey: ["boards"],
    queryFn: () => axios.get("/boards"),
    retry: 3,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  const handleSuccess = () => {
    refetch()
    setBoard(undefined)
  }

  const handleEdit = (board: IBoard) => {
    setBoard(board)
    setOpen(true)
  }

  const handleClose = () => {
    setBoard(undefined)
    setOpen(false)
  }

  return (
    <>
      <Layout>
        <div className="flex justify-center items-center h-full">
          <div className="max-w-md w-full mt-8 space-y-5">
            <h3 className="text-4xl text-center font-special">Your Boards</h3>
            <Paper>
              {data?.boards?.length === 0 && isFetched ? (
                <div className="flex flex-col items-center my-4">
                  No board yet
                </div>
              ) : undefined}
              <List
                onDelete={setModalDelete}
                onSuccess={() => refetch()}
                boards={data?.boards || []}
                onEdit={handleEdit}
              />
              {isInitialLoading ? (
                <div className="flex flex-col items-center my-4">
                  <LoadingIcon />
                </div>
              ) : undefined}

              <ButtonSecondary
                className="text-black text-center w-full"
                onClick={() => setOpen(true)}
              >
                + New Board
              </ButtonSecondary>
            </Paper>
          </div>
        </div>
      </Layout>
      <Modal
        open={open}
        onClose={handleClose}
        onSuccess={handleSuccess}
        board={board}
      />
      <DeleteConfirm
        onSuccess={refetch}
        modalDelete={modalDelete}
        onClose={() => setModalDelete(undefined)}
      />
    </>
  )
}

export default Boards
