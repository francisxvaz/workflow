"use client";
import Link from "next/link";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BiSolidTrash } from "react-icons/bi";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function ListEngineer({ onDelete }: { onDelete: Function }) {
  let engineerToastId = "engineer";
  const { mutate } = useMutation(
    async (id: string) => {
      return axios.delete(`http://localhost:3000/api/en?id=${id}`);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["engineers"]);
        toast.success("Deleted Engineer", { id: engineerToastId });
        onDelete();
      },
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: engineerToastId });
        }
      },
    }
  );

  const { isLoading, error, data } = useQuery(["engineers"], () =>
    fetch("http://localhost:3000/api/en").then((res) => res.json())
  );

  const queryClient = useQueryClient();

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  function onEngineerDelete(id: string) {
    console.log(id);
    mutate(id);
    onDelete();
  }

  return (
    <main className="flex min-h-screen flex-col bg-purple-100 items-center justify-between p-24">
      <Table>
        <TableCaption>list of Engineers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((en) => {
            return (
              <TableRow key={en.id}>
                <TableCell className="font-bold">{en.name}</TableCell>
                <TableCell className="font-bold">
                  <span className="text-red-500 hover:cursor-pointer">
                    <BiSolidTrash onClick={() => onEngineerDelete(en.id)} />
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Link
        href={"./engineer/add"}
        className="border-1 bg-black text-white font-bold px-5"
      >
        Add
      </Link>
    </main>
  );
}
