import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response){
    const users = await prisma.user.findMany();
    const accounts = await prisma.account.findMany();
    const posts = await prisma.post.findMany();

    return NextResponse.json({users, accounts, posts}, {status: 200})
}


export async function DELETE(req: Request, res: Response){
    // await prisma.user.deleteMany();
    // await prisma.account.deleteMany();
    await prisma.post.deleteMany();
    return NextResponse.json({message: "Tables user,accounts deleted!"})
}