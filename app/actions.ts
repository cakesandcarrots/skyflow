"use server";

import { prisma } from "./prisma";
import userAuth from "./utils/userAuth";
import { parseWithZod } from "@conform-to/zod";
import { OnboardingSchemaValidator, settingsSchema } from "./utils/zodSchemas";
import { redirect } from "next/navigation";
export async function OnboardingAction(prevState: any, formaData: FormData) {
  const session = await userAuth();
  const submission = await parseWithZod(formaData, {
    schema: OnboardingSchemaValidator({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formaData.get("userName") as string,
          },
        });
        return !existingUsername;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
    },
  });
  return redirect("/onboarding/grant-id");
}

export async function SettingsAction(prevState: any, formData: FormData) {
  const session = await userAuth();
  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const user = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage
    }
  })

  return redirect("/dashboard")
}
