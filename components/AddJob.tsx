"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { designCodeType, engineerType, pressureEquipmentType } from "..";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";


type JobProps = {
  pe: string;
  dc: string;
  en: string;
};

export default function AddJob() {
  const [designCodes, setDesignCodes] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  let commentToastId: string;

  const [pe, setpe] = useState("");
  const [dc, setdc] = useState("");
  const [en, seten] = useState("");

  const [showStepOne, setshowStepOne] = useState(true);
  const [showStepTwo, setshowStepTwo] = useState(false);
  const [showStepThree, setshowStepThree] = useState(false);
  const [showStepFour, setshowStepFour] = useState(false);

  const { mutate } = useMutation(
    async (data: JobProps) => {
      return axios.post("/api/job",  data );
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["jobs"]);
        toast.success("Added your job", { id: commentToastId });
        router.push('/', { scroll: false })
      },
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  function handlePEChange(pe: string) {
    setDesignCodes(
      data.dcs.filter((dc: designCodeType) => dc.pressureEquipmentId === pe)
    );
    setpe(pe);
    setdc("");
    seten("");
  }

  function handleDCChange(dc: string) {
    setdc(dc);
  }

  function handleENChange(en: string) {
    seten(en);
  }

  function onStepOneNextClick() {
    setshowStepOne(false);
    setshowStepTwo(true);
  }

  function onStepTwoBackClick() {
    setshowStepOne(true);
    setshowStepTwo(false);
  }

  function onStepTwoNextClick()
  {
    setshowStepThree(true);
    setshowStepTwo(false);
  }

  function onStepThreeNextClick(){
    setshowStepThree(false)
    setshowStepFour(true)
  }
  function onStepThreeBackClick(){
    setshowStepThree(false)
    setshowStepTwo(true);
  }

  function onStepFourBackClick(){
    setshowStepFour(false);
    setshowStepThree(true)
  }

  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

       const handleCheckboxChange = (event) => {
        setIsAgreed(event.target.checked);

      };
       const handleSubmitCheckboxChange = (event) => {
        setIsSubmit(event.target.checked);

      };

  function submit()
  {
    commentToastId = toast.loading("Adding your job", {
      id: commentToastId,
    });
    mutate({ pe, dc, en });
  }

  const { isLoading, error, data } = useQuery("alldata", () =>
    fetch("/api/all").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const peName = data.pes.filter((x) => x.id == pe)[0];
  const dcName = data.dcs.filter((x) => x.id == dc)[0];
  const enName = data.ens.filter((x) => x.id == en)[0];

  return (
    <main className="flex min-h-screen flex-col bg-purple-100 items-center justify-between p-24">
      {showStepOne ? (
        <div className="grid grid-cols-1 gap-10 bg-purple-500 p-10 rounded-lg">
          <div>
            <div className="text-xs font-bold mb-2 text-white">
              Select Pressure Equipment
            </div>
            <Select onValueChange={handlePEChange} value={pe}>
              <SelectTrigger className="w-[260px]">
                <SelectValue placeholder="Select Pressure Equipment" />
              </SelectTrigger>
              <SelectContent>
                {data.pes.map((pe: pressureEquipmentType) => (
                  <SelectItem key={pe.id} value={pe.id}>
                    {pe.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {designCodes != "" ? (
            <div>
              <div className="text-xs font-bold mb-2 text-white">
                Select Design Code
              </div>

              <Select onValueChange={handleDCChange} value={dc}>
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Select Design Code" />
                </SelectTrigger>
                <SelectContent>
                  {designCodes.map((dc: designCodeType) => (
                    <SelectItem key={dc.id} value={dc.id}>
                      {dc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            ""
          )}

          {designCodes != "" ? (
            <div>
              <div className="text-xs font-bold mb-2 text-white">
                Select Engineer
              </div>

              <Select onValueChange={handleENChange} value={en}>
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Select Engineer" />
                </SelectTrigger>
                <SelectContent>
                  {data.ens.map((en: engineerType) => (
                    <SelectItem key={en.id} value={en.id}>
                      {en.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            ""
          )}
          {pe != "" && dc != "" && en != "" ? (
            <div className="flex justify-end">
              <Button onClick={onStepOneNextClick}>Next</Button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {/* step two */}
      {showStepTwo ? (
        <div className="grid grid-cols-1 gap-10 bg-purple-500 p-10 rounded-lg">
          <div>
            <div className="grid grid-cols-2 mb-5 font-bold gap-5">
              <div className="text-white"> Pressure Equipment => </div>
              {peName.name}
            </div>
            <div className="grid grid-cols-2 mb-5 font-bold gap-5">
              <div className="text-white"> Design Code => </div>
              {dcName.name}
            </div>
            <div className="grid grid-cols-2 mb-5 font-bold gap-5">
              <div className="text-white"> Engineer => </div>
              {enName.name}
            </div>
            
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={onStepTwoNextClick}>Next</Button>
            <Button onClick={onStepTwoBackClick} className="bg-gray-500">
              Back
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}

      {showStepThree ? <div className="grid grid-cols-1 gap-10 bg-purple-500 p-10 rounded-lg">
  <div>
    <div className="grid grid-cols-2 mb-5 font-bold gap-5">
       <a className='bg-black text-white p-2 rounded-md flex justify-center w-[70%]' target='_blank' href='https://docs.google.com/spreadsheets/d/1LyZhKMPsYUp0XXYLD6NJJKeR1GgEGBwW'>Click here to open the calculations</a>
    </div>
    <div className="grid grid-cols-1 mb-5 font-bold gap-5">
      
      </div>
    <div className="grid grid-cols-2 mb-5 font-bold gap-5">
      I Agree that I have done my calculations
    <input
          type="checkbox"
          checked={isAgreed}
          onChange={handleCheckboxChange}
        />
    </div>
    
  </div>
  <div className="flex justify-end gap-2">
  <div className="flex justify-end gap-2">
            {isAgreed ? <Button onClick={onStepThreeNextClick}>Next</Button> : "" }
            
            <Button onClick={onStepThreeBackClick} className="bg-gray-500">
              Back
            </Button>
          </div>
  </div>
  </div> : ""}


  {showStepFour ? <div className="grid grid-cols-1 gap-10 bg-purple-500 p-10 rounded-lg">
  <div>
    <div className="grid grid-cols-2 mb-5 font-bold gap-5">
       <a className='bg-black text-white p-2 rounded-md flex justify-center w-[80%]' target='_blank' href='https://docs.google.com/document/d/1vgt-mRRCyEYmGZiQp5EmoEY7-xjBHQSD/edit'>Click here to open the checklist</a>
    </div>
    <div className="grid grid-cols-1 mb-5 font-bold gap-5">
      </div>
    <div className="grid grid-cols-2 mb-5 font-bold gap-5">
      I Agree that I have comlepted my check list 
    <input
          type="checkbox"
          checked={isSubmit}
          onChange={handleSubmitCheckboxChange}
        />
    </div>
    
  </div>
  <div className="flex justify-end gap-2">
  <div className="flex justify-end gap-2">
            {isSubmit ? <Button onClick={submit}>Submit</Button> : ""}
            
            <Button onClick={onStepFourBackClick} className="bg-gray-500">
              Back
            </Button>
          </div>
  </div>
  </div> : ""}



    </main>
  );
}
