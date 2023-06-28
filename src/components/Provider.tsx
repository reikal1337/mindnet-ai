"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode} from "react"
import type { AppProps } from "next/app"

type Props = {
    children: ReactNode
}
 
function Provider({ children, session}: Props) {

  return (
    <SessionProvider session={session} >
      {children}
    </SessionProvider>
  )
}

export default Provider