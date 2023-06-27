import { prisma } from "@/lib/prismaClient"
import { NextResponse } from "next/server"
const bcrypt = require("bcrypt")

export async function POST(req: Request, res: Response){
    const body = await req.json()
    const {email, password} = body
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user) return NextResponse.json({message: "Such user doesn't exist!"}, {status: 406, statusText: "1"})
    
    const correctPassword = await bcrypt.compare(password, user.password)
    if(!correctPassword)return NextResponse.json({message: "Wrong password!"}, {status: 406, statusText: "2"})

    return NextResponse.json({}, {status: 200, statusText: "3"})

}