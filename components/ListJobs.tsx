"use client";
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
import { BiNotepad, BiSolidTrash } from "react-icons/bi";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function ListJobs({ onDelete, onEdit }: { onDelete: Function, onEdit: Function }) {
  const queryClient = useQueryClient();
  let jobToastId = "jobs";

  function onJobDelete(id: string) {
    mutate(id);
    onDelete();
  }

  function onJobEdit(id:string)
  {
    onEdit(id)
  }

  const { mutate } = useMutation(
    async (id: string) => {
      return axios.delete(`/api/job?id=${id}`);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["jobs"]);
        toast.success("Deleted Job", { id: jobToastId });
        onDelete();
      },
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: jobToastId });
        }
      },
    }
  );

  const { isLoading, error, data } = useQuery("jobs", () =>
    fetch("/api/job").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Table className="bg-purple-200 rounded-lg">
      <TableCaption>list of Jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Pressure Equipment</TableHead>
          <TableHead>Desing Code</TableHead>
          <TableHead>Engineer</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((j) => {
          return (
            <TableRow>
              <TableCell className="font-bold">
                {j.pressureEquipment.name}
              </TableCell>
              <TableCell className="font-bold">{j.designCode.name}</TableCell>
              <TableCell className="font-bold">{j.engineer.name}</TableCell>
              <TableCell className="font-bold flex gap-3">
                <span className="text-red-500 hover:cursor-pointer">
                  <BiSolidTrash onClick={() => onJobDelete(j.id)} />
                </span>
                <span className="text-green-500 hover:cursor-pointer">
                    <BiNotepad onClick={() => onJobEdit(j.id)} />
                  </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
