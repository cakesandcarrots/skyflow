import React from "react";
import userAuth from "../utils/userAuth";
import { prisma } from "../prisma";
import { notFound } from "next/navigation";
import EmptyState from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ExternalLinkIcon,
  Link2,
  Link2Icon,
  LinkIcon,
  Pen,
  Settings,
  Trash,
  Users2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}
async function DashboardPage() {
  const session = await userAuth();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.eventType.length == 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button below"
          buttonText="Add Event Type"
          href="/dashboard/new"
        ></EmptyState>
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="hidden sm:grid gap-y-1">
              <h1 className="text-3xl md:text-4xl font-semibold">
                Event Types
              </h1>
              <p className="text-muted-foreground">
                Create and manage your event types right here
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/new">Create new Event</Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.eventType.map((item) => (
              <div
                className="overflow-hidden shadow rounded-lg border relative"
                key={item.id}
              >
                <div className="absolute top-2 right-2 ">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="size-4"></Settings>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator></DropdownMenuSeparator>
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data.userName}/${item.url}`}>
                            <ExternalLinkIcon className="size-4 mr-2" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <LinkIcon className="mr-2 size-4"/>Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pen className="size-4 mr-2 "/>Edit
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash className="size-4 mr-2"/>Delete

                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link href="/" className="flex items-center p-5">
                  {" "}
                  <div className="flex-shrink-0">
                    <Users2 className="size-6"></Users2>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {item.duration} Minutes Meeting
                      </dt>
                      <dd className="text-lg font-medium">{item.title}</dd>
                    </dl>
                  </div>
                </Link>
                <div className="bg-muted px-5 py-3 justify-between items-center flex">
                  <Switch />
                  <Button>Edit Event</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default DashboardPage;
