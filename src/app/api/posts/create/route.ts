import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prismaClient"


export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json({message: "You don't have persmision!"}, {status: 401}) 
    const body = await req.json() as string
    if(body.length >= 2 && body.length <= 500){
        const newTweet = await prisma.post.create({
            data: {
                userId: session.user.id,
                content: body,
            }
        })
        if(newTweet) return NextResponse.json({message: "New post has been made!"}, {status: 201})
    }
    
    return NextResponse.json({message: "Post has to be 2-500 in lenght!"}, {status: 406})
}