"use client";

import ListEngineer from "@/components/ListEngineer";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {

  const router = useRouter()

  function refresh()
  {
    router.refresh()
  }

   return (
    <main className="flex min-h-screen flex-col bg-purple-100 items-center justify-between p-24">
      <ListEngineer onDelete={refresh}/>
    </main>
  );
}
