"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type Comment = {
  postId?: string;
  title: string;
};
type JobProps = {
  pe: string;
  dc: string;
  en: string;
};
export default function AddJob({ pe, dc, en }: JobProps) {
  let commentToastId: string;
  const [p, setp] = useState(pe);
  const [d, setd] = useState(dc);
  const [e, sete] = useState(en);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (data: JobProps) => {
      return axios.post("/api/job", { data });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["jobs"]);
        toast.success("Added your job", { id: commentToastId });
      },
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    commentToastId = toast.loading("Adding your job", {
      id: commentToastId,
    });
    mutate({ pe, dc, en });
  };


  const { isLoading, error, alldata } = useQuery("alldata", () =>
    fetch("http://localhost:3000/api/all").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  return (
    <form onSubmit={submitPost} className="my-8">
      <h3 className="text-xl">Add a Job</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  );
}
