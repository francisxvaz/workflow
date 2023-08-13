import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await prisma.job.findMany({
      select: { pressureEquipment: {}, designCode: {}, engineer: {} },
    });
    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error has occured while making a post" });
  }
}

export async function POST(request: Request) {
  const { pe, dc, en } = await request.json();
  const result = await prisma.job.create({
    data: {
      pressureEquipmentId: String(pe),
      designCodeId: String(dc),
      engineerId: String(en),
    },
  });
  return NextResponse.json({ result });
}

export async function DELETE(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id");
  const result = await prisma.job.delete({
    where: { id: String(id) },
  });
  return NextResponse.json({ result });
}
