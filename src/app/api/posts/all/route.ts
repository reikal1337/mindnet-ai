import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"


// export async function GET(req: NextRequest, res: Request){
//   const session = await getServerSession(authOptions)
//   console.log(session)
//   // console.log("Req", req)
//   // const body = await req.json()
//   // console.log("----------------")
//   // console.log("GET API",body)
//   return NextResponse.json({posts: []})
// }

export async function GET(req: Request){
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
    console.log("Session:", session)
    console.log("UserID:",session?.user.id)
      //   const posts = await prisma.$queryRaw`
      //   SELECT
      //     p.id,
      //     p.content,
      //     p.createdAt,
      //     u.username,
          
      //     CONVERT(COUNT(CASE WHEN r.type = 'LIKE' AND r.commentId IS NULL THEN 1 END), CHAR) AS likeCount,
      //     CONVERT(COUNT(CASE WHEN r.type = 'DISLIKE' AND r.commentId IS NULL THEN 1 END), CHAR) AS dislikeCount
      //     MAX(r.type = 'LIKE' AND r.commentId IS NULL AND r.userId = ${session?.user.id}) AS likedByUser
      //   FROM Post p
      //   JOIN User u ON u.id = p.userId
      //   LEFT JOIN Reaction r ON r.postId = p.id
      //   GROUP BY p.id, p.content, p.createdAt, u.username
      // `
      console.log(posts)
    return NextResponse.json({posts: []}, {status: 200})

}