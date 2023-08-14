"use client";
import React from "react";
import ListJobs from "@/components/ListJobs";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  function refresh() {
    router.refresh();
  }
  return (
    <main className="flex min-h-screen flex-col bg-purple-100 items-center justify-between p-24">
      <ListJobs onDelete={refresh} />
    </main>
  );
}
