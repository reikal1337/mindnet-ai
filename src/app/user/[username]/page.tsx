import Feed from '@/components/home/Feed'
import { getAllUserPosts } from '@/service/server/user'
import React from 'react'

type Props = {
    params:{
        username: string
    }
        
}

async function User({params}: Props) {
    const posts: Post[] = await getAllUserPosts(params.username)

  return (
    <>
      <div>{params.username}</div>
    {posts.length > 0 ?
      <Feed posts={posts} />
      :
      <h2>No posts!</h2>
    }
    </>
    
  )
}

export default User