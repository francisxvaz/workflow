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
import { Input } from "./ui/input";


type JobProps = {
  jobCode: string;
  pe: string;
  dc: string;
  en: string;
};

export default function AddJob() {
  const [designCodes, setDesignCodes] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  let commentToastId: string;

  const [jobCode, setJobCode] = useState("");
  const [pe, setpe] = useState("");
  const [dc, setdc] = useState("");
  const [en, seten] = useState("");

  const [showStepOne, setshowStepOne] = useState(true);
  const [showStepTwo, setshowStepTwo] = useState(false);
  const [showStepThree, setshowStepThree] = useState(false);
  const [showStepFour, setshowStepFour] = useState(false);
  const [showStepFive, setshowStepFive] = useState(false);
  const [showStepSix, setshowStepSix] = useState(false);
  const [showStepSeven, setshowStepSeven] = useState(false);

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

  function onStepThreeBackClick(){
    setshowStepThree(false)
    setshowStepTwo(true);
  }

  function onStepThreeNextClick(){
    setshowStepThree(false)
    setshowStepFour(true)
  }

  function onStepFourBackClick(){
    setshowStepFour(false);
    setshowStepThree(true)
  }
  function onStepFourNextClick(){
    setshowStepFour(false)
    setshowStepFive(true)
  }

  
  function onStepFiveBackClick(){
    setshowStepFour(true);
    setshowStepFive(false)
  }
  function onStepFiveNextClick(){
    setshowStepSix(true)
    setshowStepFive(false)
  }

  function onStepSixBackClick(){
    setshowStepFive(true);
    setshowStepSix(false)
  }
  function onStepSixNextClick(){
    setshowStepSeven(true)
    setshowStepSix(false)
  }

  function onStepSevenBackClick(){
    setshowStepSix(true);
    setshowStepSeven(false)
  }

  const [isCaluclutionsAgreed, setCaluclutionsAgreed] = useState(false);
  const [isChecklistAgreed, setChecklistCheckboxChange] = useState(false);
  const [isCertificateAgreed, setCertificatelistCheckboxChange] = useState(false);
  const [isValidatorAgreed, setValidatorCheckboxChange] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleCaluculationCheckboxChange = (event) => {
    setCaluclutionsAgreed(event.target.checked);
  };

  const handleChecklistCheckboxChange = (event) => {
    setChecklistCheckboxChange(event.target.checked);
  };

  const handleCertificateCheckboxChange = (event) => {
    setCertificatelistCheckboxChange(event.target.checked);
  };

  const handleValidatorCheckboxChange = (event) => {
    setValidatorCheckboxChange(event.target.checked);
  };
  
  const handleSubmitCheckboxChange = (event) => {
  setIsSubmit(event.target.checked);

  };

  function submit()
  {
    commentToastId = toast.loading("Adding your job", {
      id: commentToastId,
    });
    mutate({ pe, dc, en, jobCode });
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
          <div className="text-white text-xs">Step 1/7 select</div>
          <div>
            <div className="text-xs font-bold mb-2 text-white">
              Job Code
            </div>
            <Input onChange={(e) => setJobCode(e.target.value)} value={jobCode} />
          </div>
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
          <div className="text-white text-xs">Step 2/7 for jobid :  <span className="font-bold text-xl">{jobCode}</span></div>
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
  <div className="text-white text-xs">Step 3/7 calculations for jobid:  <span className="font-bold text-xl">{jobCode}</span></div>
    <div className="grid grid-cols-2 mb-5 mt-5 font-bold gap-5">
       <a className='bg-black text-white p-2 rounded-md flex justify-center w-[95%]' target='_blank' href='https://docs.google.com/spreadsheets/d/1FaYf_AIRRDkgbGmhY5LJZBn2TdIbU_Sr/edit#gid=1263088527'>Click here to open the calculations</a>
    </div>
    <div className="grid grid-cols-1 mb-5 font-bold gap-5">
      
      </div>
    <div className="grid grid-cols-2 mb-5 font-bold gap-5">
      I Agree that I have done my calculations
    <input
          type="checkbox"
          checked={isCaluclutionsAgreed}
          onChange={handleCaluculationCheckboxChange}
        />
    </div>
    
  </div>
  <div className="flex justify-end gap-2">
  <div className="flex justify-end gap-2">
            {isCaluclutionsAgreed ? <Button onClick={onStepThreeNextClick}>Next</Button> : "" }
            
            <Button onClick={onStepThreeBackClick} className="bg-gray-500">
              Back
            </Button>
          </div>
  </div>
  </div> : ""}


  {showStepFour ? <div className="grid grid-cols-1 gap-10 bg-purple-500 p-10 rounded-lg">
  <div>
  <div className="text-white text-xs">Step 4/7 checklist for jobid:  <span className="font-bold text-xl">{jobCode}</span></div>
    
    <div className="grid grid-cols-2 mb-5 mt-5 font-bold gap-5">
       <a className='bg-black text-white p-2 rounded-md flex justify-center w-[80%]' target='_blank' href='https://docs.google.com/document/d/1mLTc8t3C2dpTVHTWIDBa-ihdlA2t4qON/edit'>Click here to open the checklist</a>
    </div>
    <div className="grid grid-cols-1 mb-5 font-bold gap-5">
      </div>
    <div className="grid grid-cols-2 mb-5 font-bold gap-5">
      I Agree that I have comlepted my check list 
    <input
          type="checkbox"
          checked={isChecklistAgreed}
          onChange={handleChecklistCheckboxChange}
        />
    </div>
    
  </div>
  <div className="flex justify-end gap-2">
  <div className="flex justify-end gap-2">
  {isChecklistAgreed ? <Button onClick={onStepFourNextClick}>Next</Button> : "" }

            
            <Button onClick={onStepFourBackClick} className="bg-gray-500">
              Back
            </Button>
          </div>
  </div>
  </div> : ""}

  {/* STEP FIVE - CERTIFICATE */}
  {showStepFive ? <div className="grid grid-cols-1 gap-10 bg-purple-500 p-10 rounded-lg">
  <div>
  <div className="text-white text-xs">Step 5/7 - certificate for jobid:  <span className="font-bold text-xl">{jobCode}</span></div>
    <div className="grid grid-cols-2 mb-5 mt-5  font-bold gap-5">
       <a className='bg-black text-white p-2 rounded-md flex justify-center w-[90%]' target='_blank' href='https://docs.google.com/document/d/1mKdYUYXdG0xqPZu2i6LkyG0an-gvIWnT/edit'>Click here to open the certificate</a>
    </div>
    <div className="grid grid-cols-1 mb-5 font-bold gap-5">
      </div>
    <div className="grid grid-cols-2 mb-5 font-bold gap-5">
      I Agree that I have comlepted the certification 
    <input
          type="checkbox"
          checked={isCertificateAgreed}
          onChange={handleCertificateCheckboxChange}
        />
    </div>
    
  </div>
  <div className="flex justify-end gap-2">
  <div className="flex justify-end gap-2">
  {isCertificateAgreed ? <Button onClick={onStepFiveNextClick}>Next</Button> : "" }

            
            <Button onClick={onStepFiveBackClick} className="bg-gray-500">
              Back
            </Button>
          </div>
  </div>
  </div> : ""}


  {/* STEP SIX - VALIDATOR */}
  {showStepSix ? <div className="grid grid-cols-1 gap-10 bg-purple-500 p-10 rounded-lg">
  <div>
  <div className="text-white text-xs">Step 6/7 - validator for jobid:  <span className="font-bold text-xl">{jobCode}</span></div>


    {/* <div className="grid grid-cols-2 mb-5 mt-5 font-bold gap-5">
       <a className='bg-black text-white p-2 rounded-md flex justify-center w-[80%]' target='_blank' href='https://docs.google.com/document/d/1vgt-mRRCyEYmGZiQp5EmoEY7-xjBHQSD/edit'>Click here to open the validator</a>
    </div> */}
    <div className="grid grid-cols-1 mb-5 font-bold gap-5">
      </div>
    <div className="grid grid-cols-2 mb-5 font-bold gap-5">
      I Agree that I have comlepted the validator 
    <input
          type="checkbox"
          checked={isValidatorAgreed}
          onChange={handleValidatorCheckboxChange}
        />
    </div>
    
  </div>
  <div className="flex justify-end gap-2">
  <div className="flex justify-end gap-2">
  {isValidatorAgreed ? <Button onClick={onStepSixNextClick}>Next</Button> : "" }
            <Button onClick={onStepSixBackClick} className="bg-gray-500">
              Back
            </Button>
          </div>
  </div>
  </div> : ""}


  {/* STEP SEVEN - INVOICE */}
  {showStepSeven ? <div className="grid grid-cols-1 gap-10 bg-purple-500 p-10 rounded-lg">
  <div>
  <div className="text-white text-xs">Step 7/7 - invoice and submit jobid:  <span className="font-bold text-xl">{jobCode}</span></div>

    <div className="grid grid-cols-2 mt-5 mb-5 font-bold gap-5">
       <a className='bg-black text-white p-2 rounded-md flex justify-center w-[80%]' target='_blank' href='https://docs.google.com/spreadsheets/d/1s3Y0tTFlA4VD4HsbR4Jr31amahzwgRos/edit'>Click here to open the invoice</a>
    </div>
    <div className="grid grid-cols-1 mb-5 font-bold gap-5">
      </div>
    <div className="grid grid-cols-2 mb-5 font-bold gap-5">
      I Agree that I have comlepted my invoice
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
            
            <Button onClick={onStepSevenBackClick} className="bg-gray-500">
              Back
            </Button>
          </div>
  </div>
  </div> : ""}

    </main>
  );
}
