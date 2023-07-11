import { Session } from "next-auth"
import { prisma } from "@/lib/prismaClient"
import { Prisma } from "@prisma/client"


export async function createPost(formData: string) {
    const response = await fetch("http://localhost:3000/api/posts/create",{
      method: "POST",
      headers: {
        "Content-Type": "aplication/json"
      },
      body: JSON.stringify(formData)
    })
    if(!response.ok){
      throw new Error("Failed to register")
    }

    
    
    return response.json()
  }

export async function getAllPosts(session: Session | null) {
  const posts: Post[] = await prisma.$queryRaw(
    Prisma.sql`
    SELECT
    p.id,
    p.content,
    CONVERT(p.createdAt,CHAR),
    u.username,
    CONVERT(
      COUNT(
        CASE WHEN r.type = 'LIKE'
        AND r.commentId IS NULL THEN 1 END
      ),
      CHAR
    ) AS likeCount,
    CONVERT(
      COUNT(
        CASE WHEN r.type = 'DISLIKE'
        AND r.commentId IS NULL THEN 1 END
      ),
      CHAR
    ) AS dislikeCount,
    IF(
      r.type = 'LIKE'
      AND r.commentId IS NULL
      AND r.userId = ${session?.user.id},
      "true",
      "false"
    ) AS likedByUser,
    IF(
      r.type = 'DISLIKE'
      AND r.commentId IS NULL
      AND r.userId = ${session?.user.id},
      "true",
      "false"
    ) AS dislikedByUser
  FROM Post p
  JOIN User u ON u.id = p.userId
  LEFT JOIN Reaction r ON r.postId = p.id
  GROUP BY
    p.id,
    p.content,
    p.createdAt,
    u.username,
    likedByUser,
    dislikedByUser
    `)
    //'cljekwz2l0000u8uwq1lkxuhn'
      console.log(posts[0].createdAt)


   return posts



}

