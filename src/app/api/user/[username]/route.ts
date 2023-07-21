import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prismaClient"
import { Prisma } from "@prisma/client"

type Prop = {
    params: {
        username: string,
    }
}

export async function GET(req: Request,{params}: Prop){
    const session = await getServerSession(authOptions)
  
    if(!session) return NextResponse.json({message: "You don't have persmision!"}, {status: 401})

    const { username } = params
    const retrievedUser = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            username: true,
            image: true
        }
    })
    if(!retrievedUser) return NextResponse.json({message: "Such user doesn't exist!"}, {status: 406})

    const posts: Post[]= await prisma.$queryRaw(
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
      WHERE p.userId = ${retrievedUser.id}
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