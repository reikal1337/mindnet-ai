import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import CreatePostForm from '@/components/home/CreatePostForm'
import Feed from '@/components/home/Feed'
import { getAllPosts } from '@/service/server/home'

 


export default async function Home() {
const session = await getServerSession(authOptions)
const posts: Post[] = await getAllPosts()
  return (
    <main >
      <h1>Home</h1>
      {session ?
      <>
      <button>Global</button>
      <button>Following</button>
      <CreatePostForm />
      <Feed loggedIn={true} posts={posts} />
      </>
      :
      <Feed loggedIn={false} posts={posts} />
      }
    </main>
  )
}


