import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/skyflow.png";
import AuthModal from "./AuthModal";
function Navbar() {
  return (
    <>
      <div className=" py-5 flex items-center justify-between w-full">
        
          <Link href="/" className="flex  gap-1 items-center ">
            <Image
              src={Logo}
              alt="Skyflow Logo"
              className="  size-11  rounded-full"
            ></Image>
            <span className="text-3xl font-semibold">Sky<span className=" text-primary ">flow</span></span>
          </Link>

          <AuthModal/>

          
      </div>
    </>
  );
}

export default Navbar;
