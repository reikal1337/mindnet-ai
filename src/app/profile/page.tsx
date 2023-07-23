import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getAllUserPosts } from '@/service/server/user'
import Feed from '@/components/home/Feed'


type Props = {}

async function Profile({}: Props) {
  const session = await getServerSession(authOptions)
  const posts: Post[] = await getAllUserPosts(session?.user.name)

  
  return (
    
    <>
    <h1>{`${session?.user.name} profile`}</h1>
    {posts.length > 0 ?
      <Feed loggedIn={true} posts={posts} />
      :
      <h2>No posts!</h2>
    }
    </>
  )
}

export default Profile