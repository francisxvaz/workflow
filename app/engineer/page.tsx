"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

export default function page() {
  const { isLoading, error, data } = useQuery("alldata", () =>
    fetch("http://localhost:3000/api/all").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="flex min-h-screen flex-col bg-purple-100 items-center justify-between p-24">
      {data.ens.map((en) => {
        return <div>{en.name}</div>;
      })}
      <Link href={'./engineer/add'} className="border-1 bg-black text-white font-bold px-5">Add</Link>
    </main>
  );
}
