import { prisma } from "@/app/prisma";
import { nylas, nylasConfig } from "@/app/utils/nylas";
import userAuth from "@/app/utils/userAuth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await userAuth();
  const url = new URL(req.url);

  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("Hey we did not get a code", {
      status: 400,
    });
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientid!,
      redirectUri: nylasConfig.redirectUri!,
      code: code,
    });

    const { grantId, email } = response;
    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        grantId: grantId,
        grantEmail: email,
      },
    });
  } catch (error) {
    console.log("Error something went wrong ", error);
  }

  redirect("/dashboard")
}
