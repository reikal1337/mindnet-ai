import Image from 'next/image'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import CreateFeedForm from '@/components/home/CreateFeedForm'
import Feed from '@/components/home/Feed'

export default async function Home() {


  const session = await getServerSession(authOptions)
  // const {data, status} = useSession()
  return (
    <main >
      <h1>Home</h1>
      {session ?
      <>
      <button>Global</button>
      <button>Following</button>
      <CreateFeedForm />
      <Feed />
      </>
      :
      <Feed />
      

      }

      
      
      
    </main>
  )
}
