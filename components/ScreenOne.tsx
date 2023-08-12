import React from "react";
import { PrismaClient } from '@prisma/client'


export default async function ScreenOne({onSubmit}:{onSubmit: Function}) {
  const prisma = new PrismaClient()
  const pr = await prisma.pressureEquipments.findMany()
  return (
    <div className="bg-slate-100 grid grid-col-1 p-10 gap-5">
      
          {pr.map((t) => (
            <div>{t.id} {t.name}</div>
          ))}
    </div>
  );
}
