import Image from "next/image";
import React from "react";
import nylasLogo from "@/public/nylas-logo.png"
import nextjsLogo from "@/public/nextjs-logo.svg"
import vercelLogo from "@/public/vercel.svg"
import PostgreLogo from "@/public/postgresql.svg"
import ReactLogo from "@/public/react.svg"
function Logos() {
  return (
    <>
      <div className="py-10">
        <h2 className="text-center text-lg font-semibold leading-7">
          Trusted by the best companies in the world
        </h2>
        <div className="mt-10 grid max-w-lg  mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <Image src={nylasLogo} alt="nylas" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"/>
            <Image src={nextjsLogo} alt="nylas" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"/>
            <Image src={vercelLogo} alt="nylas" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"/>
            <Image src={ReactLogo} alt="nylas" className=" size-16 col-span-2  w-full object-contain lg:col-span-1 dark:invert"/>
            <Image src={PostgreLogo} alt="nylas" className="  col-span-2  w-full object-contain lg:col-span-1 dark:invert"/>


        </div>
      </div>
    </>
  );
}

export default Logos;
