"use client";
import React, { MouseEventHandler } from "react";
import { Button } from "./ui/button";

export default function ScreenTwo({
  pe,
  dc,
  en,
  handleBack
}: {
  pe: string;
  dc: string;
  en: string;
  handleBack: Function
}) {
  

  function handleNext(event: MouseEvent): void {}

  return (
    <div className="bg-slate-100 grid grid-col-1 p-10 gap-5">
      {`${pe} - ${dc} - ${en}`}
      <div className="flex justify-end gap-3">
        <Button onClick={handleNext}>Next</Button>
        <Button onClick={handleBack(pe,dc,en)}>Back</Button>
      </div>
    </div>
  );
}
