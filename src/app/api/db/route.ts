import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response){
    const users = await prisma.user.findMany();
    const accounts = await prisma.account.findMany();

    return NextResponse.json({users,accounts}, {status: 200})
}


export async function DELETE(req: Request, res: Response){
    await prisma.user.deleteMany();
    await prisma.account.deleteMany();
    return NextResponse.json({message: "Tables user,accounts deleted!"})
}