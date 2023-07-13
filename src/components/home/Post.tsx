"use client"

import { setPostReaction } from "@/service/client/post"
import { useState } from "react"

function Post({id, content ,createdAt ,username, likeCount, dislikeCount, likedByUser, dislikedByUser}: Post) {
  const [isLiked,setIsLiked] = useState(JSON.parse(likedByUser))
  const [isDisliked,setIsDisliked] = useState(JSON.parse(dislikedByUser))

  const [likedCount, setLikedCount] = useState(parseInt(likeCount))
  const [dislikedCount, setDislikedCount] = useState(parseInt(dislikeCount))


  const handleReaction = (isLike: boolean) => {
    if(isLike){
      if(isLiked){
        setIsLiked(false)
        setLikedCount(prevState => prevState - 1)
      }else{
        setIsLiked(true)
        setLikedCount(prevState => prevState + 1)

        setIsDisliked(false)
        setDislikedCount(prevState => prevState - 1)
      }
      setPostReaction(id,"like")
    }else{
      if(isDisliked){
        setIsDisliked(false)
        setDislikedCount(prevState => prevState - 1)
      }else{
        setIsDisliked(true)
        setDislikedCount(prevState => prevState + 1)

        setIsLiked(false)
        setLikedCount(prevState => prevState - 1)
      }
      setPostReaction(id,"dislike")
    }
  }

  return (
    <>
    <br/>
    <div>
        <span>{username}</span>
        <p>{content}</p>
        <span>{createdAt}</span>
        <button style={{backgroundColor: isLiked ? "blue": 'initial'}}onClick={() => handleReaction(true)} >Like</button>
        <span>{likedCount}</span>
        <span>{dislikedCount}</span>
        <button style={{backgroundColor: isDisliked ? "red": 'initial'}}  onClick={() => handleReaction(false)} >Dislike</button>
    </div>
    </>
  )
}

export default Post