"use client";
import React from "react";
import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function page() {
  const { isLoading, error, data } = useQuery("jobs", () =>
    fetch("http://localhost:3000/api/job").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="flex min-h-screen flex-col bg-purple-100 items-center justify-between p-24">
      <Table>
        <TableCaption>A list of Jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Pressure Equipment</TableHead>
            <TableHead>Desing Code</TableHead>
            <TableHead>Engineer</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((j) => {
            return (
              <TableRow>
                <TableCell className="font-medium">
                  {j.pressureEquipment.name}
                </TableCell>
                <TableCell className="font-bold">{j.designCode.name}</TableCell>
                <TableCell className="font-bold">{j.engineer.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
