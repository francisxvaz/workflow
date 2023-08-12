import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  //Return Design Codes
  try {
    const result = await prisma.designCodes.findMany();
    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error has occured while making a post" });
  }
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const pressureEquipmentId = formData.get('pressureEquipmentId')
  const result = await prisma.designCodes.create({data: {name: String(name), pressureEquipmentId: String(pressureEquipmentId)}});
  return NextResponse.json({ result })
}

export async function DELETE(request: Request) {
  const formData = await request.formData()
  const id = formData.get('id')
  const result = await prisma.designCodes.delete({
    where: {id : String(id)}  
  });
  return NextResponse.json({ result })
}