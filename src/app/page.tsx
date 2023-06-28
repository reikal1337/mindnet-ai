
import Image from 'next/image'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
// import { useSession } from 'next-auth/react'

export default async function Home() {

  const session = await getServerSession(authOptions)
  // const sessionCl = await useSession()
  return (
    <main >
      <h1>Home</h1>
      <h2>Server sesion</h2>
      <p>{JSON.stringify(session)}</p>
      <h2>Client Sesion</h2>
      {/* {sessionCl} */}
    </main>
  )
}
