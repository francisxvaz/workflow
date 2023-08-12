import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  //Return Design Codes
  try {
    const pes = await prisma.pressureEquipment.findMany();
    const dcs = await prisma.designCodes.findMany();
    const ens = await prisma.engineer.findMany();
    const all = {pes, dcs, ens}

    return new NextResponse(
       JSON.stringify(all), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error has occured while making a post" });
  }
}
