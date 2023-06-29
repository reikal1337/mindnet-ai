"use client"

import { useSession } from "next-auth/react"

type Props = {}

const page = (props: Props) => {
    const{data: session, status} = useSession({
        required: true
    })

    
  return (
    <>
    <h1>Test Page</h1>
    <h2>Client Session</h2>
    <p>{JSON.stringify(session)}</p>
    </>

  )
}

export default page