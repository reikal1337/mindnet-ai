"use client"

import { setPostReaction } from "@/service/post"

type Props = {
    id: string,
    user: string,
    content: string,
    likes: number,
    createdAt: string,
}



function Post({id, user, content, likes, createdAt}: Props) {

  const handleReaction = (isLike: boolean) => {
    if(isLike){
      console.log("Like")
      setPostReaction(id,true)
    }else{
      console.log("Dislike")
      setPostReaction(id,false)
    }
  }

  return (
    <>
    <br/>
    <div>
        <span>{user}</span>
        <p>{content}</p>
        <span>{createdAt}</span>
        <button onClick={() => handleReaction(true)} >Like</button>
        <span>{likes}</span>
        <button onClick={() => handleReaction(false)} >Dilike</button>
    </div>
    </>
  )
}

export default Post