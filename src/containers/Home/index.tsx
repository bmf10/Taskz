import Button from "@/components/Button"
import ButtonSecondary from "@/components/ButtonSecondary"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"

const Home = () => {
  const { data: session } = useSession()
  return (
    <div className="w-screen h-screen bg-blue-400 flex justify-center items-center flex-col gap-4">
      <h1 className="text-6xl text-white font-special">Taskz</h1>
      {session ? (
        <div className="flex flex-col gap-2">
          <Link href="/boards">
            <Button>Go To Boards</Button>
          </Link>
          <ButtonSecondary className="text-white" onClick={() => signOut()}>
            Logout
          </ButtonSecondary>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-white">
            Hi, you need log in to go to the board.
          </h2>
          <Button onClick={() => signIn()}>Login</Button>
        </div>
      )}
    </div>
  )
}

export default Home
