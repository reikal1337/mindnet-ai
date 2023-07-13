import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"
import { Prisma } from "@prisma/client"


// export async function GET(req: Request){
//   const session = await getServerSession(authOptions)
//   console.log("Session route: ", session)
//   // const body = await req.json()
//   return NextResponse.json({posts: []})
// }

export async function GET(req: Request){
  const session = await getServerSession(authOptions)

    const posts: Post[] = await prisma.$queryRaw(
      Prisma.sql`
      SELECT
      p.id,
      p.content,
      p.createdAt,
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
      
    return NextResponse.json(posts, {status: 200})

}