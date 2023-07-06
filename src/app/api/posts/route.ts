import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"
import { authOptions } from "../auth/[...nextauth]/route"


export async function GET(req: Request){
  const session = await getServerSession(authOptions)
  console.log("----------------")
  console.log("GET API",session)
  return NextResponse.json({posts: []})
}

// export async function GET(req: Request){
//   const session = await getServerSession(authOptions)
//     // const posts = await prisma.post.findMany({
//     //     select: {
//     //         id: true,
//     //         content: true,
//     //         createdAt: true,
//     //         _count: {
//     //             select:{
//     //                 likes: { where: {type: "LIKE"}},
                    
//     //             },
//     //         },
//     //         user: {
//     //             select: {
//     //                 username: true
//     //             }
//     //         }
//     //     },
        
//     // })
//     console.log("Session:", session)
//     console.log("UserID:",session?.user.id)
//     //     const posts = await prisma.$queryRaw`
//     //     SELECT
//     //       p.id,
//     //       p.content,
//     //       p.createdAt,
//     //       u.username,
          
//     //       CONVERT(COUNT(CASE WHEN r.type = 'LIKE' AND r.commentId IS NULL THEN 1 END), CHAR) AS likeCount,
//     //       CONVERT(COUNT(CASE WHEN r.type = 'DISLIKE' AND r.commentId IS NULL THEN 1 END), CHAR) AS dislikeCount
//     //       MAX(r.type = 'LIKE' AND r.commentId IS NULL AND r.userId = ${session?.user.id}) AS likedByUser
//     //     FROM Post p
//     //     JOIN User u ON u.id = p.userId
//     //     LEFT JOIN Reaction r ON r.postId = p.id
//     //     GROUP BY p.id, p.content, p.createdAt, u.username
//     //   `
//     //   console.log(posts)
//     return NextResponse.json({posts: []}, {status: 200})

// }