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
import { SubmitButton } from "./SubmitButtons";
import {  useActionState, useState } from "react";
import { SettingsAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../utils/zodSchemas";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../utils/uploadthing";
import { toast } from "sonner";
interface contentProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export function SettingsForm({ fullName, email, profileImage }: contentProps) {
  const [lastResult, action, isPending] = useActionState(
    SettingsAction,
    undefined
  );
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>

      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              key={fields.fullName.key}
              name={fields.fullName.name}
              defaultValue={fullName}
              placeholder="Sky Flow"
            />
            {fields.fullName.errors?.map((error) => (
              <p key={error} className=" block text-red-500 text-xs">
                {error}
              </p>
            ))}{" "}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input disabled placeholder="test@test.com" defaultValue={email} />
          </div>
          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            ></input>
            {currentProfileImage ? (
              <div className="relative size-16">
                {" "}
                <img
                  src={currentProfileImage}
                  alt="Profile Image"
                  className="size-16 rounded-lg"
                ></img>
                <Button
                  onClick={handleDeleteImage}
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-3 -right-3"
                >
                  {" "}
                  <X className="size-4"></X>{" "}
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].ufsUrl);
                  toast.success("Profile Image has been uploaded");
                }}
                onUploadError={(err) => {
                  console.log("Something went wrong: ", err.message);
                  toast.error(err.message);
                }}
                endpoint="imageUploader"
              />
            )}
            <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton
            text="Save Changes"
          ></SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
