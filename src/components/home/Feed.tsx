import { getAllPosts } from "@/service/home"
import Post from "./Post"

async function Feed() {
  const data = await getAllPosts()
  const posts: Post[] = data.posts 
  
  return (
    <>
    {posts.map(post => (
      <Post key={post.id} user={post.user.username} content={post.content} createdAt={post.createdAt}/>
    ))}
    </>
    
  )
}

export default Feed