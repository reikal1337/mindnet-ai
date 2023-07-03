import { getAllPosts } from "@/service/home"
import Post from "./Post"


type Props = {
  posts: Post[]
}


async function Feed({posts}: Props) {
  
  console.log(posts)
  return (
    <>
    {posts.length > 0 ? posts.map(post => (
      <Post key={post.id} id={post.id} likes={post._count.likes} user={post.user.username} content={post.content} createdAt={post.createdAt}/>
    ))
    :
    <h2>No posts</h2>
    }
    </>
    
  )
}

export default Feed