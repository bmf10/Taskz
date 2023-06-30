import { GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import { FC } from "react"
import Board from "@/containers/Board"
import BoardContextProvider from "@/containers/Board/Context"

const BoardPage: FC = () => {
  return (
    <BoardContextProvider>
      <Board />
    </BoardContextProvider>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return { redirect: { destination: "/log-in" } }
  }

  return {
    props: {},
  }
}

export default BoardPage
