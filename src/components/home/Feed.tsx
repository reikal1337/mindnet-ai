import { getAllPosts } from "@/service/home"
import Post from "./Post"


type Props = {
  posts: Post[]
}


async function Feed({posts}: Props) {
  
  
  return (
    <>
    {posts.length > 0 ? posts.map(post => (
      <Post key={post.id} user={post.user.username} content={post.content} createdAt={post.createdAt}/>
    ))
    :
    <h2>No posts</h2>
    }
    </>
    
  )
}

export default Feed