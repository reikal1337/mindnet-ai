import Image from 'next/image'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import User from './User'


export default async function Home() {

  const session = await getServerSession(authOptions)
  return (
    <main >
      <h1>Home</h1>
      <p>{JSON.stringify(session)}</p>
    </main>
  )
}
