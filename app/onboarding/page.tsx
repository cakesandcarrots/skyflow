"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { OnboardingAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { OnboardingSchema } from "../utils/zodSchemas";
import { SubmitButton } from "../components/SubmitButtons";
function Onboarding() {
  const [lastResult, action, isPending] = useActionState(
    OnboardingAction,
    undefined
  );
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: OnboardingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <>
      <div className="min-h-screen w-screen flex items-center justify-center ">
        <Card>
          <CardHeader>
            <CardTitle>
              Welcome to Sky<span className="text-primary">flow</span>
            </CardTitle>
            <CardDescription>
              The following information is needed to create your profile
            </CardDescription>
          </CardHeader>
          <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <CardContent className="flex flex-col gap-y-5 ">
              <div className="grid gap-y-2">
                <Label>Full Name</Label>
                <Input
                  name={fields.fullName.name}
                  defaultValue={fields.fullName.initialValue}
                  key={fields.fullName.key}
                  placeholder="John Smith"
                ></Input>
                {fields.fullName.errors?.map((error) => (
                  <p key={error} className=" block text-red-500 text-xs">
                    {error}
                  </p>
                ))}{" "}
              </div>
              <div className="grid gap-y-2">
                <Label> Username </Label>
                <div className="flex rounded-md">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted text-sm text-muted-foreground bg-slate-300/40">
                    Skyflow.com/
                  </span>
                  <Input
                    name={fields.userName.name}
                    key={fields.userName.key}
                    defaultValue={fields.userName.initialValue}
                    placeholder="John-Smith-1"
                    className="rounded-l-none  "
                  ></Input>
                </div>
                {fields.userName.errors?.map((error) => (
                  <p key={error} className=" block text-red-500 text-xs">
                    {error}
                  </p>
                ))}
              </div>
            </CardContent>
            <CardFooter>
                <SubmitButton className="w-full"  text="Submit"></SubmitButton>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Onboarding;
