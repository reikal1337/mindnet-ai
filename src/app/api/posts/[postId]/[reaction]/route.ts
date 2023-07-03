import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prismaClient"
import { NextRequest, NextResponse } from "next/server"

type Prop = {
        params: {
            postId: string,
            reaction: boolean
        }
}
//Add reaction to post.
export async function PUT(req: Request,{params}: Prop){
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json({message: "You don't have persmision!"}, {status: 401})
    const { postId, reaction } = params

    const existingReaction = await prisma.reaction.findFirst({
        where: {
            postId: postId,
            userId: session.user.id,
            Comment: null
        }
    })

    if(existingReaction){
        await prisma.reaction.update({
            where: {
                id: existingReaction.id
            },
            data: {
                type: reaction ? "LIKE" : "DISLIKE"
            }
        })
        return NextResponse.json({message: "Your reaction has been updated!"}, {status: 200})
    }else{
        await prisma.reaction.create({
            data: {
                postId: postId,
                userId: session.user.id,
                type: reaction ? "LIKE" : "DISLIKE",
            }
        })
        return NextResponse.json({message: "Your reaction has been added!"}, {status: 201})

    }

}