import { cancelMeetingAction } from "@/app/actions";
import EmptyState from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { prisma } from "@/app/prisma";
import { nylas } from "@/app/utils/nylas";
import userAuth from "@/app/utils/userAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not Found");
  }

  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return data;
}

async function page() {
  const session = await userAuth();
  const data = await getData(session.user?.id as string);
  console.log(data);
  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          description="You don't have any meetings yet"
          buttonText="Create a new event type"
          href="/dashboard/new"
          title="No meetings found"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming event which where booked with you and see the event
              type link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form key={item.id} action={cancelMeetingAction}>
                <input type="hidden" name="eventId" value={item.id}></input>
                <div
                  key={item.id}
                  className="grid grid-cols-3 justify-between items-center"
                >
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {/* @ts-ignore */}
                      {format(fromUnixTime(item.when.startTime), "EEE,dd MMM")}
                    </p>
                    <p className="text-muted-foreground text-xs pt-1">
                      
                      {format(
                        //@ts-ignore
                        fromUnixTime(item.when.startTime),
                        "hh:mm a"
                      )}{" "}
                      {/* @ts-ignore */}

                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-primary"></Video>
                      
                      <a
                      
                        target="_blank"
                        //@ts-ignore
                        href={item.conferencing?.details?.url}
                        className="text-xs text-primary underline underline-offset-4"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You and {item.participants[0].name}
                    </p>
                  </div>
                  <SubmitButton
                    text="Cancel Event"
                    variant="destructive"
                    className="w-fit flex ml-auto"
                  ></SubmitButton>
                </div>
                <Separator className="my-3"></Separator>
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default page;
