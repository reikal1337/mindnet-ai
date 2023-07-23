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
                IFNULL(likes.count, 0),
                CHAR
            ) AS likeCount,
            CONVERT(
                IFNULL(dislikes.count, 0),
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
        LEFT JOIN (
            SELECT postId, COUNT(*) AS count
            FROM Reaction
            WHERE type = 'LIKE' AND commentId IS NULL
            GROUP BY postId
        ) likes ON p.id = likes.postId
        LEFT JOIN (
            SELECT postId, COUNT(*) AS count
            FROM Reaction
            WHERE type = 'DISLIKE' AND commentId IS NULL
            
            GROUP BY postId
        ) dislikes ON p.id = dislikes.postId
        LEFT JOIN Reaction r ON r.postId = p.id AND r.userId = ${session?.user.id}
        WHERE p.userId = ${retrievedUser.id}
        `
    )
        return NextResponse.json(posts, {status: 200})

}