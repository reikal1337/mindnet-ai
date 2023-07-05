import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"


export async function GET(){
    // const posts = await prisma.post.findMany({
    //     select: {
    //         id: true,
    //         content: true,
    //         createdAt: true,
    //         _count: {
    //             select:{
    //                 likes: { where: {type: "LIKE"}},
                    
    //             },
    //         },
    //         user: {
    //             select: {
    //                 username: true
    //             }
    //         }
    //     },
        
    // })
    
        const posts = await prisma.$queryRaw`
        SELECT
          p.id,
          p.content,
          p.createdAt,
          u.username,
          CONVERT(COUNT(CASE WHEN r.type = 'LIKE' AND r.commentId IS NULL THEN 1 END), CHAR) AS likeCount,
          CONVERT(COUNT(CASE WHEN r.type = 'DISLIKE' AND r.commentId IS NULL THEN 1 END), CHAR) AS dislikeCount
        FROM Post p
        JOIN User u ON u.id = p.userId
        LEFT JOIN Reaction r ON r.postId = p.id
        GROUP BY p.id, p.content, p.createdAt, u.username
      `
      
    return NextResponse.json({posts}, {status: 200})

}