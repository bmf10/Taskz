import type { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react"
import Image from "next/image"
import { FC } from "react"

interface Props {
  readonly providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | never[]
}

const SignIn: FC<Props> = ({ providers }: Props) => {
  return (
    <div className="w-screen h-screen bg-blue-400 flex justify-center items-center flex-col gap-4">
      <h1 className="text-6xl text-white font-special">Login</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="px-4 py-2 bg-white rounded-md shadow transition-shadow hover:shadow-lg disabled:bg-gray-300 flex flex-row gap-3 items-center"
            onClick={() => signIn(provider.id)}
          >
            <Image src="/google.png" width={20} height={20} alt="google-logo" />
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default SignIn
