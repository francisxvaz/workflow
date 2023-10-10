import React from "react";

export default function page() {
  return (
    <>
    <div className="flex w-[80%] mx-auto">
        <div className="bg-blue-100 w-1/5">1st col</div>
        <div className="bg-red-100 w-4/5">2nd col</div>
      </div>
    <main className="flex min-h-screen flex-col bg-slate-100 items-center justify-between p-24">
      
      <div className="bg-white w-[80%] rounded-lg shadow-lg  p-10">
        <div className="flex justify-between pb-10">
          <div>
            Job No:{" "}
            <input
              type="text"
              name="JobNo"
              className="border-purple-200 border rounded-md p-2"
              placeholder="Job No"
            />
          </div>
          <div>
            Certificate No:{" "}
            <input
              type="text"
              name="CertificateNo"
              className="border-purple-200 border rounded-md p-2"
              placeholder="Certificate No"
            />
          </div>
        </div>
        <div className="grid justify-around">
          <div className="font-bold">INDEPENDENT REVIEW CERTIFICATE</div>
          <div>Issued within the scope of XXX General Condition of Service</div>
        </div>
        <div className="grid grid-cols-3 mt-10 justify-center w-9/12">
          <div>Manufacturer</div>
          <div className="col-span-2">
            <input
              type="text"
              name="Manufacturer"
              className="border-purple-200 border rounded-md p-2 w-full"
              placeholder="Manufacturer"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mt-10 justify-center w-9/12">
          <div>Description</div>
          <div className="col-span-2">
            <textarea
              name="Manufacturer"
              className="border-purple-200 border rounded-md p-2 w-full"
              placeholder="Description"
              rows={5}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 mt-10 w-[50%]">
          <div className="font-bold">Design Reference</div>
        </div>

        <div className="grid grid-cols-2 mt-1 mb-5 w-[50%]">
          <div className="font-light">Performance Criteria</div>
        </div>

        <div className="grid grid-cols-3 mt-10 justify-center w-9/12">
          <div>Description</div>
          <div className="col-span-2">
            <textarea
              name="Manufacturer"
              className="border-purple-200 border rounded-md p-2 w-full"
              placeholder="Description"
              rows={5}
            />
          </div>
        </div>

        <div className="">
          <div>
            <div className="flex">
              Design Working Pressure{" "}
              <input
                type="text"
                name="Manufacturer"
                className="border-purple-200 border rounded-md p-2 w-full"
                placeholder="Manufacturer"
              />
            </div>
            <div>Design Test Pressure</div>
            <div>Service Temperature Range</div>
            <div>Service</div>
          </div>
        </div>

        <div className="grid grid-cols-3 mt-10 justify-center w-9/12">
          <div>Material</div>
          <div className="col-span-2">
            <input
              type="text"
              name="Material"
              className="border-purple-200 border rounded-md p-2 w-full"
              placeholder="Material"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mt-10 justify-center w-9/12">
          <div>Drawing and Design Data</div>
          <div className="col-span-2">
            <input
              type="text"
              name="ddd"
              className="border-purple-200 border rounded-md p-2 w-full"
              placeholder="Drawing and Desing Data"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mt-10 justify-center w-9/12">
          <div>Manufacturing Standards</div>
          <div className="col-span-2">
            <input
              type="text"
              name="ManufacturingStandards"
              className="border-purple-200 border rounded-md p-2 w-full"
              placeholder="Manufacturing Standards"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mt-10 justify-center w-9/12">
          <div>Design Reference</div>
          <div className="col-span-2">
            <input
              type="text"
              name="DesignReference"
              className="border-purple-200 border rounded-md p-2 w-full"
              placeholder="Design Reference"
            />
          </div>
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
          <div>
            Date:{" "}
            <input
              type="text"
              name="date"
              className="border-purple-200 border rounded-md p-2 w-full"
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div>
            Engineer{" "}
            <input
              type="text"
              name="Engineer"
              className="border-purple-200 border rounded-md p-2 w-full"
              placeholder="Engineer"
            />
          </div>
          <div>
            Validated By{" "}
            <input
              type="text"
              name="validatedBy"
              className="border-purple-200 border rounded-md p-2 w-full"
              placeholder="validated By"
            />
          </div>
        </div>
      </div>
    </main>
    </>

  );
}
