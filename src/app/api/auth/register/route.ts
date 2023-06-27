import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
const bcrypt = require("bcrypt")
import { isValidPassword, isValidUsername} from '@/lib/validation/auth'


export async function POST(req: Request, res: Response){
    const body = await req.json()

    const {email, username, password} = body
    if(!username || !email || !password) return NextResponse.json({message: "Missing data!"}, {status: 406, statusText: "1"})
    const userExists = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if(userExists) return NextResponse.json({message: "User already used!"}, {status: 406, statusText: "2"}) 

    const emailExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    
    if(emailExists) return NextResponse.json({message: "Email already used!"}, {status: 406, statusText: "3"}) 

    if(!isValidUsername(username)) return NextResponse.json({message: "Username must be 5-15 and only contain a-z,A-Z,0-9"}, {status: 406, statusText: "4"})
    if(!isValidPassword(password)) return NextResponse.json({message: `Passowrd must be 6-15 and only contain a-z, A-Z, 0-9, (~\`!@#$%^&*()_-+={[}]|:;"'<,>.?/)`}, {status: 406, statusText: "5"})

    const salt = await bcrypt.genSalt(10)
    const passwordHash: string = await bcrypt.hash(password, salt)
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password: passwordHash,
        }
    })
    // console.log(newUser)

    return NextResponse.json({message: "User registered!"}, {status: 201})
}