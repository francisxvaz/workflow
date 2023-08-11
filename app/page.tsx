"use client";
import ScreenOne from "@/components/ScreenOne";
import ScreenTwo from "@/components/ScreenTwo";
import { useState } from "react";

export default function Home() {
  const [pe, setpe] = useState("");
  const [dc, setdc] = useState("");
  const [en, seten] = useState("");
  const [showScreenOne, setshowScreenOne] = useState(true);

  function onSubmit(p: string, d: string, e: string) {
    console.log(`ON PAGE : ${p} - ${d} - ${e}`)
    setpe(p);
    setdc(d);
    seten(e);
    setshowScreenOne(false);
  }

  function handleBack(p: string, d: string, e: string){
    setpe(p);
    setdc(d);
    seten(e);
    //setshowScreenOne(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showScreenOne ? (
        <ScreenOne onSubmit={onSubmit} />
      ) : (
        <ScreenTwo pe={pe} dc={dc} en={en} handleBack={handleBack} />
      )}
    </main>
  );
}
