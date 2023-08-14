import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  //Return Pressure Equipments
  try {
    const result = await prisma.engineer.findMany();
    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error has occured while making a post" });
  }
}

export async function POST(request: Request) {
  const { name} = await request.json();
  const result = await prisma.engineer.create({data: {"name": name}});
  return NextResponse.json({ result })
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')
  const result = await prisma.engineer.delete({
    where: {id : String(id)}  
  });
  return NextResponse.json({ result })
}