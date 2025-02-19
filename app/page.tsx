import { redirect } from "next/navigation";
import { auth } from "./auth";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Logos from "./components/Logos";
import Features from "./components/Features";
import CTA from "./components/CTA";

export default async function Home() {
  const session = await auth();
  if(session && session.user){
    redirect("/dashboard");
  }



  return (
    <>
        <div className=' max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' >
        <Navbar/>
        <Hero/>
        <Logos/>
        <Features/>
        <CTA/>
    </div>
    </>
  );
}
