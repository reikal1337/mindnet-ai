import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prismaClient"
import { NextRequest, NextResponse } from "next/server"
import { ReactionType } from "@prisma/client"

type Prop = {
        params: {
            postId: string,
            reaction: string
        }
}


//Add reaction to post.
export async function PUT(req: Request,{params}: Prop){
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json({message: "You don't have persmision!"}, {status: 401})
    console.log("Params: ", params)
    const { postId, reaction: upperCaseReaction } = params
    const reaction = upperCaseReaction.toUpperCase() as ReactionType

    if(!postId || !["LIKE","DISLIKE"].includes(reaction)) return NextResponse.json({message: "Not acceptable request params!"}, {status: 406})
    // const reactionBoolean = reaction === "true"
    
    const existingReaction = await prisma.reaction.findFirst({
        where: {
            postId: postId,
            userId: session.user.id,
            Comment: null
        }
    })

    if(existingReaction){
        if(existingReaction.type === reaction){
            await prisma.reaction.delete({
                where: {
                    id: existingReaction.id
                }
            })
        }else{
            await prisma.reaction.update({
                where: {
                    id: existingReaction.id
                },
                data: {
                    type: reaction
                }
            })
        }
        
        return NextResponse.json({message: "Your reaction has been updated!"}, {status: 200})
    }else{
        await prisma.reaction.create({
            data: {
                postId: postId,
                userId: session.user.id,
                type: reaction,
            }
        })
        return NextResponse.json({message: "Your reaction has been added!"}, {status: 201})

    }

}