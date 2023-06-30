import { IBoard } from "@/models/Board"
import { ICard } from "@/models/Card"
import axios from "@/utils/axios"
import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { FC, ReactNode, createContext, useContext } from "react"

interface BoardReturn {
  readonly board: IBoard
}

interface CardReturn {
  readonly cards: ICard[]
}

interface ContextValues {
  readonly board: UseQueryResult<BoardReturn>
  readonly card: UseQueryResult<CardReturn>
}

export const BoardContext = createContext<ContextValues>({} as ContextValues)

export const useBoard = () => {
  const board = useContext(BoardContext)

  return board
}

interface Props {
  readonly children: ReactNode
}

const BoardContextProvider: FC<Props> = ({ children }) => {
  const { query, push } = useRouter()
  const board = useQuery<BoardReturn>({
    queryKey: [query.id, "boards"],
    queryFn: () => axios.get(`/boards/${query.id}`),
    retry: false,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onError: () => push("/boards"),
  })
  const card = useQuery<CardReturn>({
    queryKey: [query.id, "cards"],
    queryFn: () => axios.get(`/cards/${query.id}`),
    retry: 3,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  return (
    <BoardContext.Provider value={{ board, card }}>
      {children}
    </BoardContext.Provider>
  )
}

export default BoardContextProvider
