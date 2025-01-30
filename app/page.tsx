import { redirect } from "next/navigation";
import { auth } from "./auth";
import Navbar from "./components/Navbar";
export default async function Home() {
  const session = await auth();
  if(session && session.user){
    redirect("/dashboard");
  }
  return (
    <>
        <div className=' max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-8' >
        <Navbar/>
        
    </div>
    </>
  );
}
