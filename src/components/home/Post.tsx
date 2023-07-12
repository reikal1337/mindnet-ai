"use client"

import { setPostReaction } from "@/service/client/post"

function Post({id, content ,createdAt ,username, likeCount, dislikeCount, likedByUser, dislikedByUser}: Post) {

  const liked = JSON.parse(likedByUser)
  const disliked = JSON.parse(dislikedByUser)

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
        <span>{username}</span>
        <p>{content}</p>
        <span>{createdAt}</span>
        <button style={{backgroundColor: liked ? "blue": 'initial'}}onClick={() => handleReaction(true)} >Like</button>
        <span>{likeCount}</span>
        <span>{dislikeCount}</span>
        <button style={{backgroundColor: disliked ? "red": 'initial'}}  onClick={() => handleReaction(false)} >Dislike</button>
    </div>
    </>
  )
}

export default Post