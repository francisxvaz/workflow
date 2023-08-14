"use client";

import ListEngineer from "@/components/ListEngineer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();

  function refresh() {
    router.refresh();
  }

  return (
    <main className="flex min-h-screen flex-col bg-purple-100 items-center justify-between p-24">
      <h1 className="font-bold">ENGINEERS</h1>
      <ListEngineer onDelete={refresh} />
      <Link
        href={"./engineer/add"}
        className="border-1 bg-green-700 text-white font-bold rounded-md px-5 py-1"
      >
        Add
      </Link>
    </main>
  );
}
