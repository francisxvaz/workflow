"use client";
import React, { MouseEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import data from "@/data/data.json";
import { Button } from "./ui/button";

export default function ScreenOne({onSubmit}:{onSubmit: Function}) {

    const [pe, setpe] = useState('')
    const [dc, setdc] = useState('')
    const [en, seten] = useState('')
    
    function handleResetSelect(event: MouseEvent): void {
        setpe('')
        setdc('')
        seten('')
    }

    function handleNext(event: MouseEvent): void {
        onSubmit(pe,dc,en) 
    }

  return (
    <div className="bg-slate-100 grid grid-col-1 p-10 gap-5">
      <Select onValueChange={e => setpe(e)} value={pe}>
        <SelectTrigger className="w-[230px]">
          <SelectValue  placeholder="Select Pressure Equipments" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=''>Select Pressure Equipments</SelectItem>
          {data.pressureEquipments.map((t) => (
            <SelectItem value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={e => setdc(e)} value={dc}>
        <SelectTrigger className="w-[230px]">
          <SelectValue placeholder="Select Design Code" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=''>Select Design Code</SelectItem>
            
          {data.designCodes.map((t) => (
            <SelectItem value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={e => seten(e)} value={en}>
        <SelectTrigger className="w-[230px]">
          <SelectValue placeholder="Select Engineer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=''>Select Engineer</SelectItem>

          {data.engineers.map((t) => (
            <SelectItem value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-end gap-3">
      <Button onClick={handleNext}>Next</Button>
      <Button onClick={handleResetSelect}>Clear</Button>
        </div>      
    </div>
  );
}
