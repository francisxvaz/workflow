import React from "react";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-100 items-center justify-between p-24">
      <div className="bg-white w-[80%] rounded-lg shadow-lg  p-10">
        <div className="flex justify-between pb-10">
          <div>Job No: 0000</div>
          <div>Certificate No:00001</div>
        </div>
        <div className="grid justify-around">
          <div className="font-bold">INDEPENDENT REVIEW CERTIFICATE</div>
          <div>Issued within the scope of XXX General Condition of Service</div>
        </div>
        <div className="grid grid-cols-2 mt-10 w-[50%]">
          <div className="font-medium">Manufacturer</div>
          <div>bxfgnxfn</div>
        </div>
        <div className="grid grid-cols-2 mt-10 w-[50%]">
          <div className="font-medium">Description</div>
          <div>bxfgnxfn</div>
        </div>
        <div className="grid grid-cols-2 mt-10 w-[50%]">
          <div className="font-bold">Design Reference</div>
        </div>
        <div className="grid grid-cols-2 mt-10 w-[50%]">
          <div className="font-medium">Performance Criteria</div>
          <div className="grid grid-cols-1">
            <div>Design Working Pressure</div>
            <div>Design Test Pressure</div>
            <div>Service Temperature Range</div>
            <div>Service</div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-10 w-[50%]">
          <div className="font-medium">Material</div>
        </div>
        <div className="grid grid-cols-2 mt-10 w-[50%]">
          <div className="font-medium">Drawing and Design Data</div>
        </div>
        <div className="grid grid-cols-2 mt-10 w-[50%]">
          <div className="font-medium">Manufacturing Standards</div>
        </div>
        <div className="grid grid-cols-2 mt-10 w-[50%]">
          <div className="font-medium">Design Reference</div>
        </div>
        <div className="pt-20">
          The above has been reviewed against the specified design references.
          As a result XXX, Company considers that the equipment manufactured to
          this design will satisfy the specified performance criteria.
          Consequently, this certificate is considered to contribute towards the
          duty holders obligation for the verification of the equipment’s design
          under the requirements of the relevant regulations and / or guidance
        </div>

        <div className=" pt-10">Made at Perth</div>
        <div className="flex justify-between pb-10">
            <div>Date:</div>
            <div>Engineer</div>
            <div>Validated By</div>
        </div>
      </div>
    </main>
  );
}
