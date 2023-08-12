"use client";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Home() {

  const [designCodes, setDesignCodes] = useState("")


  function handlePEChange(e) {
    setDesignCodes(data.dcs.filter(dc => dc.pressureEquipmentId === e.target.value))
  }

  const { isLoading, error, data } = useQuery("alldata", () =>
    fetch("http://localhost:3000/api/all").then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-1 gap-10">
        <select id="pe" onChange={handlePEChange}>
          <option value="">Select Pressure Equipment</option>
          {data.pes.map((pe) => (
            <option value={pe.id}>{pe.name}</option>
          ))}
        </select>

        {designCodes != "" ?
        <select id="dc">
          <option value="">Select Design Code</option>
          {designCodes.map((dc) => (
            <option value={dc.id}>{dc.name}</option>
          ))}
        </select>:""}

        {designCodes != "" ?
        <select id="dc">
          <option value="">Select Project Engineers</option>
          {data.ens.map((en) => (
            <option value={en.id}>{en.name}</option>
          ))}
        </select>: ""}

      </div>
    </main>
  );
}
