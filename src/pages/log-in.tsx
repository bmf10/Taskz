import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import { getProviders } from "next-auth/react"
import Head from "next/head"
import SignIn from "@/containers/SignIn"

const SignInPage = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Taskz: Sign In</title>
      </Head>
      <SignIn providers={providers} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return { redirect: { destination: "/" } }
  }

  const providers = await getProviders()

  return {
    props: { providers: providers ?? [] },
  }
}

export default SignInPage
