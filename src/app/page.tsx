import Image from 'next/image'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import CreateFeedForm from '@/components/home/CreateFeedForm'
import Feed from '@/components/home/Feed'
import { getAllPosts } from '@/service/home'

export default async function Home() {
  const data = await getAllPosts()
  const posts: Post[] = data.posts 

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
      <Feed posts={posts} />
      </>
      :
      <Feed posts={posts} />
      

      }

      
      
      
    </main>
  )
}
