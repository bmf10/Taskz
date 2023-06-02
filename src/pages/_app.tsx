import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import { Roboto, Teko } from "next/font/google"
import "@/styles/globals.css"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "@/utils/queryClient"

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
})

const teko = Teko({
  weight: ["700"],
  variable: "--font-teko",
  subsets: ["latin"],
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-roboto: ${roboto.style.fontFamily};
          --font-teko: ${teko.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster />
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}
