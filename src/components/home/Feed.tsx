import getTimeAgo from "@/lib/dateFormater"
import Post from "./Post"

type Props = {
  posts: Post[],
  loggedIn: boolean
  
}

async function Feed({posts,loggedIn}: Props) {
  
  return (
    <>
    {posts.length > 0 ? posts.map((post) =>{
      const createdAtFormated = getTimeAgo(post.createdAt)

      return (
      <Post key={post.id} {...post} loggedIn={loggedIn} createdAt={createdAtFormated} />
      )
    })
    :
    <h2>No posts</h2>
    }
    </>
    
  )
}

export default Feed