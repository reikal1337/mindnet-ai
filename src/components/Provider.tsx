"use client"

import { SessionProvider } from "next-auth/react"
import { HtmlProps } from "next/dist/shared/lib/html-context"
import { ReactNode} from "react"

type Props = {
    children: ReactNode
}
 
function Provider({ children }: Props) {

  return <SessionProvider>{ children }</SessionProvider>
}

export default Provider