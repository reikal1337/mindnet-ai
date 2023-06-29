import Image from 'next/image'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
// import { useSession } from 'next-auth/react'
// import { Session } from 'next-auth/core/types'

export default async function Home() {

  const session = await getServerSession(authOptions)
  // const {data, status} = useSession()
  return (
    <main >
      <h1>Home</h1>

      <h2>Server Sesion</h2>
      {session ?
      <p>{JSON.stringify(session,null, 2)}</p>
      :
      <p>No sesssion</p>
      }
      
      
    </main>
  )
}
