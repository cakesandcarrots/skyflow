"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleLogo from "@/public/google.svg";
import { Loader2 } from "lucide-react";
import GithubLogo from "@/public/github.svg";

export const GoogleSubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending == true ? (
        <Button disabled className="w-full" variant="outline">
          <Loader2 className="size-4 mr-2 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image
            src={GoogleLogo}
            className=" size-6 "
            alt="google logo"
          ></Image>
          <span>Sign in with Google</span>
        </Button>
      )}
    </>
  );
};

export const GithubSubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending == true ? (
        <Button disabled className="w-full" variant="outline">
          <Loader2 className="size-4 mr-2 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image
            src={GithubLogo}
            className=" size-6 "
            alt="github logo"
          ></Image>
          <span>Sign in with Github</span>
        </Button>
      )}
    </>
  );
};
