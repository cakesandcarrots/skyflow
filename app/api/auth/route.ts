import { nylas, nylasConfig } from "@/app/utils/nylas";
import { redirect } from "next/navigation";

export async function GET() {
  const authUrL = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientid!,
    redirectUri: nylasConfig.redirectUri!,
  });
  return redirect(authUrL);

}


