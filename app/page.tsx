"use client";
import ListJobs from "@/components/ListJobs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function refresh() {
    router.refresh();
  
  }
  function onEdit(id:string) {
    router.push(`/jobs/edit/${id}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-purple-100 items-center justify-between p-24">
      <h1 className="font-bold">JOBS</h1>
      <ListJobs onDelete={refresh} onEdit={(id:string) => onEdit(id)} />
      <Link
        href={"./jobs/add"}
        className="border-1 bg-green-700 text-white font-bold rounded-md px-5 py-1"
      >
        Add
      </Link>
    </main>
  );
}
