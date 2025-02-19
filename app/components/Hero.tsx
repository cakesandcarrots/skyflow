import Image from "next/image";
import AuthModal from "./AuthModal";
import HeroImage from "@/public/HeroImage.png";
function Hero() {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
        <div className="text-center">
          <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
            Introducing Skyflow
          </span>

          <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium ">
            {" "}
            Scheduling the{" "}
            <span className="block text-primary -mt-2">easy way</span>
          </h1>

          <p className="max-w-xl mx-auto mt-4 lg:text-lg  text-muted-foreground">
            Scheduling meetings shouldn't be a hassle. At Skyflow, we make the
            process smooth and efficient, so you can focus on what truly
            matters—connecting with your clients.
          </p>

          <div className="mt-5 mb-12">
            <AuthModal />
          </div>
        </div>

        <div className=" dark:bg-white relative border rounded-lg shadow-2xl lg:rounded-2xl  items-center w-full  sm:p-6 md:p-8 lg:p-12 mx-auto mt-6">
          <Image
            src={HeroImage}
            alt="Hero Image"
            className="relative object-cover w-full rounded-lg"
          />
        </div>
      </section>
    </>
  );
}

export default Hero;
