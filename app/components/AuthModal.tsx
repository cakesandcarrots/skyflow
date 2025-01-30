import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/skyflow.png";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { signIn } from "../auth";
import { GithubSubmitButton, GoogleSubmitButton } from "./SubmitButtons";
const AuthModal = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Get Started</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="flex flex-row gap-1 justify-center mb-4 align-middle ">
            <VisuallyHidden>
              <DialogTitle>Sign in</DialogTitle>
            </VisuallyHidden>

            <Image src={Logo} alt="skyflow logo" className="block size-11" />

              <span className="text-3xl flex items-center font-semibold ">
                Sky<span className=" text-primary ">flow</span>
              </span>
          </DialogHeader>
          <form
            action={async () => {
              "use server"
             await signIn("google")
            }}
          >
            <GoogleSubmitButton/>
          </form>
          <form
            action={async () => {
              "use server"
             await signIn("github")
            }}
          >
            <GithubSubmitButton/>

          </form>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModal;
