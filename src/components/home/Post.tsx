"use client"

import { setPostReaction } from "@/service/client/post"
import { useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"

function Post({id, content ,createdAt ,username, likeCount, dislikeCount, likedByUser, dislikedByUser}: Post) {
  const [isLiked,setIsLiked] = useState(JSON.parse(likedByUser))
  const [isDisliked,setIsDisliked] = useState(JSON.parse(dislikedByUser))

  const [likedCount, setLikedCount] = useState(parseInt(likeCount))
  const [dislikedCount, setDislikedCount] = useState(parseInt(dislikeCount))

  const { data: session } = useSession()


  const handleReaction = (isLike: boolean) => {
    if(isLike){
      if(isLiked){
        setIsLiked(false)
        setLikedCount(prevState => prevState - 1)
      }else{
        setIsLiked(true)
        setLikedCount(prevState => prevState + 1)
        if(isDisliked){
          setIsDisliked(false)
        setDislikedCount(prevState => prevState - 1)
        }
        
      }
      setPostReaction(id,"like")
    }else{
      if(isDisliked){
        setIsDisliked(false)
        setDislikedCount(prevState => prevState - 1)
      }else{
        setIsDisliked(true)
        setDislikedCount(prevState => prevState + 1)
        if(isLiked){
          setIsLiked(false)
          setLikedCount(prevState => prevState - 1)
        }
        
      }
      setPostReaction(id,"dislike")
    }
  }

  return (
    <>
    <br/>
    <div>
        <Link href={`/user/${username}`}>{username}</Link>
        <p>{content}</p>
        <span>{createdAt}</span>
        <br />
        {session &&  <button style={{backgroundColor: isLiked ? "blue": 'initial'}} onClick={() => handleReaction(true)} >Like</button>}
        <span>{likedCount}</span>
        <span>{dislikedCount}</span>
        {session && <button style={{backgroundColor: isDisliked ? "red": 'initial'}} onClick={() => handleReaction(false)} >Dislike</button>}
    </div>
    </>
  )
}

export default Post