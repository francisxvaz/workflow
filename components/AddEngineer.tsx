'use client'
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

export default function AddEngineer({ onComplete }: { onComplete: Function }) {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  let engineerToastId = "engineer";

  const { mutate } = useMutation(
    async (name: string) => {
      return axios.post("/api/en", {
        name,
      });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["ens"]);
        toast.success("Added Engineer", { id: engineerToastId });
        onComplete();
      },
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: engineerToastId });
        }
      },
    }
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(name);
  };

  return (
    <main className="flex min-h-screen flex-col bg-purple-100 items-center justify-between p-24">
      <div className="grid grid-cols-1 gap-2 bg-purple-500 p-10 rounded-lg">
        <form onSubmit={submit} className="my-3">
          <div className="grid grid-cols-1 gap-2">
            <div className="text-xs text-white font-bold">Name</div>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
