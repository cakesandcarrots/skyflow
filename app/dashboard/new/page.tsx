"use client";
import { createEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { eventTypeSchema } from "@/app/utils/zodSchemas";
import { Button } from "@/components/ui/button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useActionState, useState } from "react";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";
function page() {
  const [activePlatform, setActivePlatform] =
    useState<VideoCallProvider>("Google Meet");

  const [lastResult, action] = useActionState(createEventTypeAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: eventTypeSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <div className="w-full h-full flex flex-1 items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Add new appointment type </CardTitle>{" "}
            <CardDescription>
              Create new appointment type that allows people to book you
            </CardDescription>
          </CardHeader>

          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            noValidate
          >
            <CardContent className="grid gap-y-5">
              <div className="flex flex-col gap-y-2">
                <Label>Title</Label>
                <Input
                  name={fields.title.name}
                  key={fields.title.key}
                  defaultValue={fields.title.initialValue}
                  placeholder="30 Minute Meeting"
                ></Input>
                <p className="text-red-500 text-sm">{fields.title.errors}</p>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>URL Slug</Label>
                <div className="flex rounded-md">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted text-sm text-muted-foreground bg-slate-300/40">
                    Skyflow.com/
                  </span>
                  <Input
                    className="rounded-l-none"
                    placeholder="Link-url-1"
                    name={fields.url.name}
                    key={fields.url.key}
                    defaultValue={fields.url.initialValue}
                  ></Input>
                </div>
                <p
                  className="text-red-500 text-sm"
                >
                  {fields.url.errors}
                </p>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Description</Label>
                <Textarea
                  name={fields.description.name}
                  key={fields.description.key}
                  defaultValue={fields.description.initialValue}
                  placeholder="Meet me in the meeting!"
                ></Textarea>
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              </div>

              <div className="flex flex-col gap-y-2">
                <Label>Duration</Label>
                <Select
                  name={fields.duration.name}
                  key={fields.duration.key}
                  defaultValue={fields.duration.initialValue}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the duration"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Duration</SelectLabel>
                      <SelectItem value="15">15 Mins</SelectItem>
                      <SelectItem value="30">30 Mins</SelectItem>
                      <SelectItem value="45">45 Mins</SelectItem>
                      <SelectItem value="60">1 Hour</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{fields.duration.errors}</p>
              </div>
              <div className="grid gap-y-2">
                <Label>Video Call Provider</Label>
                <input
                  type="hidden"
                  name={fields.videoCallSoftware.name}
                  value={activePlatform}
                ></input>
                <ButtonGroup>
                  <Button
                    type="button"
                    variant={
                      activePlatform === "Zoom Meeting"
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => setActivePlatform("Zoom Meeting")}
                    className="w-full"
                  >
                    Zoom
                  </Button>
                  <Button
                    type="button"
                    variant={
                      activePlatform === "Google Meet" ? "secondary" : "outline"
                    }
                    onClick={() => setActivePlatform("Google Meet")}
                    className="w-full"
                  >
                    Google Meet
                  </Button>
                  <Button
                    type="button"
                    variant={
                      activePlatform === "Microsoft Teams"
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => setActivePlatform("Microsoft Teams")}
                    className="w-full"
                  >
                    Microsoft Teams
                  </Button>
                </ButtonGroup>
                <p className="text-red-500 text-sm">
                  {fields.videoCallSoftware.errors}
                </p>
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-between">
              <Button variant="secondary" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <SubmitButton text="Create Event Type"></SubmitButton>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default page;
