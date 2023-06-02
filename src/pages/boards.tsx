import Boards from "@/containers/Boards"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import { authOptions } from "./api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

const BoardsPage = () => {
  return (
    <>
      <Head>
        <title>Taskz: Your Boards</title>
      </Head>
      <Boards />
    </>
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

export default BoardsPage
