import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id != null) {
      const result = await prisma.job.findFirst({
        where: { id: id },
        select: { id: {}, pressureEquipment: {}, designCode: {}, engineer: {} },
      });
      return new NextResponse(JSON.stringify(result), {
        status: 200,
      });
    }

    const result = await prisma.job.findMany({
      select: { id: {}, pressureEquipment: {}, designCode: {}, engineer: {} },
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

export async function PUT(request: Request) {
  const { pe, dc, en, id } = await request.json();
  const result = await prisma.job.update({
    where: {
      id: id
    },
    data: {
      pressureEquipmentId: String(pe),
      designCodeId: String(dc),
      engineerId: String(en),
    },
  });
  return NextResponse.json({ result });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const result = await prisma.job.delete({
    where: { id: String(id) },
  });
  return NextResponse.json({ result });
}
