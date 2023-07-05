"use client"

import { setPostReaction } from "@/service/post"

type Props = {
    id: string,
    user: string,
    content: string,
    likes: string,
    dislikes: string
    createdAt: string,
}



function Post({id, user, content, likes,dislikes , createdAt}: Props) {

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
        <span>{dislikes}</span>
        <button onClick={() => handleReaction(false)} >Dislike</button>
    </div>
    </>
  )
}

export default Post