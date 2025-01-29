import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/skyflow.png";
function Navbar() {
  return (
    <>
      <div className=" py-5 ">
        
          <Link href="" className="flex flex-row gap-2 items-center">
            <Image
              src={Logo}
              alt="Skyflow Logo"
              className="  size-11 bg-white  rounded-full"
            ></Image>
            <span className="text-3xl font-semibold">Sky<span className=" text-green-600 ">flow</span></span>
          </Link>
      </div>
    </>
  );
}

export default Navbar;
