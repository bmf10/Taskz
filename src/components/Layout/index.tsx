import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import type { FC, ReactNode } from "react"
import Image from "next/image"
import Dropdown from "@/components/Dropdown"
import { Menu } from "@headlessui/react"

interface Props {
  readonly children: ReactNode
  readonly actions?: ReactNode
}

const Layout: FC<Props> = ({ children, actions }: Props) => {
  const { data: session } = useSession()

  return (
    <div className="min-w-full min-h-full">
      <header className="flex flex-row bg-blue-400 px-4 py-1 shadow-sm fixed w-full justify-between items-center z-10">
        <Link href="/">
          <h1 className="text-4xl text-white font-special leading-none">
            Taskz
          </h1>
        </Link>
        {actions}
        <Dropdown
          className="w-8 h-8"
          trigger={
            <Menu.Button>
              <div className="rounded-full">
                {session?.user?.image ? (
                  <Image
                    style={{ borderRadius: "999px" }}
                    width={30}
                    height={30}
                    src={session?.user?.image}
                    alt="profile"
                  />
                ) : (
                  <div>{session?.user?.name?.charAt(0)}</div>
                )}
              </div>
            </Menu.Button>
          }
        >
          <Menu.Item>
            <button
              onClick={() => signOut()}
              className="flex flex-row justify-center items-center gap-2 px-4 py-1 hover:bg-slate-200"
            >
              Logout
            </button>
          </Menu.Item>
        </Dropdown>
      </header>
      <article className="pt-14 px-4 pb-9 min-h-screen">{children}</article>
      <footer className="bg-zinc-800 text-white fixed bottom-0 w-full p-1 text-center text-sm">
        <span>
          Made with ☕️ by{" "}
          <a
            href="https://github.com/bmf10"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            Bima Febriansyah
          </a>
        </span>
      </footer>
    </div>
  )
}

export default Layout
