import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prismaClient"


export async function GET(){
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            content: true,
            createdAt: true,
            _count: {
                select:{
                    likes: { where: {type: "LIKE"}},
                    

                }
            },
            user: {
                select: {
                    username: true
                }
            }
        },
        
    })

    return NextResponse.json({posts}, {status: 200})

}