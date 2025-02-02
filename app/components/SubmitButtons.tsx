"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleLogo from "@/public/google.svg";
import { Loader2 } from "lucide-react";
import GithubLogo from "@/public/github.svg";
import { cn } from "@/lib/utils";

interface buttonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
}
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

export const SubmitButton = ({
  text,
  ispending,
  variant,
  className,
}: { ispending: boolean } & buttonProps) => {
  return (
    <>
      {ispending ? (
        <Button disabled variant="outline" className={cn("w-fit", className)}>
          <Loader2 className="size-4 mr-2 animate-spin">Please Wait</Loader2>
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant}
          className={cn("w-fit", className)}
        >
          {text}
        </Button>
      )}
    </>
  );
};
